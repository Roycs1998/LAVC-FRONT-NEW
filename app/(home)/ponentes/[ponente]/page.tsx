
import { Box } from '@mui/material'

import PonenteInfo from '../iu/Ponente'

interface PonenteParams {
  params: {
    ponente: string
  }
}

const Ponente = async ({ params }: PonenteParams) => {
  const idPonente = decodeURIComponent(params.ponente)
  
return (
    <Box>
      <PonenteInfo ponente={idPonente}/>

    </Box>
  )
}

export default Ponente
