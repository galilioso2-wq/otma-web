'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

/* ── perspective grid drawn as SVG ── */
function PerspectiveGrid() {
  const W = 900
  const H = 720
  const vx = W / 2
  const vy = H * 0.2

  const spokes: string[] = []
  const spokeCount = 24
  for (let i = 0; i <= spokeCount; i++) {
    const bx = (W / spokeCount) * i
    spokes.push(`M${vx},${vy} L${bx},${H}`)
  }

  const horizontals: string[] = []
  const steps = 14
  for (let i = 1; i <= steps; i++) {
    const t = Math.pow(i / steps, 1.6)
    const y = vy + (H - vy) * t
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
        <radialGradient id="vpGlow" cx="50%" cy="20%" r="28%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#3060FF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="28%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fadeSides" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="12%" stopColor="#000" stopOpacity="0" />
          <stop offset="88%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="65%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.85" />
        </linearGradient>
        <mask id="gridMask">
          <rect width={W} height={H} fill="white" />
          <rect width={W} height={H} fill="url(#fadeTop)" />
          <rect width={W} height={H} fill="url(#fadeSides)" />
          <rect width={W} height={H} fill="url(#fadeBottom)" />
        </mask>
      </defs>

      <rect width={W} height={H} fill="#03061a" />

      <g mask="url(#gridMask)" opacity="0.65">
        {spokes.map((d, i) => (
          <path key={`s${i}`} d={d} stroke="#1a4aaa" strokeWidth="0.7" fill="none" />
        ))}
        {spokes.filter((_, i) => i % 4 === 2).map((d, i) => (
          <path key={`g${i}`} d={d} stroke="#c8920a" strokeWidth="0.5" fill="none" opacity="0.4" />
        ))}
      </g>

      <g mask="url(#gridMask)" opacity="0.6">
        {horizontals.map((d, i) => (
          <path key={`h${i}`} d={d} stroke="#1a4aaa" strokeWidth="0.6" fill="none" />
        ))}
      </g>

      <rect width={W} height={H} fill="url(#vpGlow)" />
      <circle cx={vx} cy={vy} r="18" fill="#00D4FF" opacity="0.22" />
      <circle cx={vx} cy={vy} r="6" fill="#ffffff" opacity="0.55" />
    </svg>
  )
}

/* ── spotlight rays from top centre ── */
function SpotlightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 65% at 50% -5%, rgba(40,70,220,0.60) 0%, rgba(20,40,160,0.20) 45%, transparent 70%)',
        }}
      />
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

/* ── OTMA app dashboard mockup ── */
function AppMockup({ isRtl }: { isRtl: boolean }) {
  const kpis = isRtl
    ? [
        { val: '٤.٢م', label: 'الإيرادات اليوم', change: '+٨٪', up: true },
        { val: '٧٨٪', label: 'معالجة تلقائية', change: '+١٢٪', up: true },
        { val: '٩٢', label: 'إجراءات الوكيل', change: 'اليوم', up: null },
      ]
    : [
        { val: 'SAR 4.2M', label: 'Revenue Today', change: '+8%', up: true },
        { val: '78%', label: 'Auto-resolved', change: '+12%', up: true },
        { val: '92', label: 'Agent Actions', change: 'today', up: null },
      ]

  const navItems = isRtl
    ? [['لوحة القيادة', true], ['التحليلات', false], ['وكلاء الذكاء', false], ['التقارير', false], ['التحصيلات', false]]
    : [['Dashboard', true], ['Analytics', false], ['AI Agents', false], ['Reports', false], ['Collections', false]]

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        background: '#080D18',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,212,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      dir="ltr"
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.06]"
        style={{ background: '#0A0E1A' }}
      >
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div
          className="flex-1 mx-2 px-3 py-[3px] rounded-full text-white/20 text-[11px] font-mono truncate"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          app.otma.io/dashboard
        </div>
        <div className="flex gap-1 shrink-0">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-4 h-[2px] rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ height: '230px' }}>
        {/* Sidebar */}
        <div
          className="w-40 flex flex-col p-3 gap-1 shrink-0"
          style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <div
              className="w-5 h-5 rounded-full shrink-0"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #3060FF)' }}
            />
            <span className="text-white text-[11px] font-bold tracking-wide">OTMA</span>
          </div>
          {navItems.map(([label, active]) => (
            <div
              key={String(label)}
              className="px-2 py-[5px] rounded-lg text-[10px] transition-colors"
              style={{
                background: active ? 'rgba(0,212,255,0.08)' : 'transparent',
                border: active ? '1px solid rgba(0,212,255,0.18)' : '1px solid transparent',
                color: active ? '#00D4FF' : 'rgba(255,255,255,0.32)',
              }}
            >
              {String(label)}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex-1 flex flex-col gap-2.5 p-3 overflow-hidden">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {kpis.map(({ val, label, change, up }) => (
              <div
                key={label}
                className="rounded-lg p-2"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="text-[#00D4FF] font-bold text-sm leading-none">{val}</div>
                <div className="mt-1 text-[9px] leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {label}
                </div>
                <div
                  className="text-[9px] mt-0.5 font-medium"
                  style={{
                    color: up === true ? '#4ade80' : up === false ? '#f87171' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {change}
                </div>
              </div>
            ))}
          </div>

          {/* Chat messages */}
          <div className="flex flex-col gap-2 flex-1 overflow-hidden">
            <div
              className="rounded-xl px-3 py-2 text-[10px] leading-relaxed max-w-[80%] self-start"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {isRtl ? 'ما هي أبرز مخاطر التحصيل هذا الأسبوع؟' : 'What are the top collections risks this week?'}
            </div>
            <div
              className="rounded-xl px-3 py-2 text-[10px] leading-relaxed max-w-[85%] self-end"
              style={{
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.15)',
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              <span style={{ color: '#00D4FF', fontWeight: 600 }}>OTMA: </span>
              {isRtl
                ? '٣ حسابات تجاوزت ٩٠ يوماً — السلام للتجارة (٨٤٢ألف ر.س)، الرياض الصناعية (٦١٤ألف ر.س). يُوصى بالتصعيد.'
                : '3 accounts exceed 90-day overdue — Al Salam Trading (SAR 842K), Riyadh Industrial Corp (SAR 614K). Recommend escalation.'}
            </div>
            {/* Typing indicator */}
            <div
              className="flex items-center gap-[5px] px-3 py-2 rounded-xl self-start"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                width: 'fit-content',
              }}
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{
                    background: 'rgba(0,212,255,0.65)',
                    animation: `typing-dot 1.4s ${i * 0.22}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
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

export function Hero({
  locale,
  title,
  subtitle,
  ctaPrimary,
  ctaPrimaryHref,
  ctaSecondary,
  ctaSecondaryHref,
  socialProof,
}: HeroProps) {
  const prefersReduced = useReducedMotion()
  const isRtl = locale === 'ar'

  /* Render headline: make "intelligent" italic serif (EN only) */
  function renderTitle(titleText: string) {
    const words = titleText.split(' ')
    const last = words.pop()!
    const remaining = words.join(' ')

    if (isRtl) {
      return (
        <>
          <span className="text-white">{remaining} </span>
          <span className="text-gradient-cyan">{last}</span>
        </>
      )
    }

    const target = 'intelligent'
    const idx = remaining.toLowerCase().indexOf(target)
    if (idx === -1) {
      return (
        <>
          <span className="text-white">{remaining} </span>
          <span className="text-gradient-cyan">{last}</span>
        </>
      )
    }

    const before = remaining.slice(0, idx)
    const italic = remaining.slice(idx, idx + target.length)
    const after = remaining.slice(idx + target.length)

    return (
      <>
        <span className="text-white">{before}</span>
        <em
          className="text-white/95"
          style={{ fontStyle: 'italic', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
        >
          {italic}
        </em>
        <span className="text-white">{after} </span>
        <span className="text-gradient-cyan">{last}</span>
      </>
    )
  }

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
          <div className="relative">
            {/* SVG background — tall enough to cover mockup */}
            <div className="absolute inset-0 min-h-[760px] sm:min-h-[860px]" aria-hidden="true">
              <PerspectiveGrid />
            </div>

            {/* gradient vignette at card edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 45% at 50% 105%, rgba(5,5,8,0.75) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* card content — flows naturally */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-8 py-16 sm:py-20 text-center">

              {/* ── Deployment badge ── */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full text-white/60 text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                initial={prefersReduced ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <span
                  className="w-[7px] h-[7px] rounded-full shrink-0"
                  style={{ background: '#00D4FF', boxShadow: '0 0 6px #00D4FF' }}
                  aria-hidden="true"
                />
                {isRtl ? 'منتشر عبر السعودية ودول الخليج' : 'Deployed across Saudi Arabia & GCC'}
                <span className="text-white/30 text-[10px]" aria-hidden="true">→</span>
              </motion.div>

              {/* ── Headline ── */}
              <motion.h1
                id="hero-heading"
                className={cn(
                  'font-sans font-light leading-[1.1] tracking-normal',
                  'text-4xl sm:text-5xl lg:text-6xl max-w-2xl',
                  isRtl ? 'font-arabic' : ''
                )}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                {renderTitle(title)}
              </motion.h1>

              {/* ── CTAs ── */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
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
                <Link
                  href={ctaSecondaryHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-all"
                >
                  {ctaSecondary}
                </Link>
              </motion.div>

              {/* ── Try platform link ── */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <a
                  href="https://otma-enterprise-agents.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white/90 transition-colors group"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                    style={{ animation: 'pulse 2s infinite' }}
                    aria-hidden="true"
                  />
                  {isRtl ? 'جرّب وكلاء OTMA المؤسسية الآن' : 'Try OTMA Enterprise Agents live'}
                  <span className="text-white/30 group-hover:text-white/70 transition-colors text-xs" aria-hidden="true">↗</span>
                </a>
              </motion.div>

              {/* ── Subtitle ── */}
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

              {/* ── App Mockup ── */}
              <motion.div
                className="w-full mt-3"
                initial={prefersReduced ? false : { opacity: 0, y: 32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.0, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <AppMockup isRtl={isRtl} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* scroll pulse */}
        <motion.div
          className="flex flex-col items-center gap-1.5 mt-2"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
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
          <h2 className="font-sans font-light text-[#0D1421] dark:text-white text-4xl sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[1.1] tracking-normal">
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
