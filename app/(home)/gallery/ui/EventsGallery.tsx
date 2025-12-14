'use client'

import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { getAllFotos } from '@/api/foto'

const InfiniteCarousel = dynamic(() => import('./InfiniteCarousel'), { ssr: false })

interface Foto {
    fotoCodigo: string
    fotoUrl: string
    fotoTitulo: string
    fotoAnio: string
}

export default function EventsGallery() {
    const [fotos, setFotos] = useState<Foto[]>([])
    const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>({})
    const path = process.env.NEXT_PUBLIC_SPACE_URL + "/" || ''

    useEffect(() => {
        const fetchFotos = async () => {
            const fotosList: Foto[] = await getAllFotos()
            
            setFotos(fotosList)

            // Inicializar índices activos por año
            const years = Array.from(new Set(fotosList.map(f => f.fotoAnio)))
            const init: Record<string, number> = {}
            
            years.forEach(year => { init[year] = 0 })
            setActiveIndexes(init)
        }

        fetchFotos()
    }, [])

    // Agrupar fotos por año
    const grouped = fotos.reduce((acc: Record<string, Foto[]>, foto) => {
        if (!acc[foto.fotoAnio]) acc[foto.fotoAnio] = []
        acc[foto.fotoAnio].push(foto)
        
        return acc
    }, {})

    return (
        <main className="">
            {Object.entries(grouped).map(([year, items], index) => {
                const activeIndex = activeIndexes[year] || 0
                const backgroundUrl = path + items[activeIndex].fotoUrl
                const titleAlignment = index % 2 === 0 ? 'text-left' : 'text-right'
                const opacityLevel = 0.3 + (index * 0.05) // entre 0.3 y 0.9
                
                const overlayStyle = {
                  backgroundColor: `rgba(245, 201, 39, ${Math.min(opacityLevel, 0.9)})`
                }


                return (
                    <section
                      key={year}
                      className="
                        relative 
                        px-6 
                        py-16 
                        md:py-28 
                        bg-cover 
                        bg-center 
                        min-h-[80vh] 
                        flex 
                        items-center
                      "
                      style={{ backgroundImage: `url("${encodeURI(backgroundUrl)}")` }}
                    >
                      {/* Capa oscura transparente */}
                      <div className="absolute inset-0" style={overlayStyle} />
              
                      {/* Contenido principal */}
                      <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <h2 className={`text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6 ${titleAlignment}`}>
                          {year}
                        </h2>
              
                        <InfiniteCarousel
                          items={items.map(f => path + f.fotoUrl)}
                          reserveDirection={false}
                          onSlideChange={(index: number) => {
                            setActiveIndexes(prev => ({ ...prev, [year]: index }))
                          }}
                        />
                      </div>
                    </section>
                )
            })}
        </main>
    )
}
