'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface ProcessTimelineProps {
  locale: string
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export function ProcessTimeline({ locale, title, subtitle, steps }: ProcessTimelineProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(lineRef, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#080D18] py-28 relative overflow-hidden" aria-labelledby="process-heading">
      {/* subtle radial glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)' }}
        aria-hidden="true"
      />

      <Container>
        {/* section header */}
        <motion.div
          className={cn('mb-20', isRtl ? 'text-right' : 'text-left')}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-3">
            {title}
          </p>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-display leading-tight max-w-2xl"
          >
            {subtitle}
          </h2>
        </motion.div>

        <div className="relative max-w-2xl">
          {/* ── animated connecting line ── */}
          <div
            ref={lineRef}
            className={cn(
              'absolute top-8 bottom-8 w-px overflow-hidden',
              isRtl ? 'right-7 sm:right-9' : 'left-7 sm:left-9'
            )}
            aria-hidden="true"
          >
            {/* static dim base */}
            <div className="absolute inset-0 bg-white/[0.06]" />
            {/* animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                background: 'linear-gradient(180deg, #00D4FF 0%, #3080FF 50%, rgba(48,128,255,0.2) 100%)',
                boxShadow: '0 0 12px rgba(0,212,255,0.5)',
              }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* fill needs height */}
              <div className="h-[1200px]" />
            </motion.div>
          </div>

          {/* ── steps ── */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className={cn(
                  'relative flex gap-6 sm:gap-8 pb-14 last:pb-0',
                  isRtl ? 'flex-row-reverse' : ''
                )}
                initial={prefersReduced ? false : { opacity: 0, x: isRtl ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.15 }}
              >
                {/* step number — gradient ring + glowing interior */}
                <div className="relative z-10 flex-shrink-0">
                  {/* outer pulse ring (only on first step) */}
                  {i === 0 && !prefersReduced && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(0,212,255,0.2)',
                        animation: 'pulse-ring 2.5s ease-out infinite',
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* gradient border wrapper */}
                  <div
                    className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full p-px flex items-center justify-center"
                    style={{
                      background: i <= 1
                        ? 'linear-gradient(135deg, #00D4FF 0%, #3080FF 100%)'
                        : 'linear-gradient(135deg, rgba(0,212,255,0.4) 0%, rgba(48,128,255,0.2) 100%)',
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#080D18] flex items-center justify-center">
                      <span
                        className="font-mono font-bold text-sm sm:text-base"
                        style={{
                          color: i <= 1 ? '#00D4FF' : 'rgba(0,212,255,0.5)',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* content */}
                <div className={cn('flex-1 pt-3.5', isRtl ? 'text-right' : '')}>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white font-display mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed sm:text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
