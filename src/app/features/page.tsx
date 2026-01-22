"use client";

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaCalendarAlt, FaUtensils, FaBoxOpen, FaBell } from 'react-icons/fa';
import styles from './page.module.css';

const features = [
  {
    id: 'scheduling',
    icon: FaCalendarAlt,
    title: 'Scheduling Events',
    description: 'Plan your stops in advance and let customers know exactly where and when to find you. Set up recurring events for regular locations or one-time appearances at special venues.',
    benefit: 'Build a loyal following by making it easy for customers to plan their visits around your schedule.',
    image: '/tutorials/scheduled-events/01-schedule-calendar.png',
    imageAlt: 'StreetFeast event scheduling calendar view',
  },
  {
    id: 'menus',
    icon: FaUtensils,
    title: 'Menu Creation',
    description: 'Design beautiful, organized menus that showcase your offerings. Group items by category, add descriptions, and keep everything up to date in real-time.',
    benefit: 'Help customers decide what to order before they arrive, speeding up service and boosting sales.',
    image: '/tutorials/create-menu/02-menu-view.png',
    imageAlt: 'StreetFeast menu creation interface',
  },
  {
    id: 'products',
    icon: FaBoxOpen,
    title: 'Product Management',
    description: 'Easily add, edit, and organize your products with photos, prices, and detailed descriptions. Mark items as sold out or featured with a single tap.',
    benefit: 'Keep your offerings fresh and accurate so customers always know what\'s available.',
    image: '/tutorials/create-products/01-products-list.png',
    imageAlt: 'StreetFeast product management screen',
  },
  {
    id: 'notifications',
    icon: FaBell,
    title: 'Push Notifications',
    description: 'Instantly reach your followers with updates about your location, specials, or menu changes. Send targeted messages to keep your audience engaged.',
    benefit: 'Stay top of mind and drive traffic whenever you\'re open for business.',
    image: '/tutorials/push-notifications/02-push-notification-form.png',
    imageAlt: 'StreetFeast push notification composer',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
          </div>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>For Food Truck Owners</span>
            <h1 className={styles.heroTitle}>
              Everything you need to
              <span className={styles.highlight}> grow your business</span>
            </h1>
            <p className={styles.heroDescription}>
              StreetFeast gives food vendors powerful tools to connect with customers,
              manage operations, and stand out from the crowd.
            </p>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.featuresContainer}>
            {features.map((feature, index) => (
              <article
                key={feature.id}
                className={styles.featureCard}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.featureHeader}>
                  <div className={styles.iconWrapper}>
                    <feature.icon className={styles.featureIcon} />
                  </div>
                  <h2 className={styles.featureTitle}>{feature.title}</h2>
                </div>
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneNotch} />
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={280}
                    height={560}
                    className={styles.featureImage}
                  />
                </div>
                <div className={styles.featureContent}>
                  <div className={styles.featureHeaderDesktop}>
                    <div className={styles.iconWrapper}>
                      <feature.icon className={styles.featureIcon} />
                    </div>
                    <h2 className={styles.featureTitle}>{feature.title}</h2>
                  </div>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  <p className={styles.featureBenefit}>
                    <span className={styles.benefitIcon}>→</span>
                    {feature.benefit}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
