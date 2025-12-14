'use client'

import Link from 'next/link'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import CustomButton from '@/components/ui/CustomButton'

interface EventInformation {
  image: string
  eventLocation: string
  eventDate: string
  eventName: string
  pageRoute: string
  disableButton?: boolean
}

export const PurchaseEventLetter = ({
  image,
  eventLocation,
  eventDate,
  eventName,
  pageRoute,
  disableButton = false
}: EventInformation) => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 400,
          borderRadius: 0,
          boxShadow: 'none',
          marginTop: '15%',
        }}
      >
        <Box sx={{ height: '210px', width: '100%', overflow: 'hidden' }}>
          <Box
            component='img'
            src={image ? `https://tlavc-peru.org/tlavc/vista/${image}` : ''}
            alt=''
            className='card-media'
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
        <CardContent sx={{ bgcolor: '#ffffff', paddingLeft: '0px', paddingTop: '10px' }}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Typography variant='body1' fontWeight='bold' sx={{ fontSize: '11px' }}>
                {eventLocation?.toUpperCase() || "N/A"}
              </Typography>
              <Typography
                variant='h6'
                fontWeight='bold'
                sx={{ paddingTop: '12px', fontSize: '1.5rem', fontWeight: 700 }}
              >
                {eventName.toUpperCase()}
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.secondary', fontSize: '12px', paddingTop: '5px' }}>
                {eventDate
                  ? `${new Date(eventDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`
                  : 'Fecha no disponible'}
              </Typography>
              <Typography sx={{ minWidth: '300px', width: '400px', marginTop: '30px' }}>
                <Link href={!disableButton && pageRoute ? pageRoute : '#'}>
                  <CustomButton disabled={disableButton}>
                    CONTINUAR
                  </CustomButton>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
