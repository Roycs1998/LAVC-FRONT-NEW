import { Alert } from '@mui/material'

interface InputInformation {
  alert: string
}

export const SuccessAlert = ({ alert }: InputInformation) => {
  return <Alert severity='success'>{alert}</Alert>
}
