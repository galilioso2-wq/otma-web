import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary, isValidLocale } from '@/lib/dictionaries'
import { defaultMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return defaultMetadata
  const dict = await getDictionary(locale)
  return {
    ...defaultMetadata,
    alternates: {
      canonical: locale === 'en' ? 'https://otma.io/en' : 'https://otma.io/ar',
      languages: {
        en: 'https://otma.io/en',
        ar: 'https://otma.io/ar',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
      <Toaster
        position={locale === 'ar' ? 'bottom-left' : 'bottom-right'}
        toastOptions={{
          style: { fontFamily: 'var(--font-inter)' },
          classNames: {
            success: 'border-[#0099BB]/30 bg-white',
            error: 'border-[#C72C2C]/30 bg-white',
          },
        }}
      />
    </>
  )
}
