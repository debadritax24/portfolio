import { put, del } from "@vercel/blob";

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "image/bmp",
  "image/tiff",
  "image/heic",
  "image/heif",
  "application/pdf",
] as const;

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export type UploadResult = {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
};

/**
 * Infer MIME type from file or extension if missing/generic.
 */
export function detectMimeType(file: File): string {
  if (file.type && file.type !== "application/octet-stream") {
    return file.type.toLowerCase();
  }
  const ext = file.name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "avif":
      return "image/avif";
    case "bmp":
      return "image/bmp";
    case "tif":
    case "tiff":
      return "image/tiff";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "pdf":
      return "application/pdf";
    default:
      return file.type || "application/octet-stream";
  }
}

/**
 * Validate and upload a file to Vercel Blob.
 */
export async function uploadImage(
  file: File,
  folder: string = "uploads"
): Promise<UploadResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("Vercel Blob token is missing. Upload failed.");
  }

  const mimeType = detectMimeType(file);

  // Validate file type
  const isAllowed = ALLOWED_MIME_TYPES.includes(
    mimeType as (typeof ALLOWED_MIME_TYPES)[number]
  );
  if (!isAllowed) {
    throw new Error(
      `Invalid file type: ${mimeType || "unknown"}. Allowed: JPG, PNG, WEBP, GIF, SVG, AVIF, HEIC, PDF`
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: 25MB`
    );
  }

  // Sanitize filename
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  const pathname = `${folder}/${Date.now()}-${safeName}`;

  // Upload to Vercel Blob with explicit token
  const blob = await put(pathname, file, {
    access: "public",
    contentType: mimeType,
    token,
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: mimeType,
    size: file.size,
  };
}

/**
 * Delete an image/file from Vercel Blob.
 * Safely ignores "not found" errors (blob already deleted).
 */
export async function deleteImage(url: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!url || !token) return;

  try {
    await del(url, { token });
  } catch (error: unknown) {
    // Safely ignore "not found" — the blob was already deleted
    const message =
      error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("not_found") || message.includes("not found")) {
      return;
    }
    // Log unexpected failures for debugging
    console.error("[Blob] Unexpected error deleting file:", error);
  }
}
