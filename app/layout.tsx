import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: {
    default: 'GEN - Global Education Network | გლობალური განათლების ქსელი',
    template: '%s | GEN - Global Education Network'
  },
  description: 'Oxford\'s first and only official representative in Georgia. International education programs, IELTS preparation, General English, Business English courses, and university admission consulting. საქართველოში ოქსფორდის პირველი ოფიციალური წარმომადგენელი.',
  keywords: [
    'education', 'Oxford', 'Georgia', 'Tbilisi', 'international programs', 
    'language courses', 'university admissions', 'IELTS', 'English courses',
    'study abroad', 'UK universities', 'განათლება', 'ოქსფორდი', 
    'ინგლისური კურსები', 'IELTS მომზადება', 'საზღვარგარეთ სწავლა'
  ],
  authors: [{ name: 'Global Education Network' }],
  creator: 'GEN',
  publisher: 'Global Education Network',
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
  openGraph: {
    title: 'GEN - Global Education Network',
    description: 'Oxford\'s first and only official representative in Georgia. International education programs and language courses.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ka_GE',
    siteName: 'Global Education Network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEN - Global Education Network',
    description: 'Oxford\'s first and only official representative in Georgia',
  },
  alternates: {
    languages: {
      'en': '/en',
      'ka': '/ka',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
