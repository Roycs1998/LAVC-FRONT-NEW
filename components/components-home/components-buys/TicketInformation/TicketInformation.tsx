import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { List, ListItem, ListItemText, Card } from '@mui/material'

export const TicketInformation = () => {
  const text =
    'El E-ticket es un comprobante válido de tu compra, por lo que no será canjeado por una entrada tradicional en el punto de venta o boletería.  Para descargar el E-ticket deberás ingresar con tu usuario a "MI CUENTA" en www.teleticket.com.pe, ahí encontrarás el detalle de tu compra y tus E-tickets para descarga.'

  const textParts = text.split(/  +/).filter(part => part.trim() !== '') // Filtra para eliminar secciones vacías

  return (
    <Card
      sx={{
        maxWidth: '100%',
        bgcolor: '#ffffff',
        border: '2px solid var(--primary-color-purple)',
        boxShadow: 'none'
      }}
    >
      <CardContent>
        <Typography gutterBottom variant='h6' component='div' sx={{ color: '#c0b7bd' }}>
          E-Ticket
        </Typography>
        <Typography gutterBottom variant='h6' component='div' sx={{ fontSize: '1.3rem' }}>
          Informacion de Ticket
        </Typography>
        <List>
          {textParts.map((part, index) => (
            <ListItem
              key={index}
              sx={{
                paddingY: 0.5 // Ajusta el espaciado entre ListItems
              }}
            >
              <ListItemText
                primary={`${index + 1}. ${part.trim()}`}
                primaryTypographyProps={{ fontSize: '0.9rem', paddingY: 0 }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
