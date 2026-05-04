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

  const cyan = theme === 'dark' ? '#00D4FF' : '#0099BB'
  const cyanDim = theme === 'dark' ? 'rgba(0,212,255,0.3)' : 'rgba(0,153,187,0.3)'
  const centerGlow = theme === 'dark' ? 'rgba(0,212,255,0.2)' : 'rgba(0,153,187,0.15)'

  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.44
  const circleR = size * 0.22
  const offset = size * 0.11
  const dotR = size * 0.025
  const centerR = size * 0.04
  const centerCore = size * 0.025

  const MotionCircle = motion.circle
  const MotionG = motion.g

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* outer orbit ring */}
      {shouldAnimate ? (
        <MotionCircle
          cx={cx}
          cy={cy}
          r={outerR}
          stroke={cyanDim}
          strokeWidth={size * 0.006}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ) : (
        <circle cx={cx} cy={cy} r={outerR} stroke={cyanDim} strokeWidth={size * 0.006} />
      )}

      {/* left circle */}
      {shouldAnimate ? (
        <MotionCircle
          cx={cx - offset}
          cy={cy}
          r={circleR}
          stroke={cyan}
          strokeWidth={size * 0.012}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        />
      ) : (
        <circle cx={cx - offset} cy={cy} r={circleR} stroke={cyan} strokeWidth={size * 0.012} />
      )}

      {/* right circle */}
      {shouldAnimate ? (
        <MotionCircle
          cx={cx + offset}
          cy={cy}
          r={circleR}
          stroke={cyan}
          strokeWidth={size * 0.012}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
        />
      ) : (
        <circle cx={cx + offset} cy={cy} r={circleR} stroke={cyan} strokeWidth={size * 0.012} />
      )}

      {/* cardinal dots */}
      {shouldAnimate ? (
        <MotionG
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <circle cx={cx} cy={cy - outerR} r={dotR} fill={cyan} fillOpacity="0.6" />
          <circle cx={cx} cy={cy + outerR} r={dotR} fill={cyan} fillOpacity="0.6" />
          <circle cx={cx - outerR} cy={cy} r={dotR} fill={cyan} fillOpacity="0.6" />
          <circle cx={cx + outerR} cy={cy} r={dotR} fill={cyan} fillOpacity="0.6" />
        </MotionG>
      ) : (
        <>
          <circle cx={cx} cy={cy - outerR} r={dotR} fill={cyan} fillOpacity="0.6" />
          <circle cx={cx} cy={cy + outerR} r={dotR} fill={cyan} fillOpacity="0.6" />
          <circle cx={cx - outerR} cy={cy} r={dotR} fill={cyan} fillOpacity="0.6" />
          <circle cx={cx + outerR} cy={cy} r={dotR} fill={cyan} fillOpacity="0.6" />
        </>
      )}

      {/* center glow */}
      <circle cx={cx} cy={cy} r={centerR} fill={centerGlow} />

      {/* luminous core */}
      {shouldAnimate ? (
        <MotionCircle
          cx={cx}
          cy={cy}
          r={centerCore}
          fill={cyan}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'backOut' }}
        />
      ) : (
        <circle cx={cx} cy={cy} r={centerCore} fill={cyan} />
      )}
    </svg>
  )
}
