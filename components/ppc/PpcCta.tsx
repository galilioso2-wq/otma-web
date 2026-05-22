export function PpcCta() {
  return (
    <section id="contact" className="bg-[#0B0F1A] py-28 border-t border-white/8">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        {/* Glow behind CTA */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,203,186,0.09) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7ACBBA] mb-4">
            Ready to Deploy
          </p>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-6">
            See all 6 agents working live —
            <br className="hidden sm:block" />
            <span className="text-white/50">on your data, in your environment.</span>
          </h2>
          <p className="text-white/50 mb-10 max-w-xl mx-auto leading-relaxed text-base">
            30 minutes. No commitment. We connect to your ERP, run a live query through
            the Orchestrator, and show you exactly what each agent can do for your team.
          </p>

          <a
            href="mailto:founder@otma.io?subject=PPC%20Platform%20Demo%20Request"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold text-[#0B0F1A] transition-all"
            style={{
              background: 'linear-gradient(135deg, #7ACBBA 0%, #5BB8A6 100%)',
              boxShadow: '0 0 80px rgba(122,203,186,0.22)',
            }}
          >
            Book a 30-min Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p className="text-xs text-white/20 mt-5">
            Response within one business day · Built and operated by{' '}
            <a href="/en" className="text-white/35 hover:text-white/60 transition-colors">
              OTMA
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}