import type { ReactNode } from 'react'

import type { Locale } from '@/components/configs/i18n'
import HomeLayout, { type HomeLayoutParams } from '../(home)/layout'

interface LangLayoutProps {
  children: ReactNode
  params: { lang: Locale } & HomeLayoutParams
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  return <HomeLayout params={params}>{children}</HomeLayout>
}
