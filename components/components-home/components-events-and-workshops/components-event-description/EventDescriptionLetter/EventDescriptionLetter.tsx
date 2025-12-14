import * as React from 'react'

import { Card, CardContent, Grid, Typography, Box } from '@mui/material'

interface EventInformation {
  eventImage: string
  eventName: string
  eventDescription: string
  recommendedPublic?: string
  startOfEvent?: string
  eventDuration?: string
  eventLocation?: string
  aboutIncome?: string
}

export const EventDescriptionLetter = ({
  eventImage,
  eventName,
  eventDescription,
  recommendedPublic,
  startOfEvent,
  eventDuration,
  eventLocation,
  aboutIncome
}: EventInformation) => {
  return (
    <Card sx={{ maxWidth: '100%', height: '100%', boxShadow: 'none' }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{}}>
              <Typography variant='h6' sx={{ fontSize: '0.90rem' }}>
                EVENTO
              </Typography>
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '10px' }}
              >
                {eventName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ height: { sx: '320px', md: '350px' } }}>
              <Box
                component='img'
                src={eventImage}
                alt=''
                className='card-media'
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  width: '100%',
                  height: '100%'
                }}
              ></Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ padding: 2, borderRadius: 1, marginTop: 5 }}>
          <Box>
            <Typography variant='body1' sx={{ fontSize: '0.7rem', fontWeight: 800, marginBottom: 3, color: '#3a3480' }}>
              ACERCA DEL EVENTO
            </Typography>
            <Typography variant='body1' sx={{ fontSize: '0.8rem' }}>
              {eventDescription}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Typography variant='body1' sx={{ fontSize: '0.7rem', fontWeight: 800, marginBottom: 3, color: '#3a3480' }}>
              INFORMACIÓN IMPORTANTE
            </Typography>
            {recommendedPublic ? (
              <Box display='flex' alignItems='flex-start' color='text.secondary' sx={{ marginBottom: '10px' }}>
                <Typography variant='body1' sx={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  • Público recomendado:
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '0.8rem', marginLeft: '4px', whiteSpace: 'nowrap' }}>
                  {recommendedPublic}
                </Typography>
              </Box>
            ) : null}
            {startOfEvent ? (
              <Box display='flex' alignItems='center' sx={{ marginBottom: '10px' }}>
                <Typography variant='body1' color='text.secondary' sx={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  • Evento puede iniciar desde:
                </Typography>

                <Typography variant='body1' sx={{ fontSize: '0.8rem', marginLeft: '4px' }}>
                  {startOfEvent}
                </Typography>
              </Box>
            ) : null}

            {eventDuration ? (
              <Box display='flex' alignItems='center' sx={{ marginBottom: '10px' }}>
                <Typography variant='body1' color='text.secondary' sx={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  • Duración aproximada del evento:
                </Typography>

                <Typography variant='body1' sx={{ fontSize: '0.8rem', marginLeft: '4px' }}>
                  {eventDuration}
                </Typography>
              </Box>
            ) : null}

            {eventLocation ? (
              <Box display='flex' alignItems='center' sx={{ marginBottom: '10px' }}>
                <Typography variant='body1' color='text.secondary' sx={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  • Recinto:
                </Typography>

                <Typography variant='body1' sx={{ fontSize: '0.8rem', marginLeft: '4px' }}>
                  {eventLocation}
                </Typography>
              </Box>
            ) : null}

            {aboutIncome ? (
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ fontSize: '0.8rem', marginLeft: '4px' }}>
                  • {aboutIncome}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
