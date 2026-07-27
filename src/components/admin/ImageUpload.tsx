"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { UploadCloud, X, Loader2 } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string, pathname?: string) => void;
  folder?: string;
};

export default function ImageUpload({
  value,
  onChange,
  folder = "uploads",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const { data } = await res.json();
      onChange(data.url, data.pathname);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("", "");
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-[#1e293b] bg-[#0e0e0e] group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-48 object-contain"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#1e293b] border-dashed rounded-lg cursor-pointer bg-[#0e0e0e] hover:bg-[#111318] transition-colors relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                <p className="text-sm text-slate-400">Uploading...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-slate-400 mb-3" />
                <p className="mb-2 text-sm text-slate-300">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-slate-500">
                  PNG, JPG, WEBP, AVIF (Max 5MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
