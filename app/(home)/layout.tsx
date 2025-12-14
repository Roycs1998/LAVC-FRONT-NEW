import type { ReactNode } from 'react'

import Providers from '@/components/Providers'
import { FooterTwo } from '@/components/components-home/FooterTwo/FooterTwo'
import { Navbar } from '@/components/components-home/Navbar'
import type { Locale } from '@/components/configs/i18n'
import { i18n } from '@/components/configs/i18n'
import BlankLayout from '@/components/layouts/BlankLayout'
import SocialWidget from '@/components/social/SocialWidgetProps'
import { getDictionary } from '@/utils/getDictionary'

export type HomeLayoutParams = { lang?: Locale }

export type HomeLayoutProps = Readonly<{
  children: ReactNode
  params?: HomeLayoutParams
}>

export default async function HomeLayout({ children, params }: HomeLayoutProps) {
  const locale = params?.lang ?? i18n.defaultLocale
  const dictionary = await getDictionary(locale)
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <Navbar dictionary={dictionary} />
      <BlankLayout>{children}</BlankLayout>
      <SocialWidget
        phoneNumber="+51985174876"
        message={dictionary?.nav_main?.social_widget_message ?? '¡Hola! ¿En qué puedo ayudarte?'}
      />
      <FooterTwo dictionary={dictionary} />
    </Providers>
  )
}
