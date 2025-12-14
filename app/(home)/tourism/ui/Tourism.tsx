'use client'

import React from "react"

import Image from 'next/image'

import { Card, Grid, Typography } from "@mui/material"

import CustomButton from "@/components/ui/CustomButton"
import SectionTitle from "@/components/SectionTitle"
import type { getDictionary } from "@/utils/getDictionary"

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const Tourism = ({ dictionary }: Props) => {
    return (
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col bg-color[#ebeff3] justify-center py-10 gap-10">
            <Card className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 py-10">
                <Grid container sx={{ bgcolor: 'var(--color-card-background)' }}>
                    <Grid item xs={12} className='p-10'>
                        <SectionTitle
                            title={dictionary?.tourism.title}
                            subTitle={<span className="">{dictionary?.tourism.subtitle}</span>}
                            showIcon={false}
                        />

                        <Typography variant='body1' className='text-justify mt-2' fontSize="1.125rem" >
                            {dictionary.tourism.description1}
                        </Typography>

                        <Typography variant='body1' className='font-bold mt-2' fontSize="1.125rem" >
                            {dictionary.tourism.description2}
                        </Typography>

                        <div className="flex justify-center my-6">
                            <Image
                                src='https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/Turismo%20Peru.jpg'
                                alt="Imagen ampliada"
                                width={800}
                                height={500}
                                className="w-[80%] md:w-[60%] h-auto rounded-xl shadow-md"
                            />
                        </div>

                        <SectionTitle
                            subTitle={<span className="">{dictionary?.tourism.visit_lima}</span>}
                            showIcon={false}
                        />
                        <Grid container spacing={2} className="mb-5">
                            <Grid item xs={12} lg={6}>
                                <CustomButton
                                    mode="download"
                                    href="https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/tourism/tours-lima.pdf"
                                    fileName="Tours Lima.pdf"
                                    newTab
                                >
                                    {dictionary?.tourism.itinerary}
                                </CustomButton>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <CustomButton
                                    mode="download"
                                    href="https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/tourism/hotels-lima.pdf"
                                    fileName="Hotels Lima.pdf"
                                    newTab
                                >
                                    {dictionary?.tourism.lodging}
                                </CustomButton>
                            </Grid>
                        </Grid>

                        <SectionTitle
                            subTitle={<span className="">{dictionary?.tourism.visit_cusco}</span>}
                            showIcon={false}
                        />
                        <Grid container spacing={2} className="mb-5">
                            <Grid item xs={12} lg={6}>
                                <CustomButton
                                    mode="download"
                                    href="https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/tourism/cusco-express.pdf"
                                    fileName="Cusco Express.pdf"
                                    newTab
                                >
                                    {dictionary?.tourism.cusco_express}
                                </CustomButton>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <CustomButton
                                    mode="download"
                                    href="https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/tourism/discover-cusco.pdf"
                                    fileName="Discover Cusco.pdf"
                                    newTab
                                >
                                    {dictionary?.tourism.discover_cusco}
                                </CustomButton>
                            </Grid>
                        </Grid>

                        <SectionTitle
                            subTitle={<span className="">{dictionary?.tourism.visit_amazon}</span>}
                            showIcon={false}
                        />
                        <Grid container spacing={2} className="mb-5">
                            <Grid item xs={12} lg={6}>
                                <CustomButton
                                    mode="download"
                                    href="https://lavcfiles.nyc3.digitaloceanspaces.com/upload/extra-files/tourism/amazonas.pdf"
                                    fileName="Refugio Amazonas.pdf"
                                    newTab
                                >
                                    {dictionary?.tourism.amazon_lodge}
                                </CustomButton>
                            </Grid>
                        </Grid>


                        <SectionTitle
                            subTitle={<span className="">{dictionary?.tourism.more_information}</span>}
                            showIcon={false}
                        />
                        <Typography variant='body1' className='text-justify mt-2' fontSize="1.125rem" >
                            {dictionary?.tourism.contact_whatsapp}: +51 999357421
                            <br />
                            {dictionary?.tourism.contact_email}: eventos@impactaevents.com | congresos@impactatravel.com
                            <br />
                            {dictionary?.tourism.contact_website}: <a href="https://www.impactatravel.com" target="_target">www.impactatravel.com</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

        </div>
    )
}

export default Tourism
