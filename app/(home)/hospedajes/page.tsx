import { Box } from "@mui/material"

import { CardImage } from '@/components/components-home/components-ponentes/CardImage'

import ListarHospedajes from './ui/ListarHospedajes'

const hospedajes = async () => {


    return (
        <>
            <Box className="w-full text-base font-light bg-[#ebeff3] text-white ">
                <Box>
                    <CardImage
                        image='https://www.tlavc-peru.org/tlavc/vista/upload/galeria/lavc20231%20(12).jpeg'
                        title='Hospedajes'
                    />
                </Box>
                <ListarHospedajes />
      
            </Box>
        </>
    )
}

export default hospedajes
