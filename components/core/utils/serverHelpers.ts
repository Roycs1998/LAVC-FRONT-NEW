import 'server-only'

// Next Imports
import { cookies } from 'next/headers'

// Type Imports
import { Settings } from '../contexts/settingsContext'
import themeConfig from '@/components/configs/themeConfig'
import { Mode, SystemMode } from '../types'


export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieStore = await cookies()

  const cookieName = themeConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = async (): Promise<Mode> => {
  const settingsCookie = await getSettingsFromCookie()

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || themeConfig.mode

  return _mode
}

export const getSystemMode = async (): Promise<SystemMode> => {
  const mode = await getMode()

  // Validamos que el valor sea compatible con SystemMode
  if (mode === 'light' || mode === 'dark') return mode

  // Si es 'system' o cualquier otro, define un valor por defecto (por ejemplo, 'light')
  return 'light'
}

export const getServerMode = async (): Promise<Mode> => {
  const mode = await getMode()

  return mode
}

export const getUserPreferredMode = async (): Promise<Mode> => {
  const settings = await getSettingsFromCookie()
  return settings.mode || 'system'
}

export const getResolvedMode = async (): Promise<SystemMode> => {
  const mode = await getUserPreferredMode()

  if (mode === 'light' || mode === 'dark') return mode

  // Resolver usando media query si estás en frontend
  if (typeof window !== 'undefined') {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    return prefersDark ? 'dark' : 'light'
  }

  // Fallback seguro
  return 'light'
}
