import Link from 'next/link';
import type { CityContent } from '@/lib/content/types';
import { getTrucksByCity } from '@/lib/api/server';
import styles from './CitiesGrid.module.css';

type Props = {
  cities: CityContent[];
};

export default async function CitiesGrid({ cities }: Props) {
  const counts = await Promise.all(
    cities.map((c) => getTrucksByCity(c.stateSlug, c.slug, c.aliases ?? []))
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Kentucky cities</h2>
      <div className={styles.grid}>
        {cities.map((city, i) => {
          const count = counts[i].length;
          return (
            <Link
              key={city.slug}
              href={`/food-trucks/${city.stateSlug}/${city.slug}`}
              className={styles.card}
            >
              <h3 className={styles.cityName}>{city.name}</h3>
              <p className={styles.count}>
                {count} active food truck{count === 1 ? '' : 's'}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
