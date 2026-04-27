import styles from "./page.module.css";

export default function Roadmap() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Roadmap</h1>
          <p className={styles.subtitle}>
            See what we&apos;re working on and what&apos;s coming next for StreetFeast.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleHighlighted}`}>Currently Working On</h2>
          <div className={styles.cardsGrid}>
            <div className={`${styles.card} ${styles.cardHighlighted}`}>
              <h3 className={styles.cardTitle}>Multi-Image Menus</h3>
              <p className={styles.cardDescription}>
                Upload multiple images as your menu to let users know everything that you have!
              </p>
            </div>
            <div className={`${styles.card} ${styles.cardHighlighted}`}>
              <h3 className={styles.cardTitle}>Business Locations</h3>
              <p className={styles.cardDescription}>
                We want to allow businesses to mark locations on their physical properties that will allow you to quickly snag locations to set up at.
              </p>
            </div>
            <div className={`${styles.card} ${styles.cardHighlighted}`}>
              <h3 className={styles.cardTitle}>Social Media Integration</h3>
              <p className={styles.cardDescription}>
                Connect your social media pages and post your schedule directly from the app to all your platforms at once. Keep your followers updated without the hassle.
              </p>
            </div>
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
              <h3 className={styles.cardTitle}>Square and Clover Integration</h3>
              <p className={styles.cardDescription}>
                We are working to integrate with Square and Clover to allow you to pull your menu into the app automatically and even eventually support mobile sales from the app.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Overhauled Analytics</h3>
              <p className={styles.cardDescription}>
                A redesigned analytics experience to give you deeper insights into your customers, sales, and schedule performance.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Event Notifications for Users</h3>
              <p className={styles.cardDescription}>
                Let users subscribe to a specific event so they get notified the moment vendors, schedules, or details are updated.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Reason for Leaving Early</h3>
              <p className={styles.cardDescription}>
                Allow vendors to share a reason when they leave a location early so customers always know what to expect.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
