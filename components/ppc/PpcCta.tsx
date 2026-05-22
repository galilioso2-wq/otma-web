export function PpcCta() {
  return (
    <section id="contact" className="relative bg-[#0B0F1A] py-28 border-t border-white/8 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,203,186,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        {/* OTMA byline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#7ACBBA]/20 bg-[#7ACBBA]/[0.07] text-[11px] font-semibold text-[#7ACBBA] uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7ACBBA]" aria-hidden="true" />
          Deployed by OTMA · Replicable for your organization
        </div>

        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-5">
          What you just saw — OTMA can build
          <br className="hidden sm:block" />
          <span className="text-white/45">this for your enterprise.</span>
        </h2>

        <p className="text-white/50 mb-4 max-w-xl mx-auto leading-relaxed text-base">
          This platform was designed and deployed by{' '}
          <a href="/en" className="text-white/70 hover:text-[#7ACBBA] transition-colors font-medium">
            OTMA
          </a>{' '}
          — an AI engineering firm based in Riyadh. We build production-grade agent systems
          tailored to your industry, your data, and your compliance requirements.
        </p>

        <p className="text-white/35 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
          Typical delivery: 8 weeks from kickoff to live agents.
          Your infrastructure. Your data. Full ownership after we leave.
        </p>

        <a
          href="/en/contact"
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-bold text-[#0B0F1A] transition-all"
          style={{
            background: 'linear-gradient(135deg, #7ACBBA 0%, #5BB8A6 100%)',
            boxShadow: '0 0 80px rgba(122,203,186,0.20)',
          }}
        >
          Talk to OTMA about your use case
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <p className="text-xs text-white/20 mt-5">
          Response within one business day · No commitment required
        </p>
      </div>
    </section>
  )
}
