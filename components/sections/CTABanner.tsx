'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface CTABannerProps {
  locale: string
  title: string
  subtitle: string
  button: string
}

export function CTABanner({ locale, title, subtitle, button }: CTABannerProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="relative bg-[#050508] py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* ── animated gradient blobs ── */}
      {!prefersReduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 65%)',
              animation: 'orb-drift 14s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-[-25%] right-[-15%] w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(48,128,255,0.15) 0%, transparent 65%)',
              animation: 'orb-drift-b 18s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,146,10,0.08) 0%, transparent 70%)',
              animation: 'orb-drift 22s ease-in-out infinite reverse',
            }}
          />
        </div>
      )}

      {/* ── grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none dot-grid-bg opacity-30"
        aria-hidden="true"
      />

      {/* ── top divider line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4) 40%, rgba(48,128,255,0.4) 60%, transparent)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
          initial={prefersReduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* label */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF]">
              {locale === 'ar' ? 'ابدأ الآن' : 'Get started'}
            </span>
          </motion.div>

          {/* headline — key words in gradient */}
          <h2
            id="cta-heading"
            className={cn(
              'font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight',
              isRtl ? 'font-arabic' : ''
            )}
          >
            <span className="text-white">{title.split('?')[0]}</span>
            {title.includes('?') && (
              <span className="text-gradient-cyan">?</span>
            )}
          </h2>

          <p className="text-lg sm:text-xl text-white/50 max-w-xl leading-relaxed">
            {subtitle}
          </p>

          {/* CTA button with shimmer + pulse ring */}
          <div className="relative mt-2">
            {/* pulse ring */}
            {!prefersReduced && (
              <div
                className="absolute inset-0 rounded-xl bg-[#00D4FF]/30"
                style={{ animation: 'pulse-ring 2s ease-out infinite' }}
                aria-hidden="true"
              />
            )}
            <Link
              href={`/${locale}/contact`}
              className={cn(
                'relative inline-flex items-center gap-3 px-9 py-4 rounded-xl text-base font-semibold text-[#050508] overflow-hidden transition-all duration-300',
                'hover:scale-[1.03] active:scale-[0.98]',
                isRtl ? 'flex-row-reverse' : ''
              )}
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #2080FF 100%)',
                boxShadow: '0 0 40px rgba(0,212,255,0.35), 0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {/* shimmer overlay */}
              {!prefersReduced && (
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
                    animation: 'shimmer-slide 3s ease-in-out infinite',
                  }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{button}</span>
              <ArrowRight
                size={18}
                className={cn('relative flex-shrink-0', isRtl ? 'rotate-180' : '')}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* social proof micro-line */}
          <p className="text-sm text-white/25">
            {locale === 'ar'
              ? 'رد خلال يوم عمل واحد · لا التزام مسبق'
              : 'Response within one business day · No commitment required'}
          </p>
        </motion.div>
      </Container>

      {/* ── bottom divider ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
