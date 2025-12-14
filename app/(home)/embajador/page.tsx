import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { Informationletter } from '@/components/components-home/components-reusable/InformationLetter'

const Embajador = () => {
  const baseUrl = process.env.NEXT_PUBLIC_IMG_BASE_URL

  return (
    <Box>
      <Box>
        <CardImage
          image='https://cdn.pixabay.com/photo/2024/12/06/13/16/animal-9248795_1280.jpg'
          title='EMBAJADOR'
        />
      </Box>
      <Box className='global-padding' sx={{ paddingBottom: '3%', paddingTop: '3%', bgcolor: 'var(--background-form)' }}>
        <Informationletter
          title='¿Quiénes son?'
          image={`${baseUrl}/img/embajador-2024.jpeg`}
          paragraphOne='Los embajadores estudiantiles son representantes del LAVC en las principales universidades que forman a nuestros futuros médicos veterinarios. Los embajadores estudiantiles se caracterizan por contar con altas calificaciones y son lideres en sus facultades.
Los embajadores LAVC son seleccionados para tener un espacio distinto de aprendizaje con los conferencistas y mejores profesionales de nivel nacional e internacional en el LAVC.'
          subtitleThree='Para ser embajador sólo se necesita lo siguiente:'
          stepsThree='Ser estudiante desde el 5to ciclo de la carrera de Medicina Veterinaria
                      Tener disponibilidad de estar presente los 4 días de evento en el LAVC.
                      Mantener buenas calificaciones.
                      Enviar sus datos completos, describir porque quiere ser embajador y sus objetivos de ser seleccionado.
                      Tendrá una entrevista personal con el Latin American Veterinary Conference.'
          formText='Para participar pulsa en el siguiente botón'
          forButton='Formulario de postulación a Embajador'
          linkButton='https://docs.google.com/forms/d/e/1FAIpQLSclktIu2ShY2kefiqmVVYbtnwlBE_ishe5S8INdTsYWBOsNVQ/viewform'
        />
      </Box>
    </Box>
  )
}

export default Embajador

