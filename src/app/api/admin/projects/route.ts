import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/db/queries/projects";
import {
  projectCreateSchema,
  projectUpdateSchema,
  deleteSchema,
} from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const projects = await getProjects();
    return apiSuccess(projects);
  } catch (error) {
    console.error("[Admin/Projects/GET]", error);
    return apiError("Failed to fetch projects", 500);
  }
});

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = projectCreateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const data = parsed.data;
    const slug = data.slug || slugify(data.title);
    const project = await createProject({
      title: data.title,
      slug,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      githubUrl: data.githubUrl ?? "",
      liveUrl: data.liveUrl ?? null,
      techStack: data.techStack ?? [],
      category: data.category ?? null,
      status: data.status ?? "Completed",
      featured: data.featured ?? false,
      published: data.published ?? true,
      imageUrl: data.imageUrl ?? null,
      imagePathname: data.imagePathname ?? null,
      content: data.content ?? null,
      problemSolved: data.problemSolved ?? "",
      keyFeatures: data.keyFeatures ?? [],
      challenges: data.challenges ?? "",
      outcome: data.outcome ?? "",
      role: data.role ?? "",
      isComingSoon: data.isComingSoon ?? false,
      screenLabel: data.screenLabel ?? null,
      isPinned: data.isPinned ?? false,
      caseStudyFocus: data.caseStudyFocus ?? null,
    });
    return apiSuccess(project, 201);
  } catch (error) {
    console.error("[Admin/Projects/POST]", error);
    return apiError("Failed to create project", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = projectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const { id, ...data } = parsed.data;
    if (data.title && !data.slug) {
      (data as Record<string, unknown>).slug = slugify(data.title);
    }
    const project = await updateProject(id, data);
    return apiSuccess(project);
  } catch (error) {
    console.error("[Admin/Projects/PUT]", error);
    return apiError("Failed to update project", 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid ID", 400);
    }
    await deleteProject(parsed.data.id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Projects/DELETE]", error);
    return apiError("Failed to delete project", 500);
  }
});
