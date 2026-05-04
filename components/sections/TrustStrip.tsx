import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface TrustStripProps {
  locale: string
  label: string
  sectors: string[]
}

export function TrustStrip({ locale, label, sectors }: TrustStripProps) {
  const isRtl = locale === 'ar'

  return (
    <section className="bg-[#0A0E1A] border-y border-white/8 py-8">
      <Container>
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center gap-6',
            isRtl ? 'sm:flex-row-reverse' : ''
          )}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#808890] whitespace-nowrap shrink-0">
            {label}
          </span>
          <div
            className={cn(
              'flex flex-wrap gap-2 justify-center sm:justify-start',
              isRtl ? 'sm:justify-end' : ''
            )}
          >
            {sectors.map((sector) => (
              <span
                key={sector}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-white/60 border border-white/10 bg-white/3 hover:border-[#00D4FF]/30 hover:text-white/80 transition-colors"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
