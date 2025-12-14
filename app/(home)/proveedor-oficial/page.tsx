import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { OfficialSponsors } from '@/components/components-home/components-sponsors/OfficialSponsors'

const ProveedorOficial = async () => {
  const officialSponsors = [
    {
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/stand-create.png'
    },
    {
      image: 'https://tlavc-peru.org/tlavc/vista/upload/enlaces/ms.jpg'
    }
  ]

  return (
    <Box>
      <Box>
        <CardImage image='https://www.clarin.com/img/2021/05/25/NTaikjn61_1256x620__1.jpg' title='PROVEEDOR OFICIAL' />
      </Box>
      <Box>
        <OfficialSponsors images={officialSponsors} />
      </Box>
    </Box>
  )
}

export default ProveedorOficial
