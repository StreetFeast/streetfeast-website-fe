import { User } from '@supabase/supabase-js';

/**
 * Checks if a user's email is verified
 * @param user - Supabase user object
 * @returns true if email is confirmed, false otherwise
 */
export const isEmailVerified = (user: User | null | undefined): boolean => {
  if (!user) return false;
  return user.email_confirmed_at != null;
};

/**
 * Gets the user's email from session or user object
 * @param user - Supabase user object
 * @returns email string or null
 */
export const getUserEmail = (user: User | null | undefined): string | null => {
  return user?.email || null;
};
