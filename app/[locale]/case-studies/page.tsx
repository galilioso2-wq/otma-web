import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { CTABanner } from '@/components/sections/CTABanner'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.case_studies.page_title,
    description: dict.case_studies.page_subtitle,
  }
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const cs = dict.case_studies
  const isRtl = locale === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="bg-[#080D18] pt-32 pb-20">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-6">
              {cs.page_title}
            </h1>
            <p className="text-lg text-white/55 max-w-2xl">{cs.page_subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Cases */}
      <section className="bg-[#080D18] pb-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-6">
            {cs.items.map((item, i) => (
              <article
                key={i}
                className={cn(
                  'flex flex-col p-7 rounded-xl border border-white/10 bg-[#0A0E1A]/60 hover:border-[#00D4FF]/30 transition-colors',
                  isRtl ? 'text-right' : ''
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
                  {item.sector}
                </span>
                <p className="text-2xl font-display font-medium text-white leading-snug mb-4">
                  {item.result}
                </p>
                <h2 className="text-base font-semibold text-white/80 mb-3">{item.title}</h2>
                <p className="text-sm text-white/55 leading-relaxed flex-1">{item.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium text-white/50 bg-white/5 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        locale={locale}
        title={dict.home.cta.title}
        subtitle={dict.home.cta.subtitle}
        button={dict.home.cta.button}
      />
    </>
  )
}
