import { getBlogs, getProjects } from "@/lib/data";

const overlapCount = (a: readonly string[], b: readonly string[]) => {
  if (!a.length || !b.length) return 0;
  const set = new Set(a.map((s) => s.toLowerCase()));
  let count = 0;
  for (const item of b) if (set.has(item.toLowerCase())) count += 1;
  return count;
};

const byOverlapThenRecency =
  <T extends Record<string, unknown>>(
    score: (item: T) => number
  ) =>
  (a: T, b: T) => {
    const diff = score(b) - score(a);
    if (diff !== 0) return diff;
    const aDate = String((a as { updatedAt?: string | Date; createdAt?: string | Date }).updatedAt ?? (a as { updatedAt?: string | Date; createdAt?: string | Date }).createdAt ?? "");
    const bDate = String((b as { updatedAt?: string | Date; createdAt?: string | Date }).updatedAt ?? (b as { updatedAt?: string | Date; createdAt?: string | Date }).createdAt ?? "");
    return bDate.localeCompare(aDate);
  };

export type RelatedItem = {
  href: string;
  title: string;
  description: string;
  tags: string[];
};

export async function getRelatedBlogs(
  currentSlug: string,
  currentTags: readonly string[] = [],
  limit = 3
): Promise<RelatedItem[]> {
  const blogs = await getBlogs();
  const others = blogs.filter((b: { slug: string }) => b.slug !== currentSlug);
  const score = (b: { tags?: string[] }) =>
    overlapCount(currentTags, b.tags ?? []);
  return others
    .slice()
    .sort(byOverlapThenRecency(score))
    .slice(0, limit)
    .map((b) => ({
      href: `/blogs/${b.slug}`,
      title: b.title,
      description: b.excerpt ?? "",
      tags: b.tags ?? [],
    }));
}

export async function getRelatedProjects(
  currentSlug: string,
  currentTags: readonly string[] = [],
  limit = 3
): Promise<RelatedItem[]> {
  const projects = await getProjects();
  const others = projects.filter(
    (p: { slug: string }) => p.slug !== currentSlug
  );
  const score = (p: { techStack?: string[] }) =>
    overlapCount(currentTags, p.techStack ?? []);
  return others
    .slice()
    .sort(byOverlapThenRecency(score))
    .slice(0, limit)
    .map((p) => ({
      href: `/projects/${p.slug}`,
      title: p.title,
      description: p.shortDescription,
      tags: p.techStack ?? [],
    }));
}
