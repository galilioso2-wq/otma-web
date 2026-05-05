'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Database, BarChart3, Bot, Check, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface Tier {
  number: string
  name: string
  tag: string
  description: string
  items: string[]
}

interface DataFoundationsProps {
  locale: string
  label: string
  title: string
  subtitle: string
  tiers: Tier[]
}

const TIER_ICONS = [Database, BarChart3, Bot]
const TIER_ACCENTS = ['#1a6cf5', '#00D4FF', '#c8920a']

export function DataFoundations({ locale, label, title, subtitle, tiers }: DataFoundationsProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="bg-[#080D18] py-24 border-t border-white/6"
      aria-labelledby="data-foundations-heading"
    >
      <Container>
        {/* heading */}
        <motion.div
          className={cn('mb-16 text-center')}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-3">
            {label}
          </p>
          <h2
            id="data-foundations-heading"
            className="text-3xl sm:text-4xl font-semibold text-white font-display leading-tight max-w-3xl mx-auto"
          >
            {title}
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* tier cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const Icon = TIER_ICONS[i] ?? Database
            const accent = TIER_ACCENTS[i] ?? '#00D4FF'

            return (
              <motion.div
                key={tier.number}
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={cn(
                  'relative flex flex-col gap-6 p-8 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden',
                  isRtl ? 'text-right' : 'text-left'
                )}
              >
                {/* top accent glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
                />

                {/* number + tag row */}
                <div className={cn('flex items-center gap-3', isRtl ? 'flex-row-reverse' : '')}>
                  <span
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md"
                    style={{ color: accent, background: `${accent}18` }}
                  >
                    {tier.number}
                  </span>
                  <span className="text-xs text-white/30 uppercase tracking-widest font-medium">
                    {tier.tag}
                  </span>
                </div>

                {/* icon + name */}
                <div className={cn('flex items-start gap-4', isRtl ? 'flex-row-reverse' : '')}>
                  <div
                    className="mt-0.5 flex-shrink-0 p-3 rounded-xl"
                    style={{ background: `${accent}15` }}
                  >
                    <Icon size={22} style={{ color: accent }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white font-display">{tier.name}</h3>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">{tier.description}</p>
                  </div>
                </div>

                {/* feature list */}
                <ul className="space-y-2.5">
                  {tier.items.map((item, j) => (
                    <li
                      key={j}
                      className={cn('flex items-start gap-2.5 text-sm text-white/65', isRtl ? 'flex-row-reverse' : '')}
                    >
                      <Check
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* connector arrow — shows between cards on large screens, hidden on last */}
                {i < tiers.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 rounded-full bg-[#080D18] border border-white/12"
                    aria-hidden="true"
                  >
                    <ArrowRight size={14} className="text-white/40" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
