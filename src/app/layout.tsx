import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { PostHogProvider, PostHogPageView } from "@posthog/next";
import { LayoutContent } from "@/components/LayoutContent";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/CookieBanner";
import { POSTHOG_KEY } from "@/lib/posthog";


const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://streetfeastapp.com'),
  title: {
    default: 'StreetFeast - Discover Amazing Street Food Near You',
    template: '%s | StreetFeast',
  },
  description: 'Find the best food trucks, street vendors, and pop-up restaurants in your area. Real-time locations, reviews, and menus. Download the StreetFeast app today!',
  keywords: ['street food', 'food trucks', 'food vendors', 'pop-up restaurants', 'food app', 'local food', 'mobile food', 'food discovery'],
  authors: [{ name: 'StreetFeast' }],
  creator: 'StreetFeast',
  publisher: 'StreetFeast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'StreetFeast - Discover Amazing Street Food Near You',
    description: 'Find the best food trucks, street vendors, and pop-up restaurants in your area. Real-time locations, reviews, and menus.',
    url: 'https://streetfeastapp.com',
    siteName: 'StreetFeast',
    images: [
      {
        url: '/social-media-logo.png',
        width: 1352,
        height: 632,
        alt: 'StreetFeast - Discover Amazing Street Food',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreetFeast - Discover Amazing Street Food Near You',
    description: 'Find the best food trucks, street vendors, and pop-up restaurants in your area.',
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <PostHogProvider apiKey={POSTHOG_KEY} clientOptions={{ api_host: '/ingest' }}>
          <PostHogPageView />
          <Providers>
            <LayoutContent>
              {children}
            </LayoutContent>
          </Providers>
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  );
}
