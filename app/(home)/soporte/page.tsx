import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'

import { Medium } from '@/components/components-home/components-sponsors/Medium'
import { PostCard } from '@/components/components-home/components-sponsors/Medium/PostCard'

const Soporte = async () => {
  return (
    <Box sx={{ bgcolor: 'var(--background-form)' }}>
      <Box>
        <CardImage
          image='https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/04/15/625935c2d2651.jpeg'
          title='SOPORTE'
        />
      </Box>
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
        <Medium />
      </div>
      <Box className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
        <PostCard></PostCard>
      </Box>
    </Box>
  )
}

export default Soporte
