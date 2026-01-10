import Image from 'next/image';
import styles from './HeroHeader.module.css';

export default function HeroHeader() {
  return (
    <section className={styles.hero} id="main-content">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Discover amazing street food near you
          </h1>
          <p className={styles.description}>
            Find the best food trucks, street vendors, and pop-up restaurants in your area.
            Download the app and start your culinary adventure today.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="https://apps.apple.com"
              className={styles.appStoreBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={180}
                height={63}
              />
            </a>
            <a
              href="https://play.google.com"
              className={styles.playStoreBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={180}
                height={63}
              />
            </a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/lefthome.png"
            alt="StreetFeast App - Map View"
            width={506}
            height={1036}
            priority
            className={styles.leftPhone}
          />
          <Image
            src="/fronthome.png"
            alt="StreetFeast App - Vendor Details"
            width={560}
            height={1036}
            priority
            className={styles.centerPhone}
          />
          <Image
            src="/righthome.png"
            alt="StreetFeast App - Menu View"
            width={506}
            height={1036}
            priority
            className={styles.rightPhone}
          />
        </div>
        <div className={styles.ctaButtonsMobile}>
          <a
            href="https://apps.apple.com"
            className={styles.appStoreBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              width={200}
              height={70}
            />
          </a>
          <a
            href="https://play.google.com"
            className={styles.playStoreBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={200}
              height={70}
            />
          </a>
        </div>
      </div>
    </section>
  );
}