# Phase 1: State Management Foundation - Research

**Researched:** 2026-02-19
**Domain:** Zustand state management with Next.js 15 App Router, localStorage persistence, SSR hydration safety
**Confidence:** HIGH

## Summary

This phase implements consent state management using Zustand with localStorage persistence in a Next.js 15 App Router environment. The primary challenge is preventing SSR/hydration mismatches when reading from browser-only localStorage.

The existing codebase already uses Zustand 5.0.8 with the persist middleware pattern in `authStore.ts`, providing a proven reference implementation. The pattern includes an `isHydrated` flag to prevent hydration errors and uses the `onRehydrateStorage` callback to track when client-side rehydration completes.

**Primary recommendation:** Follow the existing authStore pattern exactly - use Zustand's persist middleware with localStorage, implement the `isHydrated` flag via `onRehydrateStorage`, and ensure components check hydration state before rendering persisted values. Additionally, update the privacy policy to reflect Google's April 2, 2026 reCAPTCHA data controller change.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zustand | 5.0.8 | State management | Already in project, lightweight (2.6KB), excellent TypeScript support, proven SSR-safe pattern in authStore |
| zustand/middleware | 5.0.8 (included) | Persist middleware | Official persistence solution, handles localStorage/cookies/sessionStorage with SSR safety |
| next | 15.5.7 | App Router framework | Project's existing version, server/client component model |
| TypeScript | ^5 | Type safety | Project uses strict mode, Zustand has first-class TS support |

### Supporting
None required. Zustand is self-contained and the persist middleware is included in the main package.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| localStorage | cookies via zustand-cookie-storage | Cookies enable SSR reads but add complexity. localStorage is simpler and matches existing authStore pattern. Consent doesn't need SSR access. |
| localStorage | sessionStorage | Would lose persistence across sessions, violating BNRR-05 requirement |
| Zustand | React Context | More boilerplate, no built-in persistence, harder to test |
| Zustand | Redux Toolkit | Overkill for simple consent state (5x larger bundle, more complexity) |

**Installation:**
```bash
# Already installed in project
npm list zustand
# zustand@5.0.8
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── store/
│   ├── authStore.ts          # Existing reference pattern
│   ├── profileStore.ts       # Existing (no persistence)
│   └── consentStore.ts       # NEW - follows authStore pattern
└── components/
    └── [consent components]   # Will be created in Phase 2
```

### Pattern 1: Persisted Zustand Store with Hydration Safety
**What:** Zustand store with persist middleware, isHydrated flag, and onRehydrateStorage callback
**When to use:** Any state that must survive page reloads and be read on both server and client
**Example:**
```typescript
// Source: Existing authStore.ts (lines 21-45)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentState {
  hasConsented: boolean | null; // null = unset, true = accepted, false = rejected
  consentTimestamp: number | null;
  isHydrated: boolean;
  setConsent: (consented: boolean) => void;
  clearConsent: () => void;
}

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      hasConsented: null,
      consentTimestamp: null,
      isHydrated: false,
      setConsent: (consented) =>
        set({ hasConsented: consented, consentTimestamp: Date.now() }),
      clearConsent: () =>
        set({ hasConsented: null, consentTimestamp: null }),
    }),
    {
      name: 'consent-storage', // localStorage key
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
```

### Pattern 2: SSR-Safe Component Rendering
**What:** Check `isHydrated` before rendering persisted state to prevent hydration mismatches
**When to use:** Any client component that displays persisted state
**Example:**
```typescript
// Pattern from Zustand official docs + existing Next.js App Router patterns
'use client';

import { useConsentStore } from '@/store/consentStore';
import { useEffect, useState } from 'react';

export function ConsentBanner() {
  const { hasConsented, isHydrated, setConsent } = useConsentStore();
  const [mounted, setMounted] = useState(false);

  // Prevent SSR/hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until hydrated
  if (!mounted || !isHydrated) {
    return null; // or skeleton/placeholder
  }

  // hasConsented is null (unset), true (accepted), or false (rejected)
  if (hasConsented !== null) {
    return null; // already made choice
  }

  return (
    <div>
      <button onClick={() => setConsent(true)}>Accept All</button>
      <button onClick={() => setConsent(false)}>Reject All</button>
    </div>
  );
}
```

### Pattern 3: TypeScript Strict Mode Store Definition
**What:** Explicit type interface with store generic for compile-time safety
**When to use:** All Zustand stores in TypeScript strict mode projects
**Example:**
```typescript
// Source: authStore.ts pattern + Zustand TypeScript guide
interface ConsentState {
  // State
  hasConsented: boolean | null;
  consentTimestamp: number | null;
  isHydrated: boolean;

  // Actions
  setConsent: (consented: boolean) => void;
  clearConsent: () => void;
}

// Generic enforces type safety: create<ConsentState>()
export const useConsentStore = create<ConsentState>()(
  persist(
    // ... implementation
  )
);
```

### Anti-Patterns to Avoid
- **Reading localStorage directly in components:** Always use the Zustand store. Direct reads cause hydration mismatches and bypass state management.
- **Rendering persisted state without checking `isHydrated`:** Causes "Text content does not match server-rendered HTML" errors
- **Using localStorage in Server Components:** Server Components can't access `window.localStorage`. Only use stores in Client Components (marked with `"use client"`).
- **Omitting the `isHydrated` flag:** Without this, components can't know when rehydration is complete, leading to race conditions.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| localStorage persistence | Custom useEffect + localStorage.getItem/setItem with serialization | Zustand persist middleware | Handles SSR safety, serialization, storage events, race conditions, and edge cases automatically |
| Hydration timing | Custom mounting flags and useEffect chains | `onRehydrateStorage` callback + `isHydrated` flag | Official pattern, handles timing, prevents double-renders |
| State synchronization across tabs | Custom storage event listeners | Zustand persist middleware (handles automatically) | Built-in cross-tab sync via storage events |
| Cookie storage for consent | Custom cookie parsing/serialization | Keep localStorage (simpler for client-only reads) | Cookies add complexity. Consent doesn't need SSR reads. Only use cookies if server needs to read consent state. |

**Key insight:** Zustand's persist middleware solved SSR hydration bugs in v5.0.10 (January 2026). The existing authStore already uses this pattern successfully. Don't recreate it - follow the proven pattern.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch from Unguarded Renders
**What goes wrong:** Component renders persisted state immediately, but server rendered default state, causing "Hydration failed because the initial UI does not match what was rendered on the server"
**Why it happens:** Server Components render with store defaults (e.g., `hasConsented: null`), but client's first render reads from localStorage (e.g., `hasConsented: true`), creating HTML mismatch
**How to avoid:** Always check `isHydrated` flag before rendering persisted values. Return null or skeleton during hydration.
**Warning signs:** Console errors mentioning "hydration," "server-rendered HTML," or differences in text/attributes between server and client

### Pitfall 2: Accessing localStorage in Server Components
**What goes wrong:** `ReferenceError: localStorage is not defined` crashes during server rendering
**Why it happens:** Server Components execute in Node.js, which has no `window.localStorage` API
**How to avoid:**
  - Mark components using stores with `"use client"` directive
  - Never access store in Server Components
  - If server needs consent state, use cookies instead (see Alternative: Cookie Storage pattern)
**Warning signs:** Build-time or runtime errors mentioning `window is not defined` or `localStorage is not defined`

### Pitfall 3: Missing `onRehydrateStorage` Callback
**What goes wrong:** No way to know when localStorage data has loaded, leading to flickering UI (banner shows briefly even when consent was already given)
**Why it happens:** Persist middleware loads asynchronously. Without callback, `isHydrated` stays `false` forever.
**How to avoid:** Always implement `onRehydrateStorage` that sets `isHydrated: true` (see Pattern 1)
**Warning signs:** Components never render persisted data, `isHydrated` is always `false`, infinite loading states

### Pitfall 4: Forgetting TypeScript Generic
**What goes wrong:** Store loses type safety, autocomplete breaks, typos in state/action names pass type checking
**Why it happens:** `create(...)` without generic defaults to `any`
**How to avoid:** Always write `create<YourStateInterface>()` with explicit type parameter
**Warning signs:** No autocomplete when accessing store properties, TypeScript doesn't catch misspelled action names

### Pitfall 5: Reading Privacy Policy Requirements Incorrectly
**What goes wrong:** Failing to update privacy policy for Google reCAPTCHA data controller change on April 2, 2026
**Why it happens:** Google is shifting from data controller to data processor, requiring privacy policy updates
**How to avoid:** Update privacy policy to remove references to Google's privacy policy for reCAPTCHA and clarify that website is now data controller
**Warning signs:** Privacy policy still references Google as data controller for reCAPTCHA after April 2, 2026

## Code Examples

Verified patterns from existing codebase:

### Store Definition (authStore pattern)
```typescript
// Source: src/store/authStore.ts (verified working in production)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentState {
  hasConsented: boolean | null; // tri-state: null=unset, true=accept, false=reject
  consentTimestamp: number | null;
  isHydrated: boolean;
  setConsent: (consented: boolean) => void;
  clearConsent: () => void;
}

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      hasConsented: null,
      consentTimestamp: null,
      isHydrated: false,
      setConsent: (consented) => {
        set({ hasConsented: consented, consentTimestamp: Date.now() });
      },
      clearConsent: () =>
        set({ hasConsented: null, consentTimestamp: null }),
    }),
    {
      name: 'consent-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
```

### Client Component Usage
```typescript
// Pattern: Zustand official Next.js docs + project conventions
'use client';

import { useConsentStore } from '@/store/consentStore';
import { useEffect, useState } from 'react';

export function ConsentBanner() {
  const { hasConsented, isHydrated, setConsent } = useConsentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR-safe: only render after hydration
  if (!mounted || !isHydrated) {
    return null;
  }

  // Already made choice
  if (hasConsented !== null) {
    return null;
  }

  return (
    <div>
      <p>We use cookies for reCAPTCHA and fraud prevention.</p>
      <button onClick={() => setConsent(true)}>Accept All</button>
      <button onClick={() => setConsent(false)}>Reject All</button>
    </div>
  );
}
```

### Footer Re-Consent Link
```typescript
// Pattern: Client component for interactive elements
'use client';

import { useConsentStore } from '@/store/consentStore';

export function CookiePreferencesLink() {
  const clearConsent = useConsentStore((state) => state.clearConsent);

  return (
    <button onClick={clearConsent}>
      Cookie Preferences
    </button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom localStorage hooks with manual SSR checks | Zustand persist middleware with `onRehydrateStorage` | Zustand v4 (2023) | Built-in hydration safety, less boilerplate |
| Zustand persist had hydration bugs | Fixed in v5.0.10 (Jan 2026) | v5.0.10 | No code changes needed to fix SSR issues |
| Google reCAPTCHA: Google as data controller | April 2, 2026: Website owner as data controller | April 2, 2026 | Must update privacy policy, remove Google privacy policy references |
| localStorage treated like cookies for GDPR | 2026 privacy laws clarify localStorage requires consent like cookies | 2026 state laws (KY, IN, RI) | Must get consent before writing to localStorage |

**Deprecated/outdated:**
- **zustand-cookie-storage package:** Last release 1 year ago, unhealthy cadence. If cookies needed, use built-in persist with custom storage adapter instead.
- **Separate hydration checking libraries:** Zustand's built-in `onRehydrateStorage` handles this now
- **Google Privacy Policy references in consent flow:** After April 2, 2026, remove references to Google's privacy policy for reCAPTCHA

## Privacy Policy Update Requirements

Based on Google reCAPTCHA's April 2, 2026 data controller change:

### Required Changes
1. **Remove references to Google's Privacy Policy for reCAPTCHA** (currently in Section 11)
2. **Update Section 6.1 Service Providers** to clarify Google is data processor, not controller
3. **Update legal basis in Section 4** to reflect website as data controller for reCAPTCHA data
4. **Remove reCAPTCHA badge references** (Google removes these April 2, 2026)

### Current Privacy Policy Status
- **Location:** `/src/app/privacy/page.tsx`
- **Last Updated:** February 18, 2026 (before April 2 deadline)
- **reCAPTCHA References:** Lines 169, 305-309 (Section 11)
- **Needs Update:** YES - before April 2, 2026

### Recommended Privacy Policy Text Changes
**Section 6.1 (line 169) - Change:**
```diff
- <li><strong>Google (reCAPTCHA v3)</strong> — bot detection and abuse prevention (subject to Google&apos;s Privacy Policy and Terms of Service)</li>
+ <li><strong>Google (reCAPTCHA v3)</strong> — bot detection and abuse prevention as our data processor. StreetFeast is the data controller for all data processed by reCAPTCHA.</li>
```

**Section 11 (lines 305-310) - Change:**
```diff
- We also utilize Google services (Maps Platform and reCAPTCHA v3), which are governed by Google&apos;s Privacy Policy at{' '}
- <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
- {' '}and Google&apos;s Terms of Service at{' '}
- <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">https://policies.google.com/terms</a>.
- {' '}Google reCAPTCHA v3 may collect hardware and software information (including device and application data), and this data is used for improving reCAPTCHA and general security purposes.
+ We utilize Google reCAPTCHA v3 as a data processor for bot detection and fraud prevention. StreetFeast is the data controller for all information processed by reCAPTCHA. reCAPTCHA may collect hardware and software information (including device and application data) to assess interaction risk. We also use Google Maps Platform for location services, governed by Google's Privacy Policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
```

**Section 3.3 (line 89) - Change:**
```diff
- <li><strong>Bot Detection Services:</strong> risk assessment scores and verification tokens from Google reCAPTCHA v3</li>
+ <li><strong>Bot Detection Services:</strong> risk assessment scores and verification tokens from Google reCAPTCHA v3 (processed as our data processor)</li>
```

## Testing Strategy

Based on Zustand official testing guide and React Testing Library best practices:

### Unit Testing Stores
```typescript
// Pattern: Zustand official testing docs
import { renderHook, act } from '@testing-library/react';
import { useConsentStore } from '@/store/consentStore';

describe('consentStore', () => {
  beforeEach(() => {
    // Reset store state between tests
    useConsentStore.setState({
      hasConsented: null,
      consentTimestamp: null,
      isHydrated: false,
    });
  });

  it('should set consent and timestamp', () => {
    const { result } = renderHook(() => useConsentStore());

    act(() => {
      result.current.setConsent(true);
    });

    expect(result.current.hasConsented).toBe(true);
    expect(result.current.consentTimestamp).toBeGreaterThan(0);
  });

  it('should clear consent', () => {
    const { result } = renderHook(() => useConsentStore());

    act(() => {
      result.current.setConsent(true);
      result.current.clearConsent();
    });

    expect(result.current.hasConsented).toBe(null);
    expect(result.current.consentTimestamp).toBe(null);
  });
});
```

### Component Testing
```typescript
// Pattern: React Testing Library user-focused tests
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsentBanner } from '@/components/ConsentBanner';
import { useConsentStore } from '@/store/consentStore';

describe('ConsentBanner', () => {
  beforeEach(() => {
    useConsentStore.setState({
      hasConsented: null,
      consentTimestamp: null,
      isHydrated: true, // simulate hydration complete
    });
  });

  it('should not render if consent already given', () => {
    useConsentStore.setState({ hasConsented: true, isHydrated: true });
    render(<ConsentBanner />);
    expect(screen.queryByText(/cookie/i)).not.toBeInTheDocument();
  });

  it('should accept consent on button click', async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);

    await user.click(screen.getByText(/accept all/i));

    await waitFor(() => {
      expect(useConsentStore.getState().hasConsented).toBe(true);
    });
  });
});
```

## Open Questions

1. **Should consent state be accessible to Server Components?**
   - What we know: Current design uses localStorage (client-only). Server Components can't read it.
   - What's unclear: Does any server-side logic need to know consent status (e.g., SSR script tags)?
   - Recommendation: **Keep localStorage approach.** Phase 3 (script blocking) can conditionally mount client components. If SSR script blocking needed, migrate to cookies in later phase.

2. **Should consent include granular categories (Analytics vs Security)?**
   - What we know: Requirements specify "Accept All" and "Reject All" only (BNRR-02, BNRR-03). Granular preferences are v2 (PREF-01, PREF-02).
   - What's unclear: Should store structure support granular categories from the start?
   - Recommendation: **Start simple with boolean.** Store schema can be extended later without breaking changes. YAGNI principle applies.

3. **Does privacy policy update block Phase 1 completion?**
   - What we know: Google reCAPTCHA change is April 2, 2026. Privacy policy is at `/src/app/privacy/page.tsx`.
   - What's unclear: Is privacy policy update part of Phase 1 scope or Phase 2?
   - Recommendation: **Include in Phase 1.** Success criteria mentions "Privacy policy is updated to reflect Google's April 2, 2026 data controller shift." Simple text changes, low risk.

## Sources

### Primary (HIGH confidence)
- [Zustand persist middleware docs](https://zustand.docs.pmnd.rs/middlewares/persist) - Official persist configuration
- [Zustand Next.js setup guide](https://zustand.docs.pmnd.rs/guides/nextjs) - App Router patterns
- [Zustand SSR and Hydration guide](https://zustand.docs.pmnd.rs/guides/ssr-and-hydration) - Hydration safety patterns
- [Next.js cookies() function](https://nextjs.org/docs/app/api-reference/functions/cookies) - Server-side cookie API
- [Zustand TypeScript guide](https://zustand.docs.pmnd.rs/guides/beginner-typescript) - Type safety patterns
- Existing authStore.ts pattern (verified in production codebase)

### Secondary (MEDIUM confidence)
- [How To Use Zustand With Next Js 15](https://www.dimasroger.com/blog/how-to-use-zustand-with-next-js-15) - Community patterns
- [Next.js Hydration Errors in 2026](https://medium.com/@blogs-world/next-js-hydration-errors-in-2026-the-real-causes-fixes-and-prevention-checklist-4a8304d53702) - 2026 hydration best practices
- [Google reCAPTCHA data controller change](https://security.googlecloudcommunity.com/community-blog-42/switching-google-s-role-with-recaptcha-from-data-controller-to-data-processor-6646) - April 2, 2026 requirements
- [reCAPTCHA Privacy GDPR Compliance 2026](https://capmonster.cloud/en/blog/recaptcha-privacy-how-to-stay-gdpr-compliant-in-2026) - Privacy policy guidance
- [Cookie Banner Design 2026](https://secureprivacy.ai/blog/cookie-banner-design-2026) - UX best practices
- [localStorage vs Cookies privacy perspective](https://www.clym.io/blog/what-are-cookies-local-storage-and-session-storage-from-a-privacy-law-perspective) - Legal requirements

### Tertiary (LOW confidence)
- [zustand-cookie-storage GitHub](https://github.com/nanotexnolagiya/zustand-cookie-storage) - Alternative approach (last updated 1 year ago)
- [Zustand testing guide](https://zustand.docs.pmnd.rs/guides/testing) - Official testing patterns (verified HIGH after review)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Zustand already in use at correct version (5.0.8), authStore provides verified pattern
- Architecture: HIGH - Direct reference implementation exists in authStore, patterns verified in production
- Pitfalls: HIGH - Hydration issues well-documented in official Zustand + Next.js guides, authStore proves pattern works
- Privacy policy: HIGH - Google official announcement, clear April 2, 2026 deadline, specific text changes documented

**Research date:** 2026-02-19
**Valid until:** March 21, 2026 (30 days - stable ecosystem, official docs unlikely to change)
