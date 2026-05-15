'use client';

import { usePathname } from 'next/navigation';
import { ComingSoon } from '@/components/ComingSoon';

interface LayoutContentProps {
  children: React.ReactNode;
}

const ALLOWED_PREFIXES = ['/food-trucks'];
const ALLOWED_EXACT = ['/terms', '/privacy', '/delete-my-data', '/download'];

export default function LayoutContent({ children }: LayoutContentProps) {
  const isLaunched = process.env.NEXT_PUBLIC_IS_LAUNCHED === 'true';
  const pathname = usePathname();
  const isAllowed =
    ALLOWED_EXACT.includes(pathname) ||
    ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isLaunched || isAllowed) {
    return <>{children}</>;
  }

  return <ComingSoon />;
}
