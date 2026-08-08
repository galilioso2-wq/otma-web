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
  const dotColor = theme === 'dark' ? '#00C4B4' : '#008A7C'
  const gradId = `otma-grad-${size}-${theme}`

  // Viewbox 100×100. Center (50,50).
  // Ghost ring: radius 44, full thin circle for the outer orbital halo.
  // Outer arc: radius 38, ~300° clockwise — gap of 60° at right (2→4 o'clock).
  //   Start: "2 o'clock" = (83, 31)  [38*sin60°≈32.9 right, 38*cos60°≈19 up from center]
  //   End:   "4 o'clock" = (83, 69)  [38*sin120°≈32.9 right, 38*cos120°≈19 down] → 300° long arc
  const outerArc = 'M 83 31 A 38 38 0 1 1 83 69'

  // Inner lens — upper swoosh (defines top of the "eye")
  const innerTop = 'M 17 45 Q 50 14 83 45'

  // Inner lens — lower swoosh (defines bottom of the "eye")
  const innerBottom = 'M 24 58 Q 50 76 76 58'

  const sw = (n: number) => (size / 100) * n   // scale stroke to size

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
            <stop offset="100%" stopColor={teal2} stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* ghost outer orbital ring (halo) */}
        <circle cx="50" cy="50" r="44" stroke={`url(#${gradId})`} strokeWidth={sw(0.6)} opacity="0.22" fill="none" />

        {/* outer orbital arc ~300° */}
        <path d={outerArc} stroke={`url(#${gradId})`} strokeWidth={sw(2.8)} strokeLinecap="round" />

        {/* inner upper lens arc */}
        <path d={innerTop} stroke={`url(#${gradId})`} strokeWidth={sw(2.2)} strokeLinecap="round" opacity="0.85" />

        {/* inner lower lens arc */}
        <path d={innerBottom} stroke={dotColor} strokeWidth={sw(1.8)} strokeLinecap="round" opacity="0.70" />

        {/* center dot */}
        <circle cx="50" cy="50" r="8" fill={dotColor} />
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
          <stop offset="100%" stopColor={teal2} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* ghost outer orbital ring (halo) */}
      <motion.circle
        cx="50" cy="50" r="44" fill="none"
        stroke={`url(#${gradId})`} strokeWidth={sw(0.6)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      />

      {/* outer orbital arc ~300° */}
      <motion.path
        d={outerArc}
        stroke={`url(#${gradId})`}
        strokeWidth={sw(2.8)}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* inner upper lens */}
      <motion.path
        d={innerTop}
        stroke={`url(#${gradId})`}
        strokeWidth={sw(2.2)}
        strokeLinecap="round"
        opacity="0.85"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* inner lower lens */}
      <motion.path
        d={innerBottom}
        stroke={dotColor}
        strokeWidth={sw(1.8)}
        strokeLinecap="round"
        opacity="0.70"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* center dot */}
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill={dotColor}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: 'backOut' }}
      />
    </svg>
  )
}
