import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = siteConfig.seo.title,
  description = siteConfig.seo.description,
  image = siteConfig.og.image,
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: siteConfig.seo.titleTemplate,
    },
    description,
    keywords: [...siteConfig.seo.keywords],
    authors: [
      { name: siteConfig.name, url: siteConfig.url },
      { name: siteConfig.name, url: siteConfig.socialLinks.linkedin },
      { name: siteConfig.name, url: siteConfig.socialLinks.github },
    ],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    verification: {
      google: siteConfig.seo.googleVerification,
    },
    alternates: {
      canonical: siteConfig.url,
      languages: {
        "en-US": siteConfig.url,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: siteConfig.og.imageWidth,
          height: siteConfig.og.imageHeight,
          alt: siteConfig.og.imageAlt,
          type: "image/png",
        },
      ],
      locale: siteConfig.og.locale,
    },
    twitter: {
      card: siteConfig.twitter.card as "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}${image}`],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
    icons: {
      icon: [
        { url: "/cutie.webp", sizes: "16x16", type: "image/webp" },
        { url: "/cutie.webp", sizes: "32x32", type: "image/webp" },
      ],
      apple: "/cutie.webp",
    },
    manifest: "/site.webmanifest",
    category: "technology",
    referrer: "origin-when-cross-origin",
    applicationName: siteConfig.name,
    generator: "Next.js",
    other: {
      "og:see_also": [
        siteConfig.socialLinks.linkedin,
        siteConfig.socialLinks.github,
      ],
    },
  };
}