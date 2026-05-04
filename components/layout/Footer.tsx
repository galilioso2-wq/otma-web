import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/dictionaries'

interface FooterProps {
  locale: string
  dict: Dictionary
}

const serviceLinks = [
  { label: '', slug: 'custom-ai-agents', key: 0 },
  { label: '', slug: 'crm-intelligence', key: 1 },
  { label: '', slug: 'power-bi-ai', key: 2 },
  { label: '', slug: 'conversational-ai', key: 3 },
  { label: '', slug: 'ai-strategy', key: 4 },
  { label: '', slug: 'dynamics-365', key: 5 },
]

export function Footer({ locale, dict }: FooterProps) {
  const isRtl = locale === 'ar'
  const f = dict.footer
  const services = dict.home.services.items

  return (
    <footer className="bg-[#080D18] border-t border-white/8">
      <Container className="py-16">
        <div
          className={cn(
            'grid gap-10 sm:grid-cols-2 lg:grid-cols-4',
            isRtl ? 'direction-rtl' : ''
          )}
        >
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo href={`/${locale}`} theme="dark" size="md" />
            <p className="mt-4 text-sm text-[#808890] leading-relaxed max-w-xs">
              {f.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://linkedin.com/company/otma-io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OTMA on LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-[#00D4FF]/10 hover:text-[#00D4FF] transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#808890] mb-4">
              {f.services_title}
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#808890] mb-4">
              {f.company_title}
            </h3>
            <ul className="space-y-2.5">
              {f.company_links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#808890] mb-4">
              {f.contact_title}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:founder@otma.io"
                  className="text-sm text-white/60 hover:text-[#00D4FF] transition-colors"
                >
                  founder@otma.io
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/otma-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#00D4FF] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-sm text-white/40">Riyadh, Saudi Arabia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4',
            isRtl ? 'flex-row-reverse' : ''
          )}
        >
          <p className="text-xs text-[#808890]">{f.copyright}</p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#808890]">{f.built}</p>
            <Link
              href={dict.nav.locale_href}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {dict.nav.locale_label}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
