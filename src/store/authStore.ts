import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email?: string;
  email_confirmed_at?: string;
  user_metadata?: Record<string, unknown>;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  emailVerified: boolean;
  isHydrated: boolean;
  setAuth: (user: User | null, accessToken: string | null, refreshToken: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      emailVerified: false,
      isHydrated: false,
      setAuth: (user, accessToken, refreshToken) => {
        const emailVerified = user?.email_confirmed_at != null;
        set({ user, accessToken, refreshToken, emailVerified });
      },
      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null, emailVerified: false }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
