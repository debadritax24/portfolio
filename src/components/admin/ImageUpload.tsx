"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { UploadCloud, X, Loader2, FileText, ExternalLink } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string, pathname?: string) => void;
  folder?: string;
  accept?: string;
};

const ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "avif",
  "bmp",
  "tiff",
  "tif",
  "heic",
  "heif",
  "pdf",
];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export default function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  accept = "image/*,.pdf,application/pdf",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPdf =
    Boolean(value) &&
    (value.toLowerCase().endsWith(".pdf") ||
      value.toLowerCase().includes(".pdf"));

  const validateAndUpload = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const isImage = file.type.startsWith("image/");
    const isPdfFile = file.type === "application/pdf" || ext === "pdf";
    const isAllowedExt = ALLOWED_EXTENSIONS.includes(ext);

    if (!isImage && !isPdfFile && !isAllowedExt) {
      toast.error(
        "Please select a valid image (PNG, JPG, WEBP, AVIF, SVG) or PDF file"
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File size must be less than 25MB (selected: ${(file.size / 1024 / 1024).toFixed(1)}MB)`
      );
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
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `Upload failed (${res.status})`);
      }

      const { data } = await res.json();
      onChange(data.url, data.pathname);
      toast.success(
        isPdfFile ? "Document uploaded successfully" : "Image uploaded successfully"
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload file";
      console.error("Upload error:", message);
      toast.error(message);
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (uploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleRemove = () => {
    onChange("", "");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-[#1e293b] bg-[#0e0e0e] group p-4 flex flex-col items-center justify-center min-h-[12rem]">
          {isPdf ? (
            <div className="flex flex-col items-center text-center p-4">
              <FileText className="w-12 h-12 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-slate-200 mb-1">
                PDF Certificate / Document Uploaded
              </p>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 mt-1"
              >
                <span>Preview PDF in new tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={value}
              alt="Uploaded file"
              className="w-full h-48 object-contain"
            />
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            {isPdf && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View PDF
              </a>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors relative ${
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-[#1e293b] bg-[#0e0e0e] hover:bg-[#111318]"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                <p className="text-sm text-slate-400">Uploading...</p>
              </>
            ) : (
              <>
                <UploadCloud
                  className={`w-8 h-8 mb-3 transition-colors ${
                    isDragging ? "text-blue-400" : "text-slate-400"
                  }`}
                />
                <p className="mb-2 text-sm text-slate-300">
                  <span className="font-semibold text-blue-400">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-slate-500">
                  PNG, JPG, WEBP, AVIF, SVG, PDF (Max 25MB)
                </p>
              </>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
