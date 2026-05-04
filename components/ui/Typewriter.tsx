'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  id?: string
}

export function Typewriter({ text, className, delay = 600, speed = 38, id }: TypewriterProps) {
  const prefersReduced = useReducedMotion()
  const [displayed, setDisplayed] = useState(prefersReduced ? text : '')
  const [done, setDone] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      return
    }
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay, speed, prefersReduced])

  return (
    <span id={id} className={className}>
      {displayed}
      {!done && (
        <span
          className="inline-block w-[3px] h-[1em] bg-[#00D4FF] ml-1 align-middle animate-pulse"
          aria-hidden="true"
        />
      )}
    </span>
  )
}
