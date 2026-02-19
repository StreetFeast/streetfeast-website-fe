# Architecture Research: Cookie Consent Integration

**Domain:** Cookie Consent for Next.js 15 App Router
**Researched:** 2026-02-19
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Root Layout (SSR)                            │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Providers (Client)                         │   │
│  │  ┌────────────────┐  ┌────────────────┐                      │   │
│  │  │ CookieConsent  │  │   Conditional  │                      │   │
│  │  │   Context      │  │   reCAPTCHA    │                      │   │
│  │  │   Provider     │  │   Provider     │                      │   │
│  │  └───────┬────────┘  └────────┬───────┘                      │   │
│  │          │                    │                               │   │
│  │          ├────────────────────┴────────────────┐              │   │
│  │          │                                     │              │   │
│  └──────────┼─────────────────────────────────────┼──────────────┘   │
│             │                                     │                  │
│  ┌──────────▼────────┐                 ┌─────────▼──────────┐       │
│  │  CookieBanner     │                 │  LayoutContent     │       │
│  │  (mounted if no   │                 │                    │       │
│  │   consent stored) │                 │    {children}      │       │
│  └───────────────────┘                 └─────────┬──────────┘       │
│                                                   │                  │
└───────────────────────────────────────────────────┼──────────────────┘
                                                    │
                ┌───────────────────────────────────┴─────────────┐
                │                                                 │
        ┌───────▼────────┐                            ┌──────────▼────────┐
        │  ContactForm   │                            │  Other Pages      │
        │                │                            │                   │
        │  Uses consent  │                            │  Access consent   │
        │  from context  │                            │  via context      │
        │                │                            │                   │
        │  Conditional:  │                            └───────────────────┘
        │  - reCAPTCHA   │
        │  - Fingerprint │
        │  - Or fallback │
        └────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **CookieConsentProvider** | Manages global consent state, hydration, and persistence | React Context + Zustand store with localStorage persistence |
| **CookieBanner** | Displays consent UI, captures user choice | Modal/banner component that mounts when no consent decision exists |
| **ConditionalProviders** | Wraps app with third-party providers only if consent given | Conditional rendering of GoogleReCaptchaProvider based on consent state |
| **ContactForm** | Renders different UIs based on consent state | Shows form with tracking OR alternative UI with email link |
| **useCookieConsent** | Hook for accessing consent state anywhere | Custom hook consuming CookieConsentContext |

## Recommended Project Structure

Based on existing codebase conventions and Next.js 15 App Router patterns:

```
src/
├── app/
│   ├── layout.tsx              # Root layout - renders Providers
│   └── ...
├── components/
│   ├── Providers/
│   │   ├── Providers.tsx       # MODIFIED: Conditional reCAPTCHA based on consent
│   │   └── index.ts
│   ├── CookieBanner/           # NEW: Banner component
│   │   ├── CookieBanner.tsx
│   │   ├── CookieBanner.module.css
│   │   └── index.ts
│   ├── ContactForm/
│   │   ├── ContactForm.tsx     # MODIFIED: Conditional rendering based on consent
│   │   ├── ContactForm.module.css
│   │   └── index.ts
│   └── ...
├── contexts/                   # NEW: Context folder for global state
│   ├── CookieConsentContext/
│   │   ├── CookieConsentContext.tsx
│   │   └── index.ts
├── hooks/
│   ├── useContactForm.ts       # MODIFIED: Conditional Fingerprint loading
│   ├── useCookieConsent.ts     # NEW: Hook for accessing consent
│   └── ...
├── store/
│   ├── cookieConsentStore.ts   # NEW: Zustand store for consent state
│   ├── authStore.ts
│   └── profileStore.ts
└── types/
    └── cookieConsent.ts        # NEW: TypeScript types for consent
```

### Structure Rationale

- **contexts/:** Following separation of concerns - contexts are different from stores (React-specific vs. state management)
- **CookieBanner in components/:** Follows existing component pattern (folder with .tsx + .module.css + index.ts)
- **Zustand store:** Matches existing auth pattern for persistence and hydration handling
- **contexts/ + store/ dual approach:** Context provides React integration, Zustand handles state/persistence

## Architectural Patterns

### Pattern 1: Consent State Management (Context + Zustand Hybrid)

**What:** Combines React Context for component tree access with Zustand for state management and persistence

**When to use:** When you need global state that must:
- Be accessible throughout component tree
- Persist across sessions (localStorage)
- Handle SSR/CSR hydration correctly
- Trigger re-renders on state changes

**Trade-offs:**
- PROS: Type-safe, handles hydration, follows existing patterns (authStore), minimal bundle size
- CONS: Slightly more complex than pure Context or pure Zustand alone

**Example:**
```typescript
// store/cookieConsentStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ConsentLevel = 'necessary' | 'all' | 'none' | null;

interface CookieConsentState {
  consent: ConsentLevel;
  isHydrated: boolean;
  setConsent: (level: ConsentLevel) => void;
  hasConsent: (requiredLevel: 'necessary' | 'all') => boolean;
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set, get) => ({
      consent: null, // null = no decision yet
      isHydrated: false,
      setConsent: (level) => set({ consent: level }),
      hasConsent: (requiredLevel) => {
        const { consent } = get();
        if (requiredLevel === 'necessary') return consent !== null;
        return consent === 'all';
      },
    }),
    {
      name: 'cookie-consent',
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    }
  )
);

// contexts/CookieConsentContext/CookieConsentContext.tsx
'use client';
import { createContext, useContext } from 'react';
import { useCookieConsentStore, ConsentLevel } from '@/store/cookieConsentStore';

interface CookieConsentContextValue {
  consent: ConsentLevel;
  isHydrated: boolean;
  setConsent: (level: ConsentLevel) => void;
  hasConsent: (requiredLevel: 'necessary' | 'all') => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const store = useCookieConsentStore();
  return (
    <CookieConsentContext.Provider value={store}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return context;
}
```

### Pattern 2: Conditional Provider Rendering

**What:** Wraps children with third-party provider (GoogleReCaptchaProvider) only when user has consented

**When to use:** When providers load third-party scripts that shouldn't run without consent

**Trade-offs:**
- PROS: Prevents script loading entirely (privacy compliant), clean separation
- CONS: Must handle "loading" state during hydration, requires fallback UI for non-consented users

**Example:**
```typescript
// components/Providers/Providers.tsx
'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import { CookieConsentProvider, useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookieBanner } from '@/components/CookieBanner';

function ConditionalReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const { hasConsent, isHydrated } = useCookieConsent();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Wait for hydration to prevent SSR/CSR mismatch
  if (!isHydrated) return <>{children}</>;

  // Only wrap with provider if consent given
  if (hasConsent('all') && siteKey) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        {children}
      </GoogleReCaptchaProvider>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <ConditionalReCaptchaProvider>
        {children}
        <ToastContainer {...toastConfig} />
        <CookieBanner />
      </ConditionalReCaptchaProvider>
    </CookieConsentProvider>
  );
}
```

### Pattern 3: Lazy Script Loading with Consent Gates

**What:** Dynamically load third-party scripts (FingerprintJS) only when needed AND consented

**When to use:** For scripts that:
- Don't need to be loaded upfront
- Should only load when user takes specific action
- Require user consent

**Trade-offs:**
- PROS: Best performance (load only when needed), privacy compliant
- CONS: Requires error handling, must provide alternative UX for non-consented users

**Example:**
```typescript
// hooks/useContactForm.ts
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { hasConsent } = useCookieConsent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Consent check before loading privacy-sensitive scripts
    if (!hasConsent('all')) {
      setStatus('error');
      return;
    }

    try {
      // Only load and execute if consent given
      const token = await executeRecaptcha?.('contactus');

      // Lazy load FingerprintJS only when needed
      const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default;
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();

      // Submit with headers...
      const response = await apiClient.post('/api/v1/Business/ContactUs', {
        ...formData,
        recaptchaToken: token
      }, {
        headers: { 'X-Device-Fingerprint': visitorId }
      });

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return { formData, status, handleChange, handleSubmit };
};
```

### Pattern 4: Fallback UI for Non-Consented Users

**What:** Render alternative UI when users decline consent instead of hiding functionality

**When to use:** When a feature requires tracking but you want to maintain some user experience

**Trade-offs:**
- PROS: Users still get value, no dark patterns, transparent
- CONS: More code to maintain, UX may be degraded

**Example:**
```typescript
// components/ContactForm/ContactForm.tsx
'use client';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useContactForm } from '@/hooks/useContactForm';

export default function ContactForm() {
  const { hasConsent, isHydrated } = useCookieConsent();
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  // Wait for hydration
  if (!isHydrated) return <div className={styles.loading}>Loading...</div>;

  // Fallback UI for users who declined consent
  if (!hasConsent('all')) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2>Contact Us</h2>
          <p>To prevent spam, our contact form requires cookies. You can:</p>
          <ul>
            <li>
              <a href="mailto:support@streetfeastapp.com">
                Email us directly at support@streetfeastapp.com
              </a>
            </li>
            <li>Accept cookies to use the form</li>
          </ul>
        </div>
      </section>
    );
  }

  // Regular form when consent given
  return (
    <section className={styles.contactSection}>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </section>
  );
}
```

## Data Flow

### Consent Decision Flow

```
User Visits Site (no consent stored)
    ↓
CookieBanner Renders
    ↓
User Clicks "Accept All" / "Decline"
    ↓
setConsent('all' | 'necessary') called
    ↓
Zustand Store Updates
    ↓
localStorage Persisted
    ↓
Context Notifies Subscribers
    ↓
Components Re-render:
    - ConditionalReCaptchaProvider wraps children with provider
    - ContactForm switches from fallback to full form
    - CookieBanner unmounts
```

### Hydration Flow (Return Visit with Stored Consent)

```
Server Renders HTML
    ↓
Client Hydrates
    ↓
Zustand Rehydrates from localStorage
    ↓
isHydrated: false → true
    ↓
Components Check consent State:
    - consent: 'all' → Render full features
    - consent: 'necessary' → Render fallback UI
    - consent: null → Show banner (edge case)
    ↓
Components Render Final State
```

### Script Loading Flow

```
[User Has Consent: 'all']
    ↓
ConditionalReCaptchaProvider Mounts
    ↓
GoogleReCaptchaProvider Loads Script
    ↓
reCAPTCHA Available Globally
    ↓
User Submits Form
    ↓
useContactForm Checks hasConsent('all') → true
    ↓
Dynamic Import FingerprintJS
    ↓
Execute Both Trackers
    ↓
Submit Form
```

### Key Data Flows

1. **Consent State Propagation:** Zustand store → Context Provider → All consuming components via useCookieConsent hook
2. **Banner Visibility:** Banner component subscribes to consent state, unmounts when consent !== null
3. **Conditional Provider Mounting:** Providers component subscribes to consent state, conditionally wraps children
4. **Form Behavior:** ContactForm subscribes to consent state, switches between fallback and full form

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **reCAPTCHA v3** | Conditional provider wrapper | Only load GoogleReCaptchaProvider when hasConsent('all') === true |
| **FingerprintJS** | Lazy dynamic import | Load via import() only when user submits form AND hasConsent('all') === true |
| **localStorage** | Zustand persist middleware | Stores consent decision, handles hydration automatically |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Providers ↔ Banner** | Shared context subscription | Both subscribe to same Zustand store via Context |
| **Providers ↔ ContactForm** | Context API | ContactForm uses useCookieConsent hook to access consent state |
| **ContactForm ↔ useContactForm** | Hook pattern | Hook handles consent checking before loading trackers |
| **Store ↔ Context** | Direct subscription | Context wraps store for React tree integration |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **0-10K users** | Current architecture sufficient - localStorage, client-side only |
| **10K-100K users** | Consider analytics on consent rates, A/B test banner copy/design |
| **100K+ users** | May need server-side consent state for personalization, consider CDN edge functions for geo-based consent requirements |

### Scaling Priorities

1. **First consideration:** User privacy regulations vary by location (GDPR EU, CCPA California) - may need geo-detection to show/hide banner
2. **Second consideration:** Consent analytics - track acceptance rates to optimize banner design (requires separate privacy-friendly analytics)

## Anti-Patterns

### Anti-Pattern 1: Loading Scripts Before Consent Check

**What people do:** Load reCAPTCHA/tracking scripts immediately on page load, only disable functionality based on consent

**Why it's wrong:**
- Privacy violation: Scripts execute and phone home before user consents
- GDPR non-compliance: Must obtain consent BEFORE processing data
- User trust: Defeats purpose of consent if tracking already happened

**Do this instead:** Use conditional provider pattern - never load provider/script until hasConsent() returns true

### Anti-Pattern 2: Checking localStorage During SSR

**What people do:**
```typescript
// WRONG - causes hydration errors
const consent = localStorage.getItem('consent');
return consent === 'all' ? <Form /> : <Fallback />;
```

**Why it's wrong:**
- localStorage only exists on client, returns null during SSR
- Causes hydration mismatch (server renders fallback, client renders form)
- React error: "Text content did not match"

**Do this instead:** Always wait for hydration with isHydrated flag:
```typescript
if (!isHydrated) return <LoadingState />;
return hasConsent('all') ? <Form /> : <Fallback />;
```

### Anti-Pattern 3: Blocking All Functionality Without Consent

**What people do:** Show "You must accept cookies to use this site" and completely block access

**Why it's wrong:**
- Dark pattern: Coerces users into accepting
- GDPR violation: Consent must be freely given
- Poor UX: Users may have legitimate privacy concerns

**Do this instead:** Provide fallback functionality (email link, reduced features) so users can still accomplish goals

### Anti-Pattern 4: Assuming Consent Persists Across Devices

**What people do:** Set consent in localStorage and never prompt again

**Why it's wrong:**
- localStorage is device/browser specific
- Users may have different privacy preferences on different devices
- Cleared localStorage means banner shows again anyway

**Do this instead:** Expected behavior - consent is per-device. Optionally track consent in user account for logged-in users.

### Anti-Pattern 5: Not Handling Consent Revocation

**What people do:** Allow users to accept cookies but provide no way to revoke consent later

**Why it's wrong:**
- GDPR requires ability to withdraw consent as easily as granting it
- Users may change their mind about privacy
- Legal requirement in many jurisdictions

**Do this instead:** Provide a "Cookie Settings" link in footer that reopens banner and allows changing consent level

## Build Order and Dependencies

### Phase 1: Foundation (No Dependencies)
1. **Types** (`types/cookieConsent.ts`) - Define ConsentLevel type
2. **Zustand Store** (`store/cookieConsentStore.ts`) - State management + persistence
3. **Context** (`contexts/CookieConsentContext/`) - React integration wrapper

**Rationale:** These three have no dependencies and are needed by everything else

### Phase 2: UI Components (Depends on Phase 1)
4. **CookieBanner** (`components/CookieBanner/`) - Consent UI (needs useCookieConsent hook)
5. **Modify Providers** - Add CookieConsentProvider wrapper + ConditionalReCaptchaProvider

**Rationale:** Banner and Providers both consume context from Phase 1

### Phase 3: Feature Integration (Depends on Phase 1-2)
6. **Modify useContactForm** - Add consent checks before loading FingerprintJS
7. **Modify ContactForm** - Add fallback UI based on consent state

**Rationale:** Form modifications depend on context being available throughout app

### Testing Strategy Per Phase

**Phase 1:** Unit test store logic (consent levels, persistence, hydration)
**Phase 2:** Integration test banner appearance/disappearance, provider conditional mounting
**Phase 3:** E2E test full flow: decline → see fallback, accept → see form → submit works

## Key Implementation Decisions

### Decision 1: Context + Zustand (Not Pure Context or Pure Zustand)

**Chosen:** Hybrid approach
**Reasoning:**
- Matches existing authStore pattern (consistency)
- Zustand handles persistence elegantly (onRehydrateStorage)
- Context provides React tree integration without prop drilling
- Type-safe throughout

**Alternative Considered:** Pure React Context with useState + useEffect
**Why Not:** Would need custom hydration logic, localStorage handling, more boilerplate

### Decision 2: Conditional Provider Mounting (Not Script Disabling)

**Chosen:** Don't mount GoogleReCaptchaProvider until consent given
**Reasoning:**
- Prevents script from loading at all (true privacy protection)
- Clean separation of concerns
- No risk of accidental tracking

**Alternative Considered:** Always mount provider, disable functionality
**Why Not:** Script still loads and may phone home even if not used

### Decision 3: Fallback UI (Not Blocking Access)

**Chosen:** Show email link when consent declined
**Reasoning:**
- GDPR compliant (consent freely given)
- Better UX (users can still contact)
- Transparent about why cookies needed

**Alternative Considered:** Block form entirely, force consent
**Why Not:** Dark pattern, potential GDPR violation

### Decision 4: Client-Side Only (Not Server-Side Consent)

**Chosen:** localStorage + client-side state management
**Reasoning:**
- Simpler implementation
- No backend changes needed
- Sufficient for MVP
- Matches Next.js static export capability if needed

**Alternative Considered:** Store consent in database per user
**Why Not:** Overkill for initial implementation, requires auth, only useful for cross-device sync

## Sources

**Next.js 15 Cookie Consent Patterns:**
- [Configuring Google Cookies Consent with Next.js 15](https://medium.com/@sdanvudi/configuring-google-cookies-consent-with-next-js-15-ca159a2bea13)
- [Next.js Cookie Consent Banner: Build GDPR-Compliant System](https://www.buildwithmatija.com/blog/build-cookie-consent-banner-nextjs-15-server-client)
- [Cookie banner with app-router Discussion](https://github.com/vercel/next.js/discussions/51015)

**Conditional Script Loading:**
- [Dynamically loading GTM on cookie consent](https://github.com/vercel/next.js/discussions/15416)
- [Lazyloading reCAPTCHA to improve service quality](https://www.capsens.eu/en/blog/lazyloading-recaptcha-to-enhance)
- [Integrating reCAPTCHA with Next.js](https://prateeksurana.me/blog/integrating-recaptcha-with-next/)

**React Context State Management:**
- [@use-cookie-consent/react](https://www.npmjs.com/package/@use-cookie-consent/react)
- [react-hook-consent](https://github.com/lukaskupczyk/react-hook-consent)

**FingerprintJS GDPR Compliance:**
- [Privacy and compliance - FingerprintJS](https://dev.fingerprint.com/docs/privacy-and-compliance)
- [Browser Fingerprint Tracking and GDPR Compliance](https://www.linkedin.com/pulse/browser-fingerprint-tracking-gdpr-compliance-jonathan-bowker)

---
*Architecture research for: Cookie Consent Integration with Next.js 15 App Router*
*Researched: 2026-02-19*
