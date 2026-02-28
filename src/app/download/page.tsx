import type { Metadata } from 'next';
import Image from 'next/image';
import AppStoreBadges from '@/components/AppStoreBadges';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app to discover food trucks and street vendors near you.',
  itunes: {
    appId: '6749815073',
  },
};

export default function DownloadPage() {
  return (
    <main className={styles.main}>
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
