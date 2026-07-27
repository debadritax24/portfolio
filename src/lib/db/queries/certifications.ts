import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export async function getCertifications(publishedOnly = false) {
  return prisma.certification.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
    omit: {
      whatILearned: true,
      whyItMatters: true,
      takeaway: true,
    }
  });
}

export async function getCertificationBySlug(slug: string) {
  return prisma.certification.findUnique({
    where: { slug },
  });
}

export async function getCertificationById(id: string) {
  return prisma.certification.findUnique({
    where: { id },
  });
}

export async function createCertification(
  data: Prisma.CertificationCreateInput
) {
  return prisma.certification.create({ data });
}

export async function updateCertification(
  id: string,
  data: Prisma.CertificationUpdateInput
) {
  return prisma.certification.update({
    where: { id },
    data,
  });
}

export async function deleteCertification(id: string) {
  return prisma.certification.delete({
    where: { id },
  });
}
