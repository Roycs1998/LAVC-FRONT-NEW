import * as React from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Definimos el tipo de datos que vamos a recibir
interface Data {
  image: string
  name: string
  link: string
}

// Recibimos la lista de elementos como props
interface InformationList {
  title: string
  nameButton: string
  information: Data[]
}

export const LavcLetter = ({ nameButton, title, information }: InformationList) => {
  return (
    <Card className='w-full overflow-hidden border shadow-sm bg-[var(--color-card-background)]'>
      <div className='mt-2 w-full rounded-tl-[15px] bg-[#153B8B] px-2 py-1 text-center text-lg font-bold text-[#f0f1f3]'>
        {title}
      </div>
      <CardContent className='space-y-4 p-4'>
        {information.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-1 gap-4 border-b border-muted-foreground/10 pb-4 last:border-b-0 last:pb-0 md:grid-cols-[1fr_1fr]'
          >
            <div className='flex h-[195px] items-center justify-center'>
              <img
                src={item.image}
                alt={`Imagen ${index}`}
                className='h-full w-full rounded-md object-contain'
              />
            </div>

            <div className='flex flex-col justify-center space-y-3'>
              <h3 className='text-xl font-bold text-[#153B8B]'>{item.name}</h3>
              <p className='text-base text-foreground/80'>Nov 11 - 12, 2024</p>
              <Link href={item.link} className='w-full md:w-4/5'>
                <Button
                  className={cn(
                    'h-12 w-full rounded-[15px] text-base font-semibold uppercase tracking-wide',
                    'bg-[#153B8B] text-[#f0f1f3] hover:bg-[#0f2e70]'
                  )}
                >
                  {nameButton}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
