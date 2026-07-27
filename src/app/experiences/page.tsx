import ExperiencesPage from "@/components/pages/Experiences";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getCollectionPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Debadrita Goswami across full stack, DevOps, and cloud roles. Software engineering internships and projects.",
  keywords: [
    "Debadrita Goswami Experience",
    "Software Engineer Experience",
    "Full Stack Developer Experience",
    "DevOps Experience",
    "Cloud Engineering Experience",
    "Student Developer Experience",
    "Web Developer Experience India",
  ],
  authors: [
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/experiences",
  },
  openGraph: {
    title: "Experience | Debadrita Goswami",
    description:
      "Professional experience of Debadrita Goswami across full stack, DevOps, and cloud roles.",
    url: `${siteConfig.url}/experiences`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.og.image}`,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: "Experience of Debadrita Goswami - Developer Portfolio",
        type: "image/png",
      },
    ],
    type: "website",
    locale: siteConfig.og.locale,
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "Experience | Debadrita Goswami",
    description:
      "Professional experience of Debadrita Goswami across full stack, DevOps, and cloud roles.",
    images: [`${siteConfig.url}${siteConfig.og.image}`],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
};

const Experience = () => {
  return (
    <main>
      <JsonLd
        data={getCollectionPageJsonLd(
          "/experiences",
          "Professional Experience of Debadrita Goswami",
          "Professional experience of Debadrita Goswami across full stack, DevOps, and cloud roles."
        )}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumb
          items={[
            { name: "Experience", href: "/experiences" },
          ]}
        />
      </div>
      <ExperiencesPage />
    </main>
  );
};

export default Experience;
