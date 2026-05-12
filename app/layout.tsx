import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LOCKIT Self Storage Szczecin — Boksy magazynowe 24/7',
    template: '%s | LOCKIT Self Storage',
  },
  description: 'Samoobslugowe boksy magazynowe w Szczecinie. Bezpieczne, nowoczesne, dostepne 24/7. Wynajem online w 5 minut.',
  metadataBase: new URL('https://lockit.pl'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: 'en_US',
    siteName: 'LOCKIT Self Storage',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LOCKIT Self Storage Szczecin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#88C22A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  );
}
