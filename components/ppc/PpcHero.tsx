'use client'

import { motion, useReducedMotion } from 'framer-motion'

const STATS = [
  { value: '6', label: 'Specialized Agents' },
  { value: '1', label: 'Orchestrator Brain' },
  { value: 'AR+EN', label: 'Fully Bilingual' },
  { value: 'Live', label: 'ERP Data' },
]

const AGENT_PILLS = [
  { label: '📊 Sales', color: '#7ACBBA' },
  { label: '👥 HR', color: '#6366F1' },
  { label: '💰 Finance', color: '#22C55E' },
  { label: '🔗 Supply Chain', color: '#F97316' },
  { label: '✅ QC', color: '#0EA5E9' },
  { label: '⚙️ Technical', color: '#A855F7' },
]

export function PpcHero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0B0F1A] overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% -5%, rgba(0,212,255,0.14) 0%, rgba(122,203,186,0.06) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 left-[15%] w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(122,203,186,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 right-[12%] w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)' }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center pt-36 pb-24">
        {/* Powered-by badge */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#7ACBBA]/25 bg-[#7ACBBA]/8 text-[11px] font-semibold text-[#7ACBBA] uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7ACBBA] animate-pulse" aria-hidden="true" />
          Powered by Claude · Enterprise AI Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-white leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
        >
          6 AI Agents.{' '}
          <span style={{ color: '#7ACBBA' }}>One Orchestrator.</span>
          <br className="hidden sm:block" />
          Complete Enterprise Intelligence.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Ask any business question in Arabic or English. The Orchestrator routes it
          to the right specialist automatically — or activates multiple agents in parallel
          for cross-functional answers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-bold text-[#0B0F1A] transition-all"
            style={{
              background: 'linear-gradient(135deg, #7ACBBA 0%, #5BB8A6 100%)',
              boxShadow: '0 0 48px rgba(122,203,186,0.28)',
            }}
          >
            Book a 30-min Demo
          </a>
          <a
            href="#agents"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white/75 border border-white/15 hover:border-white/35 hover:text-white transition-all"
          >
            Meet the 6 Agents
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Agent pills */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {AGENT_PILLS.map((pill) => (
            <span
              key={pill.label}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                color: pill.color,
                borderColor: `${pill.color}30`,
                background: `${pill.color}0D`,
              }}
            >
              {pill.label}
            </span>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-5 px-3 bg-white/[0.03] border-r border-white/8 last:border-r-0"
            >
              <span className="text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-[11px] text-white/35 mt-1 text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
