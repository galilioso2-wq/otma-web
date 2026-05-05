'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface StatItem {
  value: string
  label: string
}

interface StatsGridProps {
  locale: string
  items: StatItem[]
}

function parseValue(raw: string): { prefix: string; num: number; suffix: string } | null {
  const match = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const parsed = parseValue(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView || !parsed || prefersReduced) {
      setDisplay(value)
      return
    }
    const duration = 1600
    const start = performance.now()
    const to = parsed.num

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = to * eased
      const formatted = Number.isInteger(to) ? Math.round(current) : current.toFixed(1)
      setDisplay(`${parsed!.prefix}${formatted}${parsed!.suffix}`)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, prefersReduced]) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{display}</>
}

export function StatsGrid({ locale, items }: StatsGridProps) {
  const isRtl = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080D18] py-24 overflow-hidden"
      aria-label="Key statistics"
    >
      {/* dot grid texture */}
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" aria-hidden="true" />

      {/* cyan glow at centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
      />

      {/* top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3) 30%, rgba(48,128,255,0.3) 70%, transparent)' }}
        aria-hidden="true"
      />
      {/* bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/[0.07]">
          {items.map((stat, i) => (
            <motion.div
              key={i}
              className={cn(
                'relative flex flex-col px-8 py-6 lg:py-2 gap-3 group',
                isRtl ? 'items-end text-right' : 'items-start',
                i === 0 && !isRtl ? 'pl-0' : '',
                i === items.length - 1 && !isRtl ? 'pr-0' : '',
                i === 0 && isRtl ? 'pr-0' : '',
                i === items.length - 1 && isRtl ? 'pl-0' : '',
              )}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* glow behind number */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              {/* stat value */}
              <div className="relative">
                <span
                  className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none text-gradient-cyan"
                >
                  <AnimatedNumber value={stat.value} inView={inView} />
                </span>
              </div>

              {/* label */}
              <p className="text-sm sm:text-base text-white/45 leading-snug max-w-[180px] font-medium">
                {stat.label}
              </p>

              {/* animated bottom accent line */}
              <div
                className="absolute bottom-0 h-[2px] bg-gradient-to-r from-[#00D4FF]/60 to-[#3080FF]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ left: i === 0 ? 0 : '2rem', right: '2rem' }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
