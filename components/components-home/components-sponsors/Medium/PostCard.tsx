import Link from 'next/link'

import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'

export const PostCard = () => {
  return (
    <Card >
      <CardContent>
        <Grid container spacing={2} justifyContent='center' alignItems='flex-start'>
          {/* Soporte al cliente */}
          <Grid item xs={12} md={5.7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant='h5'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '26px' }, marginBottom: '2%', paddingTop: '1%' }}
            >
              Soporte al cliente
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '26px' }, fontSize: '1rem' }}
            >
              Problemas con el registro e inscripción
            </Typography>
            <Typography
              variant='body1'
              sx={{
                paddingLeft: { xs: '0', md: '26px' },
                marginBottom: '2%',
                color: '#3a3480',
                '&:hover': {
                  color: 'var(--color-on-hover)'
                }
              }}
            >
              <Link href='mailto:soporte@tlavc-peru.org?subject=Informacion%20sobre%20PatrocinioLAVC'>
                soporte@tlavc-peru.org
              </Link>
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '26px' }, fontSize: '1rem' }}
            >
              Atención al Cliente
            </Typography>
            <Typography
              variant='body1'
              sx={{
                paddingLeft: { xs: '0', md: '26px' },
                marginBottom: '1%',
                color: '#3a3480',
                '&:hover': {
                  color: 'var(--color-on-hover)'
                }
              }}
            >
              <Link href='mailto:inscripciones@tlavc-peru.org?subject=Informacion%20sobre%20PatrocinioLAVC'>
                inscripciones@tlavc-peru.org
              </Link>
            </Typography>
          </Grid>

          {/* Divider que desaparece en pantallas pequeñas */}
          <Grid item sx={{ height: '100%', display: { xs: 'none', md: 'block' } }}>
            <Divider
              orientation='vertical'
              flexItem
              sx={{ height: '270px', background: 'var(--primary-color-purple)' }}
            />
          </Grid>

          {/* Información Empresas */}
          <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant='h5'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '40px' }, marginBottom: '2%', paddingTop: '1%' }}
            >
              Información Empresas
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '40px' }, fontSize: '1rem' }}
            >
              Informes y Atención al Cliente
            </Typography>
            <Typography
              sx={{
                paddingLeft: { xs: '0', md: '40px' },
                marginBottom: '1%',
                color: '#3a3480',
                '&:hover': {
                  color: 'var(--color-on-hover)'
                }
              }}
              variant='body1'
            >
              <Link href='mailto:informes@ellatin.com?subject=Informacion%20sobre%20PatrocinioLAVC'>
                informes@ellatin.com
              </Link>
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '40px' }, fontSize: '1rem' }}
            >
              Expositores
            </Typography>
            <Typography
              sx={{
                paddingLeft: { xs: '0', md: '40px' },
                marginBottom: '1%',
                color: '#3a3480',
                '&:hover': {
                  color: 'var(--color-on-hover)'
                }
              }}
              variant='body1'
            >
              <Link href='mailto:informes@ellatin.com?subject=Informacion%20sobre%20PatrocinioLAVC'>
                expositores@tlavc-peru.org
              </Link>
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', paddingLeft: { xs: '0', md: '40px' }, fontSize: '1rem' }}
            >
              Consulta de Hospedaje y Paquetes de Viaje
            </Typography>
            <Typography
              sx={{
                paddingLeft: { xs: '0', md: '40px' },
                marginBottom: '1%',
                color: '#3a3480',
                '&:hover': {
                  color: 'var(--color-on-hover)'
                }
              }}
              variant='body1'
            >
              <Link href='mailto:informes@ellatin.com?subject=Informacion%20sobre%20PatrocinioLAVC'>
                mafertours@tlavc-peru.org
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
