'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import SectionTitle from '@/components/SectionTitle'

import { getAllPonentes } from '@/api/ponente'

/* interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}
 */
const PonentesList = () => {


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
  

    return (
        <div className="w-full text-base font-light bg-[#3a3480] text-white ">
            <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
                <SectionTitle
                    title={'Nuestros ponentes'}
                    subTitle={<span className="text-backgroundPaper">Cónoce más sobre</span>}
                    showIcon={false}
                />               

                <div className="flex flex-col gap-3">
                    <div className='rounded-2xl shadow-xl bg-white/10 backdrop-blur-sm p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 h-full'>
                        {filteredPonentes.map((ponente) => {

                            return (
                                <Link
                                    key={ponente.persona.persona_nombres}
                                    href={`/ponentes/${ponente.ponenteCodigo}`}
                                    className={`relative z-20 group bg-[#fff] hover:bg-[#3a3480] flex flex-col p-4 overflow-hidden rounded-md duration-300 ease-in-out cursor-pointer min-h-52 transition-colors `}
                                >
                                    <div className="absolute -bottom-7  z-0 transition-all duration-300 ease-in-out pointer-events-none transform group-hover:translate-x-[-10px]">
                                        <Image
                                            src={`${path.replace(/\/?$/, '/')}${ponente.ponenteFoto}`}
                                            alt={ponente.persona_nombres}
                                            className="object-contain grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 duration-300 ease-in-out"
                                            height={190}
                                            width={484}
                                            loading="lazy"
                                        />
                                    </div>

                                    <h2 className="text-2xl font-bold text-[#1A2D4E] group-hover:text-white z-10 relative transition-colors duration-300">
                                        {ponente.persona.persona_nombres} {ponente.persona.persona_apellido_paterno || ''}
                                    </h2>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PonentesList
