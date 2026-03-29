import { redirect } from 'next/navigation';
import TruckProfilePage from '@/app/truck/[truckId]/page';

/**
 * Mobile-only route handler for Universal Links / App Links
 *
 * This route handles URLs like:
 * - https://www.streetfeastapp.com/m/truck/123
 * - https://www.streetfeastapp.com/m/profile
 *
 * When accessed via Universal Links (iOS) or App Links (Android):
 * - If the app is installed, the OS will open the app directly
 * - If the app is not installed, the truck profile page is rendered directly
 *
 * Rendering directly (instead of redirecting to /truck/{id}) prevents an
 * infinite redirect loop: middleware redirects mobile /truck/{id} -> /m/truck/{id},
 * so redirecting back would cause ERR_TOO_MANY_REDIRECTS.
 */
export default function MobileRoute({
  params,
}: {
  params: { path?: string[] };
}) {
  // Extract the path from the URL
  const path = params.path || [];

  // Handle truck profile deep links: /m/truck/{id} -> render truck page directly
  if (path.length >= 2 && path[0] === 'truck') {
    const truckId = path[1];
    return <TruckProfilePage params={Promise.resolve({ truckId })} />;
  }

  // For other paths, redirect to home
  // This could be expanded to handle other routes like /m/profile, etc.
  redirect('/');
}



