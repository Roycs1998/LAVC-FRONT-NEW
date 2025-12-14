import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

interface Ticket {
  ticketName: string
  price: number
  currency:string
}

export const CostTable = ({ ticketName, price, currency }: Ticket) => {
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Box>
        <Typography variant='body1' component='div' sx={{ fontSize: '0.9rem', marginBottom: '30px' }}>
          RESUMEN
        </Typography>
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none'
          }}
        >
          <Table sx={{ minWidth: 150 }} aria-label='simple table'>
            <TableBody>
              <TableRow
                key={1}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderTop: '1px solid #ececec',
                  borderBottom: '1px solid #ececec',
                  borderLeft: 'none',
                  borderRight: 'none'
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  sx={{
                    fontSize: '1.1rem',
                    color: '#bbbabd'
                  }}
                >
                  {ticketName}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    fontSize: '1.1rem',
                    color: '#bbbabd'
                  }}
                >
                  {currency === 'USD' ? `$ ${price?.toFixed(2)}` : `S/. ${price?.toFixed(2)}`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ marginTop: '50px' }}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none'
          }}
        >
          <Table sx={{ minWidth: 150 }} aria-label='simple table'>
            <TableBody>
              <TableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { padding: '1px' } }}>
                <TableCell component='th' scope='row' sx={{ fontSize: '1.1rem', border: 'none' }}></TableCell>
                <TableCell align='right' sx={{ fontSize: '.8rem', border: 'none' }}>
                  TOTAL
                </TableCell>
              </TableRow>

              <TableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { padding: '4px' } }}>
                <TableCell component='th' scope='row' sx={{ fontSize: '1.1rem', border: 'none' }}></TableCell>
                <TableCell align='right' scope='row' sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {currency === 'USD' ? `$ ${price?.toFixed(2)}` : `S/. ${price?.toFixed(2)}`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
