import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getCertifications,
  getCertificationById,
  getCertificationBySlug,
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/db/queries/certifications";
import {
  certificationCreateSchema,
  certificationUpdateSchema,
  deleteSchema,
} from "@/lib/validation/schemas";
import { deleteImage } from "@/lib/blob";
import { apiSuccess, apiError } from "@/services/api";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const certifications = await getCertifications();
    return apiSuccess(certifications);
  } catch (error) {
    console.error("[Admin/Certifications/GET]", error);
    return apiError("Failed to fetch certifications", 500);
  }
});

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = certificationCreateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const data = parsed.data;
    let slug = data.slug || slugify(data.title);
    if (!slug) {
      slug = `cert-${Date.now()}`;
    }

    // Auto-disambiguate slug if already taken
    const existing = await getCertificationBySlug(slug);
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const cert = await createCertification({
      title: data.title,
      slug,
      issuer: data.issuer,
      issueDate: data.issueDate ?? "",
      credentialUrl: data.credentialUrl ?? "#",
      imageUrl: data.imageUrl ?? null,
      imagePathname: data.imagePathname ?? null,
      description: data.description ?? "",
      keyTopics: data.keyTopics ?? [],
      whatILearned: data.whatILearned ?? "",
      whyItMatters: data.whyItMatters ?? "",
      skills: data.skills ?? [],
      takeaway: data.takeaway ?? "",
      featured: data.featured ?? false,
      published: data.published ?? true,
    });
    return apiSuccess(cert, 201);
  } catch (error) {
    console.error("[Admin/Certifications/POST]", error);
    const message =
      error instanceof Error ? error.message : "Failed to create certification";
    return apiError(message, 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = certificationUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const { id, ...data } = parsed.data;
    if (data.title && !data.slug) {
      let slug = slugify(data.title);
      const existing = await getCertificationBySlug(slug);
      if (existing && existing.id !== id) {
        slug = `${slug}-${Date.now().toString(36)}`;
      }
      (data as Record<string, unknown>).slug = slug;
    }
    const cert = await updateCertification(id, data);
    return apiSuccess(cert);
  } catch (error) {
    console.error("[Admin/Certifications/PUT]", error);
    const message =
      error instanceof Error ? error.message : "Failed to update certification";
    return apiError(message, 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid ID", 400);
    }
    const cert = await getCertificationById(parsed.data.id);
    if (cert?.imageUrl) {
      await deleteImage(cert.imageUrl);
    }
    await deleteCertification(parsed.data.id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Certifications/DELETE]", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete certification";
    return apiError(message, 500);
  }
});
