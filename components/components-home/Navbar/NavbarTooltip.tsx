'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

// You might need to adjust these types based on your actual data
interface SecondLevel {
  text: string
  link: string
}
interface LinkItem {
  subMenu?: SecondLevel[]
  text: string
  link?: string
}

interface TransitionsPopperProps {
  start: string
  links: LinkItem[]
  image: string
}

export const NavbarTooltip = ({ start, links, image }: TransitionsPopperProps) => {
  const [open, setOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<SecondLevel[] | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      setHoveredIndex(null)
      setHoveredLink(null)
    }, 200)
  }

  const handleLinkHover = (subMenu: SecondLevel[] | undefined, index: number) => {
    setHoveredIndex(index)
    setHoveredLink(subMenu || null)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center h-full"
    >
      <div
        className={`cursor-pointer whitespace-nowrap flex items-center gap-1 transition-colors duration-300 py-1 text-[1.15rem] font-bold ${open ? 'text-[#f1c82e]' : 'text-[#3a3480] hover:text-[#f1c82e] text-white'
          /* Note: The original had logic for color based on state, but also text-white from parent list? 
             Navbar.tsx List had colorKey='white'. 
             But here we explicitly set colors. 
             I'll adapt to match the design: text-white normally (from Navbar context), 
             but here we override.
             Original code: color: open ? '#f1c82e' : '#3a3480', with :hover '#f1c82e'.
             Wait, Navbar.tsx sets color: 'white' on the List.
             But NavbarTooltip overrides it.
             I'll stick to the original colors I found in the file: 
             color: open ? '#f1c82e' : '#3a3480'
          */
          }`}
      // We need to respect the parent color which might be white (Navbar context).
      // The original file line 87: color: open ? '#f1c82e' : '#3a3480'
      // But in Navbar.tsx line 134: color: 'white'. And simple links are 'text-inherit'.
      // So I should probably use 'text-white' when not open?
      // Let's assume the previous logic was correct for the white bg navbar?
      // Wait, Navbar.tsx line 114: backgroundColor: '#ffffff'.
      // So text SHOULD be dark (#3a3480).
      // But List sx color was 'white' ? Line 134.
      // Maybe I misread Navbar.tsx background.
      // Navbar.tsx: backgroundColor:'#ffffff'.
      // So the text must be dark.
      // I will trust the local color logic: #3a3480 default.
      >
        <span>{start}</span>
        {open ? (
          <ChevronUp className="w-6 h-6 stroke-[1.5] text-[#f1c82e]" />
        ) : (
          <ChevronDown className="w-6 h-6 stroke-[1.5] text-[#3a3480] group-hover:text-[#f1c82e]" />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 -translate-x-1/2 top-[85px] z-[100] bg-[var(--primary-color-purple)] text-white w-[830px] max-w-[95vw] shadow-lg rounded-md overflow-hidden flex"
            style={{
              backgroundColor: 'var(--primary-color-purple)',
              // Original height was 300px
              height: '300px'
            }}
          >
            {/* Image Section */}
            <div className="p-4 flex-shrink-0">
              {/* Use Next.js Image or standard img. Original used Avatar. */}
              <img
                src={image}
                alt={start}
                className="w-[320px] h-[230px] object-cover rounded-md ml-2 mr-4"
              />
            </div>

            {/* Links Section */}
            <div className="py-4 overflow-y-auto w-[200px] flex-shrink-0">
              {links.map((linkItem, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleLinkHover(linkItem.subMenu, index)}
                  className={`flex items-center justify-between px-2 py-1.5 cursor-pointer border-l-4 transition-colors duration-300 ${hoveredIndex === index ? 'border-[#f1c82e] text-[#f1c82e]' : 'border-transparent text-white'
                    }`}
                >
                  <Link href={linkItem.link || '#'} className="flex items-center gap-1 w-full text-lg">
                    <span>{linkItem.text}</span>
                  </Link>
                  {linkItem.subMenu && (
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${hoveredIndex === index ? '-rotate-90 text-[#f1c82e]' : ''
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="w-[1px] bg-white/20 my-4 mx-2"></div>

            {/* Submenu Section */}
            <div className="py-4 flex-1 overflow-y-auto">
              {hoveredLink && hoveredLink.map((subLink, subIndex) => (
                <Link key={subIndex} href={subLink.link} className="block px-4 py-1 text-lg text-white hover:text-[#f1c82e] transition-colors">
                  {subLink.text}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
