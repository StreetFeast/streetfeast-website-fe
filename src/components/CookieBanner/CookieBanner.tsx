'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useConsentStore } from '@/store/consentStore';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const { hasConsented, isHydrated, setConsent } = useConsentStore();
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  const shouldShow = isHydrated && hasConsented === null && !dismissed;

  // Focus Accept button on mount so screen readers announce the banner (WCAG 2.4.3)
  useEffect(() => {
    if (!shouldShow) return;
    acceptButtonRef.current?.focus();
  }, [shouldShow]);

  // Apply scroll-padding-bottom while banner is visible (WCAG 2.4.11)
  useEffect(() => {
    if (!shouldShow) return;
    const el = bannerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        'scroll-padding-bottom',
        `${el.offsetHeight + 8}px`
      );
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('scroll-padding-bottom');
    };
  }, [shouldShow]);

  // Escape key dismisses banner for session without recording consent
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDismissed(true);
      }
    },
    []
  );

  useEffect(() => {
    if (!shouldShow) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shouldShow, handleKeyDown]);

  if (!shouldShow) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className={styles.banner}
    >
      <div className={styles.content}>
        <p id="cookie-banner-title" className={styles.title}>Cookie Preferences</p>
        <p id="cookie-banner-desc" className={styles.description}>
          We use reCAPTCHA to prevent spam on our contact form. These services
          may set cookies on your device. You can accept or decline their use.
        </p>
      </div>
      <div className={styles.actions}>
        <button
          ref={acceptButtonRef}
          className={styles.actionButton}
          onClick={() => setConsent(true)}
        >
          Accept All
        </button>
        <button
          className={styles.actionButton}
          onClick={() => setConsent(false)}
        >
          Reject All
        </button>
      </div>
    </div>
  );
}
