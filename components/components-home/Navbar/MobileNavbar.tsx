'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
  SheetTitle
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export interface MenuItem {
  text: string
  href?: string
  subMenu?: MenuItem[]
  link?: string
  secondLevelText?: MenuItem[]
  image?: string
}

interface MobileNavbarProps {
  menuItems: MenuItem[]
  logoSrc?: string
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ menuItems, logoSrc }) => {
  const [openSubmenu, setOpenSubmenu] = useState<{ [key: string]: boolean }>({})

  const handleToggleSubmenu = (key: string) => {
    setOpenSubmenu((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const renderMenuItems = (items: MenuItem[], depth: number = 0, parentKey: string = ''): React.JSX.Element[] => {
    return items.map((item, index) => {
      const key = parentKey ? `${parentKey}-${index}` : `${index}`
      const children = item.subMenu || item.secondLevelText
      const hasSubMenu = !!children && children.length > 0
      const isOpen = openSubmenu[key]

      return (
        <div key={key} className="flex flex-col">
          <div
            className={`flex items-center justify-between py-3 pr-4 cursor-pointer hover:bg-white/5 transition-colors ${depth > 0 ? 'pl-' + (depth * 4) : 'pl-0'}`}
            style={{ paddingLeft: depth > 0 ? `${depth * 1.5}rem` : '0px' }}
          >
            {item.href || item.link ? (
              <SheetClose asChild>
                <Link
                  href={item.href || item.link || '#'}
                  className="flex-1 text-white font-medium text-lg"
                >
                  {item.text}
                </Link>
              </SheetClose>
            ) : (
              <div
                className="flex-1 text-white font-medium text-lg"
                onClick={() => hasSubMenu && handleToggleSubmenu(key)}
              >
                {item.text}
              </div>
            )}

            {hasSubMenu && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleSubmenu(key)
                }}
                className="p-1"
              >
                {isOpen ? (
                  <ChevronUp className="text-white w-6 h-6" />
                ) : (
                  <ChevronDown className="text-white w-6 h-6" />
                )}
              </div>
            )}
          </div>

          {hasSubMenu && isOpen && (
            <div className="flex flex-col bg-[#3a3480]/50 border-l border-white/10 ml-4">
              {renderMenuItems(children!, depth + 1, key)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-transparent -ml-2">
          <Menu className="w-8 h-8 text-white" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#3a3480] border-r-0 text-white p-0 w-[300px] sm:w-[350px]">
        <SheetHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
          {logoSrc && (
            <SheetClose asChild>
              <Link href="/">
                <img src={logoSrc} alt="Logo" className="h-10" />
              </Link>
            </SheetClose>
          )}
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          {/* Close button is handled by Sheet primitive usually, but we can customize or let it be. 
              Shadcn SheetContent includes a Close button by default. We might want to style it white. */}
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] px-4 py-4">
          <div className="flex flex-col space-y-1">
            {renderMenuItems(menuItems)}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
