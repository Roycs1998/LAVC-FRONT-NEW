import * as React from 'react'

import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

interface Data {
  icon: React.ReactNode
  qualification: string
  link: string
}

export const InformationLetters = ({ icon, qualification, link }: Data) => {
  return (
    <Link href={link} className='block'>
      <Card className='group h-[200px] w-[357px] cursor-pointer overflow-hidden rounded-lg border-none bg-transparent shadow-none transition-transform duration-300 ease-out hover:scale-105'>
        <CardContent className='flex h-full flex-col items-center justify-center space-y-3 bg-[#153B8B] transition-colors duration-300 group-hover:bg-[#244998]'>
          <div className='text-center text-[var(--letter-color)]'>{icon}</div>
          <p className='text-center text-[25px] font-semibold leading-tight text-[var(--letter-color)]'>{qualification}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
