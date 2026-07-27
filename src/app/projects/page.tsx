import ProjectsPage from "@/components/pages/Projects";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getCollectionPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Debadrita Goswami showcasing full stack, cloud, and product engineering work. React, Next.js, TypeScript, Node.js projects.",
  keywords: [
    "Debadrita Goswami Projects",
    "Full Stack Projects",
    "React Projects",
    "Next.js Projects",
    "TypeScript Projects",
    "Web Development Projects",
    "Open Source Projects",
    "Student Developer Projects",
  ],
  authors: [
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Debadrita Goswami",
    description:
      "Selected projects by Debadrita Goswami showcasing full stack, cloud, and product engineering work.",
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.og.image}`,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: "Projects by Debadrita Goswami - Developer Portfolio",
        type: "image/png",
      },
    ],
    type: "website",
    locale: siteConfig.og.locale,
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "Projects | Debadrita Goswami",
    description:
      "Selected projects by Debadrita Goswami showcasing full stack, cloud, and product engineering work.",
    images: [`${siteConfig.url}${siteConfig.og.image}`],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
};

const Projects = () => {
  return (
    <main>
      <JsonLd
        data={getCollectionPageJsonLd(
          "/projects",
          "Projects by Debadrita Goswami",
          "Selected projects by Debadrita Goswami showcasing full stack, cloud, and product engineering work."
        )}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumb
          items={[
            { name: "Projects", href: "/projects" },
          ]}
        />
      </div>
      <ProjectsPage />
    </main>
  );
};

export default Projects;
