'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: string
  nav: {
    services: string
    case_studies: string
    about: string
    contact: string
    book_call: string
    locale_label: string
    locale_href: string
  }
}

export function Header({ locale, nav }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRtl = locale === 'ar'
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { label: nav.services, href: `/${locale}/services` },
    { label: nav.case_studies, href: `/${locale}/case-studies` },
    { label: nav.about, href: `/${locale}/about` },
    { label: nav.contact, href: `/${locale}/contact` },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-otma-cyan focus:text-otma-navy focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#080D18]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'flex h-16 items-center gap-8',
              isRtl ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* Logo */}
            <Logo href={`/${locale}`} theme="dark" size="md" />

            {/* Desktop nav */}
            <nav
              className={cn('hidden md:flex flex-1 items-center gap-1', isRtl ? 'flex-row-reverse justify-start' : 'justify-center')}
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive(link.href)
                      ? 'text-[#00D4FF]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div
              className={cn(
                'hidden md:flex items-center gap-3 ms-auto',
                isRtl ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <Link
                href={nav.locale_href}
                className="text-sm font-medium text-white/60 hover:text-white/90 transition-colors px-2"
              >
                {nav.locale_label}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] transition-colors"
              >
                {nav.book_call}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden ms-auto text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-[#080D18] flex flex-col pt-20 pb-8 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={prefersReduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1 mt-4" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReduced ? false : { opacity: 0, x: isRtl ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-3 px-4 rounded-lg text-lg font-medium transition-colors',
                      isRtl ? 'text-right' : 'text-left',
                      isActive(link.href)
                        ? 'text-[#00D4FF] bg-[#00D4FF]/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <Link
                href={nav.locale_href}
                className="py-3 px-4 text-center rounded-lg text-base font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-colors"
              >
                {nav.locale_label}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="py-3 px-4 rounded-lg text-base font-medium text-center bg-[#00D4FF] text-[#080D18] hover:bg-[#33DDFF] transition-colors"
              >
                {nav.book_call}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
