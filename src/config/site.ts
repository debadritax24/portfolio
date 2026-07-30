export const siteConfig = {
  name: "Debadrita Goswami",
  shortName: "Debadrita",
  title: "Developer",
  description:
    "2nd Year CS Engineering Student at Kolkata, West Bengal. I build projects, contribute to open source, and write about what I learn.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.debagoswami.tech",
  email: "debagoswami83@gmail.com",
  location: "Kolkata, West Bengal",
  resumeUrl: "/resume",

  socialLinks: {
    github: "https://github.com/debadritax24",
    linkedin: "https://www.linkedin.com/in/debadritax24/",
    instagram: "https://www.instagram.com/debadritax24",
    discord: "https://discord.com/channels/@debadritax24",
  },

  seo: {
    title: "Debadrita Goswami | Developer Portfolio",
    titleTemplate: "%s | Debadrita Goswami",
    description:
      "2nd Year CS Engineering Student at Kolkata, West Bengal. I build projects, contribute to open source, and write about what I learn.",
    keywords: [
      "Debadrita Goswami",
      "Developer Portfolio",
      "Full Stack Developer",
      "MERN Stack",
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Open Source",
      "Student Developer",
      "Web Developer India",
      "Software Engineer Portfolio",
      "JavaScript Developer",
      "TypeScript Developer",
      "React Developer",
      "Next.js Developer",
      "Node.js Developer",
    ],
    primaryKeywords: [
      "Full Stack Developer Portfolio",
      "Software Engineer Portfolio India",
      "Web Developer Portfolio",
      "Student Developer Portfolio",
    ],
    secondaryKeywords: [
      "MERN Stack Developer",
      "TypeScript Developer",
      "React Developer India",
      "Next.js Developer",
      "Node.js Developer",
      "Open Source Contributor",
      "Web Developer Kolkata",
      "CS Engineering Student Developer",
    ],
    longTailKeywords: [
      "full stack developer portfolio website",
      "student software engineer portfolio",
      "MERN stack projects by Indian developer",
      "next.js portfolio website examples",
      "open source contributor portfolio",
      "web developer portfolio with projects and blogs",
      "young developer portfolio India",
      "computer science student projects",
    ],
    googleVerification: "IeKi-eX5enCHjuok5UJG5pTXHPdm0nhIpPBqMUM7Uak",
    yandexVerification: "",
    bingVerification: "",
  },

  og: {
    image: "/og.png",
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: "Debadrita Goswami - Developer Portfolio",
    type: "website" as const,
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image" as const,
    creator: "@debagoswami83",
    site: "@debagoswami83",
  },

  manifest: {
    name: "Debadrita Goswami | Developer Portfolio",
    shortName: "Debadrita",
    description: "Developer portfolio of Debadrita Goswami - Full Stack Developer",
    startUrl: "/",
    display: "standalone" as const,
    background: "#000000",
    theme: "#000000",
  },

  jsonLd: {
    "@context": "https://schema.org",
    person: {
      "@type": "Person",
      name: "Debadrita Goswami",
      alternateName: ["Debadrita", "debagoswami83", "Goswami"],
      url: "https://www.debagoswami.tech",
      image: "https://www.debagoswami.tech/og.png",
      description:
        "2nd Year CS Engineering Student at Kolkata, West Bengal. I build projects, contribute to open source, and write about what I learn.",
      jobTitle: "Computer Science Engineering Student",
      knowsAbout: [
        "Full Stack Development",
        "MERN Stack",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "React",
        "Node.js",
        "Open Source",
        "Web Development",
        "PostgreSQL",
        "MongoDB",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/debagoswami83",
        "https://www.linkedin.com/in/debagoswami83/",
        "https://www.instagram.com/debagoswami.tech/",
      ],
    },
    website: {
      "@type": "WebSite",
      name: "Debadrita Goswami",
      url: "https://www.debagoswami.tech",
      description:
        "2nd Year CS Engineering Student at Kolkata, West Bengal. I build projects, contribute to open source, and write about what I learn.",
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        name: "Debadrita Goswami",
      },
    },
    organization: {
      "@type": "Organization",
      name: "Debadrita Goswami",
      url: "https://www.debagoswami.tech",
      logo: "https://www.debagoswami.tech/og.png",
      founder: {
        "@type": "Person",
        name: "Debadrita Goswami",
      },
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
