"use client";

import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <header className="h-14 border-b border-[#1e293b] bg-[#0e0e0e] flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="lg:hidden text-white font-bold text-sm">
          Admin
        </Link>
        <span className="text-slate-500 text-sm hidden lg:inline">
          Dashboard
        </span>
      </div>
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1e293b] transition-colors disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" />
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}
