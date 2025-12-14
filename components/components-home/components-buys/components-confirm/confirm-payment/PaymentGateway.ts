import { getCulqiCheckout } from './ConfigCulqi'

export function CheckPaymentGateway(
  title:string,
  amount: number ,
  typeOfPayment: string,
  setAlertMessage: (message: string) => void,
  currency:string,
  email:string,
  userCode:string,
  eventCode:string,
  paymentMethod:string,
  companyName:string,
  ruc:string,) {
  switch (paymentMethod) {
    case 'NIUBIZ':
      setAlertMessage('Por el momento no implementamos esta forma de pago')
      break
    case 'CULQI':
      getCulqiCheckout(title,amount,currency, email, userCode,eventCode,typeOfPayment,paymentMethod,companyName,ruc)
      break
    case 'PagoEfectivo':
      setAlertMessage('Por el momento no implementamos esta forma de pago')
      break
    case 'Paypal':
      setAlertMessage('Por el momento no implementamos esta forma de pago')
      break
    default:
      setAlertMessage('Seleccione un tipo de pago')
  }
}
