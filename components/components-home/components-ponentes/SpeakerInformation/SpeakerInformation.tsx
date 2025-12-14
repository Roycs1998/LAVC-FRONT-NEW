import { Box, Card, CardMedia, Link, Typography } from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import CustomButton from '@/components/ui/CustomButton'
import SectionTitle from '@/components/SectionTitle'
import normalizeText from '@/helper/normalizeText'

interface Speaker {
  name: string
  image: string
  accreditations?: string
  description?: string
  specializations?: string
  scientificInterests?: string
  recognitionsAndDecorations?: string
  certifications?: string
  books?: string
  research?: string
  achievements?: string
}

export const SpeakerInformation = ({
  name,
  image,
  accreditations,
  description,
  specializations,
}: Speaker) => {

  return (
    <Box maxWidth="lg" mx="auto" px={{ xs: 6, md: 0, lg: 0 }}>
      <Card sx={{ maxWidth: '100%', border: 0 }}>
        <Box className="z-0" sx={{ bgcolor: 'var(--color-card-background)', padding: '5%' }}>
          {/* Título */}
          <SectionTitle
                            title={name}
                            subTitle={specializations}
                            showIcon={false}
                        />

          {/* Acreditación */}
          <Typography
            variant='h6'
            sx={{
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#3a3480',
              fontSize: '17px'
            }}
          >
            {accreditations}
          </Typography>

          {/* Imagen y descripción juntos */}
          <Box sx={{ mt: 4, position: 'relative' }}>
            {/* Solo se muestra en desktop */}
            <CardMedia
              component='img'
              image={image}
              alt='Foto del ponente'
              sx={{
                width: { md: '200px', xs: '50%' },
                height: 'auto',
                float: 'left',
                marginRight: 4,
                marginBottom: 2,
                display: 'block' ,
                borderRadius: 2,
                boxShadow: 2
              }}
            />

            {/* Imagen en móviles */}


            {/* Texto descripción */}
            <Typography
              variant='body1'
              sx={{
                textAlign: 'justify'
              }}
            >
             {normalizeText(description)}
            </Typography>
          </Box>

          {/* Botón centrado */}
          <Box
            sx={{
              width: '100%',
              mt: 8,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Link href='/ponentes'>
              <CustomButton
                sx={{
                  m: 2,
                }}
              >
                <Icon icon='streamline:return-2-solid' className='mr-2' />
                Volver a ponentes
              </CustomButton>
            </Link>
          </Box>
        </Box>
      </Card>
    </Box>

  )
}
