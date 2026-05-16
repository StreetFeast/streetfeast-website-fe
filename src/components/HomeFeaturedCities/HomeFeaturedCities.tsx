import Link from 'next/link';
import type { CityContent } from '@/lib/content/types';
import styles from './HomeFeaturedCities.module.css';

export default function HomeFeaturedCities({ cities }: { cities: CityContent[] }) {
  if (cities.length === 0) return null;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Find Food Trucks in Your City</h2>
        <p className={styles.lede}>
          StreetFeast tracks active food trucks across the United States in real time.
        </p>
        <div className={styles.grid}>
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/food-trucks/${city.stateSlug}/${city.slug}`}
              className={styles.card}
            >
              <span className={styles.cityName}>{city.name}</span>
              <span className={styles.stateName}>{city.stateAbbr}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
