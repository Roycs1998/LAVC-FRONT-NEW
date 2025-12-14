import Link from 'next/link'

import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'

export const AdditionalInformationLetter = () => {
  function createData(Categoria: string, Precios: any) {
    return { Categoria, Precios }
  }

  const rows = [
    createData('HASTA EL 20 DE DICIEMBRE(2024)', 'S/ 100.00'),
    createData('21 DE DICIEMBRE HASTA 20 DE ENERO( 2025)', 'S/ 150.00'),
    createData('21 DE ENERO HASTA 21 DE FEBRERO( 2025)', 'S/ 200.00'),
    createData('APARTIR DEL 22 DE FEBRERO( 2025)', 'NO HAY REEMBOLSO')
  ]

  return (
    <Box sx={{ border: '1px solid #ececec', padding: '20px' }}>
      <Box>
        <Typography variant='h6' fontWeight='bold' sx={{ paddingTop: '12px', fontSize: '1.1rem', fontWeight: 800 }}>
          SI NO PUEDES IR AL EVENTO
        </Typography>
        <Typography variant='h6' fontWeight='bold' sx={{ paddingTop: '5px', fontSize: '1.1rem', fontWeight: 800 }}>
          ¿QUIERES RECUPERAR EL VALOR TOTAL DE TU TICKET?
        </Typography>
      </Box>
      <Box sx={{ height: '5px', width: '10%', backgroundColor: '#3a3480' }}></Box>

      <Box
        sx={{
          marginTop: '50px',
          borderTop: '8px solid #3a3480',
          bgcolor: 'var(--background-form)',
          padding: '20px',
          paddingBottom: '30px'
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center', // Centra verticalmente
                justifyContent: 'center',
                color: '#fff',
                borderRadius: '8px',
                height: '100%'
              }}
            >
              <SecurityIcon sx={{ color: 'var(--primary-color-purple)', fontSize: '9rem' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                marginTop: '30px'
              }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, fontSize: '1.5rem', textAlign: { xs: 'center', md: 'center', sm: 'center' } }}
              >
                Detalles del Reembolso
              </Typography>
              <Box sx={{ marginTop: '20px' }}>
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 'none', minWidth: '150px', bgcolor: 'var(--background-form)' }}
                >
                  <Table sx={{ borderCollapse: 'collapse' }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ border: 'none', fontWeight: 700 }}>FECHAS DE REEMBOLSO</TableCell>
                        <TableCell align='right' sx={{ border: 'none', fontWeight: 700 }}>
                          TARIFAS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.Categoria} sx={{ '&:last-child td, &:last-child th': { border: 'none' } }}>
                          <TableCell component='th' scope='row' sx={{ border: 'none', padding: '9px 8px' }}>
                            {row.Categoria}
                          </TableCell>
                          <TableCell align='right' sx={{ fontWeight: 'bold', border: 'none', padding: '2px 8px' }}>
                            {row.Precios}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>

          {/* Segunda fila con una columna que ocupa todo el ancho */}
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                marginTop: '40px'
              }}
            >
              <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                Para cualquier consulta o asistencia adicional, comunícate con soporte técnico:
                <Link href='/soporte'>
                  <Typography sx={{ fontWeight: 700, color: 'var(--primary-color-purple)' }}>Soporte</Typography>
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
