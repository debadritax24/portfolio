import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperiences, getExperienceBySlug } from "@/lib/data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getWebPageJsonLd } from "@/lib/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
      description: "The requested experience could not be found.",
    };
  }

  const canonical = `/experiences/${experience.slug}`;
  const description = `${experience.role} at ${experience.company}. ${experience.summary}`;

  return {
    title: `${experience.role} at ${experience.company}`,
    description,
    keywords: [
      experience.role,
      experience.company,
      ...experience.tags,
      "Experience",
      siteConfig.name,
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      title: `${experience.role} at ${experience.company} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.og.locale,
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: `${experience.role} at ${experience.company} | ${siteConfig.name}`,
      description,
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
  };
};

export default async function ExperienceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const description = `${experience.role} at ${experience.company}. ${experience.summary}`;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
      <JsonLd
        data={getWebPageJsonLd(
          `/experiences/${experience.slug}`,
          `${experience.role} at ${experience.company} | ${siteConfig.name}`,
          description
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Experience", url: "/experiences" },
          { name: `${experience.role} at ${experience.company}`, url: `/experiences/${experience.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="max-w-2xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Experience", href: "/experiences" },
              { name: `${experience.role} at ${experience.company}`, href: `/experiences/${experience.slug}` },
            ]}
            className="mb-6"
          />

          <header className="mb-6">
            <h1 className="dark:text-white font-bold sm:text-3xl text-2xl text-slate-900">
              {experience.role} at {experience.company}
            </h1>
            <p className="dark:text-slate-400 mt-2 text-slate-500 text-sm">
              {experience.location && `${experience.location} \u2022 `}
              {experience.startDate} - {experience.endDate || "Present"}
            </p>
            {experience.endDate === "" && (
              <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-green-900/20 text-green-400 rounded border border-green-800">
                Current Position
              </span>
            )}
          </header>

          {experience.summary && (
            <p className="dark:text-slate-200 mb-6 text-base text-slate-700">
              {experience.summary}
            </p>
          )}

          {experience.achievements?.length > 0 && (
            <section className="mb-6">
              <h2 className="dark:text-white font-semibold text-slate-900 text-base mb-3">
                Key Achievements
              </h2>
              <ul className="space-y-2" role="list">
                {experience.achievements.map((achievement: string, index: number) => (
                  <li
                    key={index}
                    className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" aria-hidden="true" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {experience.tags?.length > 0 && (
            <div>
              <h2 className="dark:text-white font-semibold mb-2 text-lg text-slate-900">
                Skills & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-transparent border border-slate-300 dark:border-[#3A3A3A] dark:text-[#D4D4D4] font-normal leading-4 px-2.5 py-0.5 rounded text-[#424242] text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
