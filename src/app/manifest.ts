import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.manifest.name,
    short_name: siteConfig.manifest.shortName,
    description: siteConfig.manifest.description,
    start_url: siteConfig.manifest.startUrl,
    display: siteConfig.manifest.display,
    background_color: siteConfig.manifest.background,
    theme_color: siteConfig.manifest.theme,
    orientation: "any",
    scope: "/",
    lang: "en",
    dir: "ltr",
    categories: ["technology", "portfolio", "developer"],
    icons: [
      {
        src: "/cutie.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/cutie.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: `${siteConfig.url}/og.png`,
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label: "Debadrita Goswami Developer Portfolio",
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
