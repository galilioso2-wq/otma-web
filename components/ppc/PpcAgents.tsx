'use client'

import { motion, useReducedMotion } from 'framer-motion'

const AGENTS = [
  {
    emoji: '📊',
    name: 'PPC Intelligence Agent',
    role: 'Sales & Revenue',
    color: '#7ACBBA',
    best_for: 'Sales team daily use, deal guidance, customer queries',
    capabilities: [
      'Lead scoring: HOT / WARM / COLD / DISQUALIFY',
      'Competitive pricing vs. Al-Watania, Gulf Packaging, Turkish importers',
      'Account health, churn risk & share of wallet analysis',
      'Email templates, follow-up strategies & proposal guidance',
    ],
  },
  {
    emoji: '👥',
    name: 'HR Agent',
    role: 'People & Compliance',
    color: '#6366F1',
    best_for: 'HR team, department managers, compliance queries',
    capabilities: [
      'Headcount analytics & Nitaqat compliance ratios',
      'Payroll summaries, leave & attendance tracking',
      'Saudi Labour Law + GOSI policy guidance',
      'Recruitment pipeline & performance review analysis',
    ],
  },
  {
    emoji: '💰',
    name: 'Finance Agent',
    role: 'Finance & Reporting',
    color: '#22C55E',
    best_for: 'Finance team, CFO, marketing ROI analysis',
    capabilities: [
      'Budget vs. actual variance — P&L, OPEX, EBITDA',
      'ZATCA VAT compliance & marketing spend attribution',
      'Accounts payable/receivable & cash flow analysis',
      'Flags transactions > SAR 100K (CFO) or > SAR 1M (Board)',
    ],
  },
  {
    emoji: '🔗',
    name: 'Supply Chain Agent',
    role: 'Operations & Logistics',
    color: '#F97316',
    best_for: 'Supply chain team, operations, procurement',
    capabilities: [
      'Real-time inventory levels, reorder alerts & days of cover',
      'Supplier performance scoring — OTIF, quality, pricing',
      'Campaign-supply bridge: can inventory support a live ad?',
      'Flags stockouts 🔴 and low-stock warnings 🟡',
    ],
  },
  {
    emoji: '✅',
    name: 'Quality Control Agent',
    role: 'Quality & Compliance',
    color: '#0EA5E9',
    best_for: 'QC team, audits, production compliance, ad verification',
    capabilities: [
      'ISO 9001:2015, SFDA & SASO certification status',
      'Inspection pass/fail rates & NCR tracking',
      'Ad campaign quality gate — verifies claims before launch',
      'Immediate product recall flagging with batch traceability',
    ],
  },
  {
    emoji: '⚙️',
    name: 'Technical Agent',
    role: 'IT & Infrastructure',
    color: '#A855F7',
    best_for: 'IT team, system admins, monitoring & incident response',
    capabilities: [
      'ERP, HRIS, WMS, CRM & Google Ads API uptime monitoring',
      'Active incident triage, status tracking & CI/CD history',
      'API integration health across all agents',
      'PPC platform health — landing page speed & tracking pixels',
    ],
  },
]

export function PpcAgents() {
  const reduced = useReducedMotion()

  return (
    <section id="agents" className="bg-[#080C14] py-24 border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7ACBBA] mb-3">
            Six Specialists
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-[1.05] mb-4" style={{ letterSpacing: '-0.02em' }}>
            Each agent is an expert in its domain
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Not a generic chatbot. Every agent carries domain-specific context — Saudi compliance rules,
            live KPIs, business workflows — so answers are accurate, specific, and immediately actionable.
          </p>
        </div>

        {/* 3×2 agent grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map((agent, i) => (
            <motion.article
              key={agent.name}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col p-6 rounded-2xl border border-white/8 bg-white/[0.025] hover:border-white/16 transition-colors overflow-hidden group"
            >
              {/* Colored top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: agent.color }}
                aria-hidden="true"
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${agent.color}10 0%, transparent 65%)`,
                }}
                aria-hidden="true"
              />

              {/* Agent header */}
              <div className="relative flex items-start gap-3 mb-5">
                <span className="text-2xl leading-none mt-0.5">{agent.emoji}</span>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">{agent.name}</h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: agent.color }}>
                    {agent.role}
                  </p>
                </div>
              </div>

              {/* Capabilities list */}
              <ul className="relative space-y-2.5 flex-1 mb-5">
                {agent.capabilities.map((cap, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span
                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                      style={{ background: agent.color }}
                      aria-hidden="true"
                    />
                    <span className="text-xs text-white/55 leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <div
                className="relative text-[10px] text-white/30 border-t border-white/8 pt-4 leading-relaxed"
              >
                <span className="font-semibold text-white/40">Best for: </span>
                {agent.best_for}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}