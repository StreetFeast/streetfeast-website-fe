import { create } from 'zustand';
import { UserProfileSupabaseResponse } from '@/types/api';

interface ProfileState {
  profile: UserProfileSupabaseResponse | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfileSupabaseResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearProfile: () => set({ profile: null, error: null, isLoading: false }),
}));
