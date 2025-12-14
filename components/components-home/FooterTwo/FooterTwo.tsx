'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import type { getDictionary } from '@/utils/getDictionary'

import style from './Footer.module.css'

type Props = {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}

export const FooterTwo = ({ dictionary }: Props) => {
    return (
        <footer
            className={`${style.containerFooter} mt-auto bg-[var(--primary-color-purple)] text-[var(--letter-color)]`}
        >
            {/* Bloque superior */}
            <div className="global-padding bg-[var(--primary-color-purple)] py-8">
                <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:flex-row md:px-0">
                    {/* Columna 1 */}
                    <div className="w-full md:w-1/3 space-y-4">
                        <div
                            className={`${style.footerOne} text-[1.3rem] font-bold`}
                        >
                            {dictionary?.nav_main?.footer.we_are}
                        </div>

                        {/* Aquí dejaste un Item vacío, lo mantengo por si luego agregas texto */}
                        <div className={`${style.footerOne}`} />

                        <div className={style.footerOne}>
                            <Link href="/">
                                <Image
                                    src="/images/logolavc/logo.png"
                                    width={120}
                                    height={43}
                                    alt="LAVC Logo"
                                />
                            </Link>
                        </div>

                        <div className={`${style.footerOne} ${style.hoverColor} pt-4`}>
                            <Button
                                className="h-[55px] w-[270px] bg-white text-[var(--primary-color-purple)] font-bold text-base hover:bg-[var(--color-on-hover)] hover:text-[var(--letter-color)]"
                            >
                                {dictionary?.nav_main?.footer.contact_us_button}
                            </Button>
                        </div>
                    </div>

                    {/* Columna 2 */}
                    <div className="w-full md:w-1/3 space-y-2">
                        <div
                            className={`${style.footerOne} text-[1.3rem] font-bold`}
                        >
                            {dictionary?.nav_main?.footer.professional_resources}
                        </div>

                        <Link href="/soporte">
                            <div
                                className={`${style.footerOne} ${style.hoverColor} cursor-pointer text-base`}
                            >
                                {dictionary?.nav_main?.footer.support}
                            </div>
                        </Link>

                        <Link href="/programa">
                            <div
                                className={`${style.footerOne} ${style.hoverColor} cursor-pointer text-base`}
                            >
                                {dictionary?.nav_main?.footer.talks_program}
                            </div>
                        </Link>
                    </div>

                    {/* Columna 3 */}
                    <div className="w-full md:w-1/3 space-y-2">
                        <div
                            className={`${style.footerOne} text-[1.3rem] font-bold`}
                        >
                            {dictionary?.nav_main?.footer.explore_opportunities}
                        </div>

                        <Link href="/brippie">
                            <div
                                className={`${style.footerOne} ${style.hoverColor} cursor-pointer text-base`}
                            >
                                {dictionary?.nav_main?.footer.scholarship}
                            </div>
                        </Link>

                        <Link href="/embajador">
                            <div
                                className={`${style.footerOne} ${style.hoverColor} cursor-pointer text-base`}
                            >
                                {dictionary?.nav_main?.footer.become_ambassador}
                            </div>
                        </Link>

                        <Link href="/ponentes">
                            <div
                                className={`${style.footerOne} ${style.hoverColor} cursor-pointer text-base`}
                            >
                                {dictionary?.nav_main?.footer.speakers_label}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bloque inferior */}
            <div className="global-padding bg-[var(--second-color-purple)] py-3">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-0">
                    <p className={`${style.footerOne} text-center text-[0.9rem] text-[var(--letter-color)] sm:text-left`}>
                        {dictionary?.nav_main?.footer.navc_brand}
                        {dictionary?.nav_main?.footer.comunity_veterinary}
                    </p>

                    <div className="flex items-center justify-center gap-5">
                        <Link
                            href="https://www.youtube.com/channel/UCBBXdp5Wohtn9yuihiREkEg?view_as=subscriber"
                            target="_blank"
                        >
                            <FaYoutube className={`${style.hoverColor} h-[25px] w-[25px] text-white`} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/the_lavc/?hl=es"
                            target="_blank"
                        >
                            <FaInstagram className={`${style.hoverColor} h-[25px] w-[25px] text-white`} />
                        </Link>
                        <Link
                            href="https://api.whatsapp.com/send?phone=51985174876"
                            target="_blank"
                        >
                            <FaWhatsapp className={`${style.hoverColor} h-[25px] w-[25px] text-white`} />
                        </Link>
                        <Link
                            href="https://www.facebook.com/conferencia.veterinaria.latinoamericana/"
                            target="_blank"
                        >
                            <FaFacebookF className={`${style.hoverColor} h-[25px] w-[25px] text-white`} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
