"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type ExpFormData = {
  company: string;
  role: string;
  slug: string;
  summary: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  imagePathname: string;
  tags: string;
  achievements: string;
  type: string;
  current: boolean;
  published: boolean;
  featured: boolean;
};

type ExperienceFormProps = {
  initialData?: Record<string, unknown>;
  mode: "create" | "edit";
};

function generatePeriod(startDate: string, endDate: string, current: boolean): string {
  if (!startDate) return "";
  const formatPeriod = (date: string) => {
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return month ? `${monthNames[parseInt(month, 10) - 1]} ${year}` : year;
  };
  const start = formatPeriod(startDate);
  const end = current ? "Present" : endDate ? formatPeriod(endDate) : "";
  return end ? `${start} — ${end}` : start;
}

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
    summary: (initialData?.summary as string) || "",
    startDate: (initialData?.startDate as string) || "",
    endDate: (initialData?.endDate as string) || "",
    location: (initialData?.location as string) || "",
    imageUrl: (initialData?.imageUrl as string) || "",
    imagePathname: (initialData?.imagePathname as string) || "",
    tags: Array.isArray(initialData?.tags)
      ? (initialData.tags as string[]).join(", ")
      : "",
    achievements: Array.isArray(initialData?.achievements)
      ? (initialData.achievements as string[]).join("\n")
      : "",
    type: (initialData?.type as string) || "Full-time",
    current: !(initialData?.endDate),
    published: (initialData?.published as boolean) ?? true,
    featured: (initialData?.featured as boolean) ?? false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const period = generatePeriod(form.startDate, form.endDate, form.current);
      const body = {
        ...(mode === "edit" ? { id: initialData?.id } : {}),
        company: form.company,
        role: form.role,
        slug: form.slug || undefined,
        summary: form.summary,
        startDate: form.startDate,
        endDate: form.current ? "" : form.endDate,
        location: form.location,
        imageUrl: form.imageUrl || null,
        imagePathname: form.imagePathname || null,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        achievements: form.achievements
          .split("\n")
          .map((a) => a.trim())
          .filter(Boolean),
        type: form.type,
        period,
        current: form.current,
        published: form.published,
        featured: form.featured,
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
          Summary
        </label>
        <textarea
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
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
          Employment Type
        </label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
        </select>
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
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="React, Node.js, TypeScript"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Achievements (one per line)
        </label>
        <textarea
          value={form.achievements}
          onChange={(e) => setForm({ ...form, achievements: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Led migration reducing bundle size by 40%&#10;Mentored 3 junior developers&#10;Implemented CI/CD pipeline"
        />
      </div>

      <div className="flex gap-6 flex-wrap">
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
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
            className="w-4 h-4 rounded border-[#1e293b] bg-[#0e0e0e] text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Featured</span>
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
