import { Avatar, Card, CardContent, Typography } from '@mui/material'

interface ProgramInformation {
  hour: string
  issue: string
  exhibitorName: string
  image: string
  eventDescription?: string
  location?: string
  locationLabel?: string
}

export const ProgramLetters = ({
  hour,
  issue,
  exhibitorName,
  image,
  eventDescription,
  location,
  locationLabel
}: ProgramInformation) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        width: { xs: '100%', md: '70%' },
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        marginBottom: '50px',
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      <Avatar
        src={image} 
        sx={{
          width: 170,
          height: 170,
          marginRight: '5%',
          flexDirection: { xs: 'column', md: 'row' }
        }}
        alt='Profile'
      />

      {/* Contenido de la tarjeta */}
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'column' },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Typography variant='h6' color='text.primary'>
          {hour}
        </Typography>
        <Typography variant='h4' sx={{ fontWeight: 700, fontSize: '1.5rem', marginTop: '15px' }}>
          {issue}
        </Typography>
        <Typography
          variant='caption'
          sx={{ fontSize: '1rem', marginTop: '10px', color: 'var(--light-blue-color-lavc)' }}
        >
          {exhibitorName}
        </Typography>
        {eventDescription && (
          <Typography
            variant='caption'
            sx={{ fontSize: '0.9rem', marginBottom: '15px', marginTop: '15px' }}
            color='text.secondary'
          >
            {eventDescription}
          </Typography>
        )}
        {location && (
          <Typography variant='caption' sx={{ fontSize: '1.1rem', display: 'inline' }}>
            <Typography component='span' sx={{ marginRight: '5px' }}>
              {locationLabel || 'Location:'}
            </Typography>
            <Typography component='span' sx={{ color: 'var(--yellow-color-lavc)' }}>
              {location}
            </Typography>
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
