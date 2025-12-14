import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { EventProgram } from '@/components/components-home/components-program/EventProgram'

const Program = async () => {
  return (
    <Box>
      <Box>
        <CardImage
          image='https://www.mdzol.com/u/fotografias/m/2022/9/9/f1456x819-1279355_1449725_5050.jpg'
          title='PROGRAMA PRELIMINAR'
        />
      </Box>
      <Box sx={{ paddingTop: '3%' }}>
        <EventProgram />
      </Box>
    </Box>
  )
}

export default Program
