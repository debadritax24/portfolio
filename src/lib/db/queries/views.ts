import { prisma } from "@/lib/db/prisma";

/**
 * Get view count for a route.
 */
export async function getViewCount(route: string): Promise<number> {
  const record = await prisma.viewCount.findUnique({
    where: { route },
  });
  return record?.count ?? 0;
}

/**
 * Get total view count across all routes.
 */
export async function getTotalViewCount(): Promise<number> {
  const result = await prisma.viewCount.aggregate({
    _sum: { count: true },
  });
  return result._sum.count ?? 0;
}

/**
 * Increment view count for a route. Creates the record if it doesn't exist.
 */
export async function incrementViewCount(route: string): Promise<number> {
  const record = await prisma.viewCount.upsert({
    where: { route },
    update: { count: { increment: 1 } },
    create: { route, count: 1 },
  });
  return record.count;
}
