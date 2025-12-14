'use client'

import dynamic from 'next/dynamic';

const AnimatedNumbers = dynamic(() => import('./AnimatedNumbers'), { ssr: false });

import type { getDictionary } from '@/utils/getDictionary'


interface Props {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const NumberSection = ({ dictionary }: Props) => {
  return (
    <div className='w-full text-base font-light bg-[#3a3480] text-white relative overflow-hidden'>
      <div className='max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center min-h-56'>
        <AnimatedNumbers dictionary={dictionary} />
      </div>
    </div>
  )
}

export default NumberSection
