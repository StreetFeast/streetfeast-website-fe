// src/components/TruckCard/TruckCard.tsx
// Server component. Status badge ("Open now" / "Opens Fri 11am") is computed
// server-side from occurrences and refreshed by ISR.
import Image from 'next/image';
import Link from 'next/link';
import type { EnrichedTruck } from '@/lib/api/server';
import type { TruckOccurrence } from '@/types/api';
import styles from './TruckCard.module.css';

const STORAGE_PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? '';

function imageUrl(uri: string | null | undefined): string | null {
  if (!uri) return null;
  if (uri.startsWith('http')) return uri;
  return `${STORAGE_PREFIX}${uri}`;
}

type StatusInfo = { label: string; kind: 'open' | 'soon' | 'closed' };

function computeStatus(
  occurrences: TruckOccurrence[],
  now: Date = new Date()
): StatusInfo {
  const upcoming = [...occurrences].sort(
    (a, b) => new Date(a.openTimeLocal).getTime() - new Date(b.openTimeLocal).getTime()
  );

  for (const occ of upcoming) {
    if (occ.isClosed) continue;
    const open = new Date(occ.openTimeLocal);
    const close = new Date(occ.closeTimeLocal);
    if (now >= open && now < close) return { label: 'Open now', kind: 'open' };
    const minsUntilOpen = (open.getTime() - now.getTime()) / 60000;
    if (minsUntilOpen > 0 && minsUntilOpen <= 60) {
      return { label: 'Opening soon', kind: 'soon' };
    }
    if (minsUntilOpen > 0) {
      const day = open.toLocaleDateString('en-US', { weekday: 'short' });
      const time = open.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      return { label: `Opens ${day} ${time}`, kind: 'closed' };
    }
  }
  return { label: 'Closed', kind: 'closed' };
}

type TruckCardProps = {
  truck: EnrichedTruck;
  occurrences?: TruckOccurrence[];
};

export default function TruckCard({ truck, occurrences = [] }: TruckCardProps) {
  const hero = imageUrl(truck.images?.[0]?.imageUri);
  const status = computeStatus(occurrences);
  const altLocation = truck.location?.city ?? 'Kentucky';

  return (
    <Link href={`/truck/${truck.id}`} className={styles.card} aria-label={truck.name}>
      <div className={styles.hero}>
        {hero ? (
          <Image
            src={hero}
            alt={`${truck.name} food truck in ${altLocation}`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 300px"
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <Image
              src="/app-vector-file.svg"
              alt={`${truck.name} food truck in ${altLocation}`}
              width={96}
              height={96}
              className={styles.placeholderLogo}
            />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{truck.name}</h3>
        {truck.cuisine && <p className={styles.cuisine}>{truck.cuisine}</p>}
        <span className={`${styles.badge} ${styles[`badge-${status.kind}`]}`}>
          {status.label}
        </span>
      </div>
    </Link>
  );
}
