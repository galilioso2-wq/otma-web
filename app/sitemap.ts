import type { MetadataRoute } from 'next'

const baseUrl = 'https://otma.io'
const locales = ['en', 'ar']

const staticRoutes = ['', '/services', '/about', '/case-studies', '/contact']

const serviceSlugsList = [
  'custom-ai-agents',
  'crm-intelligence',
  'power-bi-ai',
  'conversational-ai',
  'ai-strategy',
  'dynamics-365',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'monthly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    }
    for (const slug of serviceSlugsList) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
