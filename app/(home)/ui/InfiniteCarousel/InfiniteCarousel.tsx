'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

import './styles.css'

interface Props {
  items: string[]
  reserveDirection?: boolean
}

const InfiniteCarousel = ({ items, reserveDirection = false }: Props) => {
  const URL = process.env.NEXT_PUBLIC_SPACE_URL || ''

  return (
    <div className="space-y-6 relative">
      {/* Fades laterales sobre fondo blanco */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

      <Swiper
        className="sample-slider"
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
          reverseDirection: reserveDirection,
          stopOnLastSlide: false
        }}
        slidesPerView="auto"
        speed={3000}
      >
        {items.map((item, index) => {
          const src = `${URL.replace(/\/?$/, '/')}${item}`

          return (
            <SwiperSlide
              key={index}
              className="!w-auto flex items-center justify-center px-2 py-2"
            >
              {/* Card rectángulo, fondo blanco, tamaño fijo */}
              <div
                className="
                  relative 
                  h-[72px] w-[160px] 
                  md:h-[80px] md:w-[200px]
                  bg-white 
                  rounded-md 
                  shadow-sm 
                  flex items-center justify-center
                "
              >
                <Image
                  src={src}
                  alt={`Logo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 200px"
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default InfiniteCarousel
