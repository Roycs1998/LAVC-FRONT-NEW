import { Box, CardMedia, Grid } from '@mui/material'

import { Form } from './Form'

export const Medium = () => {
  return (
    <Box
    >
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'center', md: 'center' }
          }}
        >
          <Grid item xs={12} sm={12} md={6} sx={{ boxShadow: 'none', border: 'none' }}>
            <Form />
          </Grid>
          {/* Modificar el Grid para la imagen */}
          <Grid
            item
            md={5} // Mantener el tamaño en pantallas medianas
            sx={{
              display: { xs: 'none', md: 'flex' }, // Ocultar en xs y sm, mostrar en md
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                maxWidth: '100%',
                height: '590px',
                display: 'flex', // Flexbox para centrar el contenido
                alignItems: 'center', // Centra verticalmente el contenido dentro del Box
                justifyContent: 'center'
              }}
            >
              <CardMedia
                component='img'
                image='https://tlavc-peru.org/img/foto-precios.jpg' // Se usa el enlace de la imagen del array
                alt='ola' // Alternativa para accesibilidad
                sx={{ maxWidth: '100%', height: '100%', padding: '3px', borderRadius: '15px' }} // Ajustar al tamaño del contenedor
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
