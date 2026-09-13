import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/db/queries/experiences";
import {
  experienceCreateSchema,
  experienceUpdateSchema,
  deleteSchema,
} from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const experiences = await getExperiences();
    return apiSuccess(experiences);
  } catch (error) {
    console.error("[Admin/Experiences/GET]", error);
    return apiError("Failed to fetch experiences", 500);
  }
});

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = experienceCreateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const { current: _current, ...rest } = parsed.data;
    const slug = rest.slug || slugify(`${rest.company}-${rest.role}`);
    const exp = await createExperience({
      slug,
      company: rest.company,
      role: rest.role,
      type: rest.type ?? "Full-time",
      location: rest.location ?? "",
      period: rest.period ?? "",
      startDate: rest.startDate,
      endDate: rest.endDate ?? "",
      summary: rest.summary ?? "",
      imageUrl: rest.imageUrl ?? null,
      imagePathname: rest.imagePathname ?? null,
      achievements: rest.achievements ?? [],
      tags: rest.tags ?? [],
      published: rest.published ?? true,
      featured: rest.featured ?? false,
    });
    return apiSuccess(exp, 201);
  } catch (error) {
    console.error("[Admin/Experiences/POST]", error);
    return apiError("Failed to create experience", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = experienceUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const { id, current: _current, ...data } = parsed.data;
    if (data.company && data.role && !data.slug) {
      (data as Record<string, unknown>).slug = slugify(
        `${data.company}-${data.role}`
      );
    }
    const exp = await updateExperience(id, data);
    return apiSuccess(exp);
  } catch (error) {
    console.error("[Admin/Experiences/PUT]", error);
    return apiError("Failed to update experience", 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid ID", 400);
    }
    await deleteExperience(parsed.data.id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Experiences/DELETE]", error);
    return apiError("Failed to delete experience", 500);
  }
});
