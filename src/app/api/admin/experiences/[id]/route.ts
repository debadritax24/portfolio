import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "@/lib/db/queries/experiences";
import { experienceUpdateSchema } from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const exp = await getExperienceById(id);
    if (!exp) return apiError("Experience not found", 404);
    return apiSuccess(exp);
  } catch (error) {
    console.error("[Admin/Experiences/[id]/GET]", error);
    return apiError("Failed to fetch experience", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const body = await req.json();
    const parsed = experienceUpdateSchema.omit({ id: true }).safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const exp = await updateExperience(id, parsed.data);
    return apiSuccess(exp);
  } catch (error) {
    console.error("[Admin/Experiences/[id]/PUT]", error);
    const message =
      error instanceof Error ? error.message : "Failed to update experience";
    return apiError(message, 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    await deleteExperience(id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Experiences/[id]/DELETE]", error);
    return apiError("Failed to delete experience", 500);
  }
});
