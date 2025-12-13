'use client';

import { usePathname } from 'next/navigation';
import { ComingSoon } from '@/components/ComingSoon';

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const isLaunched = process.env.NEXT_PUBLIC_IS_LAUNCHED === 'true';
  const pathname = usePathname();
  const allowedPaths = ['/terms', '/privacy', '/delete-my-data'];
  const isAllowedPath = allowedPaths.includes(pathname);

  if (isLaunched || isAllowedPath) {
    return <>{children}</>;
  }

  return <ComingSoon />;
}
