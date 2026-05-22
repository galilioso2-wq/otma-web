'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ROUTES = [
  {
    keywords: 'Sales · Lead · Pricing · Campaign · Product',
    agent: '📊 PPC Intelligence',
    color: '#7ACBBA',
    multi: false,
  },
  {
    keywords: 'HR · Headcount · Nitaqat · Leave · GOSI · Recruitment',
    agent: '👥 HR Agent',
    color: '#6366F1',
    multi: false,
  },
  {
    keywords: 'Finance · Budget · P&L · ZATCA · ROAS · Cash flow',
    agent: '💰 Finance Agent',
    color: '#22C55E',
    multi: false,
  },
  {
    keywords: 'Inventory · Supplier · Delivery · Stockout · 3PL',
    agent: '🔗 Supply Chain',
    color: '#F97316',
    multi: false,
  },
  {
    keywords: 'Quality · ISO · Complaint · Recall · SFDA · SASO',
    agent: '✅ QC Agent',
    color: '#0EA5E9',
    multi: false,
  },
  {
    keywords: 'System · API · Uptime · Incident · Server · Tracking',
    agent: '⚙️ Technical',
    color: '#A855F7',
    multi: false,
  },
  {
    keywords: 'Cross-domain question detected',
    agent: 'Multiple agents in parallel ⚡',
    color: '#00D4FF',
    multi: true,
  },
]

export function PpcOrchestrator() {
  const reduced = useReducedMotion()

  return (
    <section id="orchestrator" className="bg-[#0B0F1A] py-24 border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: copy block */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF] mb-4">
              Enterprise Orchestrator
            </p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-6">
              Ask anything.
              <br />
              <span className="text-white/50">The right expert answers — automatically.</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-5">
              The Orchestrator reads every message, scores it against keyword signals for each domain,
              and routes to the correct agent — or activates{' '}
              <span className="text-white/80">multiple agents in parallel</span> for cross-functional questions.
            </p>
            <p className="text-white/55 leading-relaxed mb-8">
              Ask{' '}
              <span className="text-white/75 italic">
                "Will our inventory support next month's campaign?"
              </span>{' '}
              and Supply Chain, QC, and Finance all respond together in one answer.
            </p>

            {/* Orchestrator badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[#00D4FF]/20 bg-[#00D4FF]/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/15 flex items-center justify-center text-sm">
                🏢
              </div>
              <div>
                <p className="text-sm font-bold text-white">Enterprise Orchestrator</p>
                <p className="text-xs text-[#00D4FF]/70">Routing · Parallel activation · Response attribution</p>
              </div>
            </div>
          </div>

          {/* Right: routing table */}
          <div className="space-y-2">
            {ROUTES.map((route, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                  route.multi
                    ? 'border-[#00D4FF]/25 bg-[#00D4FF]/[0.06]'
                    : 'border-white/8 bg-white/[0.025] hover:border-white/15'
                }`}
              >
                {/* Keyword label */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 leading-snug truncate">{route.keywords}</p>
                </div>

                {/* Arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0 text-white/20"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Agent label */}
                <span
                  className="text-xs font-bold flex-shrink-0 whitespace-nowrap"
                  style={{ color: route.color }}
                >
                  {route.agent}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
