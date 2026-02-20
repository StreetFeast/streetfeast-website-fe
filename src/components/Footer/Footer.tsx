import Link from 'next/link';
import styles from './Footer.module.css';
import CookiePrefsButton from './CookiePrefsButton';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>StreetFeast</h3>
            <p className={styles.tagline}>Discover amazing street food near you</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Company</h4>
              <Link href="/contact" className={styles.link}>Contact</Link>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Legal</h4>
              <Link href="/terms" className={styles.link}>Terms of Service</Link>
              <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link href="/delete-my-data" className={styles.link}>Delete My Data</Link>
              <CookiePrefsButton />
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Download</h4>
              <a
                href={APP_STORE_LINK}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                iOS App
              </a>
              <a
                href={GOOGLE_PLAY_LINK}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Android App
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} StreetFeast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}