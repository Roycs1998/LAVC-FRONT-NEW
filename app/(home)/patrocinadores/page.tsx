import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { CardExhibitors } from '@/components/components-home/components-sponsors/CardExhibitors'

const Patrocinadores = async () => {
  const sponsorImages = [
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/INVETSA.jpg'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/petmedic.jpg'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/aranda.jpg'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/veterperu.jpg'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/Internacional.PNG'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/servipet.jpg'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/ludipet-logo.JPG'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/DURAND.jpg'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/suiza-diagnostics-logo.png'
    },
    {
      category: 'A',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/HALLMARK.jpg'
    },
    { category: 'B', image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/INVETSA.jpg' },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/petmedic.jpg'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/labeca.jpgg'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/veterperu.jpg'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/Internacional.PNG'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/servipet.jpg'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/ludipet-logo.JPG'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/DURAND.jpg'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/suiza-diagnostics-logo.png'
    },
    {
      category: 'B',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/HALLMARK.jpg'
    },
    { category: 'C', image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/INVETSA.jpg' },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/petmedic.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/labeca.jpgg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/veterperu.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/Internacional.PNG'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/servipet.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/ludipet-logo.JPG'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/DURAND.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/suiza-diagnostics-logo.png'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/HALLMARK.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/INVETSA.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/petmedic.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/labeca.jpgg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/veterperu.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/Internacional.PNG'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/servipet.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/ludipet-logo.JPG'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/DURAND.jpg'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/suiza-diagnostics-logo.png'
    },
    {
      category: 'C',
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/HALLMARK.jpg'
    }
  ]

  return (
    <Box>
      <Box>
        <CardImage
          image='https://hospitecnia.com/sites/default/files/2021-01/cabecera-noticia-destacada-patrocinadors-01.jpg'
          title='PATROCINADORES'
        />
      </Box>
      <Box>
        <CardExhibitors images={sponsorImages} />
      </Box>
    </Box>
  )
}

export default Patrocinadores
