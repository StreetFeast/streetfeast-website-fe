import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/LayoutContent";
import Providers from "@/components/Providers";


const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://streetfeast.com'),
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
    url: 'https://streetfeast.com',
    siteName: 'StreetFeast',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
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
    images: ['/twitter-image.jpg'],
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
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
