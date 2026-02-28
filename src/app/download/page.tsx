import type { Metadata } from 'next';
import Image from 'next/image';
import AppStoreBadges from '@/components/AppStoreBadges';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app to discover food trucks and street vendors near you.',
  itunes: {
    appId: '6749815073',
  },
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street vendors near you. Download the StreetFeast app.',
    url: '/download',
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
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street vendors near you. Download the StreetFeast app.',
    images: ['/social-media-logo.png'],
  },
};

export default function DownloadPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'StreetFeast',
    description: 'Discover food trucks and street vendors near you.',
    applicationCategory: 'FoodApplication',
    operatingSystem: 'iOS, Android',
    url: 'https://streetfeastapp.com/download',
    downloadUrl: [APP_STORE_LINK, GOOGLE_PLAY_LINK],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image
            src="/logowithtext.png"
            alt="StreetFeast"
            width={200}
            height={60}
            priority
          />
        </div>
        <h1 className={styles.heading}>Get the StreetFeast App</h1>
        <p className={styles.subheading}>Discover food trucks and street vendors near you.</p>
        <AppStoreBadges className={styles.badges} />
      </div>
    </main>
  );
}
