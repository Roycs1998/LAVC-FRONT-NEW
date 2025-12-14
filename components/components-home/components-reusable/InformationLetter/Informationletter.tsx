'use client'

import { useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material'

import SectionTitle from '@/components/SectionTitle'

interface Speaker {
  title: string
  image: string
  description?: string
  subtitleOne?: string
  paragraphOne?: string
  subtitleTwo?: string
  paragraphTwo?: string
  subtitleThree?: string
  stepsThree?: string
  formText?: string
  forButton?: string
  stepsFour?: string
  linkButton?: string
  subTitleLabel?: string
  readMoreLabel?: string
  showLessLabel?: string
}

export const Informationletter = ({
  title,
  image,
  description,
  subtitleOne,
  paragraphOne,
  subtitleTwo,
  paragraphTwo,
  subtitleThree,
  stepsThree,
  formText,
  forButton,
  stepsFour,
  linkButton,
  subTitleLabel,
  readMoreLabel,
  showLessLabel
}: Speaker) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)
  const truncatedText = paragraphTwo ? paragraphTwo.slice(0, 100) : ''

  return (
    <Card className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 py-10">
      <Grid container sx={{ bgcolor: 'var(--color-card-background)' }}>
        <Grid item xs={12}>
          <SectionTitle
            title={title}
            subTitle={<span>{subTitleLabel || 'Más Información'}</span>}
            showIcon={false}
          />
        </Grid>

        <Grid item xs={12}>
          <CardContent sx={{ position: 'relative' }}>
            {/* Imagen flotada a la derecha en desktop */}
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                display: { xs: 'none', md: 'block' },
                float: 'right',
                width: 300,
                height: 'auto',
                ml: 3,
                mb: 2,
                borderRadius: 2
              }}
            />

            {/* Imagen centrada en mobile */}
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                display: { xs: 'block', md: 'none' },
                width: '100%',
                height: 'auto',
                mb: 2,
                borderRadius: 2
              }}
            />

            {description && (
              <Typography variant="body1" mb={2}>
                {description}
              </Typography>
            )}

            {subtitleOne && (
              <>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}
                >
                  {subtitleOne}
                </Typography>
                <Typography variant="body1" mb={2}>
                  {paragraphOne}
                </Typography>
              </>
            )}

            {subtitleTwo && (
              <>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}
                >
                  {subtitleTwo}
                </Typography>
                <Typography variant="body1" mb={1}>
                  {isExpanded ? paragraphTwo : `${truncatedText}...`}
                </Typography>
                <Button
                  onClick={toggleExpand}
                  variant="text"
                  sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
                >
                  {isExpanded ? (showLessLabel || 'Mostrar menos') : (readMoreLabel || 'Leer más')}
                </Button>
              </>
            )}

            {subtitleThree && (
              <>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}
                >
                  {subtitleThree}
                </Typography>
                {stepsThree
                  ?.split('.')
                  .map((s, i) =>
                    s.trim() ? (
                      <Typography key={i} variant="body1" mb={1} ml={2}>
                        {`${i + 1}. ${s.trim()}`}
                      </Typography>
                    ) : null
                  )}
                {stepsFour
                  ?.split('.')
                  .map((s, i) =>
                    s.trim() ? (
                      <Typography key={i} variant="body1" mb={1} ml={2}>
                        {s.trim()}
                      </Typography>
                    ) : null
                  )}
              </>
            )}

            {formText && (
              <>
                <Typography variant="body1" sx={{ mt: 4, mb: 2 }}>
                  {formText}
                </Typography>
                <Box textAlign="center" mt={2}>
                  <Button
                    href={linkButton || '#'}
                    variant="contained"
                    sx={{
                      bgcolor: 'var(--primary-color-purple)',
                      color: 'var(--letter-color)',
                      px: 5,
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      '&:hover': { bgcolor: '#7f76d9' }
                    }}
                  >
                    {forButton}
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
