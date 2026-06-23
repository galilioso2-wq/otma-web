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

const ICONS = [Bot, Brain, BarChart3, MessageSquare, Map, RefreshCw, Database, Cloud, Shield]

// Accent color per card for visual variety
const CARD_ACCENTS = [
  '#00D4FF', '#3080FF', '#7C3AED',
  '#10A37F', '#F59E0B', '#EF4444',
  '#00D4FF', '#3080FF', '#7C3AED',
]

export function ServicesGrid({ locale, title, subtitle, items }: ServicesGridProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-[#080D18] py-28 relative" aria-labelledby="services-heading">
      {/* subtle top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)' }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          className={cn('mb-16', isRtl ? 'text-right' : 'text-left')}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-3">
            {title}
          </p>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-[1.05] max-w-2xl"
          >
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]

            return (
              <motion.div
                key={service.slug}
                initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 h-full overflow-hidden"
                >
                  {/* gradient glow that reveals on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at ${isRtl ? '80%' : '20%'} 20%, ${accent}12 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* top accent bar that slides in */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                    aria-hidden="true"
                  />

                  {/* icon row */}
                  <div className={cn('flex items-start justify-between', isRtl ? 'flex-row-reverse' : '')}>
                    <div
                      className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${accent}15`,
                        boxShadow: `0 0 0 0 ${accent}40`,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: accent }}
                        aria-hidden="true"
                        className="transition-all duration-300"
                      />
                    </div>
                    <ArrowRight
                      size={16}
                      className={cn(
                        'text-white/15 group-hover:text-white/70 transition-all mt-1',
                        isRtl
                          ? 'rotate-180 group-hover:-translate-x-1'
                          : 'group-hover:translate-x-1'
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* text */}
                  <div className={cn('flex flex-col gap-2', isRtl ? 'text-right' : '')}>
                    <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed group-hover:text-white/70 transition-colors">
                      {service.description}
                    </p>
                  </div>

                  {/* "Learn more" label */}
                  <div
                    className={cn(
                      'mt-auto flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300',
                      isRtl ? 'flex-row-reverse self-end' : 'self-start'
                    )}
                    style={{ color: accent }}
                  >
                    <span>{isRtl ? 'اعرف المزيد' : 'Learn more'}</span>
                    <ArrowRight size={12} className={isRtl ? 'rotate-180' : ''} aria-hidden="true" />
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
