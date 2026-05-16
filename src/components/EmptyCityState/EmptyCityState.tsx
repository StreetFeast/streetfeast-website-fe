import Link from 'next/link';
import styles from './EmptyCityState.module.css';

export default function EmptyCityState({ cityName }: { cityName: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Be the first food truck in {cityName}</h2>
      <p className={styles.body}>
        We don&apos;t have any food trucks listed in {cityName} yet. If you operate
        a food truck or know one we should add, register and we&apos;ll get you
        on the map.
      </p>
      <Link href="/download" className={styles.cta}>
        Download and Register your food truck
      </Link>
    </section>
  );
}
