import type { Metadata } from 'next'

const baseUrl = 'https://otma.io'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'OTMA — Intelligent AI Agents for Global Enterprises',
    template: '%s | OTMA',
  },
  description:
    'OTMA builds AI agents that synthesize your business data into measurable outcomes. Founded in Riyadh, built for the world.',
  keywords: [
    'AI agents',
    'enterprise AI',
    'Dynamics 365',
    'Power BI AI',
    'Saudi Arabia AI',
    'Arabic AI',
    'CRM intelligence',
    'conversational AI',
  ],
  authors: [{ name: 'Khaled Ali', url: baseUrl }],
  creator: 'OTMA',
  publisher: 'OTMA',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'OTMA',
    title: 'OTMA — Intelligent AI Agents for Global Enterprises',
    description:
      'OTMA builds AI agents that synthesize your business data into measurable outcomes. Founded in Riyadh, built for the world.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'OTMA — Intelligent AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OTMA — Intelligent AI Agents for Global Enterprises',
    description:
      'OTMA builds AI agents that synthesize your business data into measurable outcomes.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OTMA',
  url: baseUrl,
  logo: `${baseUrl}/brand/otma_logo_horizontal_dark.svg`,
  description:
    'OTMA builds AI agents that synthesize enterprise data into intelligent decisions — for businesses that demand outcomes, not theatre.',
  foundingDate: '2026',
  founder: {
    '@type': 'Person',
    name: 'Khaled Ali',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
  },
  sameAs: ['https://www.linkedin.com/company/otma-io'],
  areaServed: 'Worldwide',
  serviceType: 'AI Agents, Enterprise AI, CRM Intelligence',
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OTMA',
  url: baseUrl,
  description: 'Intelligent AI Agents for Global Enterprises',
  inLanguage: ['en', 'ar'],
}
