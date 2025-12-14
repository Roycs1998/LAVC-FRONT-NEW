'use client'
import React, { useEffect, useState } from 'react'

import { Box, Tab, Tabs, Typography } from '@mui/material'

import PetsIcon from '@mui/icons-material/Pets'

import { Icon } from '@iconify/react/dist/iconify.js'

import { ProgramLetters } from './ProgramLetters'
import { getAllPonentes } from '@/api/ponente'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface EventProgramProps {
  locationLabel?: string
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}


export const EventProgram: React.FC<EventProgramProps> = ({ locationLabel = 'Location:' }) => {


  const DAY_ORDER = [
    'DOMINGO 17 DE MAYO',
    'LUNES 18 DE MAYO',
    'MARTES 19 DE MAYO',
    'MIERCOLES 20 DE MAYO',
    'MIÉRCOLES 20 DE MAYO',
    'JUEVES 21 DE MAYO'
  ]

  const programa = [
    {
      "SALA 1": {
        "DOMINGO 17 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "LUNES 18 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "MARTES 19 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Ms. Megan Brashear, EEUU", "tema": "¡Es una emergencia! ¿Qué ahora?  " },
          { "hora": "10:00 A 10:50", "ponente": "Ms. Megan Brashear, EEUU", "tema": "Emergencias respiratorias: reconociendo el problema.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Ms. Megan Brashear, EEUU", "tema": "Comprensión de la terapia de líquidos: necesidades, dosis y monitoreo.  " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Carol Reinero, EEUU", "tema": "Uso de los Patrones de Respiración en la Evaluación de la Dificultad Respiratoria en Gatos.  " },
          { "hora": "15:30 A 16:20", "ponente": " Dr. Carol Reinero, EEUU", "tema": "Neumonía Bacteriana Canina: ¿Qué Hay de Nuevo? " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Carol Reinero, EEUU", "tema": "Principios Farmacológicos para el Manejo de Enfermedades Respiratorias. " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "MIERCOLES 20 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Carol Reinero, EEUU", "tema": "Enfermedades Respiratorias que Puede Que No Haya Aprendido en la Escuela Veterinaria.  " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Carol Reinero, EEUU", "tema": "Casos Respiratorios Desafiantes en Perros y Gatos." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Carol Reinero, EEUU", "tema": "Enfermedad de las Grandes Vías Respiratorias (bronquial) en gatos." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Alicia Webb Milum, EEUU", "tema": "Manejo de las infecciones de la piel: cómo llegar al diagnóstico.  " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Alicia Webb Milum, EEUU", "tema": "Manejo de las infecciones de la piel: hacer un plan de tratamiento apropiado.  " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Alicia Webb Milum, EEUU", "tema": "Enfoque diagnóstico y terapéutico para las enfermedades autoinmunes de la piel.  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "JUEVES 21 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Alicia Webb Milum, EEUU.", "tema": "Actualización sobre el síndrome atópico felino: el enfoque de diagnóstico para el gato que se rasca.  " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Alicia Webb Milum, EEUU", "tema": "¡No siempre son alergias! Grandes impostores en perros.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Alicia Webb Milum, EEUU", "tema": "¡No siempre son alergias! Grandes impostores en gatos.  " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Ms. Megan Brashear, EEUU", "tema": "Lo que entre debe salir: obstrucciones urinarias en gatos.  " },
          { "hora": "15:30 A 16:20", "ponente": "Ms. Megan Brashear, EEUU", "tema": "¿Emergencia anestésica? ¡No entren en pánico!   " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Ms. Megan Brashear, EEUU", "tema": "Cuidado de enfermería para el paciente crítico, monitoreo y reconocimiento del estado del paciente.  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "FIESTA DE CIERRE" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "Despedida" }
        ]

      },
      "SALA 2": {
        "DOMINGO 17 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "LUNES 18 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. M. Katherine Tolbert, EEUU", "tema": "Supresión Ácida en Gatos: ¿Por Qué No Pueden Ser Tratados Como Perros Pequeños”?  Dr. M. Katherine Tolbert, EEUU" },
          { "hora": "15:30 A 16:20", "ponente": "Dr. M. Katherine Tolbert, EEUU", "tema": "Bióticos Cuándo y Cómo Usarlos para Enfermedades GI Felinas" },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. M. Katherine Tolbert, EEUU", "tema": "Selección de Dieta para Enteropatías Crónicas en el Gato: Una Discusión Basada en Casos" },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "MARTES 19 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Joerg Steiner, EEUU/Alemania", "tema": "Manejo de la diarrea crónica – lo básico. " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Joerg Steiner, EEUU/Alemania", "tema": "Diagnóstico de pancreatitis.   " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Manejo de la pancreatitis.  Dr. Joerg Steiner, EEUU/Alemania", "tema": "Evaluación nutricional y recomendaciones para tutores que alimentan dietas no convencionales: Dietas frescas comerciales, dietas caseras, cocidas y crudas.  Dr. Belén Barragán, EEUU" },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. M. Katherine Tolbert, EEUU", "tema": "Selección de Dieta para Enteropatías Crónicas en el Perro: Una Discusión Basada en Casos.  " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. M. Katherine  Tolbert, EEUU", "tema": "Una Actualización sobre la Evidencia para la Transplantación Microbiana Fecal.  " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. M. Katherine  Tolbert, EEUU", "tema": "El Gato Estreñido: De la Crisis al Confort - Un Enfoque Práctico. " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "MIERCOLES 20 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Joerg Steiner, EEUU/Alemania", "tema": "Insuficiencia pancreática exocrine.  " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Joerg Steiner, EEUU/Alemania", "tema": "Disbiosis intestinal." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Joerg Steiner, EEUU/Alemania", "tema": "Enfermedad hepática crónica. " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Belén Barragán, EEUU", "tema": "Obesidad: Estrategias efectivas para un manejo exitoso." },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Belén Barragán, EEUU", "tema": "Osteoartritis y nutrición: Más allá del control del peso." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Belén Barragán, EEUU", "tema": "Intolerancias y alergias alimentarias: Diagnóstico y recomendación de dietas adecuadas." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "JUEVES 21 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Belén Barragán, EEUU", "tema": "Enfermedades intestinales y su manejo nutricional: Del intestino delgado al colon. " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Belén Barragán, EEUU", "tema": "Nutrición en pacientes con enfermedad renal crónica: Claves para ralentizar la progresión. " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": " Dr. Belén Barragán, EEUU", "tema": "Evaluación nutricional y recomendaciones para tutores que alimentan dietas no convencionales: Dietas frescas comerciales, dietas caseras, cocidas y crudas." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "" },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "" },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "" },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ]
      },
      "SALA 3": {
        "DOMINGO 17 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "LUNES 18 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "MARTES 19 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Teresa DeFrancesco, EEUU", "tema": "Actualizaciones en el manejo de la valvulopatía mitral mixomatosa preclínica canina." },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Teresa DeFrancesco, EEUU", "tema": "Manejo de emergencia de la insuficiencia cardíaca en gatos.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Teresa DeFrancesco, EEUU", "tema": "Estudios de casos clinicos sobre cardiopatías felinas.  " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Nicole K. Martell-Moran, EEUU", "tema": "Conferencia Magistral Dra. Elizabeth Colleran. Más allá de la desungulación: Evaluación y manejo de las consecuencias a largo plazo ." },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Nicole K. Martell-Moran, EEUU", "tema": "Vómitos y diarrea persistentes: Descifrando las enfermedades gastrointestinales felinas. Parte 1  " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Nicole K. Martell-Moran, EEUU", "tema": "Vómitos y diarrea persistentes: Descifrando las enfermedades gastrointestinales felinas. Parte 2  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "MIERCOLES 20 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Nicole K. Martell-Moran, EEUU", "tema": "Superando los desafíos del hipertiroidismo felino.  " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Nicole K. Martell-Moran, EEUU", "tema": "Aclarando las cosas: Enfoques para la rinitis felina.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Nicole K. Martell-Moran, EEUU", "tema": "Misión posible: Combatir la PIF.  " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Douglas Mader and Mr. Bob Battle, EEUU", "tema": "Introducción a los fundamentos de endoscopia: ¿Qué necesita, cuánto costará y será rentable para mí?  Parte 1. " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Douglas Mader and Mr. Bob Battle, EEUU", "tema": "Introducción a los fundamentos de endoscopia: ¿Qué necesita, cuánto costará y será rentable para mí?  Parte 2. " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Douglas Mader and Mr. Bob Battle, EEUU", "tema": "Demostraciones en vivo de endoscopia rígida y flexible en el escenario con modelos.  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "JUEVES 21 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Teresa DeFrancesco, EEUU", "tema": "Actualizaciones en el manejo de la valvulopatía mitral mixomatosa preclínica canina.   " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Teresa DeFrancesco, EEUU", "tema": "Manejo de emergencia de la insuficiencia cardíaca canina.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Teresa DeFrancesco, EEUU", "tema": "Casos clínicos de cardiopatía canina.  " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Douglas Mader and Mr. Bob Battle, EEUU", "tema": "Usos comunes de la endoscopia rígida y flexible son rentable en la práctica? Parte 1.  " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Douglas Mader and Mr. Bob Battle, EEUU", "tema": "Usos comunes de la endoscopia rígida y flexible son rentable en la práctica? Parte 2." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Douglas Mader and Mr. Bob Battle, EEUU", "tema": "Usos comunes de la endoscopia rígida y flexible, son rentables en la práctica de cirugía con mascotas exóticas? " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ]
      },
      "SALA 4": {
        "DOMINGO 17 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "LUNES 18 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "MARTES 19 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Mr. Stephen Niño Cital, EEUU", "tema": "Introducción al sistema endocannabinoide, el endocannabinoidoma y la farmacología de los cannabinoides,  " },
          { "hora": "10:00 A 10:50", "ponente": "Mr. Stephen Niño Cital, EEUU", "tema": "Revisión bibliográfica actual sobre cannabinoides en salud animal. " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Mr. Stephen Niño Cital, EEUU", "tema": "Cannabinología." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Ross Palmer, EEUU", "tema": "Técnicas quirúrgicas prácticas. " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Ross Palmer, EEUU", "tema": "Cómo mejorar su capacidad para detectar cojeras sutiles.  " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Ross Palmer, EEUU", "tema": "El dolor de artrosis canina: Un enfoque práctico para la detección del dolor de la osteo artritis canina.  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "MIERCOLES 20 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Ross Palmer, EEUU", "tema": "5 componentes claves para un tratamiento eficaz de la osteo artritis." },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Ross Palmer, EEUU", "tema": "Osteoartritis felina: Una gran oportunidad para expandir su práctica.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Ross Palmer, EEUU", "tema": "Peculiaridades ortopédicas felinas: es diferente de las de los perros.  " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Mr. Stephen Niño Cital, EEUU", "tema": "Cannabinoides en la práctica clínica: Enfoques prácticos.  " },
          { "hora": "15:30 A 16:20", "ponente": "Mr. Stephen Niño Cital, EEUU", "tema": "Manejo del dolor: Complementando los enfoques farmacéuticos. " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Mr. Stephen Niño Cital, EEUU", "tema": "Nuevas tendencias en el manejo del dolor. " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "JUEVES 21 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "" },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "" },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "" },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "" },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "" },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "" },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" },
        ]
      },
      "SALA 5": {
        "DOMINGO 17 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "LUNES 18 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "ARMADO E INSTALACION DE STANDS,  TODO EL DIA." }
        ],
        "MARTES 19 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "07:30 A 09:00" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Leigh Ann Collins, EEUU", "tema": "Cuidados prácticos y trucos caseros para el cuidado de mascotas mayores y geriátricas, Parte 1.  " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Leigh Ann Collins, EEUU", "tema": "Cuidados prácticos y trucos caseros para el cuidado de mascotas mayores y geriátricas, Parte 2.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Leigh Ann Collins, EEUU", "tema": "¿Dónde están los hocicos grises? Marcar antes de que sea demasiado tarde . " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Marty Becker, EEUU", "tema": "¿Quieres aumentar drásticamente los ingresos de tu consultorio y, al mismo tiempo, practicar una mejor medicina? Te mostraré cómo con Fear Free - Parte 1.  " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Marty Becker, EEUU", "tema": "¿Quieres aumentar drásticamente los ingresos de tu consultorio y, al mismo tiempo, practicar una mejor medicina? Te mostraré cómo con Fear Free - Parte 2." },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Marty Becker, EEUU", "tema": "La ciencia detrás de Fear Free.  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" }
        ],
        "MIERCOLES 20 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "07:30 A 09:00" },
          { "hora": "09:00 A 09:50", "ponente": "Dr. Marty Becker, EEUU", "tema": "Si no cuidas el bienestar emocional de los animales, no estás practicando la mejor medicina y estás perdiendo clientes.  " },
          { "hora": "10:00 A 10:50", "ponente": "Dr. Marty Becker, EEUU", "tema": "Cómo atender sin esfuerzo a los pacientes más difíciles que, literalmente, nos da miedo ver.  " },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "Receso para Café" },
          { "hora": "12:00 A 12:50", "ponente": "Dr. Marty Becker, EEUU", "tema": "Si eres un veterinario normal, como yo, pero quieres destacar en la consulta, te enseñaré mis procedimientos avanzados para trabajar con pacientes geriátricos. " },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "Receso para almuerzo" },
          { "hora": "14:30 A 15:20", "ponente": "Dr. Leigh Ann Collins, EEUU", "tema": "Ingredientes vitales para hospicios veterinarios y cuidados paliativos.  " },
          { "hora": "15:30 A 16:20", "ponente": "Dr. Leigh Ann Collins, EEUU", "tema": "Ayudar a los dueños a evaluar la calidad de vida.  " },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "Receso para Café" },
          { "hora": "17:30 A 18:20", "ponente": "Dr. Leigh Ann Collins, EEUU", "tema": "Carga emocional y alivio del guardián de la mascota.  " },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "Dr. Leigh Ann Collins, EEUU" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "Dr. Leigh Ann Collins, EEUU" }
        ],
        "JUEVES 21 DE MAYO": [
          { "hora": "07:30 A 09:00", "ponente": "", "tema": "" },
          { "hora": "09:00 A 09:50", "ponente": "", "tema": "" },
          { "hora": "10:00 A 10:50", "ponente": "", "tema": "" },
          { "hora": "11:00 A 11:50", "ponente": "", "tema": "" },
          { "hora": "12:00 A 12:50", "ponente": "", "tema": "" },
          { "hora": "13:00 A 14:30", "ponente": "", "tema": "" },
          { "hora": "14:30 A 15:20", "ponente": "", "tema": "" },
          { "hora": "15:30 A 16:20", "ponente": "", "tema": "" },
          { "hora": "16:30 A 17:20", "ponente": "", "tema": "" },
          { "hora": "17:30 A 18:20", "ponente": "", "tema": "" },
          { "hora": "18:30 A 19:20", "ponente": "", "tema": "" },
          { "hora": "19:30 A 20:30", "ponente": "", "tema": "" },
        ]
      }

    }

  ]

  const getProgramaObj = () => {

    if (Array.isArray(programa) && programa.length === 1 && typeof programa[0] === 'object') {
      return programa[0] as Record<string, Record<string, Array<{ hora: string; ponente?: string; tema?: string }>>>
    }

    return (programa as unknown) as Record<string, Record<string, Array<{ hora: string; ponente?: string; tema?: string }>>>
  }

  const getSalas = (progObj: Record<string, any>) => {
    return Object.keys(progObj).sort((a, b) => {

      const na = parseInt(a.replace(/\D+/g, '') || '0', 10)
      const nb = parseInt(b.replace(/\D+/g, '') || '0', 10)

      if (isNaN(na) || isNaN(nb)) return a.localeCompare(b)

      return na - nb
    })
  }

  const getDiasOrdenados = (diasObj: Record<string, any>) => {
    const dias = Object.keys(diasObj)

    // ordenar según DAY_ORDER; los que no estén, al final por nombre

    const indexed = dias.map(d => {
      const idx = DAY_ORDER.findIndex(x => x.toUpperCase() === d.toUpperCase())

      return { d, idx: idx === -1 ? 999 : idx }
    })

    indexed.sort((a, b) => (a.idx - b.idx) || a.d.localeCompare(b.d))

    return indexed.map(x => x.d)
  }

  const programaObj = getProgramaObj()
  const salas = getSalas(programaObj)

  const [salaIndex, setSalaIndex] = React.useState(0)

  const [ponentes, setPonentes] = useState<any[]>([])
  const path = process.env.NEXT_PUBLIC_SPACE_URL || ''

  useEffect(() => {
    const fetchPonentes = async () => {
      const ponentesList = await getAllPonentes()

      setPonentes(ponentesList)
    }

    fetchPonentes()
  }, [])

  const filteredPonentes = ponentes ? ponentes.filter(ponente => ponente.ponenteEstado === 1) : []


  const STRIP_TOKENS = new Set([
    'DR', 'DRA', 'DRS', 'MR', 'MRS', 'MS', 'ING', 'MV', 'MVZ', 'VET', 'PH', 'PHD', 'MSC', 'MS', 'BS', 'DVM', 'DACVIM', 'ACVIM', 'ACVECC',
    'DECZM', 'DABVP', 'FFCP', 'FFCP-V', 'FRSM', 'RVT', 'RLAT', 'SRA', 'CVPP', 'VTS', 'LAM', 'DACVS', 'ACVS', 'ECVIM', 'ECVIM-CA',
    'EEUU', 'USA', 'US', 'U.S.', 'ALEMANIA', 'GERMANY', 'CANADA', 'UK', 'REINO', 'UNIDO'
  ])

  const normalizeName = (s: string) =>
    (s || '')
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')        // quita acentos
      .replace(/[.,;:()/\-–_|]/g, ' ')                       // quita puntuación
      .replace(/\s+/g, ' ')                                  // colapsa espacios
      .trim()
      .toUpperCase()

  const stripTitlesAndDegrees = (s: string) => {
    const toks = normalizeName(s).split(' ').filter(Boolean)
    const kept = toks.filter(t => !STRIP_TOKENS.has(t))

    // evitar quedarnos sin nada:

    return (kept.length ? kept : toks).join(' ')
  }

  // Dice coeficiente (bigrams)
  const diceCoefficient = (aRaw: string, bRaw: string) => {
    const a = stripTitlesAndDegrees(aRaw)
    const b = stripTitlesAndDegrees(bRaw)

    if (!a || !b) return 0
    if (a === b) return 1

    const bigrams = (str: string) => {
      const s = str.replace(/\s+/g, ' ')
      const pairs: string[] = []

      for (let i = 0; i < s.length - 1; i++) pairs.push(s.slice(i, i + 2))

      return pairs
    }

    const aPairs = bigrams(a)
    const bPairs = bigrams(b)

    if (!aPairs.length || !bPairs.length) return 0
    const set = new Map<string, number>()

    for (const p of aPairs) set.set(p, (set.get(p) || 0) + 1)
    let inter = 0

    for (const p of bPairs) {
      const k = set.get(p) || 0

      if (k > 0) {
        inter++
        set.set(p, k - 1)
      }
    }


    return (2 * inter) / (aPairs.length + bPairs.length)
  }

  // bonus por iniciales (ej: "M. KATHERINE TOLBERT" vs "Dr. M. Katherine Tolbert")
  const initialsBonus = (aRaw: string, bRaw: string) => {
    const toks = (s: string) => stripTitlesAndDegrees(s).split(' ').filter(Boolean)
    const A = toks(aRaw), B = toks(bRaw)

    if (!A.length || !B.length) return 0

    // misma última palabra (apellido) suma bonus
    let bonus = 0

    if (A[A.length - 1] === B[B.length - 1]) bonus += 0.08

    // comparte al menos 2 tokens o 1 token y 1 inicial
    const setA = new Set(A)
    const overlap = B.filter(x => setA.has(x)).length

    if (overlap >= 2) bonus += 0.07

    // chequeo de iniciales de primer nombre
    const initA = A[0]?.[0], initB = B[0]?.[0]

    if (initA && initB && initA === initB) bonus += 0.05

    return Math.min(bonus, 0.15)
  }

  // nombre visible desde la BD (ignorando grados del campo "persona_apellido_materno")
  const fullNameFromDB = (p: any) => {
    const first = (p?.persona?.persona_nombres || '').trim()
    const last = (p?.persona?.persona_apellido_paterno || '').trim()
    const composed = [first, last].filter(Boolean).join(' ').replace(/\s+/g, ' ')

    return composed || (p?.persona?.persona_nombres || '').trim()
  }

  // URL absoluta para la foto
  const photoUrl = (base: string, rel: string) => {
    if (!rel) return ''
    if (/^https?:\/\//i.test(rel)) return rel
    const cleanBase = (base || '').replace(/\/+$/, '')
    const cleanRel = rel.replace(/^\/+/, '')

    return `${cleanBase}/${cleanRel}`
  }

  // indexamos ponentes activos
  const ponenteIndex = React.useMemo(() => {
    const arr = filteredPonentes.map(p => {
      const name = fullNameFromDB(p)

      return {
        raw: name,
        norm: stripTitlesAndDegrees(name),
        foto: photoUrl(path, p?.ponenteFoto || ''),
        original: p
      }
    })

    return arr

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPonentes, path])

  // match de UNA cadena de programa contra el índice
  const bestPonenteMatch = (nameLike: string) => {
    if (!nameLike) return null
    const candidate = stripTitlesAndDegrees(nameLike)
    let best: { score: number; item: any } | null = null

    for (const it of ponenteIndex) {
      const base = diceCoefficient(candidate, it.norm)
      const score = base + initialsBonus(candidate, it.norm)

      if (!best || score > best.score) best = { score, item: it }
    }

    // umbral razonable; cúbrete contra falsos positivos

    if (best && best.score >= 0.60) return best.item

    return null
  }

  // Soporte múltiples ponentes en el texto (and/y/,)
  const splitMultiSpeakers = (s: string) => {
    if (!s) return []

    // separa por “ and ”, “ y ”, “,” manteniendo nombres compuestos

    return s
      .replace(/\sand\s/gi, '|')
      .replace(/\sy\s/gi, '|')
      .split(/[|,]/)
      .map(x => x.trim())
      .filter(Boolean)
  }

  // Dado un item.ponente => devuelve [{name, image}] (pueden ser varios)
  const resolveSpeakers = (programName: string) => {
    const parts = splitMultiSpeakers(programName)
    const seen = new Set<string>()
    const out: Array<{ name: string; image: string }> = []

    for (const part of (parts.length ? parts : [programName])) {
      const m = bestPonenteMatch(part)

      if (m && !seen.has(m.norm)) {
        out.push({ name: m.raw, image: m.foto })
        seen.add(m.norm)
      }
    }


    return out
  }

  const [dayIndex, setDayIndex] = React.useState(0)

  React.useEffect(() => {
    setDayIndex(0)
  }, [salaIndex])

  const handleSalaChange = (_e: React.SyntheticEvent, newValue: number) => {
    setSalaIndex(newValue)
  }

  const handleDayChange = (_e: React.SyntheticEvent, newValue: number) => {
    setDayIndex(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Cabecera */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          height: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', md: '45%' },
            height: { xs: '100%', md: '100px' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            alignItems: 'center',
            bgcolor: 'var(--letter-color)',
            paddingLeft: 'var(--global-padding-inline)'
          }}
        >
          <Typography
            className='global-padding hidden md:block'
            variant='h1'
            component='div'
            sx={{
              fontSize: { xs: '2rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 800,
              textAlign: 'center',
              width: '100%',
              color: '#3a3480'
            }}
          >
            <PetsIcon sx={{ fontSize: { xs: '3rem', sm: '3rem', md: '4rem' } }} /> LAVC 2026
          </Typography>
        </Box>

        {/* TABS EXTERIORES: SALAS */}
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', md: '55%' },
            height: '100px',
            bgcolor: '#f9c426',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            paddingRight: 'var(--global-padding-inline)'
          }}
        >
          <Tabs
            value={salaIndex}
            onChange={handleSalaChange}
            aria-label='tabs-salas'
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root.Mui-selected': { color: 'var(--color-on-hover)' },
              '& .MuiTabs-indicator': { backgroundColor: 'var(--color-on-hover)' }
            }}
          >
            {salas.map((sala, idx) => (
              <Tab
                key={sala}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon='mdi:door' fontSize='1.2rem' />
                    {sala}
                  </Box>
                }
                sx={{
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  fontWeight: 700,
                  color: 'var(--letter-color)',
                  mr: { xs: 1, sm: 2, md: 3 }
                }}
                {...a11yProps(idx)}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          bgcolor: 'var(--background-form)',
          paddingTop: { xs: '20px', md: '50px' },
          paddingLeft: 'var(--global-padding-inline)',
          paddingRight: 'var(--global-padding-inline)',
          paddingBottom: '3%'
        }}
      >
        {/* Panel por SALA (solo renderizamos la sala activa para no cargar todo a la vez) */}
        {salas.map((sala, idxSala) => (
          <CustomTabPanel key={sala} value={salaIndex} index={idxSala}>
            {/* TABS INTERIORES: DÍAS (Domingo → Jueves) */}
            <Tabs
              value={idxSala === salaIndex ? dayIndex : 0}
              onChange={handleDayChange}
              aria-label='tabs-dias'
              variant='scrollable'
              scrollButtons
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root.Mui-selected': { color: 'var(--color-on-hover)' },
                '& .MuiTabs-indicator': { backgroundColor: 'var(--color-on-hover)' },
                mb: 2
              }}
            >
              {getDiasOrdenados(programaObj[sala] || {}).map((dia, i) => (
                <Tab
                  key={dia}
                  label={dia}
                  sx={{ fontWeight: 700, mr: { xs: 1, sm: 2, md: 3 } }}
                  {...a11yProps(i)}
                />
              ))}
            </Tabs>

            {getDiasOrdenados(programaObj[sala] || {}).map((dia, iDia) => (
              <CustomTabPanel key={`${sala}-${dia}`} value={idxSala === salaIndex ? dayIndex : -1} index={iDia}>
                {(programaObj[sala]?.[dia] || []).map((item, itemIndex) => {
                  const speakers = resolveSpeakers(item.ponente || '')
                  const first = speakers[0] || { name: item.ponente || '', image: '' }

                  return (
                    <Box key={itemIndex} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ProgramLetters
                        hour={item.hora || ''}
                        issue={item.tema || ''}
                        exhibitorName={first.name}
                        image={first.image}
                        eventDescription={item.tema || ''}
                        location={sala}
                        locationLabel={locationLabel}
                      />
                    </Box>
                  )
                })}
              </CustomTabPanel>
            ))}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  )
}
