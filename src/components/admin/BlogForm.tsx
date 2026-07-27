"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type BlogFormData = {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  level: string;
  readTime: number;
  date: string;
  tags: string;
  whatILearned: string;
  improvements: string;
  relatedNoteSlugs: string;
  relatedProjectSlug: string;
  relatedSystemDesignSlug: string;
  published: boolean;
  featured: boolean;
};

type BlogFormProps = {
  initialData?: Record<string, unknown>;
  mode: "create" | "edit";
};

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<BlogFormData>({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    subtitle: (initialData?.subtitle as string) || "",
    excerpt: (initialData?.excerpt as string) || "",
    content: (initialData?.content as string) || "",
    category: (initialData?.category as string) || "Engineering",
    level: (initialData?.level as string) || "Intermediate",
    readTime: (initialData?.readTime as number) || 5,
    date: (initialData?.date as string) || "",
    tags: Array.isArray(initialData?.tags)
      ? (initialData.tags as string[]).join(", ")
      : "",
    whatILearned: Array.isArray(initialData?.whatILearned)
      ? (initialData.whatILearned as string[]).join(", ")
      : "",
    improvements: Array.isArray(initialData?.improvements)
      ? (initialData.improvements as string[]).join(", ")
      : "",
    relatedNoteSlugs: Array.isArray(initialData?.relatedNoteSlugs)
      ? (initialData.relatedNoteSlugs as string[]).join(", ")
      : "",
    relatedProjectSlug: (initialData?.relatedProjectSlug as string) || "",
    relatedSystemDesignSlug: (initialData?.relatedSystemDesignSlug as string) || "",
    published: (initialData?.published as boolean) ?? true,
    featured: (initialData?.featured as boolean) ?? false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...(mode === "edit" ? { id: initialData?.id } : {}),
        title: form.title,
        slug: form.slug || undefined,
        subtitle: form.subtitle,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        level: form.level,
        readTime: Number(form.readTime),
        date: form.date,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        whatILearned: form.whatILearned
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        improvements: form.improvements
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        relatedNoteSlugs: form.relatedNoteSlugs
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        relatedProjectSlug: form.relatedProjectSlug || null,
        relatedSystemDesignSlug: form.relatedSystemDesignSlug || null,
        published: form.published,
        featured: form.featured,
      };

      const res = await fetch("/api/admin/blogs", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(mode === "create" ? "Blog created!" : "Blog updated!");
        router.push("/admin/blogs");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
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

        <div className="col-span-full">
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
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
            Date
          </label>
          <input
            type="text"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. November 10, 2024"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Excerpt
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Content (Markdown supported)
        </label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
          rows={12}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Category
          </label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Level
          </label>
          <input
            type="text"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Read Time (mins)
          </label>
          <input
            type="number"
            value={form.readTime}
            onChange={(e) => setForm({ ...form, readTime: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="Next.js, TypeScript, React"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          What I Learned (comma separated)
        </label>
        <input
          type="text"
          value={form.whatILearned}
          onChange={(e) => setForm({ ...form, whatILearned: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Improvements (comma separated)
        </label>
        <input
          type="text"
          value={form.improvements}
          onChange={(e) => setForm({ ...form, improvements: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Related Note Slugs (CSV)
          </label>
          <input
            type="text"
            value={form.relatedNoteSlugs}
            onChange={(e) => setForm({ ...form, relatedNoteSlugs: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Related Project Slug
          </label>
          <input
            type="text"
            value={form.relatedProjectSlug}
            onChange={(e) => setForm({ ...form, relatedProjectSlug: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Related System Design Slug
          </label>
          <input
            type="text"
            value={form.relatedSystemDesignSlug}
            onChange={(e) => setForm({ ...form, relatedSystemDesignSlug: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 rounded border-[#1e293b] bg-[#0e0e0e] text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Published</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
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
          {loading ? "Saving..." : mode === "create" ? "Create Blog" : "Save Changes"}
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
