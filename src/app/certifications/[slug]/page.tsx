import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Award, Calendar } from "lucide-react";
import { getCertifications, getCertificationBySlug } from "@/lib/data";
import PageTopBar from "@/components/ui/PageTopBar";
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
  const certification = await getCertificationBySlug(slug);

  if (!certification) {
    return {
      title: "Certification Not Found",
      description: "The requested certification could not be found.",
    };
  }

  const canonical = `/certifications/${certification.slug}`;
  const description = `${certification.title} certified by ${certification.issuer}. ${certification.description}`;

  return {
    title: certification.title,
    description,
    keywords: [
      certification.title,
      certification.issuer,
      ...certification.skills,
      "Certification",
      siteConfig.name,
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      title: `${certification.title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.og.image}`,
          width: siteConfig.og.imageWidth,
          height: siteConfig.og.imageHeight,
          alt: `${certification.title} - ${siteConfig.name}`,
          type: "image/png",
        },
      ],
      type: "article",
      locale: siteConfig.og.locale,
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: certification.title,
      description,
      images: [`${siteConfig.url}${siteConfig.og.image}`],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
  };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default async function CertificationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certification = await getCertificationBySlug(slug);

  if (!certification) {
    notFound();
  }

  const hasCredential = certification.credentialUrl?.startsWith("http");
  const description = `${certification.title} certified by ${certification.issuer}. ${certification.description}`;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
      <JsonLd
        data={getWebPageJsonLd(
          `/certifications/${certification.slug}`,
          `${certification.title} | ${siteConfig.name}`,
          description
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Certifications", url: "/certifications" },
          { name: certification.title, url: `/certifications/${certification.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Certifications", href: "/certifications" },
              { name: certification.title, href: `/certifications/${certification.slug}` },
            ]}
            className="mb-6"
          />
          <PageTopBar title="Certifications" titleAs="h2" />
          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-8" />

          {certification.imageUrl && (
            <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#111] mb-8">
              <img
                src={certification.imageUrl}
                alt={`${certification.title} certification image`}
                className="w-full h-full object-contain p-6"
                loading="lazy"
              />
            </div>
          )}

          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Certification
            </p>
            <h1 className="dark:text-white font-bold text-slate-900 text-2xl sm:text-3xl leading-snug mb-4">
              {certification.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 ">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                {certification.issuer}
              </span>
              {certification.issueDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {formatDate(certification.issueDate)}
                </span>
              )}
            </div>
          </header>

          {certification.description && (
            <section className="mb-8">
              <p className="dark:text-slate-300 text-slate-700 text-base leading-relaxed">
                {certification.description}
              </p>
            </section>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {hasCredential ? (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium px-4 py-2 rounded-lg text-sm hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
                aria-label={`View ${certification.title} credential`}
              >
                View Credential
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : null}
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 bg-white dark:bg-[#1C1C1C] text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
            >
              All Certifications
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
