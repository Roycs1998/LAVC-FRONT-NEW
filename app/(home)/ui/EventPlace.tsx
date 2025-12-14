"use client";

import Link from "next/link";

import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('../../../../components/MapClient'), { ssr: false })

import { Grid, Box, Typography } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";

import { Icon } from "@iconify/react/dist/iconify.js";

import SectionTitle from "@/components/SectionTitle";

import type { getDictionary } from "@/utils/getDictionary";

import CustomButton from "@/components/ui/CustomButton";
import { Huellas } from "@/components/ui/Huellas";

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

const EventPlace = ({ dictionary }: Props) => {

    const latitude = -12.092146981428527
    const longitude = -76.98001657796974

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    const wazeLink = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`


    return (
        <Box bgcolor="#f5c72c" color="text.primary" className="md:py-20 py-10 relative">
            <Huellas position={{ top: '-100px', left: '40px' }} rotateDeg={30} tipoHuellas="pato" color="#fff" opacity={0.7} />
            <Box maxWidth="lg" mx="auto" px={{ xs: 6, md: 0, lg: 0 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6}>
                        <SectionTitle
                            title={<span className='text-[#3a3480] '>{dictionary?.home?.location.title}</span>}
                            subTitle={<span className='text-[#ffffff] '>{dictionary?.home?.location.subtitle}</span>}
                            showIcon={false}
                            lineaColor="3a3480"
                        />

                        <Box display="flex" flexDirection="column" gap={2} py={4}>
                        </Box>

                        <Typography zIndex={1} className="z-2" variant="body1" fontSize="1.125rem">
                            {dictionary?.home?.location.description}
                        </Typography>

                        <Box mt={10} display="flex" flexDirection="column" gap={2}>
                            <Link href={wazeLink} target="_blank" rel="noopener noreferrer">
                                <CustomButton
                                    variant="contained"
                                    className="px-7 py-3 text-white flex items-center gap-2 text-lg font-bold"
                                >
                                    <Icon icon={'simple-icons:waze'} width={20} height={20} />
                                    <span>{dictionary?.home?.location.open_waze}</span>
                                    <FaArrowRightLong size={14} />
                                </CustomButton>
                            </Link>

                            <Link href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                                <CustomButton
                                    variant="contained"
                                    className="px-7 py-3 text-white flex items-center gap-2 text-lg font-bold"
                                >
                                    <Icon icon={'simple-icons:googlemaps'} width={20} height={20} />
                                    <span>{dictionary?.home?.location.open_maps}</span>
                                    <FaArrowRightLong size={14} />
                                </CustomButton>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box
                            sx={{
                                width: '100%',
                                height: { xs: 300, sm: 350, md: 400, lg: '100%', },
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <MapClient latitude={latitude} longitude={longitude} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EventPlace;
