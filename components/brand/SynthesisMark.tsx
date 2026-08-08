'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface SynthesisMarkProps {
  size?: number
  theme?: 'dark' | 'light'
  animated?: boolean
  className?: string
}

export function SynthesisMark({
  size = 100,
  theme = 'dark',
  animated = false,
  className = '',
}: SynthesisMarkProps) {
  const prefersReduced = useReducedMotion()
  const shouldAnimate = animated && !prefersReduced

  const teal1 = theme === 'dark' ? '#00D4FF' : '#0099BB'
  const teal2 = theme === 'dark' ? '#7ACBBA' : '#4A9A8A'
  const gradId = `otma-grad-${size}-${theme}`

  // Viewbox 100×100. Center (50,50).
  //
  // Ghost halo: radius 44 — thin full circle for outer orbital atmosphere.
  //
  // Main orbital arc: radius 36, 330° clockwise.
  //   Gap (30°) centered at 2 o'clock (60°). Arc runs from 75° to 45°.
  //   Start (75°):  x=50+36·sin75°≈85  y=50−36·cos75°≈41  → (85, 41)
  //   End   (45°):  x=50+36·sin45°≈75  y=50−36·cos45°≈25  → (75, 25)
  //   large-arc=1, sweep=1 (clockwise long way around = 330°)
  const outerArc = 'M 85 41 A 36 36 0 1 1 75 25'

  // Horizontal eye lens — both arcs share endpoints (18,50) and (82,50).
  // Upper arc curves to apex at y=26 (24 units above center)
  const innerTop = 'M 18 50 Q 50 26 82 50'
  // Lower arc curves to apex at y=74 (24 units below center)
  const innerBottom = 'M 18 50 Q 50 74 82 50'

  const sw = (n: number) => (size / 100) * n   // scale stroke to rendered size

  if (!shouldAnimate) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={teal1} stopOpacity="0.95" />
            <stop offset="100%" stopColor={teal2} stopOpacity="0.80" />
          </linearGradient>
        </defs>

        {/* ghost outer halo ring */}
        <circle cx="50" cy="50" r="44" stroke={`url(#${gradId})`} strokeWidth={sw(0.5)} opacity="0.18" fill="none" />

        {/* main orbital arc 330° */}
        <path d={outerArc} stroke={`url(#${gradId})`} strokeWidth={sw(3.2)} strokeLinecap="round" />

        {/* eye lens — upper arc */}
        <path d={innerTop} stroke={`url(#${gradId})`} strokeWidth={sw(2.0)} strokeLinecap="round" opacity="0.80" />

        {/* eye lens — lower arc */}
        <path d={innerBottom} stroke={`url(#${gradId})`} strokeWidth={sw(1.6)} strokeLinecap="round" opacity="0.60" />

        {/* center iris dot */}
        <circle cx="50" cy="50" r="9" fill={teal1} />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={teal1} stopOpacity="0.95" />
          <stop offset="100%" stopColor={teal2} stopOpacity="0.80" />
        </linearGradient>
      </defs>

      {/* ghost outer halo ring */}
      <motion.circle
        cx="50" cy="50" r="44" fill="none"
        stroke={`url(#${gradId})`} strokeWidth={sw(0.5)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* main orbital arc 330° */}
      <motion.path
        d={outerArc}
        stroke={`url(#${gradId})`}
        strokeWidth={sw(3.2)}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* eye lens — upper arc */}
      <motion.path
        d={innerTop}
        stroke={`url(#${gradId})`}
        strokeWidth={sw(2.0)}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.80 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* eye lens — lower arc */}
      <motion.path
        d={innerBottom}
        stroke={`url(#${gradId})`}
        strokeWidth={sw(1.6)}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.60 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* center iris dot */}
      <motion.circle
        cx="50"
        cy="50"
        r="9"
        fill={teal1}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'backOut' }}
      />
    </svg>
  )
}
