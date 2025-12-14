import React from 'react'

import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

import type { getDictionary } from '@/utils/getDictionary'

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

export const HorizontalCard = ({ dictionary }: Props) => {
  return (
    <Card
      className='global-padding'
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Cambia la dirección del layout en pantallas pequeñas
        maxWidth: '100%',
        height: { xs: 'auto', md: '40%' }, // Ajusta la altura en pantallas pequeñas
        backgroundColor: '#f6f3f3',
        backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.5) 15%, transparent 15%),
        radial-gradient(circle, rgba(255, 255, 255, 0.5) 15%, transparent 15%)`,
        backgroundSize: '20px 20px, 40px 40px', // Tamaño de las pecas
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      {/* Imagen de la tarjeta */}
      <CardMedia
        component='img'
        sx={{
          width: { xs: '100%', md: '60%' }, // La imagen ocupa el 100% en pantallas pequeñas
          height: { xs: '300px', md: '430px' }, // Ajusta la altura en pantallas pequeñas
          objectFit: 'contain' // Ajusta la imagen para que se vea bien dentro del contenedor
        }}
        image='/images/perro.png' // Cambia la ruta a tu imagen
        alt='Descripción de la imagen'
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          position: 'relative'
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'block' } // Oculta este contenido en pantallas pequeñas
          }}
        />

        {/* Texto que se superpone en pantallas pequeñas */}
        <Box
          sx={{
            height: { xs: 'auto', md: '200px' },
            bgcolor: { xs: 'transparent', md: 'rgba(58, 52, 128, 0.3)' }, // El fondo se hace transparente en pantallas pequeñas
            position: { xs: 'absolute', md: 'static' }, // Posiciona el texto sobre la imagen en pantallas pequeñas
            bottom: 0,
            width: '100%',
            padding: 2,
            color: 'white' // El texto en blanco cuando está sobre la imagen
          }}
        >
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: { xs: 'text.secondary', md: 'text.secondary' }, // Texto blanco en pantallas pequeñas
              marginTop: '20px'
            }}
          >
            {dictionary?.nav_main?.horizontal_card.motto}
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{
              marginTop: { sm: 'none', md: '22px' },
              marginLeft: '3%',
              color: { md: 'text.secondary' },
              display: { xs: 'none', md: 'block' } // Texto blanco en pantallas pequeñas
            }}
          >
            Eugene O’Neill, CEO
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
