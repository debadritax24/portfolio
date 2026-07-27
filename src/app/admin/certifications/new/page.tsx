"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import CertificationForm from "@/components/admin/CertificationForm";

export default function NewCertificationPage() {
  return (
    <div className="flex min-h-screen bg-[#0e0e0e]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            New Certification
          </h1>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl p-6">
            <CertificationForm mode="create" />
          </div>
        </main>
      </div>
    </div>
  );
}
