"use client";

import Image from "next/image";

import Link from "next/link";

import { Grid, Box, Typography } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";

import SectionTitle from "@/components/SectionTitle";

import type { getDictionary } from "@/utils/getDictionary";

import CustomButton from "@/components/ui/CustomButton";

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

const OurEvent = ({ dictionary }: Props) => {
    const benefits = [
        {
            text: dictionary?.home?.benefits.items.exclusive_talks.title,
            description: dictionary?.home?.benefits.items.exclusive_talks.description
        },
        {
            text: dictionary?.home?.benefits.items.networking.title,
            description: dictionary?.home?.benefits.items.networking.description
        },
        {
            text: dictionary?.home?.benefits.items.commercial_zone.title,
            description: dictionary?.home?.benefits.items.commercial_zone.description
        },
        {
            text: dictionary?.home?.benefits.items.specialized_event.title,
            description: dictionary?.home?.benefits.items.specialized_event.description
        },
    ];

    return (
        <Box bgcolor="#ebeff3" color="text.primary" className="md:py-20">
            <Box maxWidth="lg" mx="auto" px={{ xs: 6, md: 0, lg: 0 }}>
                <Grid container spacing={4}>
                    {/* Left side */}
                    <Grid item xs={12} lg={6} order={{ xs: 2, lg: 1 }}>
                        <Grid container spacing={2}>
                            {["/images/banners/1.jpg", "/images/banners/3.jpg", "/images/banners/2.jpg", "/images/banners/1.jpg"].map(
                                (src, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Box overflow="hidden">
                                            <Image
                                                src={src}
                                                alt={`Image ${index + 1}`}
                                                className="object-cover"
                                                width={300}
                                                height={250}
                                                loading="lazy"
                                            />
                                        </Box>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} order={{ xs: 1, lg: 2 }}>
                        <SectionTitle
                            title={dictionary?.home?.benefits.title}
                            subTitle={dictionary?.home?.benefits.subtitle}
                            showIcon={false}
                        />
                        <Box display="flex" flexDirection="column" gap={4} py={3}>
                            {benefits.map((b, i) => (
                                <Box key={`b-${i}`} display="flex" flexDirection="column" alignItems="left" gap={1}>
                                    <Typography variant="body1" >{b.text}</Typography>
                                    <Typography variant="body1" className="text-justify">{b.description}</Typography>
                                </Box>
                            ))}
                        </Box>
                        <Link href="/nosotros" passHref>
                            <CustomButton
                                variant="contained"
                                className="px-7 py-3 text-white flex items-center gap-2 text-lg font-bold"
                            >
                                <span>{dictionary?.home?.benefits.cta}</span>
                                <FaArrowRightLong size={14} />
                            </CustomButton>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default OurEvent;
