'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import Carousel from 'react-bootstrap/Carousel'

import { Box, Typography } from '@mui/material'

import { Icon } from '@iconify/react/dist/iconify.js'

import type { getDictionary } from '@/utils/getDictionary'


import style from './carrucel.module.css'

import CustomButton from '@/components/ui/CustomButton'

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

export const Carrucel = ({ dictionary }: Props) => {
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const redirection = () => {
    router.push('/eventos-talleres')
  }
  
  const carouselItems = [
    {
      src: '/images/banners/1.jpg',
      alt: 'First slide'
    },
    {
      src: '/images/banners/2.jpg',
      alt: 'Second slide'
    },
    {
      src: '/images/banners/3.jpg',
      alt: 'Second slide'
    }
  ]

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel

        activeIndex={index}
        indicators={true}
        controls={false}
        interval={8000}
        onSelect={handleSelect}
      >
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx} style={{ position: 'relative' }} className={style.carouselItem}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className={style.imagen}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Box className={style.layer}></Box>


      <Box className={`${style.textOverlay}`}>
        <Typography
          variant='h3'
          sx={{
            color: '#f5c72c',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center'
          }}
        >
          {dictionary?.nav_main?.carrucel.date}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontWeight: 'bold',
            color: 'var(--letter-color)',
            fontFamily: 'Arial, sans-serif',
            fontSize: { xs: '3rem', sm: '2.5rem', md: '3rem' }, // Tamaños responsivos
            textAlign: 'center'
          }}
        >
          <span className='text-[#f5c72c] font-bold'>{dictionary?.home?.hero.highlight_title}</span>
          <br />
          <span className='hidden sm:block'>{dictionary?.home?.hero.tagline}</span>
        </Typography>

        <Typography
          variant='h6'
          sx={{
            color: 'var(--letter-color)',
            fontFamily: 'Arial, sans-serif',
            fontSize: { xs: '1.5rem', sm: '1.2rem', md: '1.5rem' }, // Tamaños responsivos
            textAlign: 'center'
          }}
        >
          {dictionary?.home?.hero.description}
        </Typography>

        {/* Botones */}
        <Box display='flex' justifyContent='center' sx={{ marginTop: '10px' }}>
          <CustomButton onClick={redirection} bgColor='#f5c72c' hoverBgColor="#3a3480" size='large' >{dictionary?.home?.hero.cta}<Icon className='ml-1' icon="dashicons:pets" width="25" height="22" /></CustomButton>
        </Box>
      </Box>
    </Box>
  )
}
