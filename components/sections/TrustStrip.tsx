'use client'

import { useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface TrustStripProps {
  locale: string
  label: string
  sectors: string[]
}

export function TrustStrip({ locale, label, sectors }: TrustStripProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()
  const doubled = [...sectors, ...sectors]

  return (
    <section className="bg-[#0A0E1A] border-y border-white/8 py-6 overflow-hidden">
      <Container>
        <p className={cn(
          'text-xs font-semibold uppercase tracking-widest text-[#808890] mb-4',
          isRtl ? 'text-right' : 'text-center'
        )}>
          {label}
        </p>
      </Container>

      {/* marquee track */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className={cn(
            'flex gap-3 shrink-0',
            !prefersReduced && (isRtl
              ? 'animate-[marquee-reverse_30s_linear_infinite]'
              : 'animate-[marquee_30s_linear_infinite]')
          )}
        >
          {doubled.map((sector, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-xs font-medium text-white/60 border border-white/10 bg-white/3 hover:border-[#00D4FF]/40 hover:text-[#00D4FF] hover:bg-[#00D4FF]/5 transition-colors whitespace-nowrap cursor-default"
            >
              {sector}
            </span>
          ))}
        </div>
        <div
          className={cn(
            'flex gap-3 shrink-0',
            !prefersReduced && (isRtl
              ? 'animate-[marquee-reverse_30s_linear_infinite]'
              : 'animate-[marquee_30s_linear_infinite]')
          )}
          aria-hidden="true"
        >
          {doubled.map((sector, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-xs font-medium text-white/60 border border-white/10 bg-white/3 whitespace-nowrap"
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
