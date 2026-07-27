import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/db/prisma";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type UploadResult = {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
};

/**
 * Validate and upload a file to Vercel Blob, then save metadata in Neon.
 */
export async function uploadImage(
  file: File,
  folder: string = "uploads"
): Promise<UploadResult> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob token is missing. Upload failed.");
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: 5MB`
    );
  }

  // Sanitize filename
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  const pathname = `${folder}/${Date.now()}-${safeName}`;

  // Upload to Vercel Blob
  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type,
  });

  // Image metadata is stored directly in Project/Certification/Experience records,
  // we do not use a separate ImageAsset table anymore.

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: file.type,
    size: file.size,
  };
}

/**
 * Delete an image from Vercel Blob.
 * Safely ignores "not found" errors (blob already deleted).
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error: unknown) {
    // Safely ignore "not found" — the blob was already deleted
    const message =
      error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("not_found") || message.includes("not found")) {
      return;
    }
    // Log unexpected failures for debugging
    console.error("[Blob] Unexpected error deleting image:", error);
  }
}
