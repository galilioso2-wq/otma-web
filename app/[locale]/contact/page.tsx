import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mail, MapPin, Phone } from 'lucide-react'

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
import { Container } from '@/components/layout/Container'
import { ContactForm } from '@/components/sections/ContactForm'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: dict.contact.page_title,
    description: dict.contact.page_subtitle,
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const c = dict.contact
  const isRtl = locale === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="bg-[#080D18] pt-32 pb-16">
        <Container>
          <div className={cn(isRtl ? 'text-right' : '')}>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-white leading-tight mb-4">
              {c.page_title}
            </h1>
            <p className="text-lg text-white/55 max-w-2xl">{c.page_subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Contact content */}
      <section className="bg-white py-20">
        <Container>
          <div
            className={cn(
              'grid lg:grid-cols-2 gap-12 items-start',
              isRtl ? 'lg:flex-row-reverse' : ''
            )}
          >
            {/* Contact info */}
            <div className={cn(isRtl ? 'text-right order-2 lg:order-1' : '')}>
              <h2 className="text-2xl font-semibold text-[#080D18] mb-8">{c.info_title}</h2>
              <div className="space-y-6">
                <a
                  href={`mailto:${c.email}`}
                  className={cn(
                    'flex items-center gap-4 group',
                    isRtl ? 'flex-row-reverse' : ''
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#080D18]/5 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#080D18]/50 group-hover:text-[#0099BB] transition-colors" aria-hidden="true" />
                  </div>
                  <div className={cn(isRtl ? 'text-right' : '')}>
                    <p className="text-xs font-medium text-[#080D18]/40 mb-0.5">{c.email_label}</p>
                    <p className="text-sm font-medium text-[#080D18] group-hover:text-[#0099BB] transition-colors">
                      {c.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-4 group',
                    isRtl ? 'flex-row-reverse' : ''
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#080D18]/5 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#080D18]/50 group-hover:text-[#0099BB] transition-colors" aria-hidden="true" />
                  </div>
                  <div className={cn(isRtl ? 'text-right' : '')}>
                    <p className="text-xs font-medium text-[#080D18]/40 mb-0.5">{c.whatsapp_label}</p>
                    <p className="text-sm font-medium text-[#080D18] group-hover:text-[#0099BB] transition-colors">
                      {c.whatsapp}
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/company/otma-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-4 group',
                    isRtl ? 'flex-row-reverse' : ''
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#080D18]/5 flex items-center justify-center shrink-0">
                    <LinkedinIcon size={18} />
                  </div>
                  <div className={cn(isRtl ? 'text-right' : '')}>
                    <p className="text-xs font-medium text-[#080D18]/40 mb-0.5">{c.linkedin_label}</p>
                    <p className="text-sm font-medium text-[#080D18] group-hover:text-[#0099BB] transition-colors">
                      {c.linkedin_text}
                    </p>
                  </div>
                </a>

                <div className={cn('flex items-center gap-4', isRtl ? 'flex-row-reverse' : '')}>
                  <div className="w-10 h-10 rounded-lg bg-[#080D18]/5 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#080D18]/50" aria-hidden="true" />
                  </div>
                  <div className={cn(isRtl ? 'text-right' : '')}>
                    <p className="text-xs font-medium text-[#080D18]/40 mb-0.5">{c.address_label}</p>
                    <p className="text-sm font-medium text-[#080D18]">{c.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={cn(isRtl ? 'order-1 lg:order-2' : '')}>
              <ContactForm locale={locale} form={c.form} title={c.form_title} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
