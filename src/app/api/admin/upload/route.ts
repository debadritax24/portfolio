import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import { uploadImage } from "@/lib/blob";
import { apiSuccess, apiError } from "@/services/api";

export const runtime = "nodejs";

/**
 * POST /api/admin/upload — Upload image to Vercel Blob.
 *
 * Accepts multipart/form-data with a "file" field.
 * Validates file type and size, uploads to Vercel Blob,
 * returns URL and metadata.
 */
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return apiError("No file provided", 400);
    }

    const result = await uploadImage(file, folder);

    return apiSuccess({
      url: result.url,
      pathname: result.pathname,
      contentType: result.contentType,
      size: result.size,
    }, 201);
  } catch (error) {
    console.error("[Admin/Upload]", error);
    return apiError("Upload failed", 500);
  }
});
