"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type ExpFormData = {
  company: string;
  role: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  imagePathname: string;
  techStack: string;
  current: boolean;
  published: boolean;
};

type ExperienceFormProps = {
  initialData?: Record<string, unknown>;
  mode: "create" | "edit";
};

export default function ExperienceForm({
  initialData,
  mode,
}: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ExpFormData>({
    company: (initialData?.company as string) || "",
    role: (initialData?.role as string) || "",
    slug: (initialData?.slug as string) || "",
    description: (initialData?.description as string) || "",
    startDate: (initialData?.startDate as string) || "",
    endDate: (initialData?.endDate as string) || "",
    location: (initialData?.location as string) || "",
    imageUrl: (initialData?.imageUrl as string) || "",
    imagePathname: (initialData?.imagePathname as string) || "",
    techStack: Array.isArray(initialData?.techStack)
      ? (initialData.techStack as string[]).join(", ")
      : "",
    current: (initialData?.current as boolean) ?? false,
    published: (initialData?.published as boolean) ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...(mode === "edit" ? { id: initialData?.id } : {}),
        company: form.company,
        role: form.role,
        slug: form.slug || undefined,
        description: form.description,
        startDate: form.startDate,
        endDate: form.current ? null : form.endDate || null,
        location: form.location || null,
        imageUrl: form.imageUrl || null,
        imagePathname: form.imagePathname || null,
        techStack: form.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        current: form.current,
        published: form.published,
      };

      const res = await fetch("/api/admin/experiences", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(
          mode === "create"
            ? "Experience created!"
            : "Experience updated!"
        );
        router.push("/admin/experiences");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Company *
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Role *
          </label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Slug (auto-generated if empty)
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Start Date *
          </label>
          <input
            type="text"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="2024-01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            End Date
          </label>
          <input
            type="text"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="2025-06 or leave empty if current"
            disabled={form.current}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Location
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="Kolkata, India"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Company Logo / Image
        </label>
        <ImageUpload
          value={form.imageUrl}
          folder="experiences"
          onChange={(url, pathname) =>
            setForm({ ...form, imageUrl: url, imagePathname: pathname || "" })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Tech Stack (comma separated)
        </label>
        <input
          type="text"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="React, Node.js, TypeScript"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.current}
            onChange={(e) => setForm({ ...form, current: e.target.checked })}
            className="w-4 h-4 rounded border-[#1e293b] bg-[#0e0e0e] text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Current Position</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) =>
              setForm({ ...form, published: e.target.checked })
            }
            className="w-4 h-4 rounded border-[#1e293b] bg-[#0e0e0e] text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Published</span>
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Experience"
              : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-[#1e293b] text-slate-400 text-sm hover:text-white hover:bg-[#1e293b] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
