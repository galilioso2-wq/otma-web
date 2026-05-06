import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
import { Container } from '@/components/layout/Container'
import { CTABanner } from '@/components/sections/CTABanner'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: `${dict.how_we_work.page_title} — OTMA`,
    description: dict.how_we_work.page_subtitle,
  }
}

export default async function HowWeWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const hww = dict.how_we_work
  const isRtl = locale === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="bg-[#080D18] pt-32 pb-16">
        <Container>
          <div className={cn('max-w-3xl', isRtl ? 'text-right ms-auto' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {hww.intro_label}
            </p>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-6">
              {hww.page_title}
            </h1>
            <p className="text-lg text-white/55 max-w-2xl leading-relaxed">
              {hww.page_subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="bg-[#0A0E1A] py-12 border-y border-white/8">
        <Container>
          <p className={cn('text-white/65 text-base leading-relaxed max-w-3xl', isRtl ? 'text-right ms-auto' : '')}>
            {hww.intro}
          </p>
        </Container>
      </section>

      {/* Phases */}
      <section className="bg-[#080D18] py-24">
        <Container>
          <div className="space-y-0">
            {hww.phases.map((phase, i) => (
              <div
                key={phase.number}
                className={cn(
                  'relative grid lg:grid-cols-[140px_1fr] gap-8 py-12',
                  i < hww.phases.length - 1 ? 'border-b border-white/8' : '',
                  isRtl ? 'lg:grid-cols-[1fr_140px] text-right' : ''
                )}
              >
                {/* Phase number + duration */}
                <div className={cn('flex flex-col gap-1', isRtl ? 'items-end' : '')}>
                  <span className="font-display font-bold text-5xl text-white/10 leading-none">
                    {phase.number}
                  </span>
                  <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-widest mt-2">
                    {phase.duration}
                  </span>
                </div>

                {/* Phase content */}
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">{phase.title}</h2>
                  <p className="text-white/60 leading-relaxed mb-6 max-w-2xl">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className={cn('grid sm:grid-cols-2 gap-2', isRtl ? '' : '')}>
                    {phase.deliverables.map((d, j) => (
                      <div
                        key={j}
                        className={cn(
                          'flex items-start gap-2.5 px-4 py-3 rounded-lg bg-white/[0.03] border border-white/8',
                          isRtl ? 'flex-row-reverse' : ''
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-2 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm text-white/65 leading-snug">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement types */}
      <section className="bg-[#0A0E1A] py-24 border-y border-white/8">
        <Container>
          <div className={cn('mb-12', isRtl ? 'text-right' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-3">
              {hww.pricing_label}
            </p>
            <p className="text-white/50 text-sm max-w-xl">{hww.pricing_note}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {hww.packages.map((pkg, i) => (
              <div
                key={i}
                className={cn(
                  'flex flex-col p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#00D4FF]/30 transition-colors',
                  isRtl ? 'text-right' : ''
                )}
              >
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="text-base font-semibold text-white">{pkg.name}</h3>
                  <span className="text-xs font-medium text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-1 rounded-full">
                    {pkg.duration}
                  </span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1 mb-4">
                  {pkg.description}
                </p>
                <p className={cn('text-xs text-white/35 italic border-t border-white/8 pt-4', isRtl ? 'text-right' : '')}>
                  {pkg.typical_for}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-[#080D18] py-24">
        <Container>
          <div className={cn('mb-10', isRtl ? 'text-right' : '')}>
            <h2 className="text-2xl font-semibold text-white font-display">{hww.faq_label}</h2>
          </div>

          <div className="space-y-0 max-w-3xl">
            {hww.faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  'py-6',
                  i < hww.faqs.length - 1 ? 'border-b border-white/8' : '',
                  isRtl ? 'text-right' : ''
                )}
              >
                <h3 className="text-base font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        locale={locale}
        title={hww.cta_title}
        subtitle={hww.cta_subtitle}
        button={hww.cta_button}
      />
    </>
  )
}
