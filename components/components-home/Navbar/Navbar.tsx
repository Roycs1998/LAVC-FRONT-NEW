'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { User, LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'
import styles from './Navbar.module.css'

import LanguageDropdown from './LanguageDropdown'
import MobileNavbar from './MobileNavbar'
import { NavbarTooltip } from './NavbarTooltip'

import type { getDictionary } from '@/utils/getDictionary'

// Missing component placeholder
// import UserDropdown from '@/components/layout/shared/UserDropdown'
const UserDropdown = ({ session }: any) => (
  <div className="text-white bg-red-500/50 px-2 py-1 rounded">
    UserDropdown (Missing)
  </div>
)

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

type MenuItem = {
  text: any
  link?: any
  image?: any
  subMenu?: any[]
}

export const Navbar = ({ dictionary }: Props) => {
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()

  // Mobile sidebar state is now handled inside MobileNavbar
  // const [openSideBar, setOpenSideBar] = useState(false)

  const getMenuItems = (dictionary: any): MenuItem[] => [
    {
      text: dictionary?.nav_main?.navbar.contact_us,
      subMenu: [
        { text: dictionary?.nav_main?.navbar.about_LAVC, link: '/nosotros' },
        { text: dictionary?.nav_main?.navbar.contact, link: '/soporte' }
      ],
      image: 'https://tse2.mm.bing.net/th?id=OIP.33VqJRpi2PsJuc9mcRwcCQHaE9&pid=Api&P=0&h=180'
    },
    {
      text: dictionary?.nav_main?.navbar.lavc_2026,
      subMenu: [
        { text: dictionary?.nav_main?.navbar.event_and_workshops, link: '/eventos-talleres' },
        { text: dictionary?.nav_main?.navbar.speakers, link: '/ponentes' },
        { text: dictionary?.nav_main?.navbar.program, link: '/programa' },
        {
          text: dictionary?.nav_main?.navbar.stand_out,
          subMenu: [
            { text: dictionary?.nav_main?.navbar.ambassador, link: '/embajador' },
            { text: dictionary?.nav_main?.navbar.scholarship, link: '/brippie' }
          ]
        },
      ],
      image: 'https://4.bp.blogspot.com/-atz5WgBqCys/VxasgrWNCEI/AAAAAAAB9Ao/ClzFWC9eEEcOWygTP4l3m0rEXVpRTX1ggCKgB/s1600/Perritos-cachorros-162.jpg'
    },
    {
      text: dictionary?.nav_main?.navbar.lavc_gallery,
      subMenu: [
        { text: dictionary?.nav_main?.navbar.historic_photos, link: '/gallery' },
        { text: dictionary?.nav_main?.navbar.educational_material, link: '/libreria' },
        { text: "Videos", link: '/videos' },
      ],
      image: 'https://4.bp.blogspot.com/-atz5WgBqCys/VxasgrWNCEI/AAAAAAAB9Ao/ClzFWC9eEEcOWygTP4l3m0rEXVpRTX1ggCKgB/s1600/Perritos-cachorros-162.jpg'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (status === 'loading') {
      console.log('Cargando sesión...')
    } else if (status === 'authenticated') {
      console.log('Sesión autenticada:', session)
    } else if (status === 'unauthenticated') {
      console.log('No hay sesión activa')
    }
  }, [session, status])

  const menuItems = getMenuItems(dictionary)

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} fixed top-0 w-full z-50 transition-colors duration-300 ease-in-out h-auto min-h-[70px] py-3 bg-white`}
      >
        <div className={`max-w-7xl w-full mx-auto px-6 flex justify-between items-center z-50`}>
          <div className='flex gap-1'>
            <Link href='/'>
              <Image src='/images/logolavc/logo.png' width={120} height={43} alt='LAVC Logo' priority style={{ width: 'auto', height: 'auto' }} />
            </Link>
          </div>

          <div className='hidden md:flex items-center gap-1 ml-[15%]'>
            <ul className="flex flex-row p-0 m-0 list-none gap-4">
              {menuItems.map((item, index) => (
                <li key={index} className={styles.link}>
                  {item.subMenu ? (
                    <NavbarTooltip
                      start={item.text}
                      links={item.subMenu}
                      image={item.image}
                    />
                  ) : (
                    <Link
                      href={item.link ? item.link : '#'}
                      className="
                          whitespace-nowrap 
                          overflow-hidden 
                          text-ellipsis 
                          inline-block 
                          no-underline 
                          cursor-pointer
                          text-[#3a3480]
                          font-bold
                          text-[1.1rem]
                          hover:text-[#f1c82e]
                          transition-colors
                          "
                    >
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className='flex gap-2 items-center z-50 text-white'>
            <div className="flex items-center justify-center flex-grow">
              <LanguageDropdown />

              {status === 'authenticated' ? (
                <UserDropdown session={session} />
              ) : (
                <div className="flex items-center">
                  <Link href="/login">
                    <Button
                      className="bg-[#3a3480] hover:bg-[#3a3480]/80 text-[#ffffff] font-semibold rounded-l-md sm:rounded-l-md sm:rounded-r-none rounded-md h-10 px-4"
                    >
                      <User className='w-4 h-4 mr-2 hidden sm:block' />
                      {dictionary.nav_main.navbar.login}
                    </Button>
                  </Link>

                  <Link href="/register">
                    <Button
                      className="hidden sm:inline-flex backdrop-blur-sm bg-[#3a3480]/20 hover:bg-[#f1c82e]/40 text-[#3a3480] font-semibold rounded-r-md sm:rounded-r-md sm:rounded-l-none h-10 px-4 hover:text-[#3a3480]"
                    >
                      {dictionary.nav_main.navbar.register}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <div className="block md:hidden ml-1">
                <MobileNavbar menuItems={menuItems} logoSrc="/images/logolavc/logo.png" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Sidebar was here, now integrated into MobileNavbar */}
    </>
  )
}
