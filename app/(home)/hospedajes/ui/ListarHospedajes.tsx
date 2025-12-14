'use client'

import { useEffect, useState } from 'react'

import { FaCheck } from 'react-icons/fa'

import { Box, Grid, Typography } from '@mui/material'

import SectionTitle from '@/components/SectionTitle'

import { getAllHospedajes } from '@/api/hospedajes'

import MapClient from '@/components/MapClient'
import { Huellas } from '@/components/ui/Huellas'

// Función para extraer coordenadas del iframe
const extractCoordinates = (iframe: string): { latitude: number | null; longitude: number | null } => {
    const match = iframe.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
    
    if (match) {
        const longitude = parseFloat(match[1]);
        const latitude = parseFloat(match[2]);
        
        return { latitude, longitude };
    }
    
    return { latitude: null, longitude: null };
};

const ListarHospedajes = () => {
    const [hospedajes, setHospedajes] = useState<any[]>([])

    useEffect(() => {
        const fetchHospedajes = async () => {
            const hospedajesList = await getAllHospedajes()
            
            setHospedajes(hospedajesList)
        }

        fetchHospedajes()
    }, [])

    return (
        <div className="w-full text-base font-light bg-[#ebeff3] text-white ">
            <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center py-10 gap-10">
                <div className="flex flex-col gap-3">
                    <Huellas position={{ top: '400px', left: '190px' }} rotateDeg={30} height='1600px' tipoHuellas="pato" color="#3a3480" opacity={0.8} />
                    {hospedajes.map((hotel) => {
                        const { latitude, longitude } = extractCoordinates(hotel.hospedajeMapa)

                        return (
                            
                            <div key={hotel.hospedajeCodigo} className='rounded-2xl shadow-xl bg-white/10 backdrop-blur-sm p-3 grid grid-cols-1 gap-3 h-full'>
                                <Grid container spacing={4} key={hotel.hospedajeCodigo} className='py-10 '>
                                    {/* Info izquierda */}
                                    <Grid item xs={12} lg={6}>
                                        <SectionTitle
                                            title={hotel.hospedajeNombre}
                                            subTitle={hotel.hospedajeDireccion}
                                            showIcon={false}
                                        />

                                        <Box display='flex' flexDirection='column' gap={1} py={2}>
                                            {hotel.hospedajeTelefono && (
                                                <Typography variant='body2'><FaCheck /> Teléfono: {hotel.hospedajeTelefono.trim()}</Typography>
                                            )}
                                            {hotel.hospedajeCorreo && (
                                                <Typography variant='body2'><FaCheck /> Correo: {hotel.hospedajeCorreo.replace(/<br\s*\/?>/g, '').trim()}</Typography>
                                            )}
                                            {hotel.hospedajeWeb && hotel.hospedajeWeb !== '#' && (
                                                <Typography variant='body2'>
                                                    <FaCheck /> Web:{' '}
                                                    <a href={hotel.hospedajeWeb} target='_blank' rel='noopener noreferrer' className='underline text-blue-700'>
                                                        {hotel.hospedajeWeb}
                                                    </a>
                                                </Typography>
                                            )}
                                            {hotel.hospedajeTarifas && (
                                                <div
                                                    className='text-sm mt-2'
                                                    dangerouslySetInnerHTML={{ __html: hotel.hospedajeTarifas }}
                                                />
                                            )}
                                        </Box>
                                    </Grid>

                                    {/* Mapa derecha */}
                                    <Grid item xs={12} lg={6}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: { xs: 300, sm: 350, md: 400, lg: '100%' },
                                                position: 'relative',
                                                zIndex: 1
                                            }}
                                        >
                                            {latitude && longitude ? (
                                                <MapClient latitude={latitude} longitude={longitude} />
                                            ) : (
                                                <Typography variant='body2'>Mapa no disponible</Typography>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default ListarHospedajes
