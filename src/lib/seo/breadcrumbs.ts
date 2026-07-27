import { siteConfig } from "@/config/site";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function getHomeBreadcrumb(): BreadcrumbItem {
  return { name: "Home", url: "/" };
}

export function getSectionBreadcrumb(name: string, url: string): BreadcrumbItem {
  return { name, url };
}

export function getItemBreadcrumb(name: string, url: string): BreadcrumbItem {
  return { name, url };
}
