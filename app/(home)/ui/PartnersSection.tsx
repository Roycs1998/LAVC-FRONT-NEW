'use client'

import dynamic from 'next/dynamic'

import type { getDictionary } from '@/utils/getDictionary'

const InfiniteCarousel = dynamic(() => import('./InfiniteCarousel/InfiniteCarousel'), { ssr: false })

import { Huellas } from '@/components/ui/Huellas'
import SectionTitle from '@/components/SectionTitle'



interface Props {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const PartnersSection = ({ dictionary }: Props) => {
  const logosRow1 = [
    "upload/companies/invetsa.webp",
    "upload/companies/HALLMARK.webp",
    "upload/companies/DEXER.webp",
    "upload/companies/DURAND.webp",
    "upload/companies/BIOMONT.webp",
    "upload/companies/MARCEBEL.webp",
    "upload/companies/CANBO.webp",
    "upload/companies/MSD.webp",
    "upload/companies/petmedica.webp",
    "upload/companies/logo_andeanvet-01.webp",
    "upload/companies/ludipet-logo.webp",
    "upload/companies/totalvet.webp",
    "upload/companies/BOEHRINGER.webp",
    "upload/companies/IMAGEN TOTAL.webp",
    "upload/companies/INNOVALITYVET.webp",
    "upload/companies/alphatec.webp",
    "upload/companies/inaba.webp",
    "upload/companies/petNutricion.webp",
    "upload/companies/elanco.webp",
    "upload/companies/MULTIVET.webp"
  ]

  const logosRow2 = [
    "upload/companies/servipet.webp",
    "upload/companies/Internacional.webp",
    "upload/companies/labet.webp",
    "upload/companies/baruch.webp",
    "upload/companies/vetlinex.webp",
    "upload/companies/ZOETIS.webp",
    "upload/companies/ROYALCANIN.webp",
    "upload/companies/THARINATECH.webp",
    "upload/companies/veterperu.webp",
    "upload/companies/ORIGENS.webp",
    "upload/companies/labeca.webp",
    "upload/companies/artero.webp",
    "upload/companies/bluesao.webp",
    "upload/companies/suprovet.webp",
    "upload/companies/gabrica.webp",
    "upload/companies/bioingenieria.webp",
    "upload/companies/ahd_logo.webp",
    "upload/companies/XIMED.webp",
    "upload/companies/hipra.webp",
    "upload/companies/Inversiones Saluds-01.webp",
  ]

  const logosRow3 = [
    "upload/companies/iprovet.webp",
    "upload/companies/descarga.webp",
    "upload/companies/vetanis.webp",
    "upload/companies/otama.webp",
    "upload/companies/IMPROVET.webp",
    "upload/companies/APYCE.webp",
    "upload/companies/sutuvet.webp",
    "upload/companies/rivet.webp",
    "upload/companies/MIOCANE.webp",
    "upload/companies/TANTALEAN 1.webp",
    "upload/companies/icon.webp",
    "upload/companies/HM.webp",
    "upload/companies/yanusavet.webp",
    "upload/companies/HYS.webp",
    "upload/companies/VINNO.webp",
    "upload/companies/2RCOMPANY.webp",
    "upload/companies/vetpraxis.webp",
    "upload/companies/DIOHM.webp",
    "upload/companies/qvet.webp",
    "upload/companies/petmedic.webp",
    "upload/companies/carlosponce.webp",
    "upload/companies/Vet 1.webp",
    "upload/companies/instrupet.webp",
    "upload/companies/xvets.webp",
    "upload/companies/VETIMPORT.webp",
    "upload/companies/MEDICALCLOTINHG.webp",
    "upload/companies/pdf.webp",
  ]


  return (
    <div className='bg-[#ebeff3] relative overflow-hidden'>
      {/* Imagen de huellas decorativa */}
      <Huellas />
      <div className={`max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 flex flex-col gap-2 py-10 md:py-20`}>
        <SectionTitle
          title={
            <span>
              {dictionary?.home?.partners.title_prefix} <span className='text-[#3a3480] '>{dictionary?.home?.partners.title_highlight}</span>
            </span>
          }
          subTitle={<span >{dictionary?.home?.partners.subtitle}</span>}
          showIcon={false}
        />

        <div className='pt-6'>
          <InfiniteCarousel items={logosRow1} />
          <InfiniteCarousel items={logosRow2} reserveDirection />
          <InfiniteCarousel items={logosRow3} />
        </div>
      </div>
    </div>
  )
}

export default PartnersSection
