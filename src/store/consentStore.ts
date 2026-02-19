import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentState {
  // State
  hasConsented: boolean | null; // null = unset (no choice made), true = accepted, false = rejected
  consentTimestamp: number | null; // Date.now() when consent was given/rejected
  isHydrated: boolean; // true after localStorage rehydration completes

  // Actions
  setConsent: (consented: boolean) => void; // Sets hasConsented + consentTimestamp
  clearConsent: () => void; // Resets to null (used by footer "Cookie Preferences" link in Phase 2)
}

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      hasConsented: null,
      consentTimestamp: null,
      isHydrated: false,
      setConsent: (consented) => set({ hasConsented: consented, consentTimestamp: Date.now() }),
      clearConsent: () => set({ hasConsented: null, consentTimestamp: null }),
    }),
    {
      name: 'consent-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
