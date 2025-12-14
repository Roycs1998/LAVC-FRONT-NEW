import type { Locale } from '@/components/configs/i18n'
import { i18n } from '@/components/configs/i18n'
import { getDictionary } from '@/utils/getDictionary'
import EventExperience from './ui/EventExperience'
import EventPlace from './ui/EventPlace'
import ExtraInformation from './ui/ExtraInformation'
import NumberSection from './ui/NumberSection'
import OurEvent from './ui/ourEvent'
import PartnersSection from './ui/PartnersSection'
import { Carrucel } from '@/components/components-home/Carrucel/Carrucel'

type HomeProps = { params?: { lang?: Locale } }

const Home = async ({ params }: HomeProps) => {
  const locale = params?.lang ?? i18n.defaultLocale
  const dictionary = await getDictionary(locale)

  return (
    <main className='relative'>
      <Carrucel dictionary={dictionary} />
      <EventPlace dictionary={dictionary}/>
      <ExtraInformation dictionary={dictionary} />
      <OurEvent dictionary={dictionary} />
      <EventExperience dictionary={dictionary} />
      <NumberSection dictionary={dictionary} />
      <PartnersSection dictionary={dictionary} />
    </main>
  )
}

export default Home
