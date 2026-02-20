# Phase 3: Script Blocking & Form Gating - Research

**Researched:** 2026-02-19
**Domain:** Conditional React provider mounting, Next.js client component rendering, third-party script gating
**Confidence:** HIGH

---

## Summary

Phase 3 enforces consent by: (1) conditionally mounting `GoogleReCaptchaProvider` only when `hasConsented === true`, so reCAPTCHA scripts never inject before consent; (2) ensuring FingerprintJS only runs at submission time when consent is true; and (3) replacing the contact form with a no-consent alternative when `hasConsented === false`.

The foundational state management (Phase 1) and banner UI (Phase 2) are both complete. `useConsentStore` exposes `hasConsented` (tri-state: `null | true | false`) and `isHydrated`. The core pattern is straightforward: move `GoogleReCaptchaProvider` out of the always-on `Providers.tsx` wrapper and gate it behind a consent-aware client component. FingerprintJS is a lazy import (called at submit time), so it only runs inside the consent-guarded `useContactForm` branch.

The only non-trivial challenge is the `useGoogleReCaptcha` hook's context default behavior: when called outside a mounted `GoogleReCaptchaProvider`, `executeRecaptcha` is a **throwing function** (not `undefined`). This means the existing `if (!executeRecaptcha)` null-check in `useContactForm` does NOT protect against an unmounted provider — calling `executeRecaptcha` would throw, not return falsy. The hook must only be called when the provider is guaranteed to be mounted (i.e., inside a component that renders only when `hasConsented === true`).

**Primary recommendation:** Move `GoogleReCaptchaProvider` into a new `ConsentGate` client component that conditionally mounts based on consent state. Replace `ContactForm` with a branching component that reads consent and renders either the full form (inside the provider subtree) or a no-consent alternative. Never call `useGoogleReCaptcha` in a component that can render without an ancestor `GoogleReCaptchaProvider`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-google-recaptcha-v3 | 1.11.0 (installed) | Provides `GoogleReCaptchaProvider` and `useGoogleReCaptcha` hook | Already installed; wraps reCAPTCHA v3 script injection |
| @fingerprintjs/fingerprintjs | 5.0.1 (installed) | Browser fingerprint for spam prevention | Already installed; lazy-loaded at form submit time |
| zustand | 5.0.8 (installed) | Read `hasConsented` + `isHydrated` from consent store | Already installed; consentStore built in Phase 1 |
| next | 15.5.7 (installed) | App Router client component model | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS Modules | Built-in | Style no-consent alternative UI | Project convention |
| React 19 | 19.1.0 (installed) | `useEffect`, `useState` for hydration guard | Required in client components |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Conditional provider mount | `scriptProps.async/defer` to delay script load | Deferred loading still injects the script tag; does not prevent script execution before consent. Conditional mount is the only way to guarantee no script injection. |
| Replace form with email link | Grey-out form behind modal | Prior decision locked: "Replace form entirely when cookies declined — Cleaner UX than grayed-out form behind modal" |
| Lazy-load FingerprintJS at submit | Pre-load on mount | Pre-loading would run FingerprintJS before submit and before conditional check. Lazy-load at submit time ensures it only runs when needed and after consent check. |

**Installation:**
```bash
# No new packages required. All dependencies already installed.
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── store/
│   └── consentStore.ts              # Phase 1: complete — exposes hasConsented, isHydrated
├── components/
│   ├── Providers/
│   │   └── Providers.tsx            # MODIFY — remove GoogleReCaptchaProvider; move to ConsentGate
│   └── ContactForm/
│       ├── ContactForm.tsx          # MODIFY — branch on hasConsented: full form vs. no-consent UI
│       └── ContactForm.module.css   # MODIFY — add styles for no-consent alternative
└── hooks/
    └── useContactForm.ts            # MODIFY — remove top-level useGoogleReCaptcha call; call only inside consent branch
```

### Pattern 1: Conditional Provider Mount via ConsentGate
**What:** A client component that reads `hasConsented` from `consentStore` and only renders `GoogleReCaptchaProvider` (and its children) when consent is `true`. When consent is `null` or `false`, the provider is NOT mounted — no reCAPTCHA scripts are injected.
**When to use:** Whenever a third-party script provider must be blocked until consent is given.
**Example:**
```typescript
// Source: Derived from consentStore pattern (Phase 1) + react-google-recaptcha-v3 usage pattern
'use client';

import { useConsentStore } from '@/store/consentStore';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ConsentGateProps {
  children: React.ReactNode;
  siteKey: string;
}

export default function ConsentGate({ children, siteKey }: ConsentGateProps) {
  const { hasConsented, isHydrated } = useConsentStore();

  // Wait for hydration — during SSR hasConsented is always null
  if (!isHydrated) {
    return <>{children}</>;
  }

  if (hasConsented === true) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        {children}
      </GoogleReCaptchaProvider>
    );
  }

  // hasConsented === null (undecided) or false (rejected): no provider, no scripts
  return <>{children}</>;
}
```
**Note:** The `if (!isHydrated)` passthrough is important — during SSR and before localStorage rehydration, the component must still render children to avoid content flash. Scripts don't inject during SSR.

### Pattern 2: ContactForm Consent Branching
**What:** `ContactForm` reads `hasConsented` from `consentStore` and renders one of two variants: (a) the full spam-protected form when `hasConsented === true`, or (b) a no-consent alternative UI when `hasConsented === false`. When `hasConsented === null`, render the full form skeleton or a loading state.
**When to use:** SCRP-03 requirement — form is replaced, not hidden or disabled.
**Example:**
```typescript
// Source: Codebase pattern + consentStore
'use client';

import { useConsentStore } from '@/store/consentStore';
import { useContactForm } from '@/hooks/useContactForm';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const { hasConsented, isHydrated } = useConsentStore();
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  // Before hydration: show full form (scripts not loaded yet anyway, SSR-safe)
  if (!isHydrated) {
    return <FullContactForm ... />;
  }

  // Cookies declined: show email alternative
  if (hasConsented === false) {
    return <NoConsentAlternative />;
  }

  // Cookies accepted (true) or undecided (null): show full form
  // When null: reCAPTCHA provider not mounted yet, form renders but submit is
  // gated by executeRecaptcha check in useContactForm
  return <FullContactForm ... />;
}
```

### Pattern 3: useContactForm Hook — Safe executeRecaptcha Usage
**What:** The `useContactForm` hook currently calls `useGoogleReCaptcha()` at the top level. This is safe only when the hook is always called inside a `GoogleReCaptchaProvider` subtree. After Phase 3, the ContactForm only renders the form (and thus calls this hook) when the provider IS mounted (consent === true) or when consent is null/undecided. The context default behavior is critical to understand.

**Critical finding from source code analysis:**
The context default for `executeRecaptcha` is a **throwing function**:
```javascript
// From react-google-recaptcha-v3 source (dist/react-google-recaptcha-v3.cjs.js, line 1):
var f = t.createContext({
  executeRecaptcha: function() {
    throw Error("GoogleReCaptcha Context has not yet been implemented, ...")
  }
});
```
When the provider IS mounted but the script hasn't loaded yet, the provider sets `executeRecaptcha: g ? x : undefined` — so it CAN be `undefined`. The existing `if (!executeRecaptcha)` check handles this case correctly.

When the provider is NOT mounted at all, `executeRecaptcha` is the throwing function (truthy), so the existing null-check does NOT protect against calling it outside the provider.

**Safest approach:** Ensure `useContactForm` (which calls `useGoogleReCaptcha`) is only called inside components that render within the `GoogleReCaptchaProvider` subtree. This is achieved by having `ContactForm` only render the full-form component (which uses the hook) when `hasConsented === true`.

**Example:**
```typescript
// src/hooks/useContactForm.ts — updated to handle null consent path
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Provider guarantees executeRecaptcha is defined or undefined (not throwing)
    // when this hook is called inside a mounted provider
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // FingerprintJS: lazy-load at submit time — only runs after consent check
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();

    const token = await executeRecaptcha('contactus');
    // ... rest of submission
  };
};
```

### Pattern 4: Providers.tsx Modification
**What:** Remove `GoogleReCaptchaProvider` from `Providers.tsx`. It currently wraps ALL children unconditionally. After Phase 3, the provider only mounts via `ConsentGate`.
**Before:**
```typescript
// Current Providers.tsx — loads reCAPTCHA for ALL users unconditionally
export default function Providers({ children }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      {children}
      <ToastContainer ... />
    </GoogleReCaptchaProvider>
  );
}
```
**After:**
```typescript
// Updated Providers.tsx — removes GoogleReCaptchaProvider
export default function Providers({ children }) {
  return (
    <>
      {children}
      <ToastContainer ... />
    </>
  );
}
```
The `siteKey` null-check / throw currently in `Providers.tsx` must move to wherever `ConsentGate` reads the key, or be left as-is with an environment variable guard.

### Pattern 5: No-Consent Alternative UI (SCRP-03)
**What:** When cookies are declined, the contact form is replaced with an alternative that links to email. Per prior decisions: "Replace form entirely" and "ToS link in modal (no checkbox)".
**Requirements:** Must not be a cookie wall (cannot force acceptance to proceed). Must offer a real alternative. Must mention ToS.
**Example:**
```typescript
function NoConsentAlternative() {
  const { clearConsent } = useConsentStore();

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          Our contact form requires cookies for spam prevention.
        </p>
        <div className={styles.noConsentContent}>
          <p>
            You can reach us directly at{' '}
            <a href="mailto:hello@streetfeastapp.com">hello@streetfeastapp.com</a>
          </p>
          <p>
            Or{' '}
            <button onClick={clearConsent} className={styles.consentLink}>
              update your cookie preferences
            </button>{' '}
            to enable the contact form. By accepting, you agree to our{' '}
            <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
```

### Anti-Patterns to Avoid
- **Keeping GoogleReCaptchaProvider in Providers.tsx:** Scripts inject unconditionally for all users, violating SCRP-01 even before consent is known.
- **Using `scriptProps.async` or `defer` to "delay" reCAPTCHA:** These just affect load timing — the script still injects into the DOM. Only NOT mounting the provider prevents script injection.
- **Calling `useGoogleReCaptcha()` outside a mounted provider:** The context default is a throwing function. If `executeRecaptcha` is called when no provider is mounted, it throws. The null-check `if (!executeRecaptcha)` does NOT catch this — the default is a truthy function that throws when called.
- **Rendering the full form when consent is null with no provider mounted:** `useGoogleReCaptcha` can be called safely when provider is not mounted (returns the throwing default), but calling `executeRecaptcha()` will throw. Ensure the `if (!executeRecaptcha)` guard is in place AND that the form is structured so the hook can't fire outside the provider tree.
- **Blocking UI entirely when consent is null:** The unset state (`null`) means the user hasn't decided yet. The form should render (but reCAPTCHA isn't loaded). The banner will appear. Don't show the "no-consent" UI until `hasConsented === false`.
- **Making ContactForm a server component:** It reads Zustand state — must be a client component.
- **Cookie-walling the form:** SCRP-03 says "replaced with a prompt requiring cookie acceptance." This must offer a real alternative (email), not just force acceptance.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Script injection prevention | Custom script tag management | Conditional `GoogleReCaptchaProvider` mount | Provider handles all script lifecycle; unmounting it removes the injected script (confirmed in source: `s()` cleanup runs on unmount) |
| Consent-aware provider | Global context + complex prop drilling | Read `useConsentStore` directly in gate component | Zustand is a module singleton — no prop drilling needed |
| Form state when no consent | Duplicate form logic | Branch at render level, keep single `useContactForm` hook | Reuse existing hook; hook is only called in the consent=true branch |

**Key insight:** React's conditional rendering is the script blocker. When `GoogleReCaptchaProvider` is not mounted, it does not inject `<script src="recaptcha/api.js">`. The provider's `useEffect` that calls `loadScript()` simply never runs. This is confirmed by inspecting the provider source.

---

## Common Pitfalls

### Pitfall 1: executeRecaptcha Default is a Throwing Function, Not undefined
**What goes wrong:** `useGoogleReCaptcha()` is called in a component that can render without a mounted `GoogleReCaptchaProvider`. The dev sees `executeRecaptcha` is defined (it's the default throwing function), bypasses the null check, calls it, and gets an uncaught error.
**Why it happens:** The context default is `{ executeRecaptcha: () => { throw Error(...) } }` — a truthy value. The README says "can be undefined" but this only applies WITHIN a mounted provider (before the script loads). Outside any provider, it's the throwing default.
**How to avoid:** Structure the component tree so `useGoogleReCaptcha()` is ONLY called inside components guaranteed to be within a `GoogleReCaptchaProvider` subtree. Specifically: the full-form component (which calls `useContactForm`) should only render when `hasConsented === true`.
**Warning signs:** Error message "GoogleReCaptcha Context has not yet been implemented" in the console.

### Pitfall 2: Hydration Flash on Contact Page
**What goes wrong:** On the contact page, the component initially renders with `isHydrated = false`, then flips to either the full form or no-consent UI after hydration. This causes a brief flash/layout shift.
**Why it happens:** Zustand persist middleware reads from localStorage asynchronously. Before rehydration, `hasConsented` is `null` and `isHydrated` is `false`.
**How to avoid:** Show the full form (not the no-consent alternative) during the unhydrated state. The full form is the "optimistic" render — scripts aren't loaded yet anyway (provider isn't mounted), so it's harmless. Only switch to no-consent UI after `isHydrated === true && hasConsented === false`.
**Warning signs:** Brief layout shift on contact page where no-consent UI flashes then switches to full form for users who accepted.

### Pitfall 3: useContactForm Called Outside Provider Tree
**What goes wrong:** If `ContactForm` calls `useContactForm` unconditionally (before the consent branch), the hook internally calls `useGoogleReCaptcha()`, which returns the throwing default when no provider is mounted.
**Why it happens:** Hooks can't be called conditionally (Rules of Hooks). If `useContactForm` is at the top of `ContactForm`, it always runs.
**How to avoid:** Split into two components: a `ContactFormFull` (which calls `useContactForm`) that only renders when provider IS mounted, and a `NoConsentAlternative` that doesn't use the hook. `ContactForm` branches between them.
**Warning signs:** "Rendered more hooks than during the previous render" or the throwing-context error during form navigation.

### Pitfall 4: siteKey Environment Variable Guard
**What goes wrong:** Currently `Providers.tsx` throws if `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is missing. When removed from `Providers.tsx`, this guard moves elsewhere (e.g., `ConsentGate`). If the guard is removed entirely, the provider receives `undefined` as `reCaptchaKey`, causing silent failures.
**Why it happens:** The siteKey check was coupled to the provider location.
**How to avoid:** Keep the environment variable guard wherever the provider is now conditionally mounted. The guard should only fire when the provider is being mounted (consent = true), not unconditionally.

### Pitfall 5: FingerprintJS Runs Before Consent Check
**What goes wrong:** `FingerprintJS.load()` is called at the top of `useContactForm` (e.g., in a `useEffect` on mount), causing it to run even before the user submits — and before the consent path is confirmed.
**Why it happens:** Eager loading for performance.
**How to avoid:** Keep FingerprintJS lazy-loaded inside `handleSubmit` (current implementation already does this). Never move it to a mount-time `useEffect` or top-level call.

### Pitfall 6: Contact Form Without reCAPTCHA — Backend API Behavior
**What goes wrong:** When `hasConsented === null` (undecided) and user somehow submits the form, `executeRecaptcha` is `undefined` (provider is mounted but script not ready) or the throwing default (provider not mounted). The current hook sets `status('error')` and aborts — but the backend behavior for null/missing `recaptchaToken` is unknown.
**Why it happens:** The blocker from STATE.md: "Confirm backend API accepts submissions when recaptchaToken is null/missing for reject-consent path."
**How to avoid:** After Phase 3, the no-consent path shows the email alternative — users on the rejected path don't interact with the form at all. The null/undecided path renders the form but the provider isn't mounted, so `executeRecaptcha` will be undefined (if provider is mounted but not ready) or the throwing function (if no provider). The existing `if (!executeRecaptcha)` guard aborts with error — this is acceptable behavior for the brief window before the user makes a consent choice.
**Recommendation:** Do NOT pass `recaptchaToken: null` to the backend. The current abort-with-error behavior is correct for the undecided state. Document that the form is effectively non-functional until consent is given or rejected.

---

## Code Examples

Verified patterns from official sources and codebase inspection:

### GoogleReCaptchaProvider Script Injection (How It Works)
```javascript
// From react-google-recaptcha-v3/dist/react-google-recaptcha-v3.cjs.js
// The provider's useEffect injects the script:
// u({ render: siteKey, onLoad: ..., ... })
// u = loadScript function that calls document.createElement('script')
// Cleanup function: s(scriptId, containerElement) — removes injected script on unmount

// Key implication: When GoogleReCaptchaProvider unmounts, the reCAPTCHA
// script is REMOVED from the DOM. Conditional mount = conditional script.
```

### ConsentGate Pattern (New Component)
```typescript
// src/components/Providers/Providers.tsx — AFTER modification
// OR src/components/ConsentGate/ConsentGate.tsx — NEW component
'use client';

import { useConsentStore } from '@/store/consentStore';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ConsentGate({ children }: { children: React.ReactNode }) {
  const { hasConsented, isHydrated } = useConsentStore();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  // Before hydration: render children without provider (SSR safe, no scripts injected)
  if (!isHydrated) return <>{children}</>;

  // Accepted: mount provider — scripts will load
  if (hasConsented === true) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        {children}
      </GoogleReCaptchaProvider>
    );
  }

  // Null (undecided) or false (rejected): no provider, no scripts
  return <>{children}</>;
}
```

### ContactForm Branching Pattern
```typescript
// src/components/ContactForm/ContactForm.tsx — AFTER modification
'use client';

import { useConsentStore } from '@/store/consentStore';
import ContactFormFull from './ContactFormFull';     // uses useContactForm + useGoogleReCaptcha
import NoConsentAlternative from './NoConsentAlternative'; // email link, no hook
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const { hasConsented, isHydrated } = useConsentStore();

  // Undecided or pre-hydration: show full form optimistically
  // Provider not mounted: reCAPTCHA scripts don't load, form can't submit,
  // but this is fine — CookieBanner is showing, user needs to decide first
  if (!isHydrated || hasConsented !== false) {
    return <ContactFormFull />;
  }

  // Explicitly rejected: show email alternative
  return <NoConsentAlternative />;
}
```

### ContactFormFull (Extracted — Uses Hook Safely)
```typescript
// src/components/ContactForm/ContactFormFull.tsx (new sub-component)
// OR: inline the full form JSX directly in ContactForm.tsx with the branch
'use client';

import { useContactForm } from '@/hooks/useContactForm';
import styles from './ContactForm.module.css';

export default function ContactFormFull() {
  const { formData, status, handleChange, handleSubmit } = useContactForm();
  // ... full form JSX (same as current ContactForm.tsx)
  // This component only renders when hasConsented !== false
  // When hasConsented === null: provider not mounted, but hook is called,
  // executeRecaptcha is the throwing default — form submit will error (acceptable)
  // When hasConsented === true: provider IS mounted, executeRecaptcha works
}
```

### NoConsentAlternative
```typescript
// Inline in ContactForm.tsx or extracted
function NoConsentAlternative() {
  const { clearConsent } = useConsentStore();

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          Our contact form uses cookies for spam prevention.
        </p>
        <div className={styles.alternative}>
          <p>
            Email us directly:{' '}
            <a href="mailto:hello@streetfeastapp.com" className={styles.emailLink}>
              hello@streetfeastapp.com
            </a>
          </p>
          <p className={styles.consentPrompt}>
            Or{' '}
            <button onClick={clearConsent} className={styles.consentButton}>
              accept cookies
            </button>{' '}
            to use the contact form. By accepting, you agree to our{' '}
            <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Always-load third-party scripts in root layout | Conditional provider mount based on consent | GDPR enforcement 2023-2025 | Scripts never inject before consent |
| Disabled/grayed form as cookie wall | Replace with functional alternative (email link) | ICO/CNIL enforcement 2024-2025 | Cookie walls are non-compliant; real alternatives required |
| reCAPTCHA script defer/async to "delay" load | Conditional mount (don't mount = don't load) | Best practice clarification 2024 | Defer only delays; conditional mount prevents entirely |

**Deprecated/outdated:**
- **Keeping provider always mounted and checking `window.grecaptcha`:** Bypasses the library's provider model; scripts still load before consent.
- **`useGoogleReCaptcha` safety check relying on undefined:** The context default is a throwing function, not undefined. Don't rely on falsy checks alone.

---

## Open Questions

1. **Backend API behavior for null/missing recaptchaToken**
   - What we know: Blocker from STATE.md: "Confirm backend API accepts submissions when recaptchaToken is null/missing."
   - What's unclear: Does `POST /api/v1/Business/ContactUs` return 400 or 200 when `recaptchaToken` is absent?
   - Recommendation: This is NOT a blocker for Phase 3 implementation. After Phase 3, users who rejected cookies see the email alternative — they never submit the form. Users who haven't decided see the form but can't successfully submit until they accept (provider not mounted → reCAPTCHA not available → submit errors). Document this behavior. The backend question is only relevant if we ever want to support form submission without reCAPTCHA (not in scope per REQUIREMENTS.md "Out of Scope: Backend API changes for form without reCAPTCHA").

2. **ContactForm null-consent (undecided) submit UX**
   - What we know: When `hasConsented === null`, the full form renders but reCAPTCHA is unavailable. Submitting shows an error. The CookieBanner should be visible (unless dismissed without choosing).
   - What's unclear: Should the form submit button be disabled with a tooltip when consent is undecided? Or just fail gracefully?
   - Recommendation: Leave the current error behavior as-is for the null state. The CookieBanner handles the UX. Adding a disabled button adds complexity not required by any acceptance criterion.

3. **ToS link in no-consent alternative**
   - What we know: Prior decision: "ToS link in modal (no checkbox) — Simpler UX, clicking 'Accept' implies agreement." In context, this means the no-consent alternative UI should link to ToS without requiring a checkbox.
   - What's unclear: Should the ToS link be in the clearConsent button label or as a separate link?
   - Recommendation: Keep them separate — a `clearConsent` button labeled "accept cookies" and a separate `<Link href="/terms">Terms of Service</Link>` link nearby. This satisfies the prior decision without adding a checkbox.

4. **Where to place ConsentGate in the component tree**
   - What we know: `GoogleReCaptchaProvider` must wrap any component that calls `useGoogleReCaptcha`. Currently `ContactForm` is rendered inside `Providers` in the root layout. After Phase 3, the provider is no longer in `Providers.tsx`.
   - Recommendation: Two valid options: (a) Add `ConsentGate` as a thin wrapper inside the existing `Providers` component, or (b) Place it only at the contact page level (wrapping `ContactForm`). Option (a) is simpler (one location). Option (b) is more surgical (only loads scripts on the contact page). Since reCAPTCHA is only used by the contact form, Option (b) is preferred — it scopes the provider tightly and avoids mounting it on every page.

---

## Implementation Scope Summary

Three files modified, one optional new component:

| File | Change Type | What Changes |
|------|-------------|-------------|
| `src/components/Providers/Providers.tsx` | MODIFY | Remove `GoogleReCaptchaProvider` and its `siteKey` guard |
| `src/app/contact/page.tsx` | MODIFY | Wrap `ContactForm` with `ConsentGate` (or add consent branching at this level) |
| `src/components/ContactForm/ContactForm.tsx` | MODIFY | Add consent state branch: full form vs. no-consent alternative |
| `src/components/ContactForm/ContactForm.module.css` | MODIFY | Add styles for no-consent alternative UI |
| `src/hooks/useContactForm.ts` | NO CHANGE needed | Existing null-check `if (!executeRecaptcha)` handles the case correctly when called inside a mounted provider |

Optional structural choice: Whether to extract `ContactFormFull` and `NoConsentAlternative` as separate sub-components or keep everything in `ContactForm.tsx`. For a file this size (~85 lines), inline branching in `ContactForm.tsx` is acceptable.

---

## Sources

### Primary (HIGH confidence)
- Existing `src/store/consentStore.ts` — `hasConsented` tri-state, `isHydrated` flag (project-verified, Phase 1)
- Existing `src/components/Providers/Providers.tsx` — current unconditional `GoogleReCaptchaProvider` usage (project-verified)
- Existing `src/components/ContactForm/ContactForm.tsx` + `src/hooks/useContactForm.ts` — current form + hook structure (project-verified)
- `node_modules/react-google-recaptcha-v3/dist/react-google-recaptcha-v3.cjs.js` — source inspection of context default value (throwing function, not undefined), provider cleanup behavior (script removal on unmount), `executeRecaptcha: g ? x : undefined` pattern when within provider (inspected directly, HIGH confidence)
- `node_modules/react-google-recaptcha-v3/README.md` — "The `executeRecaptcha` function returned from the hook can be undefined when the recaptcha script has not been successfully loaded" (confirms within-provider behavior)
- `node_modules/@fingerprintjs/fingerprintjs/dist/fp.d.ts` — FingerprintJS v5.0.1 API (load/get pattern confirmed, lazy load at call time is safe)
- `.planning/STATE.md` — Blocker: backend API accepts null recaptchaToken (documented, confirmed out of scope per REQUIREMENTS.md)
- `.planning/REQUIREMENTS.md` — SCRP-01, SCRP-02, SCRP-03 requirements; "Out of Scope: Backend API changes for form without reCAPTCHA"

### Secondary (MEDIUM confidence)
- Prior phase research (01-RESEARCH.md, 02-RESEARCH.md) — confirmed consentStore API, hydration patterns
- Phase 2 Verification Report (02-01-VERIFICATION.md) — confirmed CookieBanner and store are working as designed

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed at known versions; inspected source code directly
- Architecture: HIGH — patterns derived from existing project code + library source inspection; no external assumptions
- Pitfalls: HIGH — executeRecaptcha throwing-default confirmed by reading library source; hydration patterns confirmed by Phases 1-2

**Research date:** 2026-02-19
**Valid until:** 2026-03-20 (30 days — react-google-recaptcha-v3 v1.11.0 is stable; consentStore is locked; no new dependencies)
