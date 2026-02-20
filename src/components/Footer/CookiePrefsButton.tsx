'use client';

import { useConsentStore } from '@/store/consentStore';
import styles from './Footer.module.css';

export default function CookiePrefsButton() {
  const { clearConsent } = useConsentStore();

  return (
    <button
      className={styles.cookiePrefsButton}
      onClick={clearConsent}
    >
      Cookie Preferences
    </button>
  );
}
