import CertificationsPage from "@/components/pages/Certifications";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getCollectionPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications earned by Debadrita Goswami in software engineering, cloud, and DevOps. Professional certifications and achievements.",
  keywords: [
    "Debadrita Goswami Certifications",
    "Software Engineering Certifications",
    "Cloud Certifications",
    "DevOps Certifications",
    "Web Development Certifications",
    "Student Developer Certifications",
  ],
  authors: [
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: "Certifications | Debadrita Goswami",
    description:
      "Certifications earned by Debadrita Goswami in software engineering, cloud, and DevOps.",
    url: `${siteConfig.url}/certifications`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.og.image}`,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: "Certifications of Debadrita Goswami - Developer Portfolio",
        type: "image/png",
      },
    ],
    type: "website",
    locale: siteConfig.og.locale,
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "Certifications | Debadrita Goswami",
    description:
      "Certifications earned by Debadrita Goswami in software engineering, cloud, and DevOps.",
    images: [`${siteConfig.url}${siteConfig.og.image}`],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
};

const Certifications = () => {
  return (
    <main>
      <JsonLd
        data={getCollectionPageJsonLd(
          "/certifications",
          "Certifications of Debadrita Goswami",
          "Certifications earned by Debadrita Goswami in software engineering, cloud, and DevOps."
        )}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumb
          items={[
            { name: "Certifications", href: "/certifications" },
          ]}
        />
      </div>
      <CertificationsPage />
    </main>
  );
};

export default Certifications;
