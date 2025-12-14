'use client'
import { useState } from 'react'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { CheckPaymentGateway } from './PaymentGateway'
import { AlertIndications } from '@/components/components-home/components-reusable/AlertIndications'
import { formatDate } from '@/libs/utils'
import CustomButton from '@/components/ui/CustomButton'

interface EventInformation {
  image: string
  eventLocation: string
  eventDate: string
  eventName: string
  disableButton?: boolean
  amount: number
  typeOfPayment: string
  currency:string
  email:string
  userCode:string
  eventCode:string,
  paymentMethod:string,
  companyName:string,
  ruc:string,
}

export const ConfirmPayment = ({
  image,
  eventLocation,
  eventDate,
  eventName,
  disableButton = false,
  amount,
  typeOfPayment,
  currency,
  email,
  userCode,
  eventCode,
  paymentMethod,
  companyName,
  ruc,
}: EventInformation) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  const handlerClickOpenPay = () => {
    console.log("data pay",email)
    CheckPaymentGateway(eventName || 'Sin Asignar', amount, typeOfPayment, setAlertMessage,currency, email, userCode,eventCode,paymentMethod,companyName,ruc)
  }

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
            src={image ? `https://tlavc-peru.org/tlavc/vista/${image}`: ''}
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
              {eventDate
                  ? (formatDate(eventDate))
                  : (
                    <Typography variant='body1' sx={{ color: 'text.secondary', fontSize: '12px', paddingTop: '5px' }}>
                      Fecha no asignada
                    </Typography>
                  )}

              <Typography sx={{ minWidth: '300px', width: '400px', marginTop: '30px' }}>
              <CustomButton                   
                  onClick={handlerClickOpenPay}
                  disabled={disableButton}
                  >
                    CONTINUAR
                  </CustomButton>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {alertMessage && <AlertIndications alert={alertMessage} />}
      </Card>
    </Box>
  )
}
