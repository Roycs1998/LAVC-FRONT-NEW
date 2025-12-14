'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SecondLevel {
  text: string
  link: string
}

interface LinkItem {
  secondLevelText?: SecondLevel[]
  text: string
  link?: string
}

interface Information {
  start: string
  links?: LinkItem[]
}

export const DrawerInformation = ({ start, links }: Information) => {
  const [open, setOpen] = useState(false)
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null)

  const handleToggle = () => {
    setOpen(prev => !prev)
  }

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <div className="w-full">
      <div
        onClick={handleToggle}
        className="flex justify-between items-center cursor-pointer py-1"
      >
        <span className="text-[1rem] font-[550] text-white">
          {start}
        </span>
        {open ? (
          <ChevronUp className="w-8 h-8 text-white" />
        ) : (
          <ChevronDown className="w-8 h-8 text-white" />
        )}
      </div>

      {open && (
        <div className="mt-1 flex flex-col gap-1">
          {links?.map((linkItem, index) => (
            <div key={index}>
              {linkItem.secondLevelText ? (
                <div key={index}>
                  <div
                    onClick={() => handleSubMenuToggle(index)}
                    className="flex justify-between items-center cursor-pointer pb-2"
                  >
                    <span className="text-[1rem] text-white font-[550]">
                      {linkItem.text}
                    </span>
                    {openSubMenuIndex === index ? (
                      <ChevronUp className="w-8 h-8 text-white" />
                    ) : (
                      <ChevronDown className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {openSubMenuIndex === index && (
                    <div className="pl-4 mb-2 flex flex-col gap-1">
                      {linkItem.secondLevelText.map((subLink, subIndex) => (
                        <Link key={subIndex} href={subLink.link} className="block">
                          <span className="text-[1rem] text-white hover:text-[var(--color-on-hover)] transition-colors py-1 block">
                            {subLink.text}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={linkItem.link || ''} className="block">
                  <span className="text-[1rem] text-white hover:text-[var(--color-on-hover)] transition-colors pb-2 block font-[550]">
                    {linkItem.text}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
