import type { Locale } from '@/components/configs/i18n'

import { CardImage } from "@/components/components-home/components-ponentes/CardImage"

import { getDictionary } from '@/utils/getDictionary'

import Tourism from './ui/Tourism'

interface Props {
    params: {
        lang: Locale
    }
}

const TourismPage = async ({ params }: Props) => {
    const dictionary = await getDictionary(params.lang)

    return (

        <>
            <CardImage
                image='https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/tourism.jpg'
                title={dictionary.tourism.title}
            />
            <Tourism dictionary={dictionary} />
        </>
    )
}

export default TourismPage
