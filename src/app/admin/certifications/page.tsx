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

type Certification = {
  id: string;
  title: string;
  slug: string;
  issuer: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
};

export default function AdminCertificationsPage() {
  const router = useRouter();
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Certification | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCerts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certifications");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setCerts(Array.isArray(data.data) ? data.data : []);
    } catch {
      setCerts([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCerts();
  }, [fetchCerts]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/certifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (res.ok) {
        toast.success("Certification deleted");
        setDeleteTarget(null);
        fetchCerts();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (cert: Certification) => {
    try {
      const res = await fetch("/api/admin/certifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cert.id, published: !cert.published }),
      });
      if (res.ok) {
        toast.success(cert.published ? "Unpublished" : "Published");
        fetchCerts();
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "issuer", label: "Issuer" },
    {
      key: "published",
      label: "Status",
      render: (item: Certification) => (
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
            <h1 className="text-2xl font-bold text-white">Certifications</h1>
            <Link
              href="/admin/certifications/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Certification
            </Link>
          </div>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl overflow-hidden">
            <DataTable
              columns={columns}
              data={certs}
              loading={loading}
              emptyMessage="No certifications yet"
              onEdit={(item) =>
                router.push(`/admin/certifications/${item.id}/edit`)
              }
              onDelete={(item) => setDeleteTarget(item)}
            />
          </div>
        </main>
      </div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Certification"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
