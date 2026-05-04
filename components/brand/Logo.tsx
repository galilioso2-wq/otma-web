import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon'
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  locale?: string
  className?: string
}

const sizes = {
  horizontal: { sm: [160, 40], md: [208, 52], lg: [280, 70] },
  vertical: { sm: [80, 88], md: [100, 110], lg: [140, 154] },
  icon: { sm: [32, 32], md: [40, 40], lg: [56, 56] },
}

export function Logo({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  href,
  locale = 'en',
  className = '',
}: LogoProps) {
  const [w, h] = sizes[variant][size]

  const src =
    variant === 'icon'
      ? '/brand/otma_icon_only.svg'
      : variant === 'vertical'
      ? '/brand/otma_logo_vertical_dark.svg'
      : theme === 'light'
      ? '/brand/otma_logo_horizontal_light.svg'
      : '/brand/otma_logo_horizontal_dark.svg'

  const img = (
    <Image
      src={src}
      alt="OTMA"
      width={w}
      height={h}
      className={className}
      priority
    />
  )

  if (href !== undefined) {
    return (
      <Link href={href} aria-label="OTMA — Home">
        {img}
      </Link>
    )
  }

  return img
}
