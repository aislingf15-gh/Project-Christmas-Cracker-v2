import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Christmas Cracker - Your Holiday Wellness Challenge',
  description: 'Join the ultimate holiday wellness challenge that combines fitness, self-care, and those adulting tasks you\'ve been putting off! Track your 116-day journey from September 1st to December 25th.',
  keywords: 'Christmas challenge, wellness, fitness, self-care, holiday goals, adulting tasks',
  authors: [{ name: 'Project Christmas Cracker' }],
  openGraph: {
    title: 'Project Christmas Cracker - Your Holiday Wellness Challenge',
    description: 'Look & Feel Cracking This Christmas! Join the ultimate holiday wellness challenge.',
    type: 'website',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
          {children}
        </div>
      </body>
    </html>
  )
}
