import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: siteConfig.name,
    alternateName: siteConfig.jsonLd.person.alternateName,
    url: baseUrl,
    image: `${baseUrl}${siteConfig.og.image}`,
    description: siteConfig.description,
    jobTitle: siteConfig.jsonLd.person.jobTitle,
    knowsAbout: siteConfig.jsonLd.person.knowsAbout,
    hasOccupation: {
      "@type": "Occupation",
      name: siteConfig.title,
      occupationLocation: {
        "@type": "City",
        name: siteConfig.location,
      },
    },
    address: siteConfig.jsonLd.person.address,
    sameAs: siteConfig.jsonLd.person.sameAs,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    inLanguage: "en-US",
    author: {
      "@id": `${baseUrl}#person`,
    },
    publisher: {
      "@id": `${baseUrl}#person`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: siteConfig.name,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}${siteConfig.og.image}`,
      width: siteConfig.og.imageWidth,
      height: siteConfig.og.imageHeight,
    },
    founder: {
      "@id": `${baseUrl}#person`,
    },
    sameAs: siteConfig.jsonLd.person.sameAs,
  };
}

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}#profilepage`,
    dateCreated: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@id": `${baseUrl}#person`,
    },
  };
}

export function getWebPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}${path}#webpage`,
    url: `${baseUrl}${path}`,
    name,
    description,
    isPartOf: {
      "@id": `${baseUrl}#website`,
    },
    about: {
      "@id": `${baseUrl}#person`,
    },
    dateCreated: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    breadcrumb: {
      "@id": `${baseUrl}${path}#breadcrumb`,
    },
  };
}

export function getCollectionPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}${path}#collectionpage`,
    url: `${baseUrl}${path}`,
    name,
    description,
    isPartOf: {
      "@id": `${baseUrl}#website`,
    },
    about: {
      "@id": `${baseUrl}#person`,
    },
    mainEntity: {
      "@type": "ItemList",
      name,
    },
  };
}

export function getArticleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
  tags?: string[];
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    image: post.image || `${baseUrl}${siteConfig.og.image}`,
    keywords: post.tags?.join(", "),
    articleSection: post.category,
  };
}

export function getProjectJsonLd(project: {
  title: string;
  shortDescription: string;
  slug: string;
  techStack?: string[];
  createdAt: string;
  githubUrl?: string;
  liveUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: project.liveUrl || `${baseUrl}/projects/${project.slug}`,
    dateCreated: project.createdAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
    },
    keywords: project.techStack?.join(", "),
    codeRepository: project.githubUrl,
  };
}

export function getSoftwareSourceCodeJsonLd(project: {
  title: string;
  shortDescription: string;
  slug: string;
  techStack?: string[];
  createdAt: string;
  githubUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.shortDescription,
    url: `${baseUrl}/projects/${project.slug}`,
    dateCreated: project.createdAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
    },
    programmingLanguage: project.techStack || [],
    codeRepository: project.githubUrl,
  };
}

export function getFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getKnowledgeGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: siteConfig.name,
    alternateName: siteConfig.jsonLd.person.alternateName,
    url: baseUrl,
    image: `${baseUrl}${siteConfig.og.image}`,
    description: siteConfig.description,
    jobTitle: siteConfig.jsonLd.person.jobTitle,
    knowsAbout: siteConfig.jsonLd.person.knowsAbout,
    sameAs: siteConfig.jsonLd.person.sameAs,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": baseUrl,
    },
  };
}
