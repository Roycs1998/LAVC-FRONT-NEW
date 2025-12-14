'use client'

import { useState } from 'react'

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'

interface RadioButtonsProps {
  onChange: (isSelected: boolean) => void
}

export const AcceptanceCriteria = ({ onChange }: RadioButtonsProps) => {
  const [selectedOption1, setSelectedOption1] = useState(false)
  const [selectedOption2, setSelectedOption2] = useState(false)

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>, option: number) => {
    const isChecked = event.target.checked

    if (option === 1) {
      setSelectedOption1(isChecked)
      onChange(isChecked && selectedOption2)
    }

    if (option === 2) {
      setSelectedOption2(isChecked)
      onChange(selectedOption1 && isChecked)
    }
  }

  return (
    <FormGroup sx={{ border: '2px solid var(--primary-color-purple)', padding: '20px' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedOption1}
            onChange={e => handleSelectionChange(e, 1)}
            sx={{
              color: 'var(--primary-color-purple)',
              '&.Mui-checked': {
                color: 'var(--primary-color-purple)'
              },
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: '0.9rem' }}>
            Declaro que he leído y acepto los Términos y Condiciones y Política de Privacidad de LACV.
          </Typography>
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedOption2}
            onChange={e => handleSelectionChange(e, 2)}
            sx={{
              color: 'var(--primary-color-purple)',
              '&.Mui-checked': {
                color: 'var(--primary-color-purple)'
              },
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: '0.9rem' }}>
            Autorizo que LAVC envíe información sobre eventos y/o promociones que ofrece, así como encuestas.
          </Typography>
        }
      />
    </FormGroup>
  )
}
