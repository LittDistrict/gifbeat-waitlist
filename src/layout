import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gifbeat - Create Amazing GIFs with Music & Captions',
  description: 'Transform your favorite moments into stunning animated GIFs with music and captions. Join our waitlist for early access!',
  keywords: ['GIF', 'animation', 'video', 'music', 'captions', 'social media', 'content creation'],
  authors: [{ name: 'Gifbeat Studios' }],
  creator: 'Gifbeat Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gifbeat.vercel.app',
    title: 'Gifbeat - Create Amazing GIFs with Music & Captions',
    description: 'Transform your favorite moments into stunning animated GIFs with music and captions. Join our waitlist for early access!',
    siteName: 'Gifbeat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gifbeat - Create Amazing GIFs with Music & Captions',
    description: 'Transform your favorite moments into stunning animated GIFs with music and captions. Join our waitlist for early access!',
    creator: '@thegifbeat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
