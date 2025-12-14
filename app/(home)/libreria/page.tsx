import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import MemoriasList from '@/components/memoria/MemoriasList'

const LibreriaLavc = () => {

  return (
    <Box>
      <Box>
        <CardImage
          image='https://cdn.pixabay.com/photo/2015/08/26/19/21/finland-908940_1280.jpg'
          title='LIBRERIA LAVC'
        />
      </Box>
      <MemoriasList />
    </Box>

  )
}

export default LibreriaLavc

