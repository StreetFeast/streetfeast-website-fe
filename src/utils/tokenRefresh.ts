import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

/**
 * Refreshes the access token using the stored refresh token
 * Returns the new access token or null if refresh fails
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      console.error('No refresh token available');
      return null;
    }

    // Use Supabase to refresh the session
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session) {
      console.error('Failed to refresh token:', error);
      // Clear auth state if refresh fails
      useAuthStore.getState().clearAuth();
      return null;
    }

    // Update the auth store with new tokens
    const { access_token, refresh_token, user } = data.session;
    useAuthStore.getState().setAuth(
      user ? { id: user.id, email: user.email, user_metadata: user.user_metadata } : null,
      access_token,
      refresh_token
    );

    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    useAuthStore.getState().clearAuth();
    return null;
  }
};
