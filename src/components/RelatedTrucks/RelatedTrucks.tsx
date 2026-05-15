// src/components/RelatedTrucks/RelatedTrucks.tsx
// Server component. Renders up to 6 other trucks from the same city.
import Link from 'next/link';
import { getTrucksByCity, getTruckOccurrencesServer } from '@/lib/api/server';
import { TruckCard } from '@/components/TruckCard';
import type { CityLocation } from '@/lib/location/zipcode';
import styles from './RelatedTrucks.module.css';

type RelatedTrucksProps = {
  location: CityLocation;
  excludeId: string;
};

function todayLocalISO(): string {
  return new Date().toISOString().split('T')[0];
}

function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default async function RelatedTrucks({ location, excludeId }: RelatedTrucksProps) {
  const all = await getTrucksByCity(location.stateSlug, location.citySlug);
  const others = all.filter((t) => String(t.id) !== excludeId).slice(0, 6);

  if (others.length === 0) return null;

  const start = todayLocalISO();
  const end = in30DaysISO();
  const truckOccurrences = await Promise.all(
    others.map((t) => getTruckOccurrencesServer(String(t.id), start, end))
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>More food trucks in {location.city}</h2>
      <div className={styles.grid}>
        {others.map((truck, i) => (
          <TruckCard key={truck.id} truck={truck} occurrences={truckOccurrences[i]} />
        ))}
      </div>
      <Link
        href={`/food-trucks/${location.stateSlug}/${location.citySlug}`}
        className={styles.viewAll}
      >
        View all {location.city} food trucks →
      </Link>
    </section>
  );
}
