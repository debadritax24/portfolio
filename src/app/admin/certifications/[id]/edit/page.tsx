"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import CertificationForm from "@/components/admin/CertificationForm";

export default function EditCertificationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [cert, setCert] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await fetch(`/api/admin/certifications/${id}`);
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setCert(data.data || null);
      } catch {
        setCert(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0e0e0e]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center text-slate-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="flex min-h-screen bg-[#0e0e0e]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center text-slate-500">
          Certification not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0e0e0e]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            Edit Certification
          </h1>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl p-6">
            <CertificationForm mode="edit" initialData={cert} />
          </div>
        </main>
      </div>
    </div>
  );
}
