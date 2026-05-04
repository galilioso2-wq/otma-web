'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
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
    <section className="bg-[#080D18] py-24 relative overflow-hidden" aria-labelledby="cta-heading">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }}
      />
      <Container className="relative z-10">
        <motion.div
          className={cn('flex flex-col items-center text-center gap-6', isRtl ? '' : '')}
          initial={prefersReduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-12 h-px bg-[#00D4FF]" aria-hidden="true" />
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-semibold text-white font-display max-w-2xl leading-tight"
          >
            {title}
          </h2>
          <p className="text-lg text-white/55 max-w-xl">{subtitle}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-2 inline-flex items-center px-8 py-3.5 rounded-lg text-base font-medium bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] active:scale-[0.98] transition-all shadow-[0_0_32px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.45)]"
          >
            {button}
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
