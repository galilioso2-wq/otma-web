'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

/* ── perspective grid drawn as SVG ── */
function PerspectiveGrid() {
  const W = 900
  const H = 380
  const vx = W / 2   // vanishing point x = centre
  const vy = H * 0.3 // vanishing point y = 30% from top

  // radial spokes from vanishing point to bottom edge
  const spokes: string[] = []
  const spokeCount = 22
  for (let i = 0; i <= spokeCount; i++) {
    const bx = (W / spokeCount) * i
    spokes.push(`M${vx},${vy} L${bx},${H}`)
  }

  // horizontal cross-lines (perspective spacing – exponential)
  const horizontals: string[] = []
  const steps = 11
  for (let i = 1; i <= steps; i++) {
    const t = Math.pow(i / steps, 1.6)
    const y = vy + (H - vy) * t
    // interpolate x extents at this y
    const ratio = (y - vy) / (H - vy)
    const lx = vx - (vx - 0) * ratio
    const rx = vx + (W - vx) * ratio
    horizontals.push(`M${lx},${y} L${rx},${y}`)
  }

  return (
    <svg
      width="100%" height="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        {/* vanishing-point glow */}
        <radialGradient id="vpGlow" cx="50%" cy="30%" r="30%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#3060FF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        {/* fade out at edges / top */}
        <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="35%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fadeSides" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="12%" stopColor="#000" stopOpacity="0" />
          <stop offset="88%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </linearGradient>
        <mask id="gridMask">
          <rect width={W} height={H} fill="white" />
          <rect width={W} height={H} fill="url(#fadeTop)" />
          <rect width={W} height={H} fill="url(#fadeSides)" />
        </mask>
      </defs>

      {/* grid base bg */}
      <rect width={W} height={H} fill="#03061a" />

      {/* spokes */}
      <g mask="url(#gridMask)" opacity="0.7">
        {spokes.map((d, i) => (
          <path key={`s${i}`} d={d} stroke="#1a4aaa" strokeWidth="0.7" fill="none" />
        ))}
        {/* gold accent spokes every ~4th */}
        {spokes.filter((_, i) => i % 4 === 2).map((d, i) => (
          <path key={`g${i}`} d={d} stroke="#c8920a" strokeWidth="0.5" fill="none" opacity="0.5" />
        ))}
      </g>

      {/* horizontals */}
      <g mask="url(#gridMask)" opacity="0.65">
        {horizontals.map((d, i) => (
          <path key={`h${i}`} d={d} stroke="#1a4aaa" strokeWidth="0.6" fill="none" />
        ))}
      </g>

      {/* vanishing point glow */}
      <rect width={W} height={H} fill="url(#vpGlow)" />

      {/* bright spot at VP */}
      <circle cx={vx} cy={vy} r="18" fill="#00D4FF" opacity="0.25" />
      <circle cx={vx} cy={vy} r="6" fill="#ffffff" opacity="0.6" />
    </svg>
  )
}

/* ── spotlight rays from top centre ── */
function SpotlightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* central blue radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 65% at 50% -5%, rgba(40,70,220,0.60) 0%, rgba(20,40,160,0.20) 45%, transparent 70%)',
        }}
      />
      {/* individual light ray beams */}
      {[-38, -26, -16, -8, 0, 8, 16, 26, 38].map((angle, i) => (
        <div
          key={i}
          className="absolute top-0 left-1/2 origin-top"
          style={{
            width: '2px',
            height: '65vh',
            background: 'linear-gradient(to bottom, rgba(120,160,255,0.25) 0%, transparent 100%)',
            transform: `translateX(-50%) rotate(${angle}deg)`,
            opacity: 1 - Math.abs(angle) / 55,
          }}
        />
      ))}

      {/* floating luminous orbs */}
      <div
        className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 65%)',
          animation: 'orb-drift 16s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[30%] right-[6%] w-56 h-56 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(48,128,255,0.10) 0%, transparent 65%)',
          animation: 'orb-drift-b 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[10%] left-[20%] w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(200,146,10,0.08) 0%, transparent 65%)',
          animation: 'orb-drift 24s ease-in-out infinite reverse',
        }}
      />
    </div>
  )
}

interface HeroProps {
  locale: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaPrimaryHref: string
  ctaSecondary: string
  ctaSecondaryHref: string
  socialProof?: string
}

export function Hero({ locale, title, subtitle, ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref, socialProof }: HeroProps) {
  const prefersReduced = useReducedMotion()
  const isRtl = locale === 'ar'

  return (
    <section
      className="relative flex flex-col items-center justify-start bg-[#F7F9FC] dark:bg-[#050508] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* spotlight rays */}
      <SpotlightRays />

      {/* ── NAV SPACER + HERO CARD ── */}
      <Container className="relative z-10 w-full pt-24 pb-10 flex flex-col items-center gap-8">

        {/* ── HERO CARD ── */}
        <motion.div
          className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.13)',
            boxShadow: '0 0 80px rgba(30,60,220,0.18), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* perspective grid fills the card */}
          <div className="relative h-[360px] sm:h-[420px]">
            <PerspectiveGrid />

            {/* gradient vignette at card edges for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 55% at 50% 105%, rgba(5,5,8,0.7) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* card overlay content — centred vertically */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
              <motion.h1
                id="hero-heading"
                className={cn(
                  'font-display font-medium leading-[1.08] tracking-normal',
                  'text-4xl sm:text-5xl lg:text-6xl max-w-2xl',
                  isRtl ? 'font-arabic' : ''
                )}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                {/* split last word to gradient */}
                {(() => {
                  const words = title.split(' ')
                  const last = words.pop()
                  return (
                    <>
                      <span className="text-white">{words.join(' ')} </span>
                      <span className="text-gradient-cyan">{last}</span>
                    </>
                  )
                })()}
              </motion.h1>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                {/* Primary CTA */}
                <div className="relative">
                  {!prefersReduced && (
                    <div
                      className="absolute -inset-2 rounded-full blur-xl opacity-30"
                      style={{ background: 'rgba(255,255,255,0.4)' }}
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    href={ctaPrimaryHref}
                    className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-white text-[#080D18] hover:bg-white/92 active:scale-[0.97] transition-all shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
                  >
                    {ctaPrimary}
                  </Link>
                </div>
                {/* Secondary CTA */}
                <Link
                  href={ctaSecondaryHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-all"
                >
                  {ctaSecondary}
                </Link>
              </motion.div>

              <motion.p
                className="text-base sm:text-lg text-white/60 max-w-lg leading-relaxed"
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.75 }}
              >
                {subtitle}
              </motion.p>

              {socialProof && (
                <motion.p
                  className="text-xs text-white/30 mt-1"
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  {socialProof}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* scroll pulse */}
        <motion.div
          className="flex flex-col items-center gap-1.5 mt-2"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>
      </Container>

      {/* bottom section teaser — "AI Agents for Smarter Operations" */}
      <div className="relative z-10 w-full border-t border-[#0D1421]/6 dark:border-white/6 bg-[#F7F9FC] dark:bg-[#050508] py-12 text-center px-4">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0099BB] dark:text-[#00D4FF] mb-4">
            {locale === 'ar' ? 'وكلاء ذكاء اصطناعي' : 'AI Agents'}
          </p>
          <h2 className="font-display font-medium text-[#0D1421] dark:text-white text-4xl sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[1.08] tracking-normal">
            {locale === 'ar'
              ? 'أتمتة أذكى للمؤسسات'
              : 'AI Agents for Smarter Enterprise Operations'}
          </h2>
          <p className="mt-6 text-[#0D1421]/60 dark:text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            {locale === 'ar'
              ? 'منصتنا المدعومة بالذكاء الاصطناعي تحوّل العمليات المؤسسية عبر التحليلات الفورية والأتمتة الذكية.'
              : 'Our AI-driven platform transforms enterprise operations through real-time analytics, automation, and intelligent optimization.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
