'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { SynthesisMark } from '@/components/brand/SynthesisMark'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface HeroProps {
  locale: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

export function Hero({ locale, title, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  const prefersReduced = useReducedMotion()
  const isRtl = locale === 'ar'

  return (
    <section
      className="relative min-h-screen flex items-center bg-[#080D18] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* background orbital lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#00D4FF]/5"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full border border-[#00D4FF]/3"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.04)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10 py-32">
        <div className={cn('flex flex-col items-center text-center gap-12', isRtl ? 'items-center' : '')}>
          {/* Synthesis mark */}
          <motion.div
            initial={prefersReduced ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <SynthesisMark size={120} theme="dark" animated={!prefersReduced} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            className="font-display font-medium text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight max-w-4xl"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={cn('flex flex-wrap gap-4 justify-center', isRtl ? 'flex-row-reverse' : '')}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] transition-colors shadow-[0_0_24px_rgba(0,212,255,0.3)]"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium border border-[#00D4FF]/60 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors"
            >
              {ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080D18] to-transparent pointer-events-none" />
    </section>
  )
}
