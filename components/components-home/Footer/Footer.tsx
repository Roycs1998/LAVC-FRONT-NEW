'use client'

import React from 'react'

import type { TypographyProps } from '@mui/material'
import { Box, Container, Grid, Button, IconButton, styled, Typography } from '@mui/material'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(6, 0)
}))

const FooterColumn = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}))

interface FooterLinkProps extends TypographyProps {
  href?: string
}

const FooterLink = styled(({ href, ...props }: FooterLinkProps) => <Typography component='a' href={href} {...props} />)(
  ({ theme }) => ({
    color: theme.palette.grey[400],
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.common.white
    }
  })
)

const BottomBanner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  textAlign: 'center'
}))

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(0, 1)
}))

export const Footer = () => {
  return (
    <FooterWrapper component='footer'>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant='h6' gutterBottom>
                Product
              </Typography>
              <FooterLink variant='body2' component='a' href='#'>
                Product 1
              </FooterLink>
              <FooterLink variant='body2' component='a' href='#' display='block'>
                Product 2
              </FooterLink>
            </FooterColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant='h6' gutterBottom>
                Use Cases
              </Typography>
              <FooterLink variant='body2' component='a' href='#'>
                Use Case 1
              </FooterLink>
              <FooterLink variant='body2' component='a' href='#' display='block'>
                Use Case 2
              </FooterLink>
            </FooterColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant='h6' gutterBottom>
                Resources
              </Typography>
              <FooterLink variant='body2' component='a' href='#'>
                Resource 1
              </FooterLink>
              <FooterLink variant='body2' component='a' href='#' display='block'>
                Resource 2
              </FooterLink>
            </FooterColumn>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterColumn>
              <Typography variant='h6' gutterBottom>
                Company
              </Typography>
              <FooterLink variant='body2' component='a' href='#'>
                About Us
              </FooterLink>
              <FooterLink variant='body2' component='a' href='#' display='block'>
                Contact Us
              </FooterLink>
            </FooterColumn>
          </Grid>
        </Grid>
        <BottomBanner>
          <Typography variant='h6' gutterBottom>
            HAVE GOOD WEB DESIGN TODAY
          </Typography>
          <Typography variant='body2' gutterBottom>
            A brief description goes here
          </Typography>
          <Button variant='contained' color='primary' sx={{ mt: 2, mb: 3 }}>
            Get Started
          </Button>
          <Box>
            <SocialIcon aria-label='Facebook'>
              <FaFacebook />
            </SocialIcon>
            <SocialIcon aria-label='Twitter'>
              <FaTwitter />
            </SocialIcon>
            <SocialIcon aria-label='Instagram'>
              <FaInstagram />
            </SocialIcon>
          </Box>
          <Typography variant='body2' sx={{ mt: 2 }}>
            © 2023 Your Company. All rights reserved.
          </Typography>
        </BottomBanner>
      </Container>
    </FooterWrapper>
  )
}
