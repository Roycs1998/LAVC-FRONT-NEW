'use client'
import React, { useEffect } from 'react'

import type { FC } from 'react'

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

interface PaymentDocumentsProps {
  
  /** Valor seleccionado: 'Boleta' o 'Factura' */
  value: 'Boleta' | 'Factura'
  
  /** Callback cuando cambia el tipo de documento */
  onTypeChange: (type: 'Boleta' | 'Factura') => void
  
  /** Callback con datos de factura: { ruc, companyName } cuando es Factura */
  onInvoiceDataChange?: (data: { ruc: string; companyName: string }) => void
}

export const PaymentDocuments: FC<PaymentDocumentsProps> = ({
  value,
  onTypeChange,
  onInvoiceDataChange,
}) => {
  // Internal state only for controlled inputs
  const [ruc, setRuc] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')

  // Disparar callback de datos de factura
  useEffect(() => {
    if (value === 'Factura' && onInvoiceDataChange) {
      onInvoiceDataChange({ ruc, companyName })
    }
  }, [ruc, companyName, value, onInvoiceDataChange])

  return (
    <Box>
      <FormControl component='fieldset'>
        <RadioGroup
          row
          value={value}
          onChange={(e) => onTypeChange(e.target.value as 'Boleta' | 'Factura')}
        >
          {['Boleta', 'Factura'].map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={
                <Radio
                  sx={{  paddingRight: '4px' }}
                />
              }
              label={opt}
              sx={{ marginRight: '30px' }}
            />
          ))}
        </RadioGroup>

        {value === 'Factura' && (
          <Box mt={2}>
            <Typography variant='subtitle1' sx={{ marginBottom: 1 }}>
              Ingresa tus datos para generar factura por S/ 3.00
            </Typography>
            <TextField
              size='small'
              fullWidth
              label='RUC de la Empresa'
              placeholder='Ingresa el RUC de la empresa'
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              size='small'
              fullWidth
              label='Nombre de la Empresa'
              placeholder='Ingresa el Nombre de la empresa'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ pl: 1 }}>
              <Typography
                variant='body2'
                sx={{ '&::before': { content: '"•"', mr: 0.5, fontWeight: 700 } }}
              >
                La factura se realizará por el monto correspondiente a la comisión
              </Typography>
              <Typography
                variant='body2'
                sx={{ '&::before': { content: '"•"', mr: 0.5, fontWeight: 700 } }}
              >
                Si requieres factura por el monto restante, deberás solicitarlo directamente a la empresa organizadora.
              </Typography>
            </Box>
          </Box>
        )}
      </FormControl>
    </Box>
  )
}
