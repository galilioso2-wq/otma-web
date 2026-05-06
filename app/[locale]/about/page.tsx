import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
import { Container } from '@/components/layout/Container'
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
    title: `${dict.about.page_title} — OTMA`,
    description: dict.about.mission,
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const a = dict.about
  const isRtl = locale === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="bg-[#080D18] pt-32 pb-16">
        <Container>
          <div className={cn('max-w-3xl', isRtl ? 'text-right ms-auto' : '')}>
            <div className={cn('flex items-center gap-4 mb-6 text-xs text-white/35 font-medium', isRtl ? 'flex-row-reverse' : '')}>
              <span>{a.founded_label}: {a.founded_year}</span>
              <span className="w-px h-3 bg-white/20" aria-hidden="true" />
              <span>{a.hq_label}: {a.hq}</span>
            </div>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-6">
              {a.page_title}
            </h1>
            <p className="text-lg text-white/55 max-w-2xl leading-relaxed">
              {a.page_subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission + Vision */}
      <section className="bg-[#0A0E1A] py-20 border-y border-white/8">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={cn(isRtl ? 'text-right' : '')}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
                {a.mission_label}
              </p>
              <p className="text-xl text-white leading-relaxed">{a.mission}</p>
            </div>
            <div className={cn(isRtl ? 'text-right' : '')}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
                {a.vision_label}
              </p>
              <p className="text-xl text-white leading-relaxed">{a.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Founding Story */}
      <section className="bg-[#080D18] py-20">
        <Container>
          <div className={cn('max-w-3xl', isRtl ? 'text-right ms-auto' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {a.story_label}
            </p>
            <p className="text-white/70 text-lg leading-relaxed">{a.story}</p>
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-[#0A0E1A] py-20 border-y border-white/8">
        <Container>
          <div className="max-w-3xl">
            <p className={cn('text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-6', isRtl ? 'text-right' : '')}>
              {a.founder_label}
            </p>
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-8 items-start',
                isRtl ? 'sm:flex-row-reverse text-right' : ''
              )}
            >
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#080D18] border border-[#00D4FF]/20 flex items-center justify-center shrink-0">
                <span className="font-display text-2xl font-medium text-[#00D4FF]">KA</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">{a.founder_name}</h2>
                <p className="text-sm text-[#00D4FF] mb-4">{a.founder_title}</p>
                <p className="text-white/65 leading-relaxed mb-4">{a.founder_bio}</p>
                <a
                  href={a.founder_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#00D4FF] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-[#080D18] py-20">
        <Container>
          <div className={cn('mb-10', isRtl ? 'text-right' : '')}>
            <h2 className="text-2xl font-semibold text-white font-display">{a.timeline_label}</h2>
          </div>
          <div className="relative max-w-2xl">
            {/* vertical line */}
            <div className={cn('absolute top-0 bottom-0 w-px bg-white/10', isRtl ? 'right-[7px]' : 'left-[7px]')} aria-hidden="true" />
            <div className="space-y-8">
              {a.timeline.map((item) => (
                <div
                  key={item.year}
                  className={cn('relative flex gap-6', isRtl ? 'flex-row-reverse text-right' : '')}
                >
                  {/* dot */}
                  <div className="w-3.5 h-3.5 rounded-full bg-[#00D4FF] border-2 border-[#080D18] flex-shrink-0 mt-1 relative z-10" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-bold text-[#00D4FF] uppercase tracking-widest">{item.year}</span>
                    <p className="text-sm text-white/65 leading-relaxed mt-1">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#0A0E1A] py-20 border-y border-white/8">
        <Container>
          <div className={cn('mb-10', isRtl ? 'text-right' : '')}>
            <h2 className="text-2xl font-semibold text-white font-display">{a.values_label}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {a.values.map((value) => (
              <div
                key={value.title}
                className={cn(
                  'p-6 rounded-xl border border-white/8 bg-white/2',
                  isRtl ? 'text-right' : ''
                )}
              >
                <h3 className="text-base font-semibold text-[#00D4FF] mb-3">{value.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-[#080D18] py-16">
        <Container>
          <div className={cn('mb-6', isRtl ? 'text-right' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF]">
              {a.certifications_label}
            </p>
          </div>
          <div className={cn('flex flex-wrap gap-3', isRtl ? 'justify-end' : '')}>
            {a.certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 rounded-full text-xs font-medium text-white/60 border border-white/10 bg-white/[0.03]"
              >
                {cert}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Where we work */}
      <section className="bg-[#0A0E1A] py-16 border-y border-white/8">
        <Container>
          <div className={cn('max-w-2xl', isRtl ? 'text-right ms-auto' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {a.where_label}
            </p>
            <h2 className="text-xl font-semibold text-white mb-3">{a.where_hq}</h2>
            <p className="text-white/60 leading-relaxed">{a.where_reach}</p>
          </div>
        </Container>
      </section>

      {/* Inline CTA */}
      <section className="bg-[#080D18] py-20">
        <Container>
          <div className={cn('max-w-2xl', isRtl ? 'text-right ms-auto' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {a.cta_label}
            </p>
            <p className="text-white/65 leading-relaxed mb-8">{a.cta_text}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] transition-colors"
            >
              {a.cta_button}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
