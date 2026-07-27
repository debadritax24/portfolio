"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setProject(data.data || null);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
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

  if (!project) {
    return (
      <div className="flex min-h-screen bg-[#0e0e0e]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center text-slate-500">
          Project not found
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
          <h1 className="text-2xl font-bold text-white mb-6">Edit Project</h1>
          <div className="bg-[#111318] border border-[#1e293b] rounded-xl p-6">
            <ProjectForm mode="edit" initialData={project} />
          </div>
        </main>
      </div>
    </div>
  );
}
