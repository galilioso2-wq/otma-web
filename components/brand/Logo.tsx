import Link from 'next/link'
import { SynthesisMark } from '@/components/brand/SynthesisMark'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon'
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  locale?: string
  className?: string
  animated?: boolean
}

const markSize = { sm: 28, md: 36, lg: 52 }
const wordmarkSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }
const wordmarkGap = { sm: 'gap-2', md: 'gap-2.5', lg: 'gap-4' }

export function Logo({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  href,
  locale = 'en',
  className = '',
  animated = false,
}: LogoProps) {
  const textColor = theme === 'light' ? 'text-[#080D18]' : 'text-white'

  const mark = (
    <SynthesisMark
      size={markSize[size]}
      theme={theme}
      animated={animated}
    />
  )

  const wordmark = (
    <span
      className={cn(
        'font-display font-bold tracking-tight leading-none',
        wordmarkSize[size],
        textColor
      )}
    >
      OTMA
    </span>
  )

  let inner: React.ReactNode

  if (variant === 'icon') {
    inner = mark
  } else if (variant === 'vertical') {
    inner = (
      <div className={cn('flex flex-col items-center gap-2', className)}>
        {mark}
        {wordmark}
      </div>
    )
  } else {
    // horizontal (default)
    inner = (
      <div className={cn('inline-flex items-center', wordmarkGap[size], className)}>
        {mark}
        {wordmark}
      </div>
    )
  }

  if (href !== undefined) {
    return (
      <Link href={href} aria-label="OTMA — Home" className="inline-flex items-center">
        {inner}
      </Link>
    )
  }

  return <>{inner}</>
}
