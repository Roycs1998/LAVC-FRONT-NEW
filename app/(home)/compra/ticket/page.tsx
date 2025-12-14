'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Box, Grid, Typography, useMediaQuery } from '@mui/material'

import { TicketInformation } from '@/components/components-home/components-buys/TicketInformation'
import { CostTable } from '@/components/components-home/components-buys/CostTable'
import { PurchaseEventLetter } from '@/components/components-home/components-buys/purchase-event-letter'
import { SubtitleTag } from '@/components/components-home/components-reusable/SubtitleTag'
import { formatDate } from '@/libs/utils'
import CustomButton from '@/components/ui/CustomButton'

const InformacionDeTicket = () => {
  const [eventName, setEventName] = useState<string>('')
  const [eventImage, setEventImage] = useState<string>('')
  const [eventPlace, setEventPlace] = useState<string>('')
  const [eventStartDate, setEventStartDate] = useState<string>('')
  const [eventTicket, setEventTicket] = useState<string>('')
  const [ticketPrice, setTicketPrice] = useState<string>('')
  const [ticketCurrency, setTicketCurrency] = useState<string>('')

  const isSmallScreen = useMediaQuery('(max-width:1275px)')

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
    }
  }, [])

  const [offsetY, setOffsetY] = useState(0)
  const maxOffsetY = 300

  const handleScroll = () => {
    const newOffsetY = window.scrollY * 0.5 // Ajusta el multiplicador para un efecto más o menos fuerte

    setOffsetY(newOffsetY > maxOffsetY ? maxOffsetY : newOffsetY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
                {eventPlace}
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
            <Box sx={{ paddingRight: '30px', paddingLeft: '30px' }}>
              <Box>
                <SubtitleTag caption='Informacion de Ticket' />
              </Box>
              <TicketInformation />

              <CostTable ticketName={eventTicket} price={Number(ticketPrice)} currency={ticketCurrency} />
              {isSmallScreen && (
                <Typography sx={{ width: '100%', marginTop: '50px' }}>
                  <Link href='/compra/adicionales'>
                    <CustomButton>
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
                  pageRoute='/compra/adicionales'
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default InformacionDeTicket
