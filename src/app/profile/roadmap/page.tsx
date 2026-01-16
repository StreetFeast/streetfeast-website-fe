"use client";

import styles from "./page.module.css";

export default function Roadmap() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Roadmap</h1>
        <p className={styles.subtitle}>
          See what we&apos;re working on and what&apos;s coming next for StreetFeast.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Coming Soon</h2>
        <p className={styles.placeholder}>
          We&apos;re working on exciting new features. Check back soon for updates!
        </p>
      </section>
    </div>
  );
}
