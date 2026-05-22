'use client'

import { motion, useReducedMotion } from 'framer-motion'

const METRICS = [
  { value: '6', suffix: '', label: 'Specialized domain agents' },
  { value: '100', suffix: '%', label: 'Data on your infrastructure' },
  { value: 'AR+EN', suffix: '', label: 'Native bilingual — no translation layer' },
  { value: '24/7', suffix: '', label: 'Live system & ERP monitoring' },
]

const COMPLIANCE = [
  'ZATCA VAT', 'Nitaqat', 'GOSI', 'Saudi Labour Law',
  'ISO 9001:2015', 'SFDA', 'SASO', 'PDPL',
]

export function PpcProof() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-[#080C14] py-24 border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mb-16 rounded-2xl overflow-hidden border border-white/8">
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center py-10 px-6 bg-white/[0.025] border-r border-white/8 last:border-r-0"
            >
              <span className="font-display font-bold text-white leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                {m.value}
                <span className="text-[#7ACBBA]">{m.suffix}</span>
              </span>
              <span className="text-xs text-white/35 leading-relaxed">{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Saudi compliance strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-1">Built for Saudi compliance</p>
            <p className="text-sm text-white/55 max-w-xs leading-relaxed">
              Every agent carries the regulatory context your team needs — no bolt-on compliance layer.
            </p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10 flex-shrink-0" aria-hidden="true" />
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-white/50 border border-white/10 bg-white/[0.03]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}