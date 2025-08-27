import Image from 'next/image';
import styles from './HeroHeader.module.css';

export default function HeroHeader() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            StreetFeast
          </h1>
          <p className={styles.subtitle}>
            Discover amazing street food near you
          </p>
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
                width={120}
                height={40}
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
                width={135}
                height={40}
              />
            </a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.phoneFrame}>
            <Image 
              src="/app-screenshot.svg" 
              alt="StreetFeast App Screenshot"
              width={304}
              height={634}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}