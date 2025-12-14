import type { Locale } from '@/components/configs/i18n'

import { getDictionary } from '@/utils/getDictionary'
import PartnersSection from './ui/PartnersSection'
import NumberSection from './ui/NumberSection'

import { Carrucel } from '@/components/components-home/Carrucel/Carrucel'
import OurEvent from './ui/ourEvent'
import ExtraInformation from './ui/ExtraInformation'
import EventExperience from './ui/EventExperience'
import EventPlace from './ui/EventPlace'

type HomeProps = { params: { lang: Locale } }

const Home = async ({ params }: HomeProps) => {
  const dictionary = await getDictionary(params.lang)

  return (
    <main className='relative'>
      {/* <Carrucel dictionary={dictionary} />
      <EventPlace dictionary={dictionary}/>
      <ExtraInformation dictionary={dictionary} />
      <OurEvent dictionary={dictionary} />
      <EventExperience dictionary={dictionary} />
      <NumberSection dictionary={dictionary} /> */}
      <PartnersSection dictionary={dictionary} />
    </main>
  )
}

export default Home
