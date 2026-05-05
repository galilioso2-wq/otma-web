import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { CTABanner } from '@/components/sections/CTABanner'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

const serviceSlugsList = [
  'custom-ai-agents',
  'crm-intelligence',
  'power-bi-ai',
  'conversational-ai',
  'ai-strategy',
  'dynamics-365',
  'data-engineering',
  'cloud-architecture',
  'data-governance',
]

export async function generateStaticParams() {
  return ['en', 'ar'].flatMap((locale) =>
    serviceSlugsList.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  const item = dict.services.items[slug as keyof typeof dict.services.items]
  if (!item) return {}
  return {
    title: item.title,
    description: item.hero_sub,
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const item = dict.services.items[slug as keyof typeof dict.services.items]

  if (!item) notFound()

  const isRtl = locale === 'ar'

  const relatedServices = dict.home.services.items
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#080D18] pt-32 pb-20 border-b border-white/8">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <Link
              href={`/${locale}/services`}
              className={cn(
                'inline-flex items-center gap-2 text-xs font-medium text-[#00D4FF]/70 hover:text-[#00D4FF] mb-6 transition-colors',
                isRtl ? 'flex-row-reverse' : ''
              )}
            >
              {isRtl ? (
                <ArrowRight size={14} />
              ) : (
                <ArrowRight size={14} className="rotate-180" />
              )}
              {dict.services.page_title}
            </Link>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-6 max-w-3xl">
              {item.title}
            </h1>
            <p className="text-xl text-white/55 max-w-2xl">{item.hero_sub}</p>
          </div>
        </Container>
      </section>

      {/* What you get + How it works */}
      <section className="bg-[#080D18] py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What you get */}
            <div className={cn(isRtl ? 'text-right' : '')}>
              <h2 className="text-2xl font-semibold text-white mb-8 font-display">
                {locale === 'ar' ? 'ما ستحصل عليه' : 'What you get'}
              </h2>
              <ul className="space-y-4">
                {item.what_you_get.map((point, i) => (
                  <li
                    key={i}
                    className={cn('flex items-start gap-3', isRtl ? 'flex-row-reverse' : '')}
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#00D4FF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-white/70 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div className={cn(isRtl ? 'text-right' : '')}>
              <h2 className="text-2xl font-semibold text-white mb-8 font-display">
                {locale === 'ar' ? 'كيف يعمل' : 'How it works'}
              </h2>
              <div className="space-y-3">
                {item.how_it_works.map((step, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-start gap-4 p-4 rounded-lg bg-white/3 border border-white/8',
                      isRtl ? 'flex-row-reverse text-right' : ''
                    )}
                  >
                    <span className="font-mono text-[#00D4FF] text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/70 text-sm leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tech stack */}
      <section className="bg-[#0A0E1A] py-16 border-y border-white/8">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <h2 className="text-lg font-semibold text-white mb-6">
              {locale === 'ar' ? 'التقنيات المستخدمة' : 'Tech we use'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-[#080D18] py-20">
        <Container>
          <div className={cn('mb-8', isRtl ? 'text-right' : '')}>
            <h2 className="text-xl font-semibold text-white">
              {locale === 'ar' ? 'خدمات ذات صلة' : 'Related services'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className={cn(
                  'group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5 transition-all',
                  isRtl ? 'flex-row-reverse' : ''
                )}
              >
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  {service.title}
                </span>
                <ArrowRight
                  size={14}
                  className={cn(
                    'text-white/20 group-hover:text-[#00D4FF] transition-colors shrink-0',
                    isRtl ? 'rotate-180' : ''
                  )}
                  aria-hidden="true"
                />
              </Link>
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
