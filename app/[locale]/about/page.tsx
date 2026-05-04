import type { Metadata } from 'next'
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
    title: dict.about.page_title,
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
      <section className="bg-[#080D18] pt-32 pb-20">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-6">
              {a.page_title}
            </h1>
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

      {/* Founder */}
      <section className="bg-[#080D18] py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-6">
              {a.founder_label}
            </p>
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-8 items-start',
                isRtl ? 'sm:flex-row-reverse text-right' : ''
              )}
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0A0E1A] border border-[#00D4FF]/20 flex items-center justify-center shrink-0">
                <span className="font-display text-2xl font-medium text-[#00D4FF]">KA</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">{a.founder_name}</h2>
                <p className="text-sm text-[#00D4FF] mb-4">{a.founder_title}</p>
                <p className="text-white/65 leading-relaxed">{a.founder_bio}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#0A0E1A] py-24 border-y border-white/8">
        <Container>
          <div className={cn('mb-12', isRtl ? 'text-right' : '')}>
            <h2 className="text-3xl font-semibold text-white font-display">{a.values_label}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((value) => (
              <div
                key={value.title}
                className={cn(
                  'p-6 rounded-xl border border-white/8 bg-white/2',
                  isRtl ? 'text-right' : ''
                )}
              >
                <h3 className="text-lg font-semibold text-[#00D4FF] mb-3">{value.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Where we work */}
      <section className="bg-[#080D18] py-20">
        <Container>
          <div className={cn('max-w-2xl', isRtl ? 'text-right ms-auto' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {a.where_label}
            </p>
            <h2 className="text-2xl font-semibold text-white mb-3">{a.where_hq}</h2>
            <p className="text-white/60 leading-relaxed">{a.where_reach}</p>
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
