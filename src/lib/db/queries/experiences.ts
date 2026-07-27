import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export async function getExperiences(publishedOnly = false) {
  return prisma.experience.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getExperienceBySlug(slug: string) {
  return prisma.experience.findUnique({
    where: { slug },
  });
}

export async function getExperienceById(id: string) {
  return prisma.experience.findUnique({
    where: { id },
  });
}

export async function createExperience(data: Prisma.ExperienceCreateInput) {
  return prisma.experience.create({ data });
}

export async function updateExperience(
  id: string,
  data: Prisma.ExperienceUpdateInput
) {
  return prisma.experience.update({
    where: { id },
    data,
  });
}

export async function deleteExperience(id: string) {
  return prisma.experience.delete({
    where: { id },
  });
}
