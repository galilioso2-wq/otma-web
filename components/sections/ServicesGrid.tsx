'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw, Database, Cloud, Shield } from 'lucide-react'
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

const icons = [Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw, Database, Cloud, Shield]

export function ServicesGrid({ locale, title, subtitle, items }: ServicesGridProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-[#F4F6FA] dark:bg-[#080D18] py-24" aria-labelledby="services-heading">
      <Container>
        <motion.div
          className={cn('mb-14', isRtl ? 'text-right' : 'text-left')}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0099BB] dark:text-[#00D4FF] mb-3">
            {title}
          </p>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-semibold text-[#080D18] dark:text-white font-display leading-tight max-w-2xl"
          >
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={service.slug}
                initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group relative flex flex-col gap-4 p-6 rounded-xl border border-[#0099BB]/15 dark:border-[#00D4FF]/18 bg-white dark:bg-[#080D18]/40 shadow-sm dark:shadow-none hover:border-[#0099BB]/40 dark:hover:border-[#00D4FF]/40 hover:shadow-md dark:hover:bg-[#00D4FF]/5 transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-lg bg-[#0099BB]/10 dark:bg-[#00D4FF]/10 text-[#0099BB] dark:text-[#00D4FF] group-hover:bg-[#0099BB]/20 dark:group-hover:bg-[#00D4FF]/20 transition-colors">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <ArrowRight
                      size={16}
                      className={cn(
                        'text-white/20 group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all mt-1',
                        isRtl ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#080D18] dark:text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-[#4A5878] dark:text-white/55 leading-relaxed">{service.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
