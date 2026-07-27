import { Hero } from "@/components/hero/Hero";
import HomeSections from "@/components/pages/HomeSections";
import { getExperiences, getProjects, getBlogs, getCertifications } from "@/lib/data";
import { mapExperienceToFlat } from "@/components/experience/utils/experience.utils";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getWebPageJsonLd,
  getCollectionPageJsonLd,
  getFAQJsonLd,
} from "@/lib/structured-data";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = constructMetadata();

const homeFaqs = [
  {
    question: "Who is Debadrita Goswami?",
    answer:
      "Debadrita Goswami is a 2nd Year CS Engineering Student at Kolkata, West Bengal, who builds projects, contributes to open source, and writes about what she learns.",
  },
  {
    question: "What technologies does Debadrita Goswami use?",
    answer:
      "Debadrita Goswami specializes in full stack development using React, Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.",
  },
  {
    question: "What kind of projects has Debadrita Goswami built?",
    answer:
      "Debadrita Goswami has built various full stack projects including web applications, developer tools, and open source contributions.",
  },
];

export default async function Home() {
  const rawExperiences = await getExperiences();
  const experiences = rawExperiences.map((exp, i) => mapExperienceToFlat(exp as any, i));
  const projects = await getProjects();
  const blogs = await getBlogs();
  const certifications = await getCertifications();

  return (
    <main>
      <JsonLd data={getWebPageJsonLd("/", siteConfig.seo.title, siteConfig.seo.description)} />
      <JsonLd
        data={getCollectionPageJsonLd(
          "/",
          `${siteConfig.name} - Developer Portfolio`,
          siteConfig.seo.description
        )}
      />
      <JsonLd data={getFAQJsonLd(homeFaqs)} />

      <Hero />
      <HomeSections
        experiences={experiences}
        projects={projects}
        blogs={blogs}
        certifications={certifications}
      />

      {/* Quote Block */}
      <section
        className="container mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20 max-w-7xl flex flex-col items-center text-center"
        aria-label="Inspirational quote"
      >
        <blockquote className="text-xl md:text-2xl font-medium italic text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
          &ldquo;Do so much work that it would be unreasonable for you to not be successful.&rdquo;
        </blockquote>
        <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          <div className="w-12 h-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
          <cite className="not-italic">{siteConfig.name}</cite>
          <div className="w-12 h-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
