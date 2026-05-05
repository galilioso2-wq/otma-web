import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TechStackGrid } from '@/components/sections/TechStackGrid'
import { TechPartners } from '@/components/sections/TechPartners'
import { DataFoundations } from '@/components/sections/DataFoundations'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { StatsGrid } from '@/components/sections/StatsGrid'
import { WhyOTMA } from '@/components/sections/WhyOTMA'
import { CTABanner } from '@/components/sections/CTABanner'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { orgJsonLd, websiteJsonLd } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: 'OTMA — Intelligent AI Agents for Global Enterprises',
    description:
      locale === 'ar'
        ? 'تبني أوتما وكلاء ذكاء اصطناعي يحوّلون بيانات مؤسستك إلى قرارات ذكية وقابلة للقياس.'
        : 'OTMA builds AI agents that synthesize your business data into measurable outcomes. Founded in Riyadh, built for the world.',
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const h = dict.home

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Hero
        locale={locale}
        title={h.hero.title}
        subtitle={h.hero.subtitle}
        ctaPrimary={h.hero.cta_primary}
        ctaSecondary={h.hero.cta_secondary}
      />
      <TrustStrip locale={locale} label={h.trust.label} sectors={h.trust.sectors} />
      <ServicesGrid
        locale={locale}
        title={h.services.title}
        subtitle={h.services.subtitle}
        items={h.services.items}
      />
      <TechStackGrid
        locale={locale}
        label={h.tech_stack.label}
        title={h.tech_stack.title}
        subtitle={h.tech_stack.subtitle}
        cloudLabel={h.tech_stack.cloud_label}
        cloudNote={h.tech_stack.cloud_note}
      />
      <TechPartners
        locale={locale}
        label={h.tech_partners.label}
        title={h.tech_partners.title}
        subtitle={h.tech_partners.subtitle}
        partners={h.tech_partners.partners}
      />
      <DataFoundations
        locale={locale}
        label={h.data_foundations.label}
        title={h.data_foundations.title}
        subtitle={h.data_foundations.subtitle}
        tiers={h.data_foundations.tiers}
      />
      <ProcessTimeline
        locale={locale}
        title={h.process.title}
        subtitle={h.process.subtitle}
        steps={h.process.steps}
      />
      <StatsGrid locale={locale} items={h.stats.items} />
      <WhyOTMA locale={locale} title={h.why.title} items={h.why.items} />
      <CTABanner
        locale={locale}
        title={h.cta.title}
        subtitle={h.cta.subtitle}
        button={h.cta.button}
      />
    </>
  )
}
