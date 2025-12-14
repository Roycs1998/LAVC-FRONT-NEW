import type { ReactNode } from 'react'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

interface InputInformation {
  iconOne?: ReactNode
  titleOne: string
  descriptionOne?: string
  iconTwo?: ReactNode
  titleTwo: string
  descriptionTwo: string
  stepsOne?: string
}

export const SecondInformationLetter = ({
  iconOne,
  titleOne,
  descriptionOne,
  iconTwo,
  titleTwo,
  descriptionTwo,
  stepsOne
}: InputInformation) => {
  return (
    <Card sx={{ maxWidth: '100%', padding: 2, margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={1}>
          {/* Columna izquierda */}
          <Grid item xs={6} container direction='column' spacing={1}>
            {/* Fila 1, Columna 1 */}
            <Grid item>
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Box>{iconOne}</Box>
                <Typography
                  variant='h6'
                  sx={{ fontSize: '2rem', fontWeight: 700, color: 'var(--second-color-purple)' }}
                >
                  {titleOne}
                </Typography>
              </Box>
            </Grid>
            {/* Fila 2, Columna 1 */}
            <Grid item>
              <Box sx={{ p: 1, textAlign: 'center' }}>
                {descriptionOne && <Typography variant='body1'>{descriptionOne}</Typography>}
                {stepsOne &&
                  stepsOne.split('.').map(
                    (sentence, index) =>
                      sentence.trim() && (
                        <Typography key={index} variant='body1' sx={{ marginLeft: '8px', marginBottom: '5px' }}>
                          {`${index + 1}. ${sentence.trim()}`}
                        </Typography>
                      )
                  )}
              </Box>
            </Grid>
          </Grid>

          {/* Columna derecha */}
          <Grid item xs={6} container direction='column' spacing={1}>
            {/* Fila 1, Columna 2 */}
            <Grid item>
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Box>{iconTwo}</Box>
                <Typography
                  variant='h6'
                  sx={{ fontSize: '2rem', fontWeight: 700, color: 'var(--second-color-purple)' }}
                >
                  {titleTwo}
                </Typography>
              </Box>
            </Grid>
            {/* Fila 2, Columna 2 */}
            <Grid item>
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant='body1'>{descriptionTwo}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
