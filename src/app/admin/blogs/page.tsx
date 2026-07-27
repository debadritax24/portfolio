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

type Blog = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setBlogs(Array.isArray(data.data) ? data.data : []);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (res.ok) {
        toast.success("Blog deleted");
        setDeleteTarget(null);
        fetchBlogs();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, published: !blog.published }),
      });
      if (res.ok) {
        toast.success(blog.published ? "Unpublished" : "Published");
        fetchBlogs();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleToggleFeatured = async (blog: Blog) => {
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, featured: !blog.featured }),
      });
      if (res.ok) {
        toast.success(blog.featured ? "Unfeatured" : "Featured");
        fetchBlogs();
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
      render: (item: Blog) => (
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
      render: (item: Blog) => (
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
            <h1 className="text-2xl font-bold text-white">Blogs</h1>
            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Blog
            </Link>
          </div>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl overflow-hidden">
            <DataTable
              columns={columns}
              data={blogs}
              loading={loading}
              emptyMessage="No blogs yet"
              onEdit={(item) => router.push(`/admin/blogs/${item.id}/edit`)}
              onDelete={(item) => setDeleteTarget(item)}
            />
          </div>
        </main>
      </div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
