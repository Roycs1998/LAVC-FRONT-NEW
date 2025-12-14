import { Box, Card, CardMedia, Grid } from '@mui/material'

interface images {
  image: string
  category: string
}

interface SponsorImages {
  images: images[]
}

export const CardExhibitors = ({ images }: SponsorImages) => {
  const getBorderColor = (category: string) => {
    switch (category) {
      case 'A':
        return 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)'
      case 'B':
        return 'linear-gradient(to right, #E5E4E2, #F9F9F9, #D1D1D1, #CCCCCC, #BEBEBE)'
      case 'C':
        return 'linear-gradient(to right, #8C6239, #D7A66F, #C08457, #A97142, #8A5E2A)'
      default:
        return ''
    }
  }

  return (
    <Card sx={{ maxWidth: '100%', border: 0, boxShadow: 'none' }}>
      <Grid
        className='global-padding'
        container
        spacing={1.5}
        sx={{
          display: 'flex', // Asegura que el contenedor use flexbox
          justifyContent: { xs: 'center', sm: 'center', md: 'center' }, // Centrar horizontalmente
          bgcolor: '#f7f7f7',
          paddingBottom: '5%',
          paddingTop: '5%'
        }}
      >
        {images.map((image, index) => (
          <Grid
            key={index}
            item
            xs={3.5} // En pantallas pequeñas, se mostrarán 2 por fila
            sm={2.3} // En pantallas medianas, se mostrarán 3 por fila
            md={1.5} // En pantallas más grandes, se mostrarán 4 por fila
          >
            <Box
              sx={{
                width: '130px',
                height: '120px',
                position: 'relative',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.10)'
                }, // Necesario para el pseudo-elemento
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  borderRadius: '5px', // Ajustar si se desea bordes redondeados
                  background: getBorderColor(image.category), // El gradiente o color aquí
                  zIndex: 1 // Asegurar que esté por debajo del contenido
                },
                '& img': {
                  position: 'relative', // Para que la imagen esté por encima del pseudoelemento
                  zIndex: 2 // Asegurar que la imagen esté por encima del pseudo-elemento
                }
              }}
            >
              <CardMedia
                component='img'
                image={image.image} // Se usa el enlace de la imagen del array
                alt={`Imagen ${index + 1}`} // Alternativa para accesibilidad
                sx={{ maxWidth: '100%', height: '100%', padding: '3px' }} // Ajustar al tamaño del contenedor
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  )
}
