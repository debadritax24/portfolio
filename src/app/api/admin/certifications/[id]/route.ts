import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getCertificationById,
  updateCertification,
  deleteCertification,
} from "@/lib/db/queries/certifications";
import { certificationUpdateSchema } from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const cert = await getCertificationById(id);
    if (!cert) return apiError("Certification not found", 404);
    return apiSuccess(cert);
  } catch (error) {
    console.error("[Admin/Certifications/[id]/GET]", error);
    return apiError("Failed to fetch certification", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const body = await req.json();
    const parsed = certificationUpdateSchema.omit({ id: true }).safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const cert = await updateCertification(id, parsed.data);
    return apiSuccess(cert);
  } catch (error) {
    console.error("[Admin/Certifications/[id]/PUT]", error);
    const message =
      error instanceof Error ? error.message : "Failed to update certification";
    return apiError(message, 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    await deleteCertification(id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Certifications/[id]/DELETE]", error);
    return apiError("Failed to delete certification", 500);
  }
});
