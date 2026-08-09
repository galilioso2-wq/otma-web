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

  // New brand palette — warmer teal from identity SVG
  const teal1 = theme === 'dark' ? '#46CDDB' : '#2B9CAE'
  const teal2 = theme === 'dark' ? '#147587' : '#0F5F72'
  const core  = theme === 'dark' ? '#2B9CAE' : '#1A7080'
  const gradId = `otma-grad-${size}-${theme}`

  // Viewbox 100×100. Center (50,50).
  // 4-path orbital eye — cubic beziers derived from brand SVG, scaled ×0.6.
  //
  // path1 — inner upper sweep (left→right, curving up)
  // path2 — inner lower sweep (right→left, curving down) — closes the inner lens
  // path3 — outer left orbital arc
  // path4 — outer right orbital arc
  const path1 = 'M 20 53 C 35 26 65 26 80 47 C 89 59 80 77 65 83'
  const path2 = 'M 80 47 C 65 74 35 74 20 53 C 11 41 20 23 35 17'
  const path3 = 'M 71 80 C 50 95 14 86 8 56 C 5 38 20 20 35 14'
  const path4 = 'M 29 20 C 50 5 86 14 92 44 C 95 62 80 80 65 86'

  const sw = (n: number) => (size / 100) * n

  const sharedProps = {
    stroke: `url(#${gradId})`,
    strokeLinecap: 'round' as const,
    fill: 'none',
  }

  if (!shouldAnimate) {
    return (
      <svg
        width={size} height={size} viewBox="0 0 100 100"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className} aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={teal1} stopOpacity="0.95" />
            <stop offset="100%" stopColor={teal2} stopOpacity="0.90" />
          </linearGradient>
        </defs>

        {/* outer orbital arcs */}
        <path d={path4} {...sharedProps} strokeWidth={sw(2.6)} opacity="0.90" />
        <path d={path3} {...sharedProps} strokeWidth={sw(2.6)} opacity="0.90" />

        {/* inner lens arcs */}
        <path d={path1} {...sharedProps} strokeWidth={sw(2.2)} opacity="0.80" />
        <path d={path2} {...sharedProps} strokeWidth={sw(2.2)} opacity="0.80" />

        {/* core iris dot */}
        <circle cx="50" cy="50" r="8.5" fill={core} />
      </svg>
    )
  }

  const pathTransition = (delay: number) => ({
    duration: 1.0,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  })

  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={teal1} stopOpacity="0.95" />
          <stop offset="100%" stopColor={teal2} stopOpacity="0.90" />
        </linearGradient>
      </defs>

      {/* outer right arc first */}
      <motion.path d={path4} {...sharedProps} strokeWidth={sw(2.6)}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.90 }}
        transition={pathTransition(0)}
      />
      {/* outer left arc */}
      <motion.path d={path3} {...sharedProps} strokeWidth={sw(2.6)}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.90 }}
        transition={pathTransition(0.18)}
      />
      {/* inner upper lens */}
      <motion.path d={path1} {...sharedProps} strokeWidth={sw(2.2)}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.80 }}
        transition={pathTransition(0.36)}
      />
      {/* inner lower lens */}
      <motion.path d={path2} {...sharedProps} strokeWidth={sw(2.2)}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.80 }}
        transition={pathTransition(0.50)}
      />
      {/* core iris dot */}
      <motion.circle cx="50" cy="50" r="8.5" fill={core}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.72, ease: 'backOut' }}
      />
    </svg>
  )
}
