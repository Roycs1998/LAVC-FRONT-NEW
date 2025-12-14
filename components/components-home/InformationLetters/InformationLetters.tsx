import * as React from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface Data {
  icon: React.ReactNode
  qualification: string
  link: string
}

export const InformationLetters = ({ icon, qualification, link }: Data) => {
  return (
    <Link href={link}>
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)' // Efecto de hover
          }
        }}
      >
        <CardContent
          sx={{
            width: 357,
            height: 200,
            bgcolor: '#153B8B',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              bgcolor: '#244998'
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography sx={{ color: 'var(--letter-color)', textAlign: 'center' }}>{icon}</Typography>
          <Typography
            variant='h5'
            sx={{ color: 'var(--letter-color)', textAlign: 'center', fontWeight: 550, fontSize: 25 }}
          >
            {qualification}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
