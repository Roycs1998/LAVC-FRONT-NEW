import { Alert } from '@mui/material'

interface InputInformation {
  alert: string
}

export const AlertIndications = ({ alert }: InputInformation) => {
  return (
    <Alert severity='error' sx={{ border: '1px solid #fcb6b3', borderRadius: '0px', fontSize: '0.8rem' }}>
      {alert}
    </Alert>
  )
}
