import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle mobile device detection and deep linking
 *
 * When a mobile user visits /truck/{id}, redirect them to /m/truck/{id}
 * This enables Universal Links (iOS) and App Links (Android) to work properly:
 * - If the app is installed, the OS will intercept /m/truck/{id} and open the app
 * - If the app is not installed, /m/truck/{id} will redirect back to /truck/{id}
 */
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  const { pathname } = request.nextUrl;

  // Handle truck profile pages: /truck/{id}
  const truckMatch = pathname.match(/^\/truck\/([^\/]+)$/);
  if (truckMatch && isMobile) {
    const truckId = truckMatch[1];
    // Redirect mobile devices to /m/truck/{id} for Universal Links / App Links
    const url = request.nextUrl.clone();
    url.pathname = `/m/truck/${truckId}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/truck/:path*',
  ],
};
