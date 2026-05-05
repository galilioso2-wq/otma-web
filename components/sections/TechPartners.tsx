'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Cloud, Sparkles, Snowflake, Zap, BarChart2, Settings2, Link2, MessageCircle,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

interface Partner {
  name: string
  category: string
}

interface TechPartnersProps {
  locale: string
  label: string
  title: string
  subtitle: string
  partners: Partner[]
}

const PARTNER_META: Record<string, { icon: React.ElementType; color: string }> = {
  'Microsoft Azure':   { icon: Cloud,          color: '#0078D4' },
  'OpenAI':            { icon: Sparkles,        color: '#10A37F' },
  'Snowflake':         { icon: Snowflake,       color: '#29B5E8' },
  'Databricks':        { icon: Zap,             color: '#FF3621' },
  'Power BI':          { icon: BarChart2,       color: '#F2C811' },
  'Dynamics 365':      { icon: Settings2,       color: '#0078D4' },
  'LangChain':         { icon: Link2,           color: '#00D4FF' },
  'WhatsApp Business': { icon: MessageCircle,   color: '#25D366' },
}

function PartnerCard({
  partner,
  index,
  prefersReduced,
  isRtl,
}: {
  partner: Partner
  index: number
  prefersReduced: boolean | null
  isRtl: boolean
}) {
  const meta = PARTNER_META[partner.name] ?? { icon: Cloud, color: '#00D4FF' }
  const Icon = meta.icon

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-white/8 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.06] transition-all duration-200 cursor-default overflow-hidden"
    >
      {/* icon */}
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/6 group-hover:bg-white/10 transition-colors duration-200">
        <Icon size={22} className="text-white/40 group-hover:text-white transition-colors duration-200" aria-hidden="true" />
      </div>

      {/* text */}
      <div className={cn('text-center', isRtl ? 'rtl' : '')}>
        <p className="text-sm font-semibold text-white/60 group-hover:text-white/90 transition-colors leading-snug">
          {partner.name}
        </p>
        <p className="text-xs text-white/25 mt-0.5">{partner.category}</p>
      </div>

      {/* brand-coloured underline slides in on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
      />
    </motion.div>
  )
}

export function TechPartners({ locale, label, title, subtitle, partners }: TechPartnersProps) {
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="bg-[#050508] py-24 border-t border-white/6"
      aria-labelledby="tech-partners-heading"
    >
      <Container>
        <motion.div
          className="mb-14 text-center"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-3">
            {label}
          </p>
          <h2
            id="tech-partners-heading"
            className="text-3xl sm:text-4xl font-semibold text-white font-display leading-tight max-w-2xl mx-auto"
          >
            {title}
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {partners.map((partner, i) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
              index={i}
              prefersReduced={prefersReduced}
              isRtl={isRtl}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
