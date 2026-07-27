import type { Metadata } from "next";
import NotFound from "@/components/pages/NotFound";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWebPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Return to the homepage or browse projects, blogs, and resources by Debadrita Goswami.",
  alternates: {
    canonical: "/not-found",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Page Not Found | Debadrita Goswami",
    description:
      "The page you are looking for could not be found. Return to the homepage or browse projects and resources.",
    url: `${siteConfig.url}/not-found`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "Page Not Found | Debadrita Goswami",
    description:
      "The page you are looking for could not be found. Return to the homepage or browse projects and resources.",
  },
};

const page = () => {
  return (
    <>
      <JsonLd
        data={getWebPageJsonLd(
          "/not-found",
          "Page Not Found | Debadrita Goswami",
          "The page you are looking for could not be found."
        )}
      />
      <NotFound />
    </>
  );
};

export default page;
