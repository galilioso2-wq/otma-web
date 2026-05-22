'use client'

import { useState, useEffect } from 'react'

export function PpcNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* OTMA attribution bar — fixed at very top */}
      <div className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center gap-2.5 py-2 px-4 text-[11px] bg-[#7ACBBA]/10 border-b border-[#7ACBBA]/20 backdrop-blur-sm">
        <span className="text-white/40">Built by</span>
        <a
          href="/en"
          className="font-bold text-[#7ACBBA] hover:text-[#8AD5C5] transition-colors"
        >
          OTMA
        </a>
        <span className="text-white/20 select-none">·</span>
        <a
          href="/en/contact"
          className="text-white/50 hover:text-white/80 transition-colors underline underline-offset-2 decoration-white/20"
        >
          Want one for your organization?
        </a>
      </div>

      {/* Main nav — sits below attribution bar */}
      <header
        className={`fixed top-[33px] inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-white/8'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-14 items-center justify-between">
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-[#0B0F1A]"
              style={{ background: 'linear-gradient(135deg, #7ACBBA 0%, #00D4FF 100%)' }}
            >
              PPC
            </div>
            <div className="leading-none">
              <span className="text-sm font-bold text-white">PPC</span>
              <span className="text-xs text-white/35 ml-2">Sales Intelligence</span>
            </div>
          </div>

          {/* Nav links — desktop only */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Agents', href: '#agents' },
              { label: 'How it works', href: '#orchestrator' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-[#0B0F1A] transition-all"
            style={{ background: 'linear-gradient(135deg, #7ACBBA 0%, #5BB8A6 100%)' }}
          >
            Book a Demo
          </a>
        </div>
      </header>
    </>
  )
}
