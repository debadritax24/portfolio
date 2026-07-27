import type { Metadata } from "next";
import AboutPage from "@/components/pages/About";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getWebPageJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Debadrita Goswami, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering. CS Engineering Student at Kolkata.",
  keywords: [
    "Debadrita Goswami",
    "About Debadrita Goswami",
    "Full Stack Developer",
    "MERN Stack Developer",
    "DevSecOps",
    "Web Developer India",
    "Student Developer",
    "CS Engineering Student",
  ],
  authors: [
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Debadrita Goswami",
    description:
      "Learn more about Debadrita Goswami, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.og.image}`,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: "About Debadrita Goswami - Developer Portfolio",
        type: "image/png",
      },
    ],
    type: "profile",
    locale: siteConfig.og.locale,
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "About | Debadrita Goswami",
    description:
      "Learn more about Debadrita Goswami, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering.",
    images: [`${siteConfig.url}${siteConfig.og.image}`],
    creator: siteConfig.twitter.creator,
    site: siteConfig.twitter.site,
  },
};

export default function About() {
  return (
    <main>
      <JsonLd
        data={getWebPageJsonLd(
          "/about",
          "About Debadrita Goswami | Developer Portfolio",
          "Learn more about Debadrita Goswami, a full stack developer focused on modern web apps, cloud infrastructure, and scalable product engineering."
        )}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <Breadcrumb
          items={[
            { name: "About", href: "/about" },
          ]}
        />
      </div>
      <AboutPage />
    </main>
  );
}
