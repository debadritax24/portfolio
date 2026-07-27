/**
 * Shared certification domain types.
 *
 * Used by CertificateGrid and the /certifications page.
 * Aligned with the Prisma Certification model (list view omits detail fields).
 */

/** Certification summary for list/card views. */
export interface CertificationListItem {
  id: string;
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  imageUrl: string | null;
  imagePathname: string | null;
  description: string;
  keyTopics: string[];
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  published: boolean;
}

/** Full certification detail (all fields from DB). */
export interface CertificationDetail extends CertificationListItem {
  whatILearned: string;
  whyItMatters: string;
  takeaway: string;
}
