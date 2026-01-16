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
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleHighlighted}`}>Up Next</h2>
        <div className={`${styles.card} ${styles.cardHighlighted}`}>
          <h3 className={styles.cardTitle}>Toast and Square Partnership</h3>
          <p className={styles.cardDescription}>
            We are working diligently to become partners with Toast and Square to allow you to pull your menu into the app automatically and even eventually support mobile sales from the app.
          </p>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Up Soon</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Localization</h3>
            <p className={styles.cardDescription}>
              We want to support all trucks and users. We want to quickly prioritize localization. Newly supported languages will be Chinese and Spanish at first.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Business Partnership</h3>
            <p className={styles.cardDescription}>
              We want to allow businesses to mark locations on their physical properties that will allow you to quickly snag locations to set up at.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
