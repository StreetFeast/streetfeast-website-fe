import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { postHogMiddleware } from '@posthog/next';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import { BOT_PATTERNS } from '@/constants/bots';
import { POSTHOG_KEY, FIRE_AND_FORGET, captureEdgeEvent } from '@/lib/posthog';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/**
 * Reads the PostHog distinct ID from the identity cookie on the response.
 * Cookie name follows the posthog-js convention: ph_{token}_posthog
 * Falls back to a generated UUID if the cookie is not present.
 */
function getDistinctId(response: NextResponse): string {
  const cookieName = `ph_${POSTHOG_KEY}_posthog`;
  const cookie = response.cookies.get(cookieName);
  if (cookie?.value) {
    try {
      const parsed = JSON.parse(cookie.value);
      if (parsed.distinct_id) return parsed.distinct_id;
    } catch {
      // malformed cookie, fall through to UUID
    }
  }
  return crypto.randomUUID();
}

/**
 * Extracts UTM parameters from the request URL search params.
 */
function getUtmParams(url: URL): Record<string, string | undefined> {
  const params: Record<string, string | undefined> = {};
  for (const key of UTM_PARAMS) {
    const value = url.searchParams.get(key);
    if (value) params[key] = value;
  }
  return params;
}

export async function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const { pathname } = request.nextUrl;

  // Handle truck profile pages: /truck/{id}
  // Early return — no PostHog cookie needed for app deep links
  const truckMatch = pathname.match(/^\/truck\/([^\/]+)$/);
  if (truckMatch && isMobile) {
    const truckId = truckMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = `/m/truck/${truckId}`;
    return NextResponse.redirect(url);
  }

  // Run PostHog middleware first to seed identity cookie on the response
  const response = NextResponse.next();
  const postHogResponse = await postHogMiddleware({ apiKey: POSTHOG_KEY, proxy: true, response })(request);

  // Handle /download: smart redirect for mobile app users
  if (pathname === '/download') {
    const { isBot: detectedBot, device } = userAgent(request);

    // Bots always see the page
    if (detectedBot || BOT_PATTERNS.test(ua)) {
      return postHogResponse;
    }

    let redirectUrl: string | null = null;
    let platform: string | null = null;

    if (device.type === 'mobile' && /iPhone|iPod/i.test(ua)) {
      redirectUrl = APP_STORE_LINK;
      platform = 'ios';
    } else if (device.type === 'mobile' && /Android/i.test(ua)) {
      redirectUrl = GOOGLE_PLAY_LINK;
      platform = 'android';
    }

    if (redirectUrl && platform) {
      const distinctId = getDistinctId(postHogResponse);
      const utmParams = getUtmParams(request.nextUrl);
      const referrer = request.headers.get('referer') || undefined;

      try {
        const capturePromise = captureEdgeEvent(distinctId, 'download_redirect', {
          platform,
          redirect_url: redirectUrl,
          referrer,
          $current_url: request.nextUrl.toString(),
          ...utmParams,
        });

        if (!FIRE_AND_FORGET) {
          await capturePromise;
        } else {
          capturePromise.catch(() => {});
        }
      } catch {
        // PostHog capture failed — don't block the redirect
      }

      return NextResponse.redirect(redirectUrl, 307);
    }

    // Desktop, iPadOS, Android tablet, unknown -> fallback page
    return postHogResponse;
  }

  return postHogResponse;
}

// Run on all routes for PostHog cookie seeding and proxy, excluding static assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
