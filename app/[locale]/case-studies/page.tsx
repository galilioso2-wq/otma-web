import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
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
    title: `${dict.case_studies.page_title} — OTMA`,
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
      <section className="bg-[#080D18] pt-32 pb-16">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {locale === 'ar' ? 'نتائج حقيقية' : 'Real outcomes'}
            </p>
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
          <div className="grid lg:grid-cols-2 gap-6">
            {cs.items.map((item, i) => (
              <article
                key={i}
                className={cn(
                  'flex flex-col p-7 rounded-xl border border-white/10 bg-[#0A0E1A]/60 hover:border-[#00D4FF]/30 transition-colors',
                  isRtl ? 'text-right' : ''
                )}
              >
                {/* Sector + timeline */}
                <div className={cn('flex items-center justify-between gap-3 mb-4 flex-wrap', isRtl ? 'flex-row-reverse' : '')}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF]">
                    {item.sector}
                  </span>
                  {'timeline' in item && (
                    <span className="text-xs text-white/30 font-medium">{item.timeline}</span>
                  )}
                </div>

                {/* Headline result */}
                <p className="text-2xl font-display font-medium text-white leading-snug mb-3">
                  {item.result}
                </p>

                {/* Title */}
                <h2 className="text-sm font-semibold text-white/60 mb-4">{item.title}</h2>

                {/* Summary */}
                <p className="text-sm text-white/55 leading-relaxed flex-1 mb-5">{item.summary}</p>

                {/* Before / After */}
                {'before' in item && 'after' in item && (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">
                        {locale === 'ar' ? 'قبل' : 'Before'}
                      </p>
                      <p className="text-xs text-white/55 leading-snug">{item.before}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#00D4FF]/[0.05] border border-[#00D4FF]/15">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#00D4FF]/60 mb-1">
                        {locale === 'ar' ? 'بعد' : 'After'}
                      </p>
                      <p className="text-xs text-white/70 leading-snug">{item.after}</p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className={cn('flex flex-wrap gap-2', isRtl ? 'justify-end' : '')}>
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
