import { Box } from '@mui/material'

import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { Informationletter } from '@/components/components-home/components-reusable/InformationLetter'
import { SecondInformationLetter } from '@/components/components-home/components-reusable/SecondInformationLetter'
import { Huellas } from '@/components/ui/Huellas'

const Us = async () => {
  return (
    <Box  className="w-full text-base font-light bg-[#ebeff3] text-white ">
      <Box>
        <CardImage
          image='https://www.tlavc-peru.org/tlavc/vista/upload/galeria/lavc20231%20(12).jpeg'
          title='NOSOTROS SOMOS LAVC'
        />
      </Box>

      <Box className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
      <Huellas position={{ top: '400px', left: '40px' }} rotateDeg={30} tipoHuellas="pato" color="#3a3480" opacity={0.7} />
        <Informationletter
          title='Conferencia Veterinaria Latinoamericana'
          image='http://www.blogerin.com/wp-content/uploads/2012/10/Fotos-tiernas-de-perritos-wallpapers-2.jpg'
          description='El LAVC nace del North American Veterinary Community (NAVC) basada en Gainesville, Florida, USA.
          El objetivo desde su inicio fue traer a Lima una pequeña porción del NAVC Conference (ahora VMX) en Orlando continuando la misión del NAVC de desarrollar mejores profesionales veterinarios en el mundo.
          Para cumplir nuestros objetivos el LAVC recibe participantes de todas partes del Perú y de distintas regiones de Latinoamérica.
          El esfuerzo del LAVC además a servido para acercar a los profesionales y estudiantes de Medicina Veterinaria con la industria de salud animal, contribuyendo asi al desarrollo y crecimiento de este segmento en los últimos años.
          El objetivo de llevar Educación basada en calidad, ha permitido que desde el 2017 la organización cuente con la certificación RACE (Registry of Approved Continuing Education).
          El LAVC es la primera y única organización con este tipo de certificación en todo Latinoamérica.'
          subtitleOne='¿SABÍAS QUE?'
          paragraphOne='El LAVC es una organización peruana sin fines de lucro que desde el 2005 reúne a los médicos veterinarios de Perú y Latinoamérica para ofrecerles educación continua de primer nivel y asi contribuir al desarrollo de los profesionales y de la región.'
          subtitleTwo='Certificación RACE'
          paragraphTwo='Es un placer anunciar que el Latin American Veterinary Conference, ha logrado alcanzar una de las certificaciones de calidad en Educación Continua más importantes a nivel mundial la certificación otorgada por el American Association of Veterinary State Boards (AAVSB) denominada RACE(Registry of Approved Continuing Education) del American Association of Veterinary State Boards.
          Una certificación de calidad mundial que otorgan a prestigios eventos de educación continúa de nivel mundial como el North American Veterinary Community, Western States Veterinary Conference, World Veterinary Association, World Association of Veterinary Dermatology, British Small Animal Veterinary Association entre otras. Esta importante aprobación confirma los casi 14 años de actividad continua e ininterrumpida de primera calidad y de mejora continua.
          Para el programa del 2019 tenemos aprobadas 84 horas de Educación Continua en la que un colega Norteamericano o Canadiense podrá acumular hasta un máximo de 18 horas de CE que le servirán para renovar su licencia profesional.
          Es un privilegio para Latinoamerica tener una organización con este tipo de certificación. Ahora el LAVC entre sus certificaciones de Calidad incluye la RACE otorgada por la AAVSB.'
        />
        <Box sx={{ marginTop: '30px' }}>
          <SecondInformationLetter
            iconOne={<TipsAndUpdatesOutlinedIcon sx={{ fontSize: '4rem' }} />}
            titleOne='MISIÓN'
            descriptionOne='Ofrecer Educación continua de primer nivel para todos los miembros de la comunidad de salud animal de América Latina'
            iconTwo={<EmojiEventsOutlinedIcon sx={{ fontSize: '4rem' }} />}
            titleTwo='VISIÓN'
            descriptionTwo=' La Organización de educación continua más enfocada en el médico veterinario de américa latina.
            Una Organización en constante búsqueda hacia la excelencia y eficiencia organizacional.
            Ser la Mejor Organización de educación Veterinaria a nivel mundial.'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Us
