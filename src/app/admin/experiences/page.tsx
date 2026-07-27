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

type Experience = {
  id: string;
  company: string;
  role: string;
  slug: string;
  published: boolean;
  current: boolean;
  createdAt: string;
};

export default function AdminExperiencesPage() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/experiences");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setExperiences(Array.isArray(data.data) ? data.data : []);
    } catch {
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/experiences", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (res.ok) {
        toast.success("Experience deleted");
        setDeleteTarget(null);
        fetchExperiences();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (exp: Experience) => {
    try {
      const res = await fetch("/api/admin/experiences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: exp.id, published: !exp.published }),
      });
      if (res.ok) {
        toast.success(exp.published ? "Unpublished" : "Published");
        fetchExperiences();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const columns = [
    {
      key: "company",
      label: "Company",
      render: (item: Experience) => (
        <div>
          <div className="text-white font-medium">{item.company}</div>
          <div className="text-slate-500 text-xs">{item.role}</div>
        </div>
      ),
    },
    {
      key: "current",
      label: "Current",
      render: (item: Experience) =>
        item.current ? (
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400">
            Current
          </span>
        ) : (
          <span className="text-slate-500 text-xs">-</span>
        ),
    },
    {
      key: "published",
      label: "Status",
      render: (item: Experience) => (
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
  ];

  return (
    <div className="flex min-h-screen bg-[#0e0e0e]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Experiences</h1>
            <Link
              href="/admin/experiences/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </Link>
          </div>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl overflow-hidden">
            <DataTable
              columns={columns}
              data={experiences}
              loading={loading}
              emptyMessage="No experiences yet"
              onEdit={(item) =>
                router.push(`/admin/experiences/${item.id}/edit`)
              }
              onDelete={(item) => setDeleteTarget(item)}
            />
          </div>
        </main>
      </div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Experience"
        message={`Are you sure you want to delete the experience at "${deleteTarget?.company}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
