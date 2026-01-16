"use client";

import styles from "./page.module.css";

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.card}>
        <p className={styles.message}>
          Have questions or need support? We&apos;re here to help!
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <a
              href="mailto:customer-support@streetfeastapp.com"
              className={styles.contactValue}
            >
              customer-support@streetfeastapp.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
