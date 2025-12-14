import { Box, Typography } from '@mui/material'

interface Data {
  caption: string
}

export const SubtitleTag = ({ caption }: Data) => {
  return (
    <Box
      sx={{       
        width: { xs: '100%', md: '300px' },
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        background: 'var(--color-subtitle)'
      }}
    >
      <Typography sx={{ marginLeft: '40px', padding: '5px',  color: '#fff' }}>{caption}</Typography>
    </Box>
  )
}
