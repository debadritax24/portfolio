import type { MetadataRoute } from "next";
import { getBlogs, getProjects, getCertifications, getExperiences } from "@/lib/data";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.debagoswami.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const blogs = await getBlogs();
  const projects = await getProjects();
  const certifications = await getCertifications();
  const experiences = await getExperiences();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: String(blog.updatedAt ?? blog.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: String(project.updatedAt ?? project.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const certificationRoutes: MetadataRoute.Sitemap = certifications.map(
    (cert) => ({
      url: `${baseUrl}/certifications/${cert.slug}`,
      lastModified: String(cert.updatedAt ?? cert.createdAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })
  );

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map(
    (exp) => ({
      url: `${baseUrl}/experiences/${exp.slug}`,
      lastModified: String(exp.updatedAt ?? exp.createdAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...certificationRoutes,
    ...experienceRoutes,
  ];
}
