import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getProjectBySlug, getProjects } from "@/lib/data";
import PageTopBar from "@/components/ui/PageTopBar";
import RelatedContent from "@/components/RelatedContent";
import { getRelatedProjects } from "@/lib/related";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getProjectJsonLd, getSoftwareSourceCodeJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const canonical = `/projects/${project.slug}`;
  const ogImage = `${siteConfig.url}${siteConfig.og.image}`;

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: [
      project.title,
      ...project.techStack || [],
      "Project",
      "Portfolio",
      siteConfig.name,
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.shortDescription,
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: siteConfig.og.imageWidth,
          height: siteConfig.og.imageHeight,
          alt: `${project.title} - ${siteConfig.name}`,
          type: "image/png",
        },
      ],
      type: "article",
      locale: siteConfig.og.locale,
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: `${project.title} | ${siteConfig.name}`,
      description: project.shortDescription,
      images: [ogImage],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
  };
};

const formatDate = (value: string | Date) => {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
      <JsonLd
        data={getProjectJsonLd({
          title: project.title,
          shortDescription: project.shortDescription,
          slug: project.slug,
          techStack: project.techStack,
          createdAt: String(project.createdAt),
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl ?? undefined,
        })}
      />
      <JsonLd
        data={getSoftwareSourceCodeJsonLd({
          title: project.title,
          shortDescription: project.shortDescription,
          slug: project.slug,
          techStack: project.techStack,
          createdAt: String(project.createdAt),
          githubUrl: project.githubUrl,
        })}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Projects", href: "/projects" },
              { name: project.title, href: `/projects/${project.slug}` },
            ]}
          />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-8" />

          {project.imageUrl && (
            <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#111] mb-8">
              <img
                src={project.imageUrl}
                alt={`${project.title} project screenshot`}
                className="w-full h-full object-contain p-6"
                loading="lazy"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="dark:text-white font-bold text-slate-900 text-2xl sm:text-3xl leading-snug mb-3">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 ">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                Built {formatDate(project.createdAt)}
              </span>
              {String(project.updatedAt) !== String(project.createdAt) && (
                <span className="flex items-center gap-1.5">
                  Updated {formatDate(project.updatedAt)}
                </span>
              )}
            </div>
          </header>

          <section className="mb-8">
            <p className="dark:text-slate-100 text-slate-700 text-base leading-relaxed">
              {project.shortDescription}
            </p>
          </section>

          {project.fullDescription && (
            <section className="mb-8 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#0E0D09] p-6">
              <h2 className="dark:text-white font-semibold text-slate-900 text-base mb-4">
                About this project
              </h2>
              <p className="dark:text-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </section>
          )}

          {project.techStack?.length > 0 && (
            <section className="mb-8">
              <h2 className="dark:text-white font-semibold text-slate-900 text-base mb-4">
                Tech stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-white rounded-full font-medium border border-slate-200 dark:border-[#444]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium px-4 py-2 rounded-lg text-sm hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <SiGithub className="w-4 h-4" aria-hidden="true" />
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-[#1C1C1C] text-slate-900 dark:text-white font-medium px-4 py-2 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                View Live
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-300 font-medium px-4 py-2 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
            >
              All Projects
            </Link>
          </div>

          <RelatedContent
            eyebrow="More work"
            heading="Related projects"
            items={await getRelatedProjects(
              project.slug,
              project.techStack ?? [],
              3
            )}
            hubHref="/projects"
            hubLabel="Browse all projects"
          />
        </div>
      </div>
    </main>
  );
}
