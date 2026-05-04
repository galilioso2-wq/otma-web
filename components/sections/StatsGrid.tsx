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

export function StatsGrid({ locale, items }: StatsGridProps) {
  const isRtl = locale === 'ar'

  return (
    <section className="bg-[#080D18] py-20 border-y border-white/8">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {items.map((stat, i) => (
            <div
              key={i}
              className={cn('flex flex-col gap-2', isRtl ? 'items-end text-right' : 'items-start')}
            >
              <span className="font-display font-medium text-3xl sm:text-4xl text-[#00D4FF]">
                {stat.value}
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
