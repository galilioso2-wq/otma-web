import { Globe, Code2, Languages } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface WhyItem {
  title: string
  description: string
}

interface WhyOTMAProps {
  locale: string
  title: string
  items: WhyItem[]
}

const icons = [Globe, Code2, Languages]

export function WhyOTMA({ locale, title, items }: WhyOTMAProps) {
  const isRtl = locale === 'ar'

  return (
    <section className="bg-[#0A0E1A] py-24" aria-labelledby="why-heading">
      <Container>
        <div className={cn('mb-14', isRtl ? 'text-right' : 'text-left')}>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-semibold text-white font-display"
          >
            {title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={item.title}
                className={cn(
                  'p-6 rounded-xl border border-white/8 bg-white/2',
                  isRtl ? 'text-right' : ''
                )}
              >
                <div
                  className={cn(
                    'mb-4 inline-flex p-2.5 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]',
                    isRtl ? 'float-right' : ''
                  )}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>
                {isRtl && <div className="clear-both" />}
                <h3 className="text-base font-semibold text-white mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-[#808890] leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
