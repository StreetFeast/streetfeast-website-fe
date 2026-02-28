import Image from 'next/image';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './AppStoreBadges.module.css';

interface AppStoreBadgesProps {
  className?: string;
}

export default function AppStoreBadges({ className }: AppStoreBadgesProps) {
  return (
    <div className={`${styles.badges}${className ? ` ${className}` : ''}`.trim()}>
      <a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer">
        <Image
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          width={180}
          height={63}
        />
      </a>
      <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer">
        <Image
          src="/google-play-badge.png"
          alt="Get it on Google Play"
          width={180}
          height={63}
        />
      </a>
    </div>
  );
}
