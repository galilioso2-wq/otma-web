'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { SynthesisMark } from '@/components/brand/SynthesisMark'
import { Container } from '@/components/layout/Container'
import { ParticleCanvas } from '@/components/ui/ParticleCanvas'
import { Typewriter } from '@/components/ui/Typewriter'
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
      {/* particle network background */}
      <ParticleCanvas />

      {/* radial glow layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,212,255,0.07)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#00D4FF]/8 animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-[#00D4FF]/4 animate-[spin_80s_linear_infinite_reverse]" />
      </div>

      <Container className="relative z-10 py-32">
        <div className={cn('flex flex-col items-center text-center gap-10', isRtl ? 'items-center' : '')}>

          {/* Synthesis mark */}
          <motion.div
            initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SynthesisMark size={120} theme="dark" animated={!prefersReduced} />
          </motion.div>

          {/* Headline with typewriter */}
          <motion.h1
            id="hero-heading"
            className="font-display font-medium text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight max-w-4xl min-h-[1.2em]"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Typewriter text={title} delay={800} speed={isRtl ? 55 : 38} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={cn('flex flex-wrap gap-4 justify-center', isRtl ? 'flex-row-reverse' : '')}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.6 }}
          >
            <Link
              href={`/${locale}/contact`}
              className="relative inline-flex items-center px-7 py-3.5 rounded-lg text-base font-medium bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] active:scale-[0.97] transition-all shadow-[0_0_28px_rgba(0,212,255,0.45)] hover:shadow-[0_0_40px_rgba(0,212,255,0.65)]"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center px-7 py-3.5 rounded-lg text-base font-medium border border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/80 active:scale-[0.97] transition-all"
            >
              {ctaSecondary}
            </Link>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-4"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.2 }}
            aria-hidden="true"
          >
            <div className="w-px h-10 bg-gradient-to-b from-[#00D4FF]/60 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </Container>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080D18] to-transparent pointer-events-none" />
    </section>
  )
}
