/**
 * Shared project domain types.
 *
 * Used by ProjectCard, ProjectGrid, and the /projects page.
 * Aligned with the Prisma Project model (list view omits heavy fields).
 */

/** Project summary for list/card views (omits full content fields). */
export interface ProjectListItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  imageUrl: string | null;
  imagePathname: string | null;
  githubUrl: string;
  liveUrl: string | null;
  techStack: string[];
  category: string | null;
  status: string;
  featured: boolean;
  isComingSoon: boolean;
  screenLabel: string | null;
  isPinned: boolean;
  caseStudyFocus: string | null;
  keyFeatures: string[];
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

/** Full project detail (all fields from DB). */
export interface ProjectDetail extends ProjectListItem {
  fullDescription: string;
  content: string | null;
  problemSolved: string;
  challenges: string;
  outcome: string;
  role: string;
}
