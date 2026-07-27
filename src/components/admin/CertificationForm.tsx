"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type CertFormData = {
  title: string;
  slug: string;
  issuer: string;
  description: string;
  imageUrl: string;
  imagePathname: string;
  credentialUrl: string;
  issueDate: string;
  featured: boolean;
  published: boolean;
};

type CertificationFormProps = {
  initialData?: Record<string, unknown>;
  mode: "create" | "edit";
};

export default function CertificationForm({
  initialData,
  mode,
}: CertificationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CertFormData>({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    issuer: (initialData?.issuer as string) || "",
    description: (initialData?.description as string) || "",
    imageUrl: (initialData?.imageUrl as string) || "",
    imagePathname: (initialData?.imagePathname as string) || "",
    credentialUrl: (initialData?.credentialUrl as string) || "",
    issueDate: (initialData?.issueDate as string) || "",
    featured: (initialData?.featured as boolean) ?? false,
    published: (initialData?.published as boolean) ?? true,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...(mode === "edit" ? { id: initialData?.id } : {}),
        title: form.title,
        slug: form.slug || undefined,
        issuer: form.issuer,
        description: form.description,
        imageUrl: form.imageUrl || null,
        imagePathname: form.imagePathname || null,
        credentialUrl: form.credentialUrl || undefined,
        issueDate: form.issueDate,
        featured: form.featured,
        published: form.published,
      };

      const res = await fetch("/api/admin/certifications", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(
          mode === "create"
            ? "Certification created!"
            : "Certification updated!"
        );
        router.push("/admin/certifications");
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
          Issuer *
        </label>
        <input
          type="text"
          value={form.issuer}
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          required
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

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Certificate Image
        </label>
        <ImageUpload
          value={form.imageUrl}
          folder="certifications"
          onChange={(url, pathname) =>
            setForm({ ...form, imageUrl: url, imagePathname: pathname || "" })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Credential URL
          </label>
          <input
            type="url"
            value={form.credentialUrl}
            onChange={(e) =>
              setForm({ ...form, credentialUrl: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Issued Date
          </label>
          <input
            type="text"
            value={form.issueDate}
            onChange={(e) =>
              setForm({ ...form, issueDate: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-[#1e293b] text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="2025"
          />
        </div>
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
              ? "Create Certification"
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
