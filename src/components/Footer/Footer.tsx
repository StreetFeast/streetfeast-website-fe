import Link from 'next/link';
import styles from './Footer.module.css';

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
              <Link href="/about" className={styles.link}>About Us</Link>
              <Link href="/contact" className={styles.link}>Contact</Link>
              <Link href="/careers" className={styles.link}>Careers</Link>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Legal</h4>
              <Link href="/terms" className={styles.link}>Terms of Service</Link>
              <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link href="/delete-my-data" className={styles.link}>Delete My Data</Link>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Download</h4>
              <a
                href="https://apps.apple.com"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                iOS App
              </a>
              <a
                href="https://play.google.com"
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