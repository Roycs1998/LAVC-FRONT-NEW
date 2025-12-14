'use client'

import { useEffect, useState } from 'react'

import { Box } from '@mui/material'

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'
import { SpeakerInformation } from '@/components/components-home/components-ponentes/SpeakerInformation/SpeakerInformation'
import { getPonente } from '@/api/ponente'
import Loading from '@/components/Loading/Loading'
import { Huellas } from '@/components/ui/Huellas'

interface PonenteParams {
    ponente: string
}

const PonenteInfo = ({ ponente }: PonenteParams) => {

    const [ponenteInfo, setPonenteInfo] = useState<any>(null)
    const path = process.env.NEXT_PUBLIC_SPACE_URL || ''

    useEffect(() => {
        const fetchPonente = async () => {
            const data = await getPonente(ponente)
            
            setPonenteInfo(data)
        }

        fetchPonente()
    }, [ponente])

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>

            <CardImage
                image='https://buenavibra.es/wp-content/uploads/2017/10/razas-de-perros_opt_opt_opt_opt.jpg'
                title='Información del ponente'
            />                      

            <Box className='global-padding' sx={{ position: 'relative', bgcolor: 'var(--background-form)', paddingTop: 10, paddingBottom: 10 }}>
            <Huellas height='2000px' position={{ top: '-470px', left: '-10px' }} rotateDeg={20} tipoHuellas="pato" color="#3a3480" opacity={1} />
            <Huellas height='2000px' position={{ top: '-500px', right: '200px' }} rotateDeg={150}  color="#3a3480" opacity={1} />
                <Box
                    sx={{                        
                        position: 'relative',
                        zIndex: 0
                    }}
                >

                    {ponenteInfo ? (
                        <SpeakerInformation
                            name={ponenteInfo.persona.persona_nombres + (' ' + ponenteInfo.persona.persona_apellido_paterno || '') || ''}
                            accreditations={ponenteInfo.persona.persona_apellido_materno || 'MV.'}
                            description={ponenteInfo.ponenteResumen || ''}
                            specializations={ponenteInfo.ponenteEspecialidad || []}
                            scientificInterests={ponenteInfo.scientificInterests || []}
                            image={`${path.replace(/\/?$/, '/')}${ponenteInfo.ponenteFoto}` || ''}
                            recognitionsAndDecorations={ponenteInfo.resumen}
                            certifications={ponenteInfo.resumen}
                            books={ponenteInfo.resumen}
                            research={ponenteInfo.resumen}
                            achievements={ponenteInfo.resumen}
                        />
                    ) : (
                        <Loading isLoading={!ponenteInfo} text={"Cargando información..."} />
                    )}

                </Box>
            </Box>
        </Box>
    )
}

export default PonenteInfo
