# Stack Research: Cookie Consent Implementation

**Domain:** Cookie consent / privacy compliance for Next.js website
**Researched:** 2026-02-19
**Confidence:** HIGH

## Executive Summary

For implementing cookie consent on a Next.js 15 App Router website with reCAPTCHA v3 and FingerprintJS, the standard 2025/2026 approach prioritizes **custom client-side implementation** over third-party libraries. This gives full control over conditional script loading, integrates seamlessly with existing Zustand state management, and avoids bundle bloat. The key architectural shift is moving from always-loaded providers to **conditionally-rendered providers** based on user consent stored in cookies (not localStorage, which has GDPR implications).

**Critical Insight:** FingerprintJS used for fraud prevention typically qualifies as "legitimate interest" under GDPR and may NOT require explicit consent, unlike reCAPTCHA v3 which does require consent due to behavioral tracking and data transfers to Google.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Custom Cookie Banner** | N/A (DIY) | GDPR-compliant consent UI | Full control over UX/UI, no bundle bloat, integrates with existing CSS Modules pattern, easier to maintain than third-party library updates |
| **Cookie Storage** | Native `document.cookie` | Store consent preferences | Server-side accessible (unlike localStorage), GDPR-compliant for consent, works with Next.js server/client boundary |
| **Zustand** | 5.0.8 (existing) | Consent state management | Already in stack, client-side reactive state, can sync with cookie storage via custom middleware |

### Supporting Utilities

| Utility | Purpose | Implementation |
|---------|---------|----------------|
| **js-cookie** | Cookie manipulation | Optional helper library for easier cookie read/write/delete operations (3KB gzipped) |
| **Consent Hook** | Centralized consent logic | Custom `useConsent` hook to encapsulate get/set/check consent state |
| **Conditional Provider Wrapper** | Conditional GoogleReCaptchaProvider | Client component that only renders provider when consent granted |

### Development Pattern

| Pattern | Description | Why This Approach |
|---------|-------------|-------------------|
| **Cookie-based Storage** | Store consent in `cookie_consent` cookie, not localStorage | Server-accessible, GDPR-compliant, persists across sessions, available in middleware |
| **Client Component Wrapper** | Wrap `GoogleReCaptchaProvider` in conditional client component | Prevents reCAPTCHA script load until consent granted, maintains Next.js static optimization |
| **On-demand FingerprintJS** | Keep FingerprintJS lazy-loaded in hook | Already optimal - only loads on form submission, may not require consent (fraud prevention = legitimate interest) |

## Installation

```bash
# Optional: Cookie utility library (recommended for cleaner code)
npm install js-cookie
npm install --save-dev @types/js-cookie

# No other dependencies needed - custom implementation
```

## Implementation Architecture

### 1. Cookie Storage Schema

```typescript
// Consent categories stored in single cookie
interface ConsentPreferences {
  necessary: boolean;      // Always true (can't be disabled)
  analytics: boolean;      // For reCAPTCHA v3
  functional: boolean;     // For FingerprintJS (may not need consent)
  timestamp: number;       // When consent was given
  version: string;         // Consent policy version
}

// Stored as JSON string in cookie: "cookie_consent"
// Max-Age: 365 days
// SameSite: Lax
// Secure: true (production only)
```

### 2. Consent State Management (Zustand)

```typescript
// src/store/consentStore.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface ConsentState {
  preferences: ConsentPreferences | null;
  showBanner: boolean;
  acceptAll: () => void;
  acceptSelected: (prefs: Partial<ConsentPreferences>) => void;
  rejectAll: () => void;
  getConsent: (category: keyof ConsentPreferences) => boolean;
}

// Sync with cookie on mount, save to cookie on change
```

### 3. Conditional Provider Pattern

```typescript
// src/components/Providers/ConditionalReCaptchaProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useConsentStore } from '@/store/consentStore';

export function ConditionalReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const analyticsConsent = useConsentStore(state => state.getConsent('analytics'));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render provider on server (hydration mismatch)
  if (!mounted) {
    return <>{children}</>;
  }

  // Only render provider if consent granted
  if (!analyticsConsent) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
```

### 4. Modified Contact Form Hook

```typescript
// src/hooks/useContactForm.ts
// Add consent check before executing reCAPTCHA
const { executeRecaptcha } = useGoogleReCaptcha();
const analyticsConsent = useConsentStore(state => state.getConsent('analytics'));

if (!analyticsConsent || !executeRecaptcha) {
  // Handle gracefully: either block submission or allow without reCAPTCHA
  // (backend should still validate)
}
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **Custom Implementation** | `react-cookie-consent` library | If you need a drop-in solution quickly and don't mind 15KB+ bundle size, or lack design requirements |
| **Custom Implementation** | `vanilla-cookieconsent` (orestbida) | If you need multilingual support out-of-box, advanced consent modes, or don't mind vanilla JS integration complexity |
| **Cookie Storage** | localStorage | NEVER for consent - not server-accessible, GDPR compliance issues, can't be scanned by compliance tools |
| **Zustand** | React Context | If you don't already have Zustand - but Zustand is already in the stack |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **localStorage for consent** | Not accessible server-side in middleware, considered tracking storage by GDPR tools, can't be read in Server Components | Cookies with proper SameSite/Secure flags |
| **Always-loaded reCAPTCHA** | GDPR violation - loads tracking scripts before consent, French authorities have fined companies €125,000 for this | Conditional provider wrapping |
| **Third-party consent platforms** (Cookiebot, OneTrust) | Expensive ($300+/month), overkill for simple use case, adds external dependencies | Custom implementation (this is a single-form use case) |
| **reCAPTCHA free version** | Sends data to Google for ad targeting, harder to be GDPR-compliant, migrated to Google Cloud in 2026 | Continue with v3 but ensure proper consent, or consider alternatives like hCaptcha/Turnstile for full compliance |
| **`@next/third-parties/google` GoogleAnalytics** | Does not support dynamic consent updates without GTM workarounds | Not applicable (you're not using GA, just reCAPTCHA) |

## Stack Patterns by Scenario

### Scenario 1: Fraud Prevention Only (Current State)
**If FingerprintJS is only used for fraud detection:**
- May NOT require consent (legitimate interest under GDPR)
- Keep current lazy-load implementation
- Document in Privacy Policy but no consent banner needed
- **Action:** Consult legal team to confirm

### Scenario 2: GDPR Compliance Required (Recommended)
**If serving EU users or want full compliance:**
- Implement custom cookie consent banner
- Use cookie storage for preferences
- Conditionally wrap GoogleReCaptchaProvider
- Categories: Necessary (always on), Analytics (reCAPTCHA)
- Optional: Functional category for FingerprintJS if legal requires it

### Scenario 3: US-Only Audience
**If only serving US users:**
- Lighter consent approach (informational banner)
- Still conditionally load reCAPTCHA (best practice)
- Document cookie usage in Privacy Policy
- No explicit consent required (but recommended for transparency)

## Key Implementation Steps

1. **Create Consent Store** (Zustand + cookie sync)
2. **Build Cookie Banner Component** (CSS Modules, match existing design)
3. **Add Conditional Provider Wrapper** (replace direct GoogleReCaptchaProvider)
4. **Update Providers Component** (use ConditionalReCaptchaProvider)
5. **Modify Contact Form Hook** (handle no-consent state gracefully)
6. **Add Consent Management UI** (footer link to manage preferences)
7. **Test Scenarios** (accept, reject, partial consent)

## Critical GDPR Compliance Notes

### reCAPTCHA v3 Requirements
- **MUST obtain consent** before loading script
- Collects: IP address, mouse movements, keystroke timing, browser fingerprints, device settings, cookies
- Data transferred to Google (US) - requires consent under GDPR
- French authorities fined companies €125,000 for loading reCAPTCHA without consent
- Script must be **fully blocked** until consent, not just visually disabled

### FingerprintJS @fingerprintjs/fingerprintjs (Open Source)
- **Likely does NOT require consent** for fraud prevention (legitimate interest)
- Stateless, creates hash from public browser details
- No cookies, no persistent storage
- If used for attribution/personalization: REQUIRES consent
- If used for fraud prevention: Legitimate interest (document in Privacy Policy)
- **Action:** Verify with legal team based on specific use case

### Cookie Categories

| Category | Required | Description | Applies To |
|----------|----------|-------------|------------|
| **Necessary** | Yes (always on) | Essential for site functionality | Session cookies, CSRF tokens |
| **Analytics** | No (opt-in) | Tracking, behavioral analysis | reCAPTCHA v3 |
| **Functional** | Maybe (depends on legal) | Fraud prevention, preferences | FingerprintJS (if categorized here) |

## Version Compatibility

| Package | Current Version | Notes |
|---------|----------------|-------|
| react-google-recaptcha-v3 | 1.11.0 | Compatible with conditional rendering pattern |
| @fingerprintjs/fingerprintjs | 5.0.1 | Already optimal (lazy-loaded) |
| zustand | 5.0.8 | Supports custom storage middleware for cookie sync |
| next | 15.5.7 | App Router client component patterns fully supported |
| js-cookie | 3.0.5 (if added) | TypeScript types available via @types/js-cookie |

## Migration Path

### Current State
```tsx
// src/components/Providers/Providers.tsx
<GoogleReCaptchaProvider reCaptchaKey={siteKey}>
  {children}
</GoogleReCaptchaProvider>
```

### After Implementation
```tsx
// src/components/Providers/Providers.tsx
<ConditionalReCaptchaProvider>
  {children}
</ConditionalReCaptchaProvider>

// Only loads reCAPTCHA script when consent.analytics === true
```

## Performance Impact

| Metric | Before | After | Impact |
|--------|--------|-------|--------|
| **Initial Bundle** | ~85KB (reCAPTCHA always loaded) | ~85KB (same, but conditional) | Neutral |
| **No-consent Bundle** | ~85KB | ~2KB (banner only) | -83KB for users who decline |
| **Time to Interactive** | Same | Same (reCAPTCHA lazy-loads) | Neutral |
| **Cookie Banner** | 0 | ~3-5KB | +3-5KB (custom implementation, tiny) |

**Net Impact:** Improved for users who decline consent, neutral for users who accept.

## Sources

### High Confidence (Official Docs & Technical Guides)
- [Next.js Cookie Consent Banner: Build GDPR-Compliant System (No Libraries) | Build with Matija](https://www.buildwithmatija.com/blog/build-cookie-consent-banner-nextjs-15-server-client) - Next.js 15 server/client patterns
- [Configuring Google Cookies Consent with Next.js 15 | Medium](https://medium.com/@sdanvudi/configuring-google-cookies-consent-with-next-js-15-ca159a2bea13) - Conditional provider approach
- [Privacy and compliance - Fingerprint Documentation](https://dev.fingerprint.com/docs/privacy-and-compliance) - Official FingerprintJS GDPR guidance
- [reCAPTCHA Privacy – How to Stay GDPR Compliant in 2026](https://capmonster.cloud/en/blog/recaptcha-privacy-how-to-stay-gdpr-compliant-in-2026) - Updated 2026 reCAPTCHA compliance

### Medium Confidence (Community Best Practices)
- [React Cookie Consent: GDPR Implementation Guide for Next.js - Cookietrust](https://www.cookietrust.io/react-nextjs-cookie-consent-gdpr-guide/) - Implementation patterns
- [How to Build a GDPR Cookie Banner in Next.js 15+ | Frontend Weekly](https://medium.com/front-end-weekly/how-to-build-a-gdpr-cookie-banner-in-next-js-15-ga4-consent-mode-cloudfront-geo-detection-aae0961e89c5) - GA4 consent mode patterns
- [Next.js Server and Client Components Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) - Official provider patterns
- [Cookies vs. Local Storage in Next.js | Medium](https://mgshamalidilrukshi.medium.com/cookies-vs-local-storage-in-next-js-which-is-best-for-your-website-b3c45199de40) - Storage comparison

### Regulatory & Legal
- [Is Google reCAPTCHA GDPR Compliant? - Friendly Captcha](https://friendlycaptcha.com/insights/recaptcha-gdpr/) - GDPR compliance analysis
- [Google reCAPTCHA and the GDPR - Complianz](https://complianz.io/google-recaptcha-and-the-gdpr-a-possible-conflict/) - Legal conflicts and fines
- [Device digital fingerprint tracking in the post-GDPR era - Piwik PRO](https://piwik.pro/blog/device-fingerprint-tracking-in-the-post-gdpr-era/) - Fingerprinting compliance

---
*Stack research for: Cookie Consent Implementation*
*Researched: 2026-02-19*
*Next Steps: Create roadmap phases for implementation*
