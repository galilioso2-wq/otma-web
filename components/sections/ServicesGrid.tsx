import Link from 'next/link'
import { ArrowRight, Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface ServiceItem {
  slug: string
  title: string
  description: string
}

interface ServicesGridProps {
  locale: string
  title: string
  subtitle: string
  items: ServiceItem[]
}

const icons = [Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw]

export function ServicesGrid({ locale, title, subtitle, items }: ServicesGridProps) {
  const isRtl = locale === 'ar'

  return (
    <section className="bg-[#080D18] py-24" aria-labelledby="services-heading">
      <Container>
        <div className={cn('mb-14', isRtl ? 'text-right' : 'text-left')}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-3">
            {title}
          </p>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-semibold text-white font-display leading-tight max-w-2xl"
          >
            {subtitle}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className="group relative flex flex-col gap-4 p-6 rounded-xl border border-[#00D4FF]/18 bg-[#080D18]/40 backdrop-blur-sm hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/5 transition-all duration-200"
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
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{service.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
