export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'pt', 'es'],
  langDirection: {
    en: 'ltr',
    pt: 'ltr',
    es: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
