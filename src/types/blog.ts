/**
 * Shared blog / learning log domain types.
 *
 * Used by ArticleCard, ArticleGrid, and the /blogs page.
 * Aligned with the Prisma Blog model (list view omits content).
 */

/** Blog summary for list/card views. */
export interface BlogListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  date: string;
  level: string;
  readTime: number;
  subtitle: string;
  improvements: string[];
  relatedNoteSlugs: string[];
  relatedProjectSlug: string | null;
  relatedSystemDesignSlug: string | null;
  whatILearned: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Full blog detail (all fields from DB). */
export interface BlogDetail extends BlogListItem {
  content: string;
}
