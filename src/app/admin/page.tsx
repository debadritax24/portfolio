"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, FolderOpen, Award, Briefcase } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type Stats = {
  blogs: number;
  projects: number;
  certifications: number;
  experiences: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    projects: 0,
    certifications: 0,
    experiences: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, projects, certs, exps] = await Promise.all([
          fetch("/api/admin/blogs").then((r) => r.json()),
          fetch("/api/admin/projects").then((r) => r.json()),
          fetch("/api/admin/certifications").then((r) => r.json()),
          fetch("/api/admin/experiences").then((r) => r.json()),
        ]);
        setStats({
          blogs: Array.isArray(blogs.data) ? blogs.data.length : 0,
          projects: Array.isArray(projects.data) ? projects.data.length : 0,
          certifications: Array.isArray(certs.data) ? certs.data.length : 0,
          experiences: Array.isArray(exps.data) ? exps.data.length : 0,
        });
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Blogs",
      count: stats.blogs,
      icon: FileText,
      href: "/admin/blogs",
      color: "text-blue-400",
    },
    {
      label: "Projects",
      count: stats.projects,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-green-400",
    },
    {
      label: "Certifications",
      count: stats.certifications,
      icon: Award,
      href: "/admin/certifications",
      color: "text-yellow-400",
    },
    {
      label: "Experiences",
      count: stats.experiences,
      icon: Briefcase,
      href: "/admin/experiences",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0e0e0e]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="bg-[#111318] border border-[#1e293b] rounded-xl p-5 hover:border-[#334155] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                  <span className="text-2xl font-bold text-white">
                    {loading ? "..." : card.count}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{card.label}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
