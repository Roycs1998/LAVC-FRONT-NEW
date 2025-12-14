'use client'
import { useEffect, useState, useMemo } from 'react'

import Link from 'next/link'

import Accordion from '@mui/material/Accordion'

import AccordionSummary from '@mui/material/AccordionSummary'

import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Box, Button, darken, Divider, MenuItem, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'

import { toast } from 'react-toastify'

import { formatDate } from '@/libs/utils'

import CustomButton from '@/components/ui/CustomButton'

import { BecaModal } from './BecaModal'
import { registerInscripcion } from '@/api/inscripciones'
import type{ CreateInscripcionPayload } from '@/interfaces/my-events/interface'

interface Route {
  eventos: number
  route: string
  typeOfEvent: number
  costProfessionals?: number
  costHighSchoolStudents?: number
  costForeignProfessionals?: number
  costForeignStudents?: number
  workshopCost?: number
  dateWorkshop?: string
}


type ticketStructure = { value: string; price?: number, currency: string }

export const PurchaseLetter = ({
  eventos,
  route,
  typeOfEvent,
  costProfessionals,
  costHighSchoolStudents,
  costForeignProfessionals,
  costForeignStudents,
  workshopCost,
  dateWorkshop
}: Route) => {
  const [ticket, setTicket] = useState<ticketStructure | null>(null)
  const { status, ...restSession } = (useSession() as any);
  const [problemType, setProblemType] = useState('')

  const [expanded, setExpanded] = useState(true)
  const [trigger, setTrigger] = useState<boolean>(false)
  
  // — Estado para abrir/cerrar el modal (ya lo tienes)
  const [openBecaModal, setOpenBecaModal] = useState(false);

  // — Tus estados existentes…
  const [becaCode, setBecaCode] = useState('');

  // — **Nuevos estados para el modal**:
  const [operationNumber, setOperationNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [currency, setCurrency] = useState('PEN');
  const [file, setFile] = useState<File | null>(null);
  const [comprobanteType, setComprobanteType] = useState<'Boleta' | 'Factura'>('Boleta')
  const [razonSocial, setRazonSocial] = useState('')
  const [ruc, setRuc] = useState('')

  const onActivateModal = async () => {
    try {

      const payload: CreateInscripcionPayload = {
        usuario_codigo: restSession.data?.user?.user?.userCode,
        taller_codigo: eventos,
        tipo_inscripcion: 5,
        inscripcion_correo: restSession.data?.user?.user?.userName,
        inscripcion_monto_abonado: paymentAmount,
        inscripcion_comprobante: comprobanteType,
        inscripcion_estado: 1,
        inscripcion_numero_operacion: operationNumber,
        inscripcion_razonsocial: comprobanteType === 'Factura' ? razonSocial : '',
        inscripcion_nfactura: comprobanteType === 'Factura' ? ruc : '',
        file: file!
      };

      await registerInscripcion(payload);

      setOpenBecaModal(false);
    } catch {

    }
  };

  const tickets = useMemo(() => [
    {
      value: 'MEDICO VETERINARIO',
      price: costProfessionals,
      currency: 'PEN'
    },
    {
      value: 'ESTUDIANTE O BACHILLER',
      price: costHighSchoolStudents,
      currency: 'PEN'
    },
    {
      value: 'EXTRANJERO PROFESIONAL',
      price: costForeignProfessionals,
      currency: 'USD'
    },
    {
      value: 'EXTRANJERO ESTUDIANTE',
      price: costForeignStudents,
      currency: 'USD'
    },
    {
      value: 'PRECIO GENERAL',
      price: workshopCost,
      currency: 'PEN'
    }
  ], [costProfessionals, costHighSchoolStudents, costForeignProfessionals, costForeignStudents, workshopCost]);

  const filteredDataTicket = tickets.filter(item => item.price !== 0)

  const handleChange = (event: React.SyntheticEvent, newExpanded: boolean | ((prevState: boolean) => boolean)) => {
    setExpanded(newExpanded)
  }

  useEffect(() => {

    const getTicket = async () => {
      const selectedOption = tickets.find(option => option.value === problemType)

      if (selectedOption) {
        setTicket(selectedOption)
      } else {
        const defaultTicket: ticketStructure = {
          value: 'PRECIO GENERAL',
          price: workshopCost,
          currency: 'PEN'
        }

        setTicket(defaultTicket)
      }
    }

    getTicket()
  }, [problemType, trigger, tickets, workshopCost])

  useEffect(() => {

    const saveTicketInEvent = () => {
      const eventData = localStorage.getItem('eventData')

      if (eventData) {
        const parsedEvent = JSON.parse(eventData)

        const updatedEventData = {
          ...parsedEvent, // Copiamos las propiedades del evento original
          ticket: ticket?.value,
          price: ticket?.price,
          currency: ticket?.currency
        }

        localStorage.setItem('eventData', JSON.stringify(updatedEventData))
      }
    }

    saveTicketInEvent()

  }, [ticket])

  const forceEffect = () => {
    status !== 'authenticated' ?
      toast.warn('Debes iniciar sesión para comprar tu entrada') : setTrigger(!trigger)
  }

  // Función para manejar el clic en "ACTIVAR BECA"
  const handleActivateBeca = () => {
    if (status === 'authenticated') {
      setOpenBecaModal(true)
    } else {
      toast.warn('Debes iniciar sesión para activar la beca')
    }
  }

  return (
    <Box sx={{ paddingTop: '5%' }}>
      <Box
        sx={{
          width: '450px',
          height: '60px',
          background: 'linear-gradient(to left,#3a3480, #e2d9f1)',
          marginBottom: '20px'
        }}
      >
        <Typography
          variant='h5'
          sx={{
            color: 'var(--letter-color)',
            height: '100%',
            width: '100%',
            display: 'flex',
            marginLeft: '30px',
            alignItems: 'center',
            fontWeight: 800
          }}
        >
          Proceso de inscripción
        </Typography>
      </Box>
      <Box sx={{ width: '450px' }}>
        <Accordion expanded={expanded} sx={{ borderRadius: 'none' }} onChange={handleChange}>
          <AccordionSummary aria-controls='panel1-content' id='panel1-header'>
            <Box sx={{ height: '90px', width: '100%' }}>
              <Typography
                variant='h5'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  fontWeight: 800,
                  padding: '20px'
                }}
              >
                {dateWorkshop ? formatDate(dateWorkshop) : 'FECHA NO DEFINIDA'}
              </Typography>
            </Box>
          </AccordionSummary>
          {typeOfEvent !== 1 && typeOfEvent !== 3 && (
            <AccordionDetails sx={{ bgcolor: '#f9f6fe', p: 0 }}>

              <Box
                sx={{
                  height: '80px',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: '15px',
                  paddingRight: '15px'
                }}
              >
                <TextField
                  fullWidth
                  sx={{
                    width: '100%',
                    fontSize: '1rem',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#202021' // Mantiene el color actual
                      },
                      '&:hover fieldset': {
                        borderColor: '#202021' // Desactiva el cambio de color al hacer hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#202021' // Desactiva el cambio de color al hacer focus
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#202021' // Color del label inicial
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#202021' // Color del label al enfocarse
                    },
                    '& .MuiInputLabel-shrink': {
                      color: '#202021' // Color del label cuando sube al escribir
                    }
                  }}
                  id='outlined-select-currency'
                  select
                  label='Selecciona categoria'
                  defaultValue=''
                  value={problemType} // Estado del campo de mensaje
                  onChange={e => setProblemType(e.target.value)}
                >
                  {filteredDataTicket.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </AccordionDetails>
          )}
          <AccordionDetails>
            <Box >
              <Link href={typeOfEvent === 2 ? (problemType && status === 'authenticated' ? route : '') : route}>
                <CustomButton
                  size='medium'
                  disabled={typeOfEvent === 2 ? !problemType : false}
                  onClick={forceEffect}
                >
                  Pagar entrada
                </CustomButton>
              </Link>
              <Divider sx={{ my: 4, bgcolor: '#000', height: 2 }} />
              <Typography align='center' variant="h5" color="text.secondary" sx={{ fontWeight: 800 }}>¿Tienes voucher de pago?</Typography>
              <Box sx={{ mt: 1 }}>
                <CustomButton
                  onClick={handleActivateBeca}
                >
                  Subir constancia de pago
                </CustomButton>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Divider sx={{ my: 4, bgcolor: '#000', height: 2 }} />
                <Typography align='center' variant="h5" color="text.secondary" sx={{ fontWeight: 800 }}>¿Tienes codigo de beca?</Typography>

                <TextField
                  autoFocus
                  margin="dense"
                  label="Código de Beca"
                  placeholder='Ingrese el código de beca'
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={becaCode}
                  onChange={(e) => setBecaCode(e.target.value)}
                />
                <CustomButton
                  onClick={handleActivateBeca}
                >
                  ACTIVAR BECA
                </CustomButton>
              </Box>

              {status !== 'authenticated' && (
                <Link href={'/login'}>
                  <Button
                    sx={{
                      bgcolor: 'var(--primary-color-purple)', // Fondo desvanecido si está deshabilitado
                      color: 'var(--letter-color)', // Texto blanco si está deshabilitado
                      width: '100%',
                      height: 55,
                      marginTop: '10px',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      opacity: 1, // Opacidad reducida si está deshabilitado
                      transition: 'all 0.3s ease', // Transición suave al cambiar el estado
                      '&:hover': {
                        color: 'var(--letter-color)',
                        backgroundColor: `${darken('#3a3480', 0.3)} !important`,
                      },
                    }}
                  >
                    INICIAR SESIÓN
                  </Button>
                </Link>
              )}

            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <BecaModal
        open={openBecaModal}
        onClose={() => setOpenBecaModal(false)}
        operationNumber={operationNumber}
        onChangeOperation={setOperationNumber}
        paymentAmount={paymentAmount}
        onChangeAmount={setPaymentAmount}
        currency={currency}
        onChangeCurrency={setCurrency}
        file={file}
        onFileUpload={setFile}
        onActivate={onActivateModal} // esta es tu función final
        comprobanteType={comprobanteType}
        onChangeComprobanteType={setComprobanteType}
        razonSocial={razonSocial}
        onChangeRazonSocial={setRazonSocial}
        ruc={ruc}
        onChangeRuc={setRuc}
      />
    </Box>
  )
}
