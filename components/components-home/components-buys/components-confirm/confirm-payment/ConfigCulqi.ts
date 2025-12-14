import Swal from 'sweetalert2';

import Api from '@/api/api';

export function getConfig(amount: number, currency: string, title?: string) {
  return {
    settings: {
      title: title || 'LAVC 2025',
      currency: currency, // Moneda requerida para pagos
      amount: amount * 100 // Monto en centavos
    },
    appearance: {
      theme: 'default',
      buttonCardPayText: 'Pagar'
    }
  };
}

async function sendPayment(token: string, amount: number, currency: string, email:string, userCode:string,eventCode:string,typeOfPayment:string,paymentMethod:string,companyName:string,ruc:string) {
  try {

    const payload = {
      token, amount, currency, email, userCode,eventCode,typeOfPayment,paymentMethod,companyName,ruc
    }

    const response = await Api.post(`/culqi/charge/`, payload);


    /*     const response = await fetch('/api/culqi/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, amount, currency })
        }); */

    const result = response.data;

    console.log("data:", response)

    if (response.status === 201) {
      Swal.fire({
        title: '¡ÉXITO!',
        text: 'El pago se realizó correctamente.',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
    } else {
      Swal.fire({
        title: '¡ERROR!',
        text: result.message || 'Hubo un problema con el pago.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  } catch (error:any) {
    console.error('Error al procesar el pago:', error);
    Swal.fire({
      title: '¡ERROR!',
      text: error?.response?.data?.user_message || 'No se pudo procesar el pago',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
}

export async function getCulqiCheckout(title: string, amount: number, currency: string, email:string, userCode:string,eventCode:string,typeOfPayment:string,paymentMethod:string,companyName:string,ruc:string) {
  const _culqi = new (window as any).CulqiCheckout(
    process.env.NEXT_PUBLIC_CULQI_PUBLICKEY,
    getConfig(amount, currency, title)
  );

  if (!_culqi) {
    Swal.fire({
      title: '¡ERROR!',
      text: 'Error en el proveedor Culqi',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });

    return;
  }

  _culqi.open();

  _culqi.culqi = async () => {
    if (_culqi.token) {
      const token = _culqi.token.id;

      _culqi.close();
      console.log('Se ha creado un Token:', token);

      // Enviar token al backend para procesar el pago
      await sendPayment(token, amount, currency, email, userCode
        ,eventCode
        ,typeOfPayment
        ,paymentMethod
        ,companyName
        ,ruc);
    } else {
      console.error('Error en el pago:', _culqi.error);
      Swal.fire({
        title: '¡ERROR!',
        text: _culqi.error || 'No se pudo procesar el pago .',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  };
}
