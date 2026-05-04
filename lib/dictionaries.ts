import 'server-only'

export type Locale = 'en' | 'ar'
export const locales: Locale[] = ['en', 'ar']
export const defaultLocale: Locale = 'en'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

const dictionaries = {
  en: () => import('@/content/en.json').then((m) => m.default),
  ar: () => import('@/content/ar.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
