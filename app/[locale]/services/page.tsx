import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
import { ArrowRight, Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw, Database, Cloud, Shield } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { CTABanner } from '@/components/sections/CTABanner'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

const icons = [Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw, Database, Cloud, Shield]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.services.page_title,
    description: dict.services.page_subtitle,
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const s = dict.services
  const isRtl = locale === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="bg-[#080D18] pt-32 pb-20">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              {dict.nav.services}
            </p>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-6 max-w-3xl">
              {s.page_title}
            </h1>
            <p className="text-lg text-white/55 max-w-2xl">{s.page_subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="bg-[#080D18] pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.home.services.items.map((service, i) => {
              const item = s.items[service.slug as keyof typeof s.items]
              const Icon = icons[i % icons.length]
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="group flex flex-col gap-4 p-6 rounded-xl border border-[#00D4FF]/18 bg-[#080D18]/60 hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <ArrowRight
                      size={16}
                      className={cn(
                        'text-white/20 group-hover:text-[#00D4FF] transition-colors mt-1',
                        isRtl ? 'rotate-180' : ''
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={cn(isRtl ? 'text-right' : '')}>
                    <h2 className="text-base font-semibold text-white mb-2">{service.title}</h2>
                    <p className="text-sm text-white/55 leading-relaxed">{service.description}</p>
                  </div>
                </Link>
              )
            })}
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
