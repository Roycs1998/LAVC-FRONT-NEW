import { Box } from '@mui/material'

//const publicKey = process.env.VITE_APP_CULQI_PUBLICKEY

export const CulqiPaymentGateway = () => {
  return (
    <Box>
      <button
        className='px-5 py-2 text-sm font-semibold leading-5 text-white bg-purple-500 rounded-full hover:bg-purple-700'
        id='crearCharge'
      >
        Crear Cargo
      </button>
    </Box>
  )
}
