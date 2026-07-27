import * as z from "zod/v4";

// ─── Blog ─────────────────────────────────────────────────────────────
export const blogCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  subtitle: z.string().optional().default(""),
  excerpt: z.string().optional().default(""),
  content: z.string().optional().default(""),
  category: z.string().optional().default("Engineering"),
  level: z.string().optional().default("Intermediate"),
  readTime: z.number().int().optional().default(5),
  date: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  whatILearned: z.array(z.string()).optional().default([]),
  improvements: z.array(z.string()).optional().default([]),
  relatedNoteSlugs: z.array(z.string()).optional().default([]),
  relatedProjectSlug: z.string().optional().nullable(),
  relatedSystemDesignSlug: z.string().optional().nullable(),
});

export const blogUpdateSchema = blogCreateSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// ─── Project ──────────────────────────────────────────────────────────
export const projectCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  githubUrl: z.string().optional().default(""),
  liveUrl: z.string().optional().nullable(),
  techStack: z.array(z.string()).optional().default([]),
  category: z.string().optional().nullable(),
  status: z.string().optional().default("Completed"),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  imageUrl: z.string().optional().nullable(),
  imagePathname: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  problemSolved: z.string().optional().default(""),
  keyFeatures: z.array(z.string()).optional().default([]),
  challenges: z.string().optional().default(""),
  outcome: z.string().optional().default(""),
  role: z.string().optional().default(""),
  isComingSoon: z.boolean().optional().default(false),
  screenLabel: z.string().optional().nullable(),
  isPinned: z.boolean().optional().default(false),
  caseStudyFocus: z.string().optional().nullable(),
});

export const projectUpdateSchema = projectCreateSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// ─── Certification ────────────────────────────────────────────────────
export const certificationCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialUrl: z.string().optional().default("#"),
  imageUrl: z.string().optional().nullable(),
  imagePathname: z.string().optional().nullable(),
  description: z.string().min(1, "Description is required"),
  keyTopics: z.array(z.string()).optional().default([]),
  whatILearned: z.string().optional().default(""),
  whyItMatters: z.string().optional().default(""),
  skills: z.array(z.string()).optional().default([]),
  takeaway: z.string().optional().default(""),
  published: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
});

export const certificationUpdateSchema = certificationCreateSchema
  .partial()
  .extend({
    id: z.string().min(1, "ID is required"),
  });

// ─── Experience ───────────────────────────────────────────────────────
export const experienceCreateSchema = z.object({
  slug: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  type: z.string().optional().default("Full-time"),
  location: z.string().min(1, "Location is required"),
  period: z.string().min(1, "Period is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  summary: z.string().min(1, "Summary is required"),
  imageUrl: z.string().optional().nullable(),
  imagePathname: z.string().optional().nullable(),
  achievements: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
});

export const experienceUpdateSchema = experienceCreateSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// ─── Login ────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// ─── Contact / Intro Call ─────────────────────────────────────────────
export const introCallSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(4000),
});

// ─── Newsletter ───────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.email("Invalid email format"),
});

// ─── Delete ───────────────────────────────────────────────────────────
export const deleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
