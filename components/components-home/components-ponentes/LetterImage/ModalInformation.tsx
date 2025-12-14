import { Box, CardMedia, Grid, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ModalProps {
  isOpen: boolean // Estado que indica si el modal está abierto
  onClose: () => void // Función para cerrar el modal
  name: string
  information: string
  image: string
}

// Componente del modal
export const ModalInformation = ({ isOpen, onClose, name, information, image }: ModalProps) => {
  const style = {
    position: 'absolute' as const, // Posición absoluta para centrar el modal
    top: '50%', // Centra verticalmente
    left: '50%', // Centra horizontalmente
    transform: 'translate(-50%, -50%)', // Ajusta la posición para que esté centrado
    width: '60%', // Ancho del modal
    bgcolor: 'background.paper', // Fondo del modal
    border: 'none', // Borde del modal
    boxShadow: 24 // Sombra del modal
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Grid container spacing={1}>
          {/* Columna para la imagen */}
          <Grid item xs={4.5}>
            <Box sx={{ height: 490, width: 400 }}>
              <CardMedia
                component='img'
                image={image} // URL de la imagen
                alt={name} // Texto alternativo para la imagen
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }} // Estilo para la imagen
              />
            </Box>
          </Grid>
          {/* Columna para el nombre y la descripción */}
          <Grid item xs={7.3}>
            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
              <CloseIcon /> {/* Icono de cierre */}
            </IconButton>
            <Typography variant='h4' sx={{ fontWeight: 'bold', marginTop: 5 }}>
              {name} {/* Nombre */}
            </Typography>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginTop: 2 }}>
              {name}: {/* Nombre */}
            </Typography>
            <Typography variant='body1'>
              {information} {/* Descripción */}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
