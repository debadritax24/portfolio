import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getProjectById,
  updateProject,
  deleteProject,
} from "@/lib/db/queries/projects";
import { projectUpdateSchema } from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const project = await getProjectById(id);
    if (!project) return apiError("Project not found", 404);
    return apiSuccess(project);
  } catch (error) {
    console.error("[Admin/Projects/[id]/GET]", error);
    return apiError("Failed to fetch project", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const body = await req.json();
    const parsed = projectUpdateSchema.omit({ id: true }).safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const project = await updateProject(id, parsed.data);
    return apiSuccess(project);
  } catch (error) {
    console.error("[Admin/Projects/[id]/PUT]", error);
    const message =
      error instanceof Error ? error.message : "Failed to update project";
    return apiError(message, 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    await deleteProject(id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Projects/[id]/DELETE]", error);
    return apiError("Failed to delete project", 500);
  }
});
