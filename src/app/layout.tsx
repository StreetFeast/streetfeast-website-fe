import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { PostHogProvider, PostHogPageView } from '@posthog/next';
import { LayoutContent } from '@/components/LayoutContent';
import Providers from '@/components/Providers';
import CookieBanner from '@/components/CookieBanner';
import { POSTHOG_KEY } from '@/lib/posthog';
import FacebookPixel from '@/components/FacebookPixel';
import { JsonLd } from '@/lib/seo/json-ld';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://streetfeastapp.com'),
  title: {
    default: 'StreetFeast — Find Food Trucks Near You in Kentucky & Beyond',
    template: '%s | StreetFeast',
  },
  description:
    'Find food trucks, street vendors, and pop-up restaurants near you. Real-time locations, menus, and schedules across Kentucky — Bowling Green, Glasgow, Somerset, Elizabethtown, Owensboro, and more.',
  keywords: [
    'food trucks',
    'food trucks Kentucky',
    'food trucks Bowling Green',
    'street food',
    'food vendors',
    'pop-up restaurants',
    'food truck app',
    'food truck schedule',
  ],
  authors: [{ name: 'StreetFeast' }],
  creator: 'StreetFeast',
  publisher: 'StreetFeast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'StreetFeast — Find Food Trucks Near You in Kentucky & Beyond',
    description:
      'Find food trucks, street vendors, and pop-up restaurants in your area. Real-time locations, menus, and schedules.',
    url: 'https://streetfeastapp.com',
    siteName: 'StreetFeast',
    images: [
      {
        url: '/social-media-logo.png',
        width: 1352,
        height: 632,
        alt: 'StreetFeast - Find Food Trucks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreetFeast — Find Food Trucks Near You',
    description:
      'Find food trucks and street vendors in your area. Real-time locations, menus, and schedules.',
    images: ['/social-media-logo.png'],
    creator: '@streetfeast',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <FacebookPixel />
        <PostHogProvider apiKey={POSTHOG_KEY} clientOptions={{ api_host: '/ingest' }}>
          <PostHogPageView />
          <Providers>
            <LayoutContent>{children}</LayoutContent>
          </Providers>
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  );
}
