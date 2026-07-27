import { NextRequest } from "next/server";
import { withAuth } from "@/lib/auth/middleware";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/db/queries/blogs";
import {
  blogCreateSchema,
  blogUpdateSchema,
  deleteSchema,
} from "@/lib/validation/schemas";
import { apiSuccess, apiError } from "@/services/api";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const blogs = await getBlogs();
    return apiSuccess(blogs);
  } catch (error) {
    console.error("[Admin/Blogs/GET]", error);
    return apiError("Failed to fetch blogs", 500);
  }
});

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = blogCreateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }
    const data = parsed.data;
    const slug = data.slug || slugify(data.title);
    const blog = await createBlog({
      title: data.title,
      slug,
      subtitle: data.subtitle ?? "",
      excerpt: data.excerpt ?? "",
      content: data.content ?? "",
      category: data.category ?? "Engineering",
      level: data.level ?? "Intermediate",
      readTime: data.readTime ?? 5,
      date: data.date ?? "",
      tags: data.tags ?? [],
      published: data.published ?? true,
      featured: data.featured ?? false,
      whatILearned: data.whatILearned ?? [],
      improvements: data.improvements ?? [],
      relatedNoteSlugs: data.relatedNoteSlugs ?? [],
      relatedProjectSlug: data.relatedProjectSlug ?? null,
      relatedSystemDesignSlug: data.relatedSystemDesignSlug ?? null,
    });
    return apiSuccess(blog, 201);
  } catch (error) {
    console.error("[Admin/Blogs/POST]", error);
    return apiError("Failed to create blog", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = blogUpdateSchema.safeParse(body);
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
    const blog = await updateBlog(id, data);
    return apiSuccess(blog);
  } catch (error) {
    console.error("[Admin/Blogs/PUT]", error);
    return apiError("Failed to update blog", 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid ID", 400);
    }
    await deleteBlog(parsed.data.id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    console.error("[Admin/Blogs/DELETE]", error);
    return apiError("Failed to delete blog", 500);
  }
});
