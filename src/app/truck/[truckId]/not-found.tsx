// src/app/truck/[truckId]/not-found.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function TruckNotFound() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          <Image
            src="/streetfeastlogowhite.png"
            alt="StreetFeast"
            width={120}
            height={120}
          />
        </div>
        <h1 className={styles.errorTitle}>Oops! We couldn&apos;t find this truck</h1>
        <p className={styles.errorMessage}>
          This food truck might have moved locations or is no longer available.
          Don&apos;t worry — there are plenty more delicious options waiting for you!
        </p>
        <div className={styles.errorActions}>
          <Link href="/food-trucks/kentucky" className={styles.primaryButton}>
            Find Other Trucks
          </Link>
        </div>
        <div className={styles.errorBranding}>
          <span className={styles.brandText}>Street</span>
          <span className={styles.brandTextAccent}>Feast</span>
        </div>
        <p className={styles.errorSubtext}>
          Discover street food vendors, food trucks &amp; pop-ups near you
        </p>
      </div>
    </div>
  );
}
