import * as React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'

interface HighPrices {
  costProfessionals?: number
  costHighSchoolStudents?: number
  costForeignProfessionals?: number
  costForeignStudents?: number
  workshopCost?: number
}

export const PriceTable = ({
  costProfessionals,
  costHighSchoolStudents,
  costForeignProfessionals,
  costForeignStudents,
  workshopCost
}: HighPrices) => {
  const data = [
    { color: '#1F9DDC', category: 'MEDICO VETERINARIO', price: costProfessionals, currency: 'S/.' },
    { color: '#F7CA2A', category: 'ESTUDIANTE O BACHILLER', price: costHighSchoolStudents, currency: 'S/.' },
    { color: '#F6A51A', category: 'MEDICO VETERINARIO EXTRANJERO', price: costForeignProfessionals, currency: '$' },
    { color: '#3a3480', category: 'ESTUDIANTE O BACHILLER EXTRANJERO', price: costForeignStudents, currency: '$' },
    { color: '#3a3480', category: 'VETERINARIO', price: workshopCost, currency: 'S/.' }
  ]

  const filteredData = data.filter(item => item.price !== 0)
  const rows = filteredData.map(item => createData(item.color, item.category, item.price, item.currency))

  function createData(Color: string, category: string, price?: number, currency?: string) {
    return { Color, category, price, currency }
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', width: '600px' }}>
      <Table sx={{ borderCollapse: 'collapse' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: 'none' }}>CATEGORIA</TableCell>
            <TableCell align='right' sx={{ border: 'none' }}>
              PRECIOS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.category} sx={{ '&:last-child td, &:last-child th': { border: 'none' } }}>
              <TableCell component='th' scope='row' sx={{ border: 'none', padding: '9px 8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: 'none' }}>
                  <Box
                    sx={{
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      backgroundColor: row.Color,
                      marginRight: 2,
                      boxShadow: `0 0 8px ${row.Color}, 0 0 10px ${row.Color}`,
                      border: 'none'
                    }}
                  />
                  {row.category}
                </Box>
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', border: 'none', padding: '2px 8px' }}>
                {`${row.currency} ${row.price?.toFixed(2)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
