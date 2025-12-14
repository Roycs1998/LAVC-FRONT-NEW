'use client';

import { useEffect, useState } from 'react'

import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'

import type{ Workshop } from '@/interfaces/workShop/work-shop'
import { getAllworkShop } from '@/api/workShop'
import WorkShopList from '@/components/work-shops/WorkShopList'


export default function EventosTalleres() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])

  useEffect(() => {
    const getWorkshops = async () => {
      const workshops = (await getAllworkShop()) || []

      setWorkshops(workshops)
    }

    getWorkshops()
  }, [])

  return (
    <Box>
      <Box>
        <CardImage
          image='https://www.tlavc-peru.org/tlavc/vista/upload/galeria/web12.17.jpeg'
          title='EVENTOS Y TALLERES'
        />
      </Box>
      <WorkShopList workShopsList={workshops} />
    </Box>
  )
}

