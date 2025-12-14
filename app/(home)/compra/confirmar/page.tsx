'use client'

import { useEffect, useState } from 'react'

import Script from 'next/script'

import { useRouter } from 'next/navigation'

import { Box, Grid, Typography, useMediaQuery } from '@mui/material'

import { useSession } from 'next-auth/react'


import { SubtitleTag } from '@/components/components-home/components-reusable/SubtitleTag'

import { CostTable } from '@/components/components-home/components-buys/CostTable'

import { AcceptanceCriteria } from '@/components/components-home/components-buys/components-confirm/AcceptanceCriteria'

import { AlertIndications } from '@/components/components-home/components-reusable/AlertIndications'

import { ConfirmPayment } from '@/components/components-home/components-buys/components-confirm/confirm-payment'

import { CheckPaymentGateway } from '@/components/components-home/components-buys/components-confirm/confirm-payment/PaymentGateway'

import { formatDate } from '@/libs/utils'
import CustomButton from '@/components/ui/CustomButton'

const Confirm = () => {
  const isSmallScreen = useMediaQuery('(max-width:1275px)')
  const [offsetY, setOffsetY] = useState(0)
  const {data: session}= useSession()
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const route = useRouter()

  useEffect(() => {
    const delayRedirect = setTimeout(() => {
      if (!session) {
        route.push('/');
      }
    }, 2000);

    return () => clearTimeout(delayRedirect);
  }, [session, route]);
  const maxOffsetY = 300

  const [eventData, setEventData] = useState<{
    name: string
    image: string
    place: string
    date: string
    ticket: string
    price: string
    currency: string
    paymentMethod: string
    eventType: string
    typeOfPayment:string
    ruc:string
    companyName:string
    eventCode:string

  }>({
    name: '',
    image: '',
    place: '',
    date: '',
    ticket: '',
    price: '',
    currency: '',
    paymentMethod: '',
    eventType: '',
    typeOfPayment:'',
    ruc:'',
    companyName:'',
    eventCode:'',
  })

  useEffect(() => {
    const storedEvent = localStorage.getItem('eventData')

    if (storedEvent) {
      setEventData(JSON.parse(storedEvent)) // Guarda todo en un solo estado
    }
  }, [])
  const [allSelected, setAllSelected] = useState(false)

  const handleScroll = () => {
    const newOffsetY = window.scrollY * 0.5 // Ajusta el multiplicador para un efecto más o menos fuerte

    setOffsetY(newOffsetY > maxOffsetY ? maxOffsetY : newOffsetY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRadioChange = (isSelected: boolean) => {
    setAllSelected(isSelected) // Actualiza el estado según el valor que pase el componente de los radios
  }

  const handlerClickOpenPay = () => {
    CheckPaymentGateway(
      eventData.name || 'Sin asignar',
      Number(eventData.price),
      eventData.typeOfPayment,
      setAlertMessage,
      eventData.currency,
      (session as any)?.user?.user?.userName,
      (session as any)?.user?.user?.userCode,
      eventData.eventCode,
      eventData.paymentMethod,
      eventData.companyName,
      eventData.ruc )
  }

  return (
    <Box>

      <Box sx={{}}>
        <Grid container spacing={0} sx={{}}>
          <Grid
            item
            xs={12}
            sm={12}
            md={isSmallScreen ? 12 : 6.5}
            sx={{ marginBottom: '7%',  marginTop: isSmallScreen ? '20%' : '7%', paddingLeft: 'var(--global-padding-inline)' }}
          >
            <Box sx={{ paddingLeft: '30px', marginBottom: '40px' }}>
                <Typography variant='body1' fontWeight='bold' sx={{ fontSize: '14px' }}>
                  {eventData.place}
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight='bold'
                  sx={{ paddingTop: '12px', fontSize: '1.9rem', fontWeight: 700 }}
                >
                  {eventData.name}
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary', fontSize: '13px', paddingTop: '5px' }}>
                {formatDate(eventData.date)}
                </Typography>
            </Box>
            <Box sx={{ paddingRight: '10px', paddingLeft: '30px' }}>
              <Box>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ paddingTop: "12px", fontSize: "1.2rem", fontWeight: 700, textTransform:'capitalize' }}
                  >
                  {(session as any)?.user?.personaNombre || "Sin nombre"}
                  </Typography>
                </Box>
                <Box>
                  <CostTable ticketName={eventData.ticket} price={Number(eventData.price)} currency={eventData.currency} />
                </Box>
                <Box sx={{ marginTop: '50px' }}>
                  <SubtitleTag caption='SELECCIONA PARA CONTINUAR' />
                </Box>
                <Box>
                  <AcceptanceCriteria onChange={handleRadioChange} />
                </Box>
                {!allSelected && (
                  <Box sx={{ paddingLeft: '2%', paddingRight: '2%', marginTop: '30px' }}>
                    <AlertIndications alert='Recuerde que, si no aprueba los Términos y Condiciones, la Política de Compra y la Política de Privacidad de LAVC, no podremos gestionar su solicitud, toda vez que para realizar esta actividad es imprescindible obtener y tratar sus datos personales.' />
                  </Box>
                )}
              </Box>

              {isSmallScreen && (
                <Box>
                  <Typography sx={{ width: '100%', marginTop: '50px' }}>

                    <CustomButton 
                      onClick={handlerClickOpenPay}
                      disabled={!allSelected}>
                    CONTINUAR
                  </CustomButton>
                  </Typography>
                  {alertMessage && <AlertIndications alert={alertMessage} />}
                </Box>
              )}
            </Box>
          </Grid>
          {!isSmallScreen && (
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                position: 'relative',
                boxShadow: '-6px 0 20px rgba(169, 169, 169, 0.6)',
                marginLeft: 'auto',
                overflow: 'hidden', // Evita que el boxShadow se extienda al lado derecho
                border: 'none',
                paddingRight: 'var(--global-padding-inline)'
              }}
            >
              <Box
                sx={{
                  padding: '64px',
                  backgroundColor: '#fff', // Color de fondo del Box
                  borderRadius: '8px', // Bordes redondeados (opcional)
                  boxShadow: 'none', // Elimina cualquier sombra en el Box interno
                  transform: `translateY(${offsetY}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <ConfirmPayment
                  image={eventData.image}
                  eventLocation={eventData.place}
                  eventDate={eventData.date}
                  eventName={eventData.name}
                  disableButton={!allSelected}
                  amount={Number(eventData.price)}
                  currency={eventData.currency}
                  typeOfPayment={eventData.typeOfPayment}
                  email={(session as any)?.user?.user?.userName}
                  userCode={(session as any)?.user?.user?.userCode}

                  eventCode={eventData.eventCode}
                  paymentMethod={eventData.paymentMethod}
                  companyName={eventData.companyName}
                  ruc={eventData.ruc}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      <Script src='https://js.culqi.com/checkout-js' />
    </Box>
  )
}

export default Confirm
