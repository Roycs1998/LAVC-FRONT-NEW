// Third-party Imports
import 'server-only'

// Type Imports
import { Locale } from '@/components/configs/i18n'


const dictionaries = {
  en: async () => (await import('@/data/dictionaries/en.json')).default,
  es: async () => (await import('@/data/dictionaries/es.json')).default,
  pt: async () => (await import('@/data/dictionaries/pt.json')).default
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
