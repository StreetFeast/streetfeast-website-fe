import Image from 'next/image';
import Link from 'next/link';
import styles from './ComingSoon.module.css';

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundAnimation}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src="/app-symbol.png"
            alt="StreetFeast Logo"
            width={180}
            height={180}
            className={styles.logoImage}
            priority
          />
        </div>

        <h1 className={styles.brand}>StreetFeast</h1>

        <div className={styles.comingSoonWrapper}>
          <h2 className={styles.title}>Coming Soon</h2>
          <div className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>

        <p className={styles.description}>
          Something extraordinary is on the way. We&apos;re crafting the ultimate street food discovery experience.
        </p>

        <div className={styles.tagline}>
          Your next favorite meal is waiting to be discovered.
        </div>

        <div className={styles.links}>
          <Link href="/terms" className={styles.link}>
            Terms of Service
          </Link>
          <span className={styles.separator}>•</span>
          <Link href="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
