"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import toast from "react-hot-toast";

type Project = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setProjects(Array.isArray(data.data) ? data.data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (res.ok) {
        toast.success("Project deleted");
        setDeleteTarget(null);
        fetchProjects();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, published: !project.published }),
      });
      if (res.ok) {
        toast.success(project.published ? "Unpublished" : "Published");
        fetchProjects();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, featured: !project.featured }),
      });
      if (res.ok) {
        toast.success(project.featured ? "Unfeatured" : "Featured");
        fetchProjects();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "published",
      label: "Status",
      render: (item: Project) => (
        <button
          onClick={() => handleTogglePublish(item)}
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            item.published
              ? "bg-green-900/30 text-green-400"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {item.published ? "Published" : "Draft"}
        </button>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (item: Project) => (
        <button
          onClick={() => handleToggleFeatured(item)}
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            item.featured
              ? "bg-yellow-900/30 text-yellow-400"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {item.featured ? "Yes" : "No"}
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0e0e0e]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Link>
          </div>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl overflow-hidden">
            <DataTable
              columns={columns}
              data={projects}
              loading={loading}
              emptyMessage="No projects yet"
              onEdit={(item) =>
                router.push(`/admin/projects/${item.id}/edit`)
              }
              onDelete={(item) => setDeleteTarget(item)}
            />
          </div>
        </main>
      </div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
