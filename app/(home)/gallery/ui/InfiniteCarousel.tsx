'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './styles.css'
import { Button } from '@mui/material'

interface InfiniteCarouselProps {
  items?: string[]
  reserveDirection?: boolean
  onSlideChange?: (activeIndex: number) => void
}

const isValidImage = (url: string) => {
  if (!url) return false
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg']
  const lower = url.toLowerCase()
  
  return allowedExtensions.some(ext => lower.endsWith(ext))
}

export default function InfiniteCarousel({
  items = [],
  reserveDirection = false,
  onSlideChange,
}: InfiniteCarouselProps) {

  const slides = Array.isArray(items) ? items.filter(isValidImage) : []
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="space-y-6 relative z-0">

        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 0,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            reverseDirection: reserveDirection,
          }}
          slidesPerView="auto"
          speed={3000}
          onSlideChange={swiper => onSlideChange?.(swiper.realIndex)}
        >
          {slides.map((src, idx) => (
            <SwiperSlide
              key={idx}
              className="w-40 h-24 flex-shrink-0 flex items-center justify-center m-2 bg-white rounded shadow cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Slide ${idx}`}
                  fill
                  className="object-cover rounded"
                  loading="lazy"
                  onError={e => {

                    const slideEl = e.currentTarget.closest('.swiper-slide') as HTMLElement
                    
                    if (slideEl) slideEl.style.display = 'none'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <Button
              onClick={() => setSelectedImage(null)}
              variant="contained"
              color="warning"
              className="absolute top-3 right-3 text-white text-1xl z-10 hover:text-yellow-400 transition"
            >
              Close
            </Button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
