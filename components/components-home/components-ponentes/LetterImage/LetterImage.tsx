'use client'

import { Box, Card, CardMedia, Typography } from '@mui/material'

interface Image {
  image: string
  name?: string | null
}

export const LetterImage = ({ image, name }: Image) => {
  return (
    <Box
      sx={{
        position: 'relative', // Para que el overlay se posicione sobre la imagen
        width: '100%',
        height: 400, // Ajusta el tamaño del contenedor
        overflow: 'hidden',
        '&:hover .overlay': {
          // Cuando se hace hover en el Box, se activa la clase .overlay
          opacity: 1,
          transform: 'translateX(0)' // Mueve el overlay a su posición original
        }
      }}
    >
      <Card
        sx={{
          position: 'relative', // Para posicionar el overlay
          overflow: 'hidden', // Asegura que el overlay no sobresalga de la tarjeta
          borderRadius: 0,
          transition: 'transform 0.3s',
          height: 400,
          width: '100%'
        }}
      >
        <CardMedia
          component='img' // Especifica que el componente es una imagen
          height='100%'
          width='100%' // Altura de la imagen
          image={image} // URL de la imagen
        />
      </Card>
      <Box
        className='overlay' // Clase para identificar el overlay
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.60)', // Fondo semitransparent
          opacity: 0, // Inicia invisible
          transition: 'transform 0.6s ease, opacity 0.5s ease', // Anima la opacidad y el movimiento
          // Anima la opacidad y el movimiento
          transform: 'translateX(-100%)' // Inicialmente coloca el over, // Posiciona el overlay fuera de la carta (arriba y a la izquierda)
        }}
      ></Box>

      <Box
        className='overlay'
        sx={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          right: 0, // Posicionado desde la derecha
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.60)', // Fondo semitransparente
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0, // Inicia invisible
          transition: 'transform 0.6s ease, opacity 0.5s ease', // Anima la opacidad y el movimiento
          transform: 'translateX(100%)' // Inicialmente coloca el overlay fuera del lado derecho
        }}
      >
        <Typography variant='h6' sx={{ color: '#6660a5', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
          {name || 'Sin nombre'}
        </Typography>
      </Box>
    </Box>
  )
}
