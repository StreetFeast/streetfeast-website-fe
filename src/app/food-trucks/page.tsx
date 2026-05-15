import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import { JsonLd } from '@/lib/seo/json-ld';
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import { ALL_STATES } from '@/content/states';
import styles from './page.module.css';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Food Trucks — Find Street Food Across the United States',
  description:
    'Browse food trucks by state and city. Real-time locations, menus, and schedules from StreetFeast.',
  path: '/food-trucks',
});

const crumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Food Trucks', path: '/food-trucks' },
];

export default function FoodTrucksHub() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={itemListJsonLd(
          'States with food trucks on StreetFeast',
          ALL_STATES.map((s) => ({
            url: `/food-trucks/${s.slug}`,
            name: s.name,
          }))
        )}
      />
      <Header />
      <main className={styles.main}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.h1}>Food Trucks</h1>
        <p className={styles.lede}>
          Find food trucks near you. Browse by state to see active vendors,
          their schedules, and what they&apos;re serving.
        </p>
        <h2 className={styles.h2}>States</h2>
        <ul className={styles.statesList}>
          {ALL_STATES.map((state) => (
            <li key={state.slug}>
              <Link
                href={`/food-trucks/${state.slug}`}
                className={styles.stateLink}
              >
                {state.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
