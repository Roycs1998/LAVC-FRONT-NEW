'use client'

import Image from 'next/image'
import Link from 'next/link'

import SectionTitle from '@/components/SectionTitle'

import type { getDictionary } from '@/utils/getDictionary'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const ExtraInformation = ({ dictionary }: Props) => {
    const services = [
        {
            title: dictionary?.nav_main?.informationLetters.scheduled_talks,
            href: "/programa",
            image: "/images/ponentes.png",
        },
        {
            title: dictionary?.nav_main?.informationLetters.accommodations,
            href: "/hospedajes",
            image: "/images/fairfield.png",
        },
        {
            title: dictionary?.nav_main?.informationLetters.tourism,
            href: "/tourism",
            image: "/images/machu-pichu-2.png",
        },
    ]

    return (
        <div className="w-full text-base font-light bg-[#3a3480] text-white ">
            <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
                <SectionTitle
                    title={dictionary?.home?.extra_information.title}
                    subTitle={<span className="text-backgroundPaper">{dictionary?.home?.extra_information.subtitle}</span>}
                    showIcon={false}
                />

                <div className="flex flex-col gap-3">
                    <div className='rounded-2xl shadow-xl bg-white/10 backdrop-blur-sm p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 h-full'>
                        {services.map((service) => {

                            return (
                                <Link
                                    key={service.title}
                                    href={service.href}
                                    className={`relative z-20 group bg-[#fff] hover:bg-[#3a3480] flex flex-col p-4 overflow-hidden rounded-md duration-300 ease-in-out cursor-pointer min-h-52 transition-colors `}
                                >
                                    <div className="absolute -bottom-7  z-0 transition-all duration-300 ease-in-out pointer-events-none transform group-hover:translate-x-[-10px]">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            className="object-contain grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 duration-300 ease-in-out"
                                            height={190}
                                            width={484}
                                            loading="lazy"
                                        />
                                    </div>

                                    <h2 className="text-2xl font-bold text-[#1A2D4E] group-hover:text-white z-10 relative transition-colors duration-300">
                                        {service.title}
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

export default ExtraInformation
