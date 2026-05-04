'use client'

import { motion, useReducedMotion } from 'framer-motion'
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

  return (
    <section className="bg-[#0A0E1A] py-24" aria-labelledby="process-heading">
      <Container>
        <motion.div
          className={cn('mb-14', isRtl ? 'text-right' : 'text-left')}
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
            className="text-3xl sm:text-4xl font-semibold text-white font-display leading-tight max-w-2xl"
          >
            {subtitle}
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* connecting line */}
          <div
            className={cn(
              'absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF]/40 via-[#00D4FF]/20 to-transparent',
              isRtl ? 'right-6 sm:right-8' : 'left-6 sm:left-8'
            )}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className={cn(
                  'relative flex gap-6 sm:gap-8 pb-12 last:pb-0',
                  isRtl ? 'flex-row-reverse' : ''
                )}
                initial={prefersReduced ? false : { opacity: 0, x: isRtl ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* step number bubble */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border border-[#00D4FF]/40 bg-[#0A0E1A]">
                  <span className="font-mono text-[#00D4FF] text-sm sm:text-base font-semibold">
                    {step.number}
                  </span>
                </div>

                {/* content */}
                <div className={cn('flex-1 pt-3', isRtl ? 'text-right' : '')}>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[#808890] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
