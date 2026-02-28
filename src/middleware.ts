import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import { BOT_PATTERNS } from '@/constants/bots';

/**
 * Middleware to handle mobile device detection and deep linking
 *
 * When a mobile user visits /truck/{id}, redirect them to /m/truck/{id}
 * This enables Universal Links (iOS) and App Links (Android) to work properly:
 * - If the app is installed, the OS will intercept /m/truck/{id} and open the app
 * - If the app is not installed, /m/truck/{id} will redirect back to /truck/{id}
 *
 * When an iOS phone user visits /download, redirect to the App Store (307).
 * When an Android phone user visits /download, redirect to Google Play (307).
 * Bots, crawlers, desktop users, iPadOS users, and tablets see the fallback page.
 */
export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
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

  // Handle /download: smart redirect for mobile app users
  if (pathname === '/download') {
    const { isBot: detectedBot, device } = userAgent(request);

    // 1. Bot check FIRST — bots always see the page (locked decision)
    if (detectedBot || BOT_PATTERNS.test(ua)) {
      return NextResponse.next();
    }

    // 2. iOS phone (iPhone, iPod Touch) -> App Store
    if (device.type === 'mobile' && /iPhone|iPod/i.test(ua)) {
      return NextResponse.redirect(APP_STORE_LINK, 307);
    }

    // 3. Android phone -> Google Play
    if (device.type === 'mobile' && /Android/i.test(ua)) {
      return NextResponse.redirect(GOOGLE_PLAY_LINK, 307);
    }

    // 4. Desktop, iPadOS, Android tablet, unknown -> fallback page
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/truck/:path*',
    '/download',
  ],
};
