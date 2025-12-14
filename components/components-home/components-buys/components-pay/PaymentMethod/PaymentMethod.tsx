import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface PaymentInstitutions {
  paymentEntity: string
}
interface AveragePaymentData {
  image: string
  name: string
  paymentInstitutions: string
  description: string
  informationOne?: string
  informationTwo?: string
  paymentTypeImage?: string
  listOfPaymentEntities?: PaymentInstitutions[]
  informationThree?: string
  id: string
  expandedId: string | null
  onChange: (id: string) => void
}

export const PaymentMethod = ({
  image,
  name,
  paymentInstitutions,
  description,
  informationOne,
  informationTwo,
  listOfPaymentEntities,
  paymentTypeImage,
  informationThree,
  id,
  expandedId,
  onChange
}: AveragePaymentData) => {
  const isExpanded = expandedId === id

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => onChange(id)}
      sx={{
        padding: { xs: '5px', md: '0px' },
        boxShadow: 'none',
        border: '1px solid', // Define el ancho y estilo del borde
        borderColor: isExpanded ? 'var(--primary-color-purple)' : '#ececec',
        marginBottom: '15px',
        width: '100%'
      }}
    >
      <AccordionSummary aria-controls='panel1-content' id='panel1-header' sx={{ height: '65px' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={3} md={3}>
            <Box sx={{ height: '60px' }}>
              <Box
                component='img'
                src={image}
                alt=''
                className='card-media'
                sx={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>
          </Grid>

          {/* Columna 2 */}
          <Grid item xs={8} md={8}>
            <Typography
              variant='body1'
              sx={{ fontSize: '1rem', fontWeight: 700, color: '#b9b7bd', marginLeft: '6px', marginTop: '5px' }}
            >
              {name}
            </Typography>
          </Grid>

          {/* Columna 3 con el ícono CheckCircle */}
          <Grid item xs={1} md={0.5}>
            <CheckCircleIcon
              sx={{ float: 'right', fontSize: '1.6rem', color: isExpanded ? 'var(--primary-color-purple)' : 'gray' }}
            />
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={3} md={3}>
            <Box sx={{ height: '60px' }}></Box>
          </Grid>
          <Grid item xs={8} md={8.5}>
            <Typography variant='h4' sx={{ fontSize: '1.3rem' }}>
              {paymentInstitutions}
            </Typography>
            <Typography variant='body2' sx={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '10px' }}>
              {description}
            </Typography>
            {informationOne && (
              <Typography variant='body2' sx={{ fontSize: '0.7rem', marginTop: '10px' }}>
                {informationOne}
              </Typography>
            )}
            {informationTwo && (
              <Typography variant='body2' sx={{ fontSize: '0.8rem', marginTop: '10px' }}>
                {informationTwo}
              </Typography>
            )}
          </Grid>
          <Grid item xs={1} md={0.5}>
            <Box sx={{ height: '60px' }}></Box>
          </Grid>

          {paymentTypeImage && (
            <Grid container spacing={3} sx={{ marginTop: '5px' }}>
              <Grid item xs={3} md={3} sx={{ marginLeft: '15px' }}></Grid>
              <Grid item xs={5} md={2.8}>
                <Box
                  component='img'
                  src={paymentTypeImage}
                  alt=''
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Grid>
            </Grid>
          )}
          {listOfPaymentEntities && (
            <Grid container spacing={1} sx={{ marginTop: '15px' }}>
              {/* Primera columna vacía */}
              <Grid item xs={3} md={3} sx={{ marginRight: '20px' }}></Grid>

              {/* Segunda columna para las imágenes */}
              <Grid item xs={8} sm={8.5}>
                <Grid container spacing={0}>
                  {listOfPaymentEntities.map((entity, index) => (
                    <Grid key={index} item xs={3.3} sm={1.7} sx={{ marginRight: '13px' }}>
                      <Box
                        component='img'
                        src={entity.paymentEntity}
                        alt=''
                        sx={{
                          width: '100%',
                          height: 'auto' // Mantiene la proporción de la imagen
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}

          {informationThree && (
            <Grid container spacing={3} sx={{ marginTop: '1px' }}>
              <Grid item xs={3} md={3}></Grid>
              <Grid item xs={8} md={8} sx={{ marginLeft: '15px' }}>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', marginTop: '10px' }}>
                  {informationThree}
                </Typography>
              </Grid>
              <Grid item xs={1} md={0.5}></Grid>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
