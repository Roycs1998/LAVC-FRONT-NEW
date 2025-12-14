'use client'
import * as React from 'react'

import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import { Box, Snackbar } from '@mui/material'

interface AlertMessage {
  message: string
}

export const SimpleAlert = ({ message }: AlertMessage) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={3000} // El tiempo que el mensaje será visible (en milisegundos)
        onClose={() => setOpen(false)} // Cierra el Snackbar cuando se termina el tiempo
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Coloca el Snackbar en el centro horizontal
        sx={{
          top: 0, // Posiciona en la parte superior
          left: '50%', // Alinea al 50% desde la izquierda
          transform: 'translateX(-50%)', // Centra horizontalmente
          zIndex: 9999 // Asegúrate de que esté por encima de otros elementos
        }}
      >
        <Alert
          severity='success'
          sx={{
            backgroundColor: 'var(--color-on-hover)',
            color: 'var(--letter-color)',
            width: 'auto', // Cambia a auto para ajustarse al contenido
            display: 'flex',
            justifyContent: 'center', // Centra el contenido
            textAlign: 'center' // Alineación del texto
          }}
          icon={<CheckIcon fontSize='inherit' sx={{ color: 'var(--letter-color)' }} />}
          onClose={() => setOpen(false)} // Opción para cerrar también el Alert manualmente
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
