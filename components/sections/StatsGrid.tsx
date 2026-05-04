'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
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

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const parsed = parseValue(value)

  useEffect(() => {
    if (!inView || !parsed || prefersReduced) {
      setDisplay(value)
      return
    }
    const duration = 1400
    const start = performance.now()
    const from = 0
    const to = parsed.num

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      const formatted = Number.isInteger(to) ? Math.round(current) : current.toFixed(1)
      setDisplay(`${parsed!.prefix}${formatted}${parsed!.suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, prefersReduced]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>
}

export function StatsGrid({ locale, items }: StatsGridProps) {
  const isRtl = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="bg-[#080D18] py-20 border-y border-white/8"
      style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {items.map((stat, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col gap-2 transition-all duration-700',
                isRtl ? 'items-end text-right' : 'items-start'
              )}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(20px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="font-display font-medium text-3xl sm:text-4xl text-[#00D4FF]">
                <AnimatedStat value={stat.value} />
              </span>
              <span className="text-sm text-[#808890] leading-snug max-w-[160px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
