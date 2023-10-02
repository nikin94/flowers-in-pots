import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
      <body className={`${inter.className} h-screen`}>
        <Header />
        <div className='container mx-auto'>{children}</div>
      </body>
    </html>
  )
}
