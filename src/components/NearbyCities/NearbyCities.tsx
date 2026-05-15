import Link from 'next/link';
import type { CityContent } from '@/lib/content/types';
import styles from './NearbyCities.module.css';

type Props = {
  cities: CityContent[];
  stateSlug: string;
};

export default function NearbyCities({ cities, stateSlug }: Props) {
  if (cities.length === 0) return null;
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Other Kentucky cities</h2>
      <ul className={styles.list}>
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/food-trucks/${stateSlug}/${city.slug}`}
              className={styles.link}
            >
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
