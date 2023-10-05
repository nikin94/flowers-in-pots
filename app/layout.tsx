import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CssBaseline, Container } from '@mui/material'
import { Header } from '@/app/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flowers in pots',
  description: 'Application for managing orders'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <CssBaseline />
      <body className={`${inter.className}`}>
        <Header />
        <Container className='py-8'>{children}</Container>
      </body>
    </html>
  )
}
