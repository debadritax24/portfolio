import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export async function getProjects(publishedOnly = false) {
  return prisma.project.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
    omit: {
      fullDescription: true,
      content: true,
      problemSolved: true,
      challenges: true,
      outcome: true,
      role: true,
    }
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({ data });
}

export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
) {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}

export async function getFeaturedProjects(limit = 3) {
  return prisma.project.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    omit: {
      fullDescription: true,
      content: true,
      problemSolved: true,
      challenges: true,
      outcome: true,
      role: true,
    }
  });
}
