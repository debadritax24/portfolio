"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type ProjectFormData = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string;
  featured: boolean;
  published: boolean;
  imageUrl: string;
  imagePathname: string;
};

type ProjectFormProps = {
  initialData?: Record<string, unknown>;
  mode: "create" | "edit";
};

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProjectFormData>({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    shortDescription: (initialData?.shortDescription as string) || "",
    fullDescription: (initialData?.fullDescription as string) || "",
    githubUrl: (initialData?.githubUrl as string) || "",
    liveUrl: (initialData?.liveUrl as string) || "",
    techStack: Array.isArray(initialData?.techStack)
      ? (initialData.techStack as string[]).join(", ")
      : "",
    featured: (initialData?.featured as boolean) ?? false,
    published: (initialData?.published as boolean) ?? true,
    imageUrl: (initialData?.imageUrl as string) || "",
    imagePathname: (initialData?.imagePathname as string) || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...(mode === "edit" ? { id: initialData?.id } : {}),
        title: form.title,
        slug: form.slug || undefined,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription || " ",
        githubUrl: form.githubUrl || undefined,
        liveUrl: form.liveUrl || null,
        techStack: form.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured: form.featured,
        published: form.published,
        imageUrl: form.imageUrl || null,
        imagePathname: form.imagePathname || null,
      };

      const res = await fetch("/api/admin/projects", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(
          mode === "create" ? "Project created!" : "Project updated!"
        );
        router.push("/admin/projects");
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
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          required
        />
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
          Project Image
        </label>
        <ImageUpload
          value={form.imageUrl}
          onChange={(url, pathname) =>
            setForm({ ...form, imageUrl: url, imagePathname: pathname || "" })
          }
          folder="projects"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Short Description *
        </label>
        <textarea
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Long Description
        </label>
        <textarea
          value={form.fullDescription}
          onChange={(e) =>
            setForm({ ...form, fullDescription: e.target.value })
          }
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          rows={6}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Live URL
          </label>
          <input
            type="url"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
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
          placeholder="Next.js, TypeScript, Tailwind CSS"
        />
      </div>

      <div className="flex gap-6">
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
              ? "Create Project"
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
