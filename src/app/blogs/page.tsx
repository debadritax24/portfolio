import BlogsPage from "@/components/pages/Blogs";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getCollectionPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Technical articles and notes by Debadrita Goswami on software engineering, DevOps, web development, React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "Debadrita Goswami Blog",
    "Software Engineering Blog",
    "Web Development Blog",
    "React Blog",
    "Next.js Blog",
    "TypeScript Blog",
    "Node.js Blog",
    "DevOps Blog",
    "Technical Writing",
    "Developer Blog India",
  ],
  authors: [
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs | Debadrita Goswami",
    description:
      "Technical articles and notes by Debadrita Goswami on software engineering, DevOps, and web development.",
    url: `${siteConfig.url}/blogs`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.og.image}`,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: "Blogs by Debadrita Goswami - Developer Portfolio",
        type: "image/png",
      },
    ],
    type: "website",
    locale: siteConfig.og.locale,
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "Blogs | Debadrita Goswami",
    description:
      "Technical articles and notes by Debadrita Goswami on software engineering, DevOps, and web development.",
    images: [`${siteConfig.url}${siteConfig.og.image}`],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
};

const Blogs = () => {
  return (
    <main>
      <JsonLd
        data={getCollectionPageJsonLd(
          "/blogs",
          "Technical Blog by Debadrita Goswami",
          "Technical articles and notes by Debadrita Goswami on software engineering, DevOps, and web development."
        )}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumb
          items={[
            { name: "Blogs", href: "/blogs" },
          ]}
        />
      </div>
      <BlogsPage />
    </main>
  );
};

export default Blogs;
