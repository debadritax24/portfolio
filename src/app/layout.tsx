import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { inter, playfairDisplay, jetbrainsMono } from "@/lib/fonts";
import ThemeProviderClient from "@/components/providers/ThemeProviderClient";
import { LazyProvidersLoader, LazyAnalyticsProviders } from "@/components/providers/LazyProviders";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { JsonLdGraph } from "@/components/seo/JsonLd";
import {
  getPersonJsonLd,
  getWebSiteJsonLd,
  getProfilePageJsonLd,
  getKnowledgeGraphJsonLd,
} from "@/lib/structured-data";
import { constructMetadata } from "@/lib/metadata";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
};

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  const jsonLdItems = [
    getPersonJsonLd(),
    getWebSiteJsonLd(),
    getProfilePageJsonLd(),
    getKnowledgeGraphJsonLd(),
  ];

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="csp-nonce" content={nonce} />

        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          nonce={nonce}
        >
          {`
            try {
              const theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              }
            } catch {}
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3LNQBHK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            aria-hidden="true"
            title="Google Tag Manager"
          />
        </noscript>

        <JsonLdGraph items={jsonLdItems} nonce={nonce} />

        <Script
          id="gtm-init"
          strategy="afterInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T3LNQBHK');`,
          }}
        />

        <ThemeProviderClient>
          <LazyProvidersLoader>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <main id="main-content" role="main">
              {children}
            </main>
          </LazyProvidersLoader>
        </ThemeProviderClient>

        <LazyAnalyticsProviders />

        <SpeedInsights />
      </body>
    </html>
  );
}
