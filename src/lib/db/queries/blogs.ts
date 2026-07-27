import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export async function getBlogs(publishedOnly = false) {
  return prisma.blog.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
    omit: {
      content: true,
    }
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: { slug },
  });
}

export async function getBlogById(id: string) {
  return prisma.blog.findUnique({
    where: { id },
  });
}

export async function createBlog(data: Prisma.BlogCreateInput) {
  return prisma.blog.create({ data });
}

export async function updateBlog(id: string, data: Prisma.BlogUpdateInput) {
  return prisma.blog.update({
    where: { id },
    data,
  });
}

export async function deleteBlog(id: string) {
  return prisma.blog.delete({
    where: { id },
  });
}
