import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import { getBlogById, updateBlog, deleteBlog } from "@/lib/db/queries/blogs";
import { blogUpdateSchema } from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const blog = await getBlogById(id);
    if (!blog) return apiError("Blog not found", 404);
    return apiSuccess(blog);
  } catch (error) {
    console.error("[Admin/Blogs/[id]/GET]", error);
    return apiError("Failed to fetch blog", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    const body = await req.json();
    const parsed = blogUpdateSchema.omit({ id: true }).safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const blog = await updateBlog(id, parsed.data);
    return apiSuccess(blog);
  } catch (error) {
    console.error("[Admin/Blogs/[id]/PUT]", error);
    const message =
      error instanceof Error ? error.message : "Failed to update blog";
    return apiError(message, 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()!;
    await deleteBlog(id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Blogs/[id]/DELETE]", error);
    return apiError("Failed to delete blog", 500);
  }
});
