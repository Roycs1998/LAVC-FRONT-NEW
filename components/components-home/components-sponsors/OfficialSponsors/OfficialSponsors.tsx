import { Box, Card, CardMedia, Grid } from '@mui/material'

interface images {
  image: string
}

interface SponsorImages {
  images: images[]
}

export const OfficialSponsors = ({ images }: SponsorImages) => {
  return (
    <Card
      className='global-padding'
      sx={{
        display: 'flex',
        maxWidth: '100%',
        boxShadow: 3,
        paddingBottom: '5%',
        paddingTop: '5%',
        bgcolor: '#f7f7f7'
      }}
    >
      <Grid
        container
        spacing={10}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'center', md: 'center' }
        }}
      >
        {images.map((image, index) => (
          <Grid key={index} item xs={11} sm={5}>
            <Box
              sx={{
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
                  background: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)', // El gradiente o color aquí
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
