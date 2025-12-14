




import { Navbar } from '@/components/components-home/Navbar'

import { getDictionary } from '@/utils/getDictionary'

import type { Locale } from '@/components/configs/i18n'





import { FooterTwo } from '@/components/components-home/FooterTwo/FooterTwo'
import SocialWidget from '@/components/social/SocialWidgetProps'
import Providers from '@/components/Providers'
import BlankLayout from '@/components/layouts/BlankLayout'

export default async function HomeLayout({ children, params }: Readonly<{ children: React.ReactNode, params: { lang: Locale } }>) {

  const dictionary = await getDictionary(params.lang)
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <Navbar dictionary={dictionary} />
      <BlankLayout>

        {children}

      </BlankLayout>
      <SocialWidget phoneNumber="+51985174876" message={dictionary?.nav_main?.social_widget_message ?? '¡Hola! ¿En qué puedo ayudarte?'} />
      <FooterTwo dictionary={dictionary} />
    </Providers>
  )
}
