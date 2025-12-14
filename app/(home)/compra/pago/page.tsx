'use client'
import { useEffect, useState } from 'react'

import { Box, Grid, Link, Typography, useMediaQuery } from '@mui/material'

import { PurchaseEventLetter } from '@/components/components-home/components-buys/purchase-event-letter'
import { PaymentDocuments } from '@/components/components-home/components-buys/components-pay/PaymentDocuments'
import { PaymentMethod } from '@/components/components-home/components-buys/components-pay/PaymentMethod'
import { CostTable } from '@/components/components-home/components-buys/CostTable'
import { SubtitleTag } from '@/components/components-home/components-reusable/SubtitleTag'
import { AlertIndications } from '@/components/components-home/components-reusable/AlertIndications'
import { formatDate } from '@/libs/utils'
import CustomButton from '@/components/ui/CustomButton'

const Payments = () => {
  const [eventName, setEventName] = useState<string>('')
  const [eventImage, setEventImage] = useState<string>('')
  const [eventPlace, setEventPlace] = useState<string>('')
  const [eventStartDate, setEventStartDate] = useState<string>('')
  const [eventTicket, setEventTicket] = useState<string>('')
  const [ticketPrice, setTicketPrice] = useState<string>('')
  const isSmallScreen = useMediaQuery('(max-width:1275px)')
  const [ticketCurrency, setTicketCurrency] = useState<string>('')
  const [docType, setDocType] = useState<'Boleta' | 'Factura'>('Boleta');
  const [invoiceData, setInvoiceData] = useState({ ruc: '', companyName: '' });

  const [offsetY, setOffsetY] = useState(0)
  const maxOffsetY = 300
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleChange = (id: string) => {
    setExpandedId(prevId => (prevId === id ? id : id))
  }

  useEffect(() => {
    const storedEvent = localStorage.getItem('eventData')

    if (storedEvent) {
      const event = JSON.parse(storedEvent) // Recuperar como objeto

      setEventName(event.name)
      setEventImage(event.image)
      setEventPlace(event.place)
      setEventStartDate(event.date)
      setEventTicket(event.ticket)
      setTicketPrice(event.price)
      setTicketCurrency(event.currency)

      const updatedEventData = {
        ...event,
        paymentMethod: expandedId,
        typeOfPayment: docType,
        ruc: invoiceData.ruc || '',
        companyName: invoiceData.companyName || ''
      }

      localStorage.setItem('eventData', JSON.stringify(updatedEventData))
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedId])

  const handleScroll = () => {
    const newOffsetY = window.scrollY * 0.5 // Ajusta el multiplicador para un efecto más o menos fuerte

    setOffsetY(newOffsetY > maxOffsetY ? maxOffsetY : newOffsetY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('typeOfPayment', String(expandedId))
  }, [expandedId])

  const canContinue = Boolean(expandedId) && (
    docType === 'Boleta'
    || (docType === 'Factura' && invoiceData.ruc.trim() !== '' && invoiceData.companyName.trim() !== '')
  );

  return (
    <Box>
      <Box sx={{}}>
        <Grid container spacing={0} sx={{}}>
          <Grid
            item
            xs={12}
            sm={12}
            md={isSmallScreen ? 12 : 6.5}
            sx={{ marginBottom: '7%', marginTop: isSmallScreen ? '20%' : '7%', paddingLeft: 'var(--global-padding-inline)' }}
          >
            <Box sx={{ paddingLeft: '30px', marginBottom: '40px' }}>
              <Typography variant='body1' fontWeight='bold' sx={{ fontSize: '14px' }}>
                Centro de Exposiciones Jockey - CEJ
              </Typography>
              <Typography
                variant='h6'
                fontWeight='bold'
                sx={{ paddingTop: '12px', fontSize: '1.9rem', fontWeight: 700 }}
              >
                {eventName}
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.secondary', fontSize: '13px', paddingTop: '5px' }}>
                {formatDate(eventStartDate)}
              </Typography>
            </Box>
            {isSmallScreen && (
              <Box sx={{ paddingLeft: '30px', marginBottom: '40px' }}>
                <Typography variant='body1' fontWeight='bold' sx={{ fontSize: '14px' }}>
                  {eventPlace}
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight='bold'
                  sx={{ paddingTop: '12px', fontSize: '1.9rem', fontWeight: 700 }}
                >
                  {eventName || "Sin nombre"}
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary', fontSize: '13px', paddingTop: '5px' }}>
                  {formatDate(eventStartDate)}
                </Typography>
              </Box>
            )}
            <Box sx={{ paddingRight: '10px', paddingLeft: '30px' }}>
              <Box>
                <SubtitleTag caption='TIPO DE COMPROBANTE' />
                <PaymentDocuments
                  value={docType}
                  onTypeChange={setDocType}
                  onInvoiceDataChange={setInvoiceData}
                />
                <Box sx={{ marginTop: '50px' }}>
                  <SubtitleTag caption='SELECCIONA TU MEDIO DE PAGO' />
                </Box>
                {!expandedId && (
                  <Box sx={{ paddingLeft: '2%', paddingRight: '2%', marginTop: '30px' }}>
                    <AlertIndications alert='Debe seleccionar un medio de pago' />
                  </Box>
                )}
                <Box sx={{ marginTop: '10px' }}>
                  {eventTicket !== 'EXTRANJERO' ? (
                    <Box>
                      <PaymentMethod
                        id='CULQI'
                        expandedId={expandedId}
                        onChange={handleChange}
                        image='https://teleticket.com.pe/content/images/mediopago/mp112.png?v=20241104'
                        name='CULQI'
                        paymentInstitutions='Tarjeta de crédito / débito / Yape'
                        description='Puedes pagar de diferentes entidades bancarias:'
                        informationOne=''
                        informationTwo=''
                        listOfPaymentEntities={[
                          {
                            paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_1.png'
                          },
                          {
                            paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_7.png'
                          },
                          {
                            paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_2.png'
                          },
                          {
                            paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_8.png'
                          },
                          {
                            paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_3.png'
                          },
                          {
                            paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_9.png'
                          }
                        ]}
                        informationThree='Revisa el detalle de la compra y el monto a pagar antes de Continuar, una vez procesado el pago no existen cambios ni devoluciones'
                      />
                    </Box>
                  ) : (
                    <PaymentMethod
                      id='Paypal'
                      expandedId={expandedId}
                      onChange={handleChange}
                      image='https://static.vecteezy.com/system/resources/previews/009/469/637/original/paypal-payment-icon-editorial-logo-free-vector.jpg'
                      name='Paypal'
                      paymentInstitutions='Banca móvil, Agentes y Bodegas vía PagoEfectivo'
                      description='Genera un código de 9 dígitos y págalo a través de:'
                      informationOne='Banca Móvil / Internet: Paga en BBVA, BCP, Interbank, Scotiabank, BanBif, Caja Arequipa y Banco Pichincha, a través de la banca por internet o banca móvil en la opción pago de servicios.'
                      informationTwo='Agentes y Bodegas: Deposita en BBVA, BCP, Interbank, Scotiabank, BanBif, Wester Union, Tambo+, Kasanet, Ya Ganaste, Red Digital, Comercio Multiservicios Niubiz, MoneyGram, Caja Arequipa, Disashop, Cellpower.'
                      listOfPaymentEntities={[
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_1.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_7.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_2.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_8.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_3.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_9.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_4.png' },
                        {
                          paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_10.png'
                        },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_5.png' },
                        {
                          paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_11.png'
                        },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_6.png' },
                        { paymentEntity: 'https://cdnp.teleticket.com.pe/Content/images/mediopago/pagoefectivo_12.png' }
                      ]}
                      informationThree='Revisa el detalle de la compra y el monto a pagar antes de Continuar, una vez procesado el pago no existen cambios ni devoluciones'
                    />
                  )}
                </Box>

                <Box>
                  <CostTable ticketName={eventTicket} price={Number(ticketPrice)} currency={ticketCurrency} />
                </Box>
              </Box>

              {isSmallScreen && (
                <Typography sx={{ width: '100%', marginTop: '50px' }}>
                  <Link href={canContinue ? '/compra/confirmar' : '#'}>
                    <CustomButton
                      disabled={!canContinue}>
                      CONTINUAR
                    </CustomButton>
                  </Link>
                </Typography>
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
                <PurchaseEventLetter
                  image={eventImage}
                  eventLocation={eventPlace}
                  eventDate={eventStartDate}
                  eventName={eventName}
                  pageRoute='/compra/confirmar'
                  disableButton={!canContinue}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default Payments
