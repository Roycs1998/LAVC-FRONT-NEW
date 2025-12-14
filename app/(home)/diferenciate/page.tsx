import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { Informationletter } from '@/components/components-home/components-reusable/InformationLetter'
import { SecondInformationLetter } from '@/components/components-home/components-reusable/SecondInformationLetter'

const Differentiate = () => {
  return (
    <Box>
      <Box>
        <CardImage
          image='https://www.gratistodo.com/wp-content/uploads/2016/11/Fondos-pantalla-perros-19.jpg'
          title='BECA RIPPIE'
        />
      </Box>
      <Box className='global-padding' sx={{ paddingBottom: '3%', paddingTop: '3%', bgcolor: 'var(--background-form)' }}>
        <Informationletter
          title='GANADOR'
          image='https://tlavc-peru.org/img/brippie-2024.jpeg'
          subtitleOne='BECA RIPPIE'
          paragraphOne='El objetivo de esta beca es generar una experiencia única para los jovenes estudiantes de medicina veterinaria ya que podran acceder a muchos conocimentos dentro de el LAVC , la Beca está dirigida a estudiantes de las diferentes regiones del Perú fuera de Lima.'
          subtitleThree='Los lineamientos establecidos de la beca RIPPIE son los siguientes:'
          stepsThree='Cobertura del 100% de la Inscripción al LAVC.
          Cobertura del 100% Transporte terrestre o aéreo.
          Cobertura del 100% del costo de estadía.'
          formText='Para participar pulsa en el siguiente botón'
          forButton='Formulario de postulación a Becario'
        />

        <Box sx={{ marginTop: '50px' }}>
          <SecondInformationLetter
            titleOne='Perfil del Postulante'
            stepsOne='Tener una gran sensibilidad y respeto para con todos los animales.
            Ser clasificado en el quinto superior de su clase.
            Ser de un nivel económico que no le permita asumir los costos de participar en el LAVC por propia cuenta.
            Ser un comunicador y líder de su promoción.'
            titleTwo='Objetivo'
            descriptionTwo=' El objetivo de esta beca es generar una experiencia única para los jóvenes veterinarios ya que podrán acceder a muchos conocimentos dentro del LAVC.'
          />
        </Box>

        <Box sx={{ marginTop: '50px' }}>
          <Informationletter
            title='DR. EARL H. RIPPIE'
            description='Un miembro fundador del directorio del LAVC y conferencista en su primera versión en el año 2005, nos ha dejado.
            El afable y generoso Dr. Rippie vivió nuestra profesión con gran distinción llegando a ser presidente del NAVC así como su Secretario Tesorero.
            También fue elegido Presidente de la Asociación de Médicos Veterinarios del Estado de New Jersey.
            Odontólogo por especialidad pero clínico y cirujano de animales de compañía fue muy querido y respetado no sólo por sus clientes sino es especial por sus colegas.
            Gran amigo del Perú, él me acompañó en fundar el LAVC, siendo un gran impulsor de este hermoso proyecto. Todos los que tuvimos el honor de conocerlo sentiremos su ausencia.'
            image='https://tlavc-peru.org/img/becarippie.jpg'
            subtitleThree='Descansa en paz querido amigo y colega.'
            stepsFour='Jorge Guerrero, MV, MSc, PhD, DACVM, DEVP.
            Presidente y Fundador, LAVC.
            Past President, NAVC'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Differentiate
