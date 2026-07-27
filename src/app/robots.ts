import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/send-email",
          "/admin",
          "/admin/*",
          "/_next/",
          "/_next/static/",
          "/_next/image/",
          "/search",
          "/search/*",
          "*.json$",
          "*.xml$",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/*",
        ],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/*",
        ],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/*",
        ],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/*",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
