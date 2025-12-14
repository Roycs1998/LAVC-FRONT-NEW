import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'

import { OfficialSponsors } from '@/components/components-home/components-sponsors/OfficialSponsors'

const PatrocinadoresOficiales = async () => {
  const officialSponsors = [
    {
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/NAVC.jpg'
    },
    {
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/AAFP.png'
    }
  ]

  return (
    <Box>
      <Box>
        <CardImage
          image='http://4.bp.blogspot.com/_EZ16vWYvHHg/S9B7zkjDmlI/AAAAAAAAK48/u5-wjD54PE0/s1600/www.BancodeImagenesGratuitas.com+-Perritos-13.jpg'
          title='PATROCINADORES OFICIALES'
        />
      </Box>
      <Box>
        <OfficialSponsors images={officialSponsors} />
      </Box>
    </Box>
  )
}

export default PatrocinadoresOficiales
