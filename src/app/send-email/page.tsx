import type { Metadata } from 'next'
import SendEmailPage from '@/components/pages/SendEmailPage'
import React from 'react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Debadrita Goswami for project inquiries, collaborations, or just to say hi. I'm always open to discussing new ideas and opportunities.",
  alternates: {
    canonical: "/send-email",
  },
  openGraph: {
    title: "Contact | Debadrita Goswami",
    description:
      "Contact Debadrita Goswami for project inquiries, collaborations, or just to say hi. I'm always open to discussing new ideas and opportunities.",
    url: "/send-email",
    images: [
      {
        url: `${siteConfig.url}${siteConfig.og.image}`,
        width: 1200,
        height: 630,
        alt: "Contact - Debadrita Goswami",
      },
    ],
    type: "website",
  },
};

const SendEmail = () => {
  return (
    <main>
      <SendEmailPage />
    </main>
  )
}

export default SendEmail
