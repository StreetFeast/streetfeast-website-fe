/**
 * User type compatible with both Supabase User and custom User interface
 */
type CompatibleUser = {
  email?: string;
  email_confirmed_at?: string;
};

/**
 * Checks if a user's email is verified
 * @param user - User object with email_confirmed_at field
 * @returns true if email is confirmed, false otherwise
 */
export const isEmailVerified = (user: CompatibleUser | null | undefined): boolean => {
  if (!user) return false;
  return user.email_confirmed_at != null;
};

/**
 * Gets the user's email from session or user object
 * @param user - User object with email field
 * @returns email string or null
 */
export const getUserEmail = (user: CompatibleUser | null | undefined): string | null => {
  return user?.email || null;
};
