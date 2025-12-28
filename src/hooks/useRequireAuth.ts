import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { isEmailVerified } from '@/utils/auth';

interface UseRequireAuthOptions {
  requireEmailVerified?: boolean;
  redirectTo?: string;
}

/**
 * Hook to protect routes that require authentication
 * Redirects to login if not authenticated
 * Optionally requires email verification
 */
export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const {
    requireEmailVerified = true,
    redirectTo = '/login-truck',
  } = options;

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (!isHydrated) return;

    if (!user || !accessToken) {
      router.push(redirectTo);
      return;
    }

    if (requireEmailVerified && !isEmailVerified(user)) {
      router.push('/verify');
      return;
    }
  }, [user, accessToken, isHydrated, requireEmailVerified, redirectTo, router]);

  return {
    user,
    accessToken,
    isAuthenticated: !!user && !!accessToken,
    isEmailVerified: isEmailVerified(user),
    isLoading: !isHydrated,
  };
};
