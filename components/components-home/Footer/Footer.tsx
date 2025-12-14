'use client'

import React from 'react'

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Product 1', href: '#' },
      { label: 'Product 2', href: '#' }
    ]
  },
  {
    title: 'Use Cases',
    links: [
      { label: 'Use Case 1', href: '#' },
      { label: 'Use Case 2', href: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resource 1', href: '#' },
      { label: 'Resource 2', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Contact Us', href: '#' }
    ]
  }
]

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='mx-auto max-w-6xl px-4 py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {footerSections.map(section => (
            <div key={section.title} className='space-y-3'>
              <h3 className='text-lg font-semibold'>{section.title}</h3>
              <div className='space-y-2 text-gray-400'>
                {section.links.map(link => (
                  <a key={link.label} href={link.href} className='block text-sm transition-colors hover:text-white'>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-10 space-y-4 rounded-lg bg-gray-800 px-6 py-8 text-center'>
          <h4 className='text-xl font-semibold tracking-wide'>HAVE GOOD WEB DESIGN TODAY</h4>
          <p className='text-sm text-gray-300'>A brief description goes here</p>
          <Button className='mt-2 mb-4 bg-primary text-white hover:bg-primary/90'>Get Started</Button>

          <div className='flex justify-center space-x-3 text-lg'>
            {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
              <button
                key={index}
                type='button'
                className='rounded-full p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                aria-label={`Red social ${index + 1}`}
              >
                <Icon />
              </button>
            ))}
          </div>

          <p className='text-sm text-gray-300'>© 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
