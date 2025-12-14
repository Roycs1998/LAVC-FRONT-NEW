'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { TbLanguage } from 'react-icons/tb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/components/configs/i18n'


interface Props {
  className?: string
}

type LanguageDataType = {
  langCode: Locale
  langName: string
}

const getLocalePath = (pathName: string, locale: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')
  segments[1] = locale
  return segments.join('/')
}

const languageData: LanguageDataType[] = [
  { langCode: 'en', langName: 'English' },
  { langCode: 'es', langName: 'Español' },
  { langCode: 'pt', langName: 'Portuguese' }
]

const LanguageDropdown = ({ className }: Props) => {
  const pathName = usePathname()
  const { lang } = useParams()

  const handleSelectLanguage = (langCode: string) => {
    const daysToExpire = 7
    const expiryDate = new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `language=${encodeURIComponent(langCode)}; expires=${expiryDate}; path=/; samesite=Lax`
    // window.location.reload()  // Using native reload is fine, but maybe let the link handle it or force reload.
    // The link navigation might not be enough if we need to set the cookie first.
    // But usually Next.js middleware handles locale from path.
    // The original code reloaded, so we will keep that behavior if needed, 
    // but typically clicking the link with the new locale path is sufficient for Next.js i18n routing.
    // However, the cookie part suggests manual handling. We'll stick to the original logic: Link + Cookie + Reload? 
    // Actually, if we use Link to the new URL, the middleware should pick it up. 
    // But let's keep the cookie logic as is.

    // We can do the reload after a short delay or just let the cookie be set.
    // Since we are using Link, we might not need window.location.reload(). 
    // But if the server relies on the cookie for the *initial* render of that new path, it might be needed.
    // I'll keep the onClick logic.
    setTimeout(() => window.location.reload(), 100)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`backdrop-blur-sm bg-[#3a3480] hover:bg-[#3a3480]/80 text-white hover:text-[#3a3480] px-2 py-1 mr-1 rounded-md flex items-center gap-1 outline-none ${className}`}
        >
          <TbLanguage size={20} className="text-white hover:text-[#3a3480]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] z-[100]">
        {languageData.map(locale => (
          <DropdownMenuItem
            key={locale.langCode}
            asChild
            className={lang === locale.langCode ? 'bg-accent' : ''}
          >
            <Link
              href={getLocalePath(pathName, locale.langCode)}
              onClick={() => handleSelectLanguage(locale.langCode)}
              className="cursor-pointer w-full"
            >
              {locale.langName}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdown
