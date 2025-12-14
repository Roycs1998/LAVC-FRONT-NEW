'use client'

import { useEffect, useState, useRef } from 'react'

import { motion, useInView } from 'framer-motion'

import { FaPeopleGroup } from "react-icons/fa6";

import { IoBusiness } from 'react-icons/io5'

import { MdOutlineEmojiEvents } from "react-icons/md";

import type { getDictionary } from '@/utils/getDictionary'

interface Props {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const AnimatedNumbers = ({ dictionary }: Props) => {
  const numbers = [
    { title: 5500, icon: FaPeopleGroup , iconSize: 70, description: dictionary?.home?.numbers.participants },
    { title: 60, icon: IoBusiness, iconSize: 85, description: dictionary?.home?.numbers.companies },
    { title: 20, icon: MdOutlineEmojiEvents, iconSize: 75, description: dictionary?.home?.numbers.years_experience}
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [counts, setCounts] = useState(numbers.map(() => 0))

  useEffect(() => {
    if (isInView) {
      numbers.forEach((n, index) => {
        let start = 0
        const end = n.title
        const duration = 2000

        const increment = (end / duration) * 20

        const interval = setInterval(() => {
          start += increment

          if (start >= end) {
            start = end

            clearInterval(interval)
          }

          setCounts(prev => {
            const newCounts = [...prev]

            newCounts[index] = Math.floor(start)

            return newCounts
          })
        }, 20)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <div ref={ref} className='grid grid-cols-3 gap-5 md:gap-10 py-10'>
      {numbers.map((n, index) => (
        <motion.div
          key={n.description}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className='flex items-center justify-center sm:justify-normal gap-3 sm:divide-x-[2px] divide-[#f5c72c] col-span-4 sm:col-span-2 lg:col-span-1'
        >
          <div className='h-20 w-20 text-white flex flex-col items-center justify-center'>
            <n.icon size={n.iconSize} />
          </div>

          <div className='flex flex-col px-4'>
            <p className='text-3xl lg:text-4xl font-bold'>
              <span className='text-[#f5c72c]'>+</span> {counts[index]}
            </p>

            <p className='text-lg md:text-xl font-bold py-2'>{n.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AnimatedNumbers
