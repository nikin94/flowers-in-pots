import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container } from '@mui/material'
import { Header } from '@/app/components'
import ThemeRegistry from '@/theme/ThemeRegistry'

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
      <ThemeRegistry>
        <body className={`${inter.className}`}>
          <Header />
          <Container sx={{ py: 4 }}>{children}</Container>
        </body>
      </ThemeRegistry>
    </html>
  )
}
