'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Code2, Languages } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface WhyItem {
  title: string
  description: string
}

interface WhyOTMAProps {
  locale: string
  title: string
  items: WhyItem[]
}

const ICONS = [Globe, Code2, Languages]
const ACCENTS = [
  { color: '#00D4FF', glow: 'rgba(0,212,255,0.15)',  border: 'rgba(0,212,255,0.25)' },
  { color: '#3080FF', glow: 'rgba(48,128,255,0.15)', border: 'rgba(48,128,255,0.25)' },
  { color: '#c8920a', glow: 'rgba(200,146,10,0.15)', border: 'rgba(200,146,10,0.25)' },
]

export function WhyOTMA({ locale, title, items }: WhyOTMAProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-[#050508] py-28 relative overflow-hidden" aria-labelledby="why-heading">
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
            {locale === 'ar' ? 'ميزتنا' : 'Our edge'}
          </p>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-display leading-tight max-w-xl"
          >
            {title}
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            const accent = ACCENTS[i % ACCENTS.length]

            return (
              <motion.div
                key={item.title}
                initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group p-px rounded-2xl transition-all duration-300 hover:scale-[1.015]"
                style={{
                  background: `linear-gradient(135deg, ${accent.border} 0%, rgba(255,255,255,0.05) 100%)`,
                }}
              >
                <div
                  className={cn(
                    'relative h-full flex flex-col gap-5 p-7 rounded-2xl overflow-hidden',
                    isRtl ? 'text-right items-end' : ''
                  )}
                  style={{ background: '#0A0D16' }}
                >
                  {/* inner glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 80% 60% at ${isRtl ? '80%' : '20%'} 20%, ${accent.glow} 0%, transparent 70%)` }}
                    aria-hidden="true"
                  />

                  {/* decorative corner accent */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${accent.color} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* icon container */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${accent.color}18` }}
                  >
                    <Icon size={22} style={{ color: accent.color }} aria-hidden="true" />
                    {/* icon glow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 20px ${accent.color}40` }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* text */}
                  <div className="relative z-10 flex flex-col gap-2.5">
                    <h3 className="text-lg font-semibold text-white/90 font-display leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
