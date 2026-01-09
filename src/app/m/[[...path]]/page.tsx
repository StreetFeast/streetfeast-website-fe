import { redirect } from 'next/navigation';

/**
 * Mobile-only route handler for Universal Links / App Links
 *
 * This route handles URLs like:
 * - https://www.streetfeastapp.com/m/truck/123
 * - https://www.streetfeastapp.com/m/profile
 *
 * When accessed via Universal Links (iOS) or App Links (Android):
 * - If the app is installed, the OS will open the app directly
 * - If the app is not installed, the user will be redirected to the web version
 *
 * This route acts as a bridge between the mobile app and the website,
 * ensuring that users get directed to the appropriate place based on
 * whether they have the app installed or not.
 */
export default function MobileRoute({
  params,
}: {
  params: { path?: string[] };
}) {
  // Extract the path from the URL
  const path = params.path || [];

  // Handle truck profile deep links: /m/truck/{id} -> /truck/{id}
  if (path.length >= 2 && path[0] === 'truck') {
    const truckId = path[1];
    redirect(`/truck/${truckId}`);
  }

  // For other paths, redirect to home
  // This could be expanded to handle other routes like /m/profile, etc.
  redirect('/');
}



