"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderOpen,
  Award,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0e0e0e] border-r border-[#1e293b] p-4 hidden lg:block">
      <div className="mb-8 px-2">
        <Link href="/admin" className="text-lg font-bold text-white">
          Admin Panel
        </Link>
        <p className="text-xs text-slate-500 mt-1">Debadrita Goswami</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1e293b] text-white"
                  : "text-slate-400 hover:text-white hover:bg-[#1e293b]/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
