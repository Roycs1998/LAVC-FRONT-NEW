'use client'
import { useState } from 'react'

import { Box, Button, Card, CardContent, Grid, MenuItem, TextField } from '@mui/material'

import { getInformationForMail } from '@/Services/Emailservice'
import { SimpleAlert } from './Alert'
import SectionTitle from '@/components/SectionTitle'

interface FormErrors {
  username?: string
  firstName?: string
  email?: string
  problemType?: string
  phoneNumber?: string
  message?: string
}

export const Form = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [problemType, setProblemType] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [answer, setAnswer] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: FormErrors = {}

    if (!username) newErrors.username = 'El nombre de usuario es obligatorio'
    if (!firstName) newErrors.firstName = 'Los apellidos son obligatorios'

    if (!email) {
      newErrors.email = 'Se requiere correo electrónico'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Validación simple de formato de email
      newErrors.email = 'El correo electrónico no es válido'
    }

    if (!problemType) newErrors.problemType = 'El tipo de problema es obligatorio'

    if (!phoneNumber) {
      newErrors.phoneNumber = 'El número de teléfono es obligatorio'
    } else if (phoneNumber.length < 8) {
      newErrors.phoneNumber = 'Numero no valido'
    }

    if (!message) newErrors.message = 'El mensaje es obligatorio'

    // Si hay errores, actualiza el estado
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({}) // Limpia errores si todo es válido


      // Procesar el formulario aquí
      const formData = {
        username,
        firstName,
        email,
        problemType,
        phoneNumber,
        message
      }

      const result = await getInformationForMail(formData)

      setAnswer(result)

      setUsername('')
      setEmail('')
      setFirstName('')
      setMessage('')
      setProblemType('')
      setPhoneNumber('')



      setTimeout(() => {
        setAnswer('')
      }, 4000)
    }
  }

  const currencies = [
    {
      value: 'inscripcion',
      name: 'Inscripción'

    },
    {
      value: 'informacion-stand',
      name: 'Información sobre STAND'
    },
    {
      value: 'otros',
      name: 'Otros'
    }
  ]

  return (
    <Card sx={{ boxShadow: 'none', border: 'none' }}>
      <CardContent>
        <form onSubmit={handleSubmit} className='p-4 max-is-[100%]'>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginBottom: '10px' }}>             
              <SectionTitle
                    title={'Contáctanos ahora'}
                    subTitle={<span className="">No dudes en escribirnos</span>}
                    showIcon={false}
                />
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex', gap: 2 }}>
              <TextField
                sx={{ width: '100%' }}
                fullWidth
                label='Username'
                value={username} // Estado del campo de mensaje
                onChange={e => setUsername(e.target.value)}
                error={Boolean(errors.username)} // Marca como error si hay un mensaje
                helperText={errors.username} // Muestra el mensaje de error
              />
              <TextField
                sx={{ width: '100%' }}
                fullWidth
                label='First Name'
                value={firstName} // Estado del campo de mensaje
                onChange={e => setFirstName(e.target.value)}
                error={Boolean(errors.firstName)} // Marca como error si hay un mensaje
                helperText={errors.firstName} // Muestra el mensaje de error
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                fullWidth
                label='Email'
                type='email'
                value={email} // Estado del campo de mensaje
                onChange={e => setEmail(e.target.value)}
                error={Boolean(errors.email)} // Marca como error si hay un mensaje
                helperText={errors.email} // Muestra el mensaje de error
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ width: '100%' }}
                id='outlined-select-currency'
                select
                label='Tipo de Problema'
                value={problemType} // Estado del campo de mensaje
                onChange={e => setProblemType(e.target.value)}
                error={Boolean(errors.problemType)} // Marca como error si hay un mensaje
                helperText={errors.problemType} // Muestra el mensaje de error
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                fullWidth
                label='Phone Number'
                type='number'
                value={phoneNumber} // Estado del campo de mensaje
                onChange={e => setPhoneNumber(e.target.value)}
                error={Boolean(errors.phoneNumber)} // Marca como error si hay un mensaje
                helperText={errors.phoneNumber} // Muestra el mensaje de error
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                rows={3}
                fullWidth
                label='Mensaje'
                multiline
                value={message} // Estado del campo de mensaje
                onChange={e => setMessage(e.target.value)}
                error={Boolean(errors.message)} // Marca como error si hay un mensaje
                helperText={errors.message} // Muestra el mensaje de error
              />
            </Grid>
            <Grid item xs={12} className='pbs-2' sx={{ marginTop: '10px' }}>
              <Button
                type='submit'
                fullWidth

                /* disabled={isButtonDisabled} */
                sx={{
                  bgcolor: 'var(--primary-color-purple)',
                  color: 'var(--letter-color)',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'var(--color-on-hover)'
                  }
                }}
              >
                Send message
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Box sx={{ paddingLeft: '24px', paddingRight: '24px' }}>{answer && <SimpleAlert message={answer} />}</Box>
    </Card>
  )
}
