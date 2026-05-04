'use client'

import { motion, useReducedMotion } from 'framer-motion'
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
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-[#0A0E1A] py-24" aria-labelledby="why-heading">
      <Container>
        <motion.div
          className={cn('mb-14', isRtl ? 'text-right' : 'text-left')}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-semibold text-white font-display">
            {title}
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={item.title}
                className={cn(
                  'p-6 rounded-xl border border-white/8 bg-white/2 hover:border-[#00D4FF]/20 hover:bg-[#00D4FF]/3 transition-colors duration-300',
                  isRtl ? 'text-right' : ''
                )}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
