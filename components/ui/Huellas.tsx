'use client'

import Image from 'next/image'

import PerroHuella from '@/public/svg/huellas.svg'
import PatoHuella from '@/public/svg/huellas_pato.svg'

import style from './Huellas.module.css'

interface Props {
  tipoHuellas?: 'perro' | 'pato'
  position?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  rotateDeg?: number
  opacity?: number
  className?: string
}

export const Huellas = ({
  tipoHuellas = 'perro',
  position = { top: '-90px', right: '100px' },
  rotateDeg = -20,
  opacity = 0.3,
  className = ''
}: Props) => {
  // elegimos qué imagen usar
  const src = tipoHuellas === 'pato' ? PatoHuella : PerroHuella

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    ...position,
    transform: `rotate(${rotateDeg}deg)`,
    opacity
  }

  return (
    <div
      className={`${style.huellaDecorativa} ${className}`}
      style={wrapperStyle}
    >
      <Image
        src={src}
        alt='Huellas decorativas'
        fill
        className='object-contain'
        sizes='(max-width: 768px) 40vw, 20vw'
        priority={false}
      />
    </div>
  )
}
