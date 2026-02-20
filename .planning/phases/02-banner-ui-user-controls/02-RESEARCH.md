# Phase 2: Banner UI & User Controls - Research

**Researched:** 2026-02-19
**Domain:** React/Next.js 15 cookie consent banner UI, WCAG 2.2 AA accessibility, CSS fixed positioning, keyboard focus management
**Confidence:** HIGH

---

## Summary

Phase 2 builds a bottom-bar cookie consent banner that integrates with the Zustand `consentStore` from Phase 1. This is a pure UI/accessibility problem: the technical state layer already exists. The work is to (1) render the banner correctly in Next.js 15's App Router, (2) make it fully keyboard-navigable per WCAG 2.2 AA, (3) style it with colors from the existing design system, and (4) add a "Cookie Preferences" link in the Footer that triggers the banner to reappear.

The two non-obvious challenges are: (a) preventing SSR hydration mismatches for a client-only fixed-position element, solved by the same `isHydrated` guard pattern already present in `consentStore`; and (b) WCAG 2.4.11 "Focus Not Obscured" — a sticky bottom banner can completely hide page elements under keyboard focus, which is an AA violation. The official W3C technique (C43) for this is `scroll-padding-bottom` on `html`, set dynamically to the banner's computed height via `ResizeObserver`.

No external libraries are needed. The full implementation is a single `CookieBanner` component (~100 lines TSX + CSS Module) plus a small mutation to `Footer.tsx` and the root `layout.tsx`. The project already has all required tools: Zustand, CSS Modules, and a proven hydration-safe store pattern.

**Primary recommendation:** Build a single `CookieBanner` client component placed directly in the root `<body>` (via `layout.tsx`), gated behind `isHydrated` from `consentStore`. Apply `scroll-padding-bottom` to `html` dynamically while the banner is visible. Use both buttons with identical visual treatment to satisfy WCAG equal-prominence and ICO requirements.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zustand | 5.0.8 (installed) | Read/write consent state | Already in project; `consentStore` built in Phase 1 |
| next/navigation | 15.5.7 (installed) | — | Not needed for banner itself |
| CSS Modules | Built-in | Component-scoped styling | Project convention; no external UI library |
| React 19 | 19.1.0 (installed) | `useEffect`, `useRef`, `useState`, `useCallback` | Required for focus management and ResizeObserver wiring |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| ResizeObserver | Browser native | Measure banner height for `scroll-padding-bottom` | When banner is visible — needed for WCAG 2.4.11 |
| `useRef` | React built-in | Set initial focus to first button on mount | Required for keyboard accessibility compliance |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom banner component | `react-cookie-consent` npm package | Package adds 8KB+ bundle, less design control, overkill for this single use case; custom is simpler |
| `scroll-padding-bottom` for focus obscuring | Modal (forced interaction) | Modal blocks content which violates the "non-blocking UX" prior decision; `scroll-padding-bottom` is the lightweight fix |
| `useRef` for initial focus | `autoFocus` prop | `autoFocus` has browser inconsistencies and causes accessibility issues in some screen readers; `useRef` + `.focus()` in `useEffect` is the reliable pattern |
| Inline in `layout.tsx` | Separate `CookieBanner/` component folder | Project convention requires component folder structure: `ComponentName/ComponentName.tsx` + `*.module.css` + `index.ts` |

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
│   └── consentStore.ts              # Phase 1: complete
├── components/
│   └── CookieBanner/
│       ├── CookieBanner.tsx         # NEW - banner UI component
│       ├── CookieBanner.module.css  # NEW - fixed positioning + dark theme
│       └── index.ts                 # NEW - re-export
├── components/
│   └── Footer/
│       ├── Footer.tsx               # MODIFY - add "Cookie Preferences" button
│       └── Footer.module.css        # MODIFY - add .cookiePrefsButton style
└── app/
    └── layout.tsx                   # MODIFY - render <CookieBanner /> in <body>
```

### Pattern 1: SSR-Safe Client-Only Banner
**What:** The banner must never render during SSR (it reads localStorage state). Gate rendering behind `isHydrated` from `consentStore`. This is identical to the existing `authStore` pattern used in `Header.tsx`.
**When to use:** Any component that reads persisted Zustand state that should not appear server-side.
**Example:**
```typescript
// Source: Follows existing authStore pattern in src/store/authStore.ts
'use client';

import { useConsentStore } from '@/store/consentStore';

export default function CookieBanner() {
  const { hasConsented, isHydrated, setConsent } = useConsentStore();

  // isHydrated = false on server and before localStorage rehydration
  // hasConsented = null means user has not made a choice yet
  if (!isHydrated || hasConsented !== null) return null;

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
      {/* ... */}
    </div>
  );
}
```

### Pattern 2: WCAG 2.4.11 Focus Not Obscured — `scroll-padding-bottom`
**What:** A fixed bottom banner physically obscures page elements that receive keyboard focus. WCAG 2.2 AA criterion 2.4.11 (Focus Not Obscured, Minimum) requires at least partial visibility of focused elements. W3C technique C43 specifies `scroll-padding-bottom` as the CSS solution.
**When to use:** Whenever a fixed bottom element is visible on screen.
**Example:**
```typescript
// Source: W3C Technique C43 (https://www.w3.org/WAI/WCAG22/Techniques/css/C43.html)
'use client';

import { useEffect, useRef } from 'react';

// Inside CookieBanner component:
const bannerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const el = bannerRef.current;
  if (!el) return;

  const updateScrollPadding = () => {
    const height = el.offsetHeight;
    document.documentElement.style.setProperty(
      'scroll-padding-bottom',
      `${height + 8}px`   // +8px breathing room
    );
  };

  const observer = new ResizeObserver(updateScrollPadding);
  observer.observe(el);
  updateScrollPadding(); // run immediately on mount

  return () => {
    observer.disconnect();
    document.documentElement.style.removeProperty('scroll-padding-bottom');
  };
}, []);
```

### Pattern 3: Initial Focus on Mount
**What:** When the banner appears, keyboard focus should move to the first interactive element (Accept button) so keyboard users know the banner is present and can immediately act.
**When to use:** Any non-modal banner or dialog that appears dynamically and requires user action.
**Example:**
```typescript
// Source: WCAG Understanding 2.4.3, MDN accessibility docs
const acceptButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  // Move focus to first action button when banner mounts
  acceptButtonRef.current?.focus();
}, []);
```
**Note:** This sends focus to the banner but does NOT trap it (not a modal). Users can Tab away freely. This satisfies WCAG 2.4.3 (Focus Order) without violating the non-modal UX decision.

### Pattern 4: Escape Key Dismissal
**What:** Pressing Escape while focused anywhere in the banner should dismiss it (same as "Reject All" without explicit rejection). This is a WCAG A11Y-02 requirement.
**When to use:** Any non-modal overlay that can be dismissed.
**Example:**
```typescript
// Per WCAG keyboard interaction guidelines
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // For a non-modal banner: Escape = dismiss without recording consent
      // OR Escape = Reject All — decide in planning
      // Recommendation: Escape dismisses without setting consent (keeps hasConsented = null)
      // so banner re-appears on next visit. This is the most conservative approach.
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Pattern 5: Footer "Cookie Preferences" Link
**What:** A button in the Footer that calls `clearConsent()` from `consentStore`, resetting `hasConsented` to `null`, which causes the banner to reappear. Footer must become a client component or the button must be extracted to a child client component.
**When to use:** Requirement BNRR-07.
**Example:**
```typescript
// Footer becomes 'use client' OR extract a child client component CookiePrefsButton
'use client';
import { useConsentStore } from '@/store/consentStore';

function CookiePrefsButton() {
  const clearConsent = useConsentStore((state) => state.clearConsent);
  return (
    <button onClick={clearConsent} className={styles.cookiePrefsButton}>
      Cookie Preferences
    </button>
  );
}
```
**Architecture note:** The current `Footer.tsx` is a Server Component. Adding `useConsentStore` requires making it a Client Component (`'use client'`) or extracting `CookiePrefsButton` as a separate small client component inside the Footer. Extracting is preferred — it keeps most of Footer as server-renderable and isolates the client boundary.

### Pattern 6: Equal Visual Prominence for Accept/Reject (ICO + WCAG Requirement)
**What:** WCAG 2.5.8 and ICO guidance both require that Accept and Reject buttons have identical visual prominence — same size, same color, same position. The only difference is label text.
**When to use:** Mandatory for this banner.
**Example:**
```css
/* Both buttons share the same class — no visual distinction */
.actionButton {
  background-color: #ED6A00;   /* brand orange */
  color: #1E1E1F;               /* dark text — 5.28:1 contrast on orange — PASSES AA */
  border: none;
  padding: 0.75rem 1.5rem;     /* min 24px height for WCAG 2.5.8 target size */
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  min-height: 44px;            /* exceeds 24px minimum, meets Apple/Google recommended */
  min-width: 100px;
}
```

### Anti-Patterns to Avoid
- **Rendering banner in SSR:** Never render CookieBanner without the `isHydrated` gate — will cause hydration mismatch with React 19's stricter hydration checks.
- **Styling Accept differently from Reject:** Any color, size, or weight difference between the two buttons violates ICO equal-prominence rules (confirmed enforcement in 2025).
- **Using `role="dialog" aria-modal="true"` on a non-modal banner:** This traps focus in the banner, blocking users from browsing. Use `aria-modal="false"` since the banner is non-modal.
- **Omitting `scroll-padding-bottom`:** Fixed bottom banners that obscure keyboard-focused elements fail WCAG 2.4.11 (Focus Not Obscured, AA). This is a measurable, reportable violation.
- **White text on orange (#ED6A00) background:** Contrast ratio is only 3.07:1 — FAILS 4.5:1 AA for normal text. Use dark text (#1E1E1F) on orange instead (5.28:1 — PASSES).
- **Omitting focus on mount:** Banner appears without focus announcement. Keyboard users may not notice the banner at all.
- **Adding `'use client'` to `Footer.tsx` directly:** This forces the entire Footer to be a client bundle. Extract only `CookiePrefsButton` as a client component and keep Footer as server-only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WCAG 2.4.11 focus obscuring | Custom scroll logic | CSS `scroll-padding-bottom` + `ResizeObserver` | W3C-approved technique C43; simple, reliable, handles dynamic banner height |
| Contrast ratio verification | Visual estimation | Node.js WCAG luminance formula (computed in this research) | Colors are verified below with precise ratios |
| Focus trapping | Custom Tab key interceptor | Don't trap at all (non-modal banner) | This is not a modal; trapping focus would violate the non-blocking UX decision |

**Key insight:** The cookie banner is a solved UX/accessibility pattern. The complexity is all in WCAG compliance details (contrast, focus obscuring, target size, ARIA roles), not in the component structure itself.

---

## Common Pitfalls

### Pitfall 1: Hydration Mismatch
**What goes wrong:** Banner renders during SSR with `hasConsented = null` (default store value), then on client rehydration reads localStorage and may find a different value, causing a React 19 hydration error.
**Why it happens:** `consentStore` uses localStorage (browser-only API). Server render produces one output; client rehydration may produce different output.
**How to avoid:** Gate the entire banner render behind `isHydrated`:
```typescript
if (!isHydrated || hasConsented !== null) return null;
```
The `isHydrated` flag is `false` during SSR and flips to `true` only after `onRehydrateStorage` callback fires (browser-only). Verified pattern from existing `authStore.ts`.
**Warning signs:** React "Hydration failed" errors in browser console; banner flickering on load.

### Pitfall 2: Focus Obscured by Banner (WCAG 2.4.11)
**What goes wrong:** Keyboard user Tabs through page. An element near the viewport bottom receives focus. The fixed bottom banner completely hides it. Fails WCAG 2.4.11 AA.
**Why it happens:** `position: fixed; bottom: 0` elements overlap page content. CSS scroll behavior does not account for fixed overlays by default.
**How to avoid:** Apply `scroll-padding-bottom` to `html` equal to banner height + breathing room. Use `ResizeObserver` to update when banner height changes (e.g., mobile vs desktop). Remove `scroll-padding-bottom` when banner is dismissed.
**Warning signs:** Keyboard user cannot see focus indicator when tabbing to page bottom elements; fails automated accessibility scanners that detect fixed elements without scroll-padding.

### Pitfall 3: Banner Buttons Don't Meet 24px Minimum Target Size (WCAG 2.5.8)
**What goes wrong:** Buttons are styled too small (e.g., `padding: 4px 8px`), failing WCAG 2.5.8 24×24px minimum target size requirement (AA, June 2025 EAA-enforceable).
**Why it happens:** Compact banner design prioritizing small footprint over touch/click area.
**How to avoid:** Set `min-height: 44px` on all action buttons (exceeds 24px minimum, meets Apple/Google recommended 44px). Padding counts toward target size.
**Warning signs:** Buttons shorter than ~28px rendered height; automated axe-core failures on target size.

### Pitfall 4: Z-Index Conflict with react-toastify
**What goes wrong:** `ToastContainer` (in `Providers.tsx`) uses `--toastify-z-index: 9999` by default. If the cookie banner's `z-index` is lower, toasts appear above the banner (acceptable). If banner's `z-index` is higher, the banner may overlap toasts in the bottom-right corner — both occupy the same bottom-right real estate.
**Why it happens:** Both elements are `position: fixed` in the bottom area. The existing `ToastContainer` is set to `position="bottom-right"`.
**How to avoid:** Set banner `z-index: 1000` (below react-toastify's 9999). Toasts will appear above the banner. OR position toasts to `bottom-right` and keep the banner full-width but avoid the bottom-right corner (toasts are small; banner is 100% wide bottom strip). The banner taking full width at bottom means toasts may overlap it, but toasts are transient (4-second autoClose). This is acceptable UX.
**Warning signs:** Users see toasts hidden behind banner or vice versa during the brief window when both are visible.

### Pitfall 5: Footer Client Component Boundary
**What goes wrong:** Making the entire `Footer.tsx` a client component to add `useConsentStore`. This increases the JavaScript bundle sent to all pages unnecessarily.
**Why it happens:** The easiest path is adding `'use client'` to Footer.
**How to avoid:** Extract a tiny `CookiePrefsButton` client component used inside the server-rendered Footer. The server component can import a client component child — this is the standard Next.js 15 App Router pattern.
**Warning signs:** Footer import chain adds significant JS bundle weight; Lighthouse score regression.

---

## Code Examples

Verified patterns from official sources and existing project patterns:

### Complete CookieBanner Component Structure
```typescript
// src/components/CookieBanner/CookieBanner.tsx
// Source: Follows authStore hydration pattern (src/store/authStore.ts)
// + W3C Technique C43 (scroll-padding-bottom)
// + WCAG 2.4.3 focus management

'use client';

import { useEffect, useRef } from 'react';
import { useConsentStore } from '@/store/consentStore';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const { hasConsented, isHydrated, setConsent } = useConsentStore();
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  // Gate: only render client-side after hydration, and only when consent is undecided
  if (!isHydrated || hasConsented !== null) return null;

  // Set focus to first action button when banner appears (WCAG 2.4.3)
  useEffect(() => {
    acceptButtonRef.current?.focus();
  }, []);

  // WCAG 2.4.11: update scroll-padding-bottom to banner height
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty(
        'scroll-padding-bottom',
        `${el.offsetHeight + 8}px`
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('scroll-padding-bottom');
    };
  }, []);

  // Escape key: dismiss banner without recording consent
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConsent(false); // or clearConsent() — TBD in planning
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setConsent]);

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className={styles.banner}
    >
      <div className={styles.content}>
        <p id="cookie-banner-title" className={styles.title}>
          Cookie Preferences
        </p>
        <p id="cookie-banner-desc" className={styles.description}>
          We use reCAPTCHA and FingerprintJS to prevent spam and protect our
          platform. These services may set cookies. You can accept or decline
          their use below.
        </p>
      </div>
      <div className={styles.actions}>
        <button
          ref={acceptButtonRef}
          className={styles.actionButton}
          onClick={() => setConsent(true)}
        >
          Accept All
        </button>
        <button
          className={styles.actionButton}
          onClick={() => setConsent(false)}
        >
          Reject All
        </button>
      </div>
    </div>
  );
}
```

### WCAG-Compliant CSS for CookieBanner
```css
/* src/components/CookieBanner/CookieBanner.module.css */

.banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;  /* below react-toastify's 9999 */
  background: #1E1E1F;  /* matches footer near-black */
  color: #FCFCFC;  /* 16.24:1 contrast — PASSES AA */
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.4);
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #FCFCFC;  /* 16.24:1 — PASSES AA */
}

.description {
  font-size: 0.875rem;
  margin: 0;
  color: #C6C6C6;  /* 9.75:1 on #1E1E1F — PASSES AA */
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.actionButton {
  background-color: #ED6A00;  /* brand orange */
  color: #1E1E1F;              /* 5.28:1 contrast — PASSES AA */
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  min-height: 44px;    /* WCAG 2.5.8: exceeds 24px minimum */
  min-width: 100px;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}

.actionButton:hover {
  opacity: 0.85;
}

/* WCAG 2.4.11 / 2.4.12: visible focus indicator */
.actionButton:focus-visible {
  outline: 3px solid #FCFCFC;
  outline-offset: 2px;
}

/* Mobile: stack vertically to avoid obscuring content */
@media (max-width: 640px) {
  .banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .actions {
    width: 100%;
    justify-content: stretch;
  }

  .actionButton {
    flex: 1;
  }
}
```

### Footer CookiePrefsButton (Extracted Client Component)
```typescript
// Option A: Extract CookiePrefsButton as a client child component
// This keeps Footer.tsx as a server component

// src/components/Footer/CookiePrefsButton.tsx
'use client';
import { useConsentStore } from '@/store/consentStore';
import styles from './Footer.module.css';

export default function CookiePrefsButton() {
  const clearConsent = useConsentStore((state) => state.clearConsent);
  return (
    <button
      onClick={clearConsent}
      className={styles.cookiePrefsButton}
    >
      Cookie Preferences
    </button>
  );
}

// In Footer.tsx (server component, no 'use client'):
// import CookiePrefsButton from './CookiePrefsButton';
// ...
// <CookiePrefsButton />
```

### Root Layout Integration
```typescript
// src/app/layout.tsx — MODIFY to add CookieBanner
// Source: Next.js App Router docs — client components in server layout

import CookieBanner from '@/components/CookieBanner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Providers>
        {/* Cookie banner outside Providers is fine — reads Zustand store directly */}
        <CookieBanner />
      </body>
    </html>
  );
}
```
**Note:** `CookieBanner` can be placed inside or outside `Providers` — Zustand stores don't require React Context providers. The store is a module-level singleton.

---

## Color Contrast Reference (Computed)

All ratios computed using the WCAG 2.0 relative luminance formula. Verified 2026-02-19.

| Foreground | Background | Ratio | Normal Text (4.5) | Large Text (3.0) |
|------------|------------|-------|-------------------|------------------|
| #FCFCFC (white) | #1E1E1F (near-black) | 16.24:1 | PASSES | PASSES |
| #FCFCFC (white) | #2F1808 (dark-brown) | 16.31:1 | PASSES | PASSES |
| #C6C6C6 (light-gray) | #1E1E1F (near-black) | 9.75:1 | PASSES | PASSES |
| #1E1E1F (dark) | #ED6A00 (orange) | 5.28:1 | PASSES | PASSES |
| #FCFCFC (white) | #ED6A00 (orange) | 3.07:1 | **FAILS** | FAILS |
| #808080 (gray) | #FCFCFC (white) | 3.85:1 | **FAILS** | PASSES |

**Critical:** Do NOT use white text on the brand orange (#ED6A00). Use dark text (#1E1E1F) on orange instead — it achieves 5.28:1, which passes AA.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `role="alertdialog"` for cookie banners | `role="dialog" aria-modal="false"` for non-modal banners | WCAG 2.2 (2023) | alertdialog implies blocking urgency; non-modal banners use dialog |
| `focus-trap-react` for all overlays | No focus trap for non-modal banners; focus trap only for true modals | 2022-2023 best practice shift | Non-modal banners must NOT trap focus (users should tab away freely) |
| Body `padding-bottom` to avoid overlap | CSS `scroll-padding-bottom` for keyboard focus compliance | WCAG 2.2 Technique C43 (2023) | `scroll-padding-bottom` satisfies 2.4.11 without affecting visual layout |
| Accept = primary button, Reject = secondary/link | Both buttons identical visual weight | ICO enforcement 2023-2025 | Asymmetric buttons = dark pattern; ICO issued warnings to 134 UK sites in 2025 |
| `aria-live="assertive"` for banners | `aria-live="polite"` or no live region (focus handles announcement) | WCAG 2.1 guidance | Moving focus to banner on mount is the preferred announcement mechanism |

**Deprecated/outdated:**
- White text on orange: Was once common; now known to fail contrast at 3.07:1.
- Making Footer fully `'use client'` to add one interactive element: Wastes bundle bytes; extract a client child component instead.

---

## Open Questions

1. **What should Escape key do on the banner?**
   - What we know: WCAG A11Y-02 requires Escape to be keyboard-navigable, but the spec says "keyboard navigable (Tab, Enter, Escape)" without specifying what Escape does.
   - What's unclear: Should Escape = Reject All (records `false` in store)? Or Escape = dismiss without setting consent (leaves `hasConsented = null`, so banner returns next visit)?
   - Recommendation: Escape = dismiss without setting consent. This is the most conservative interpretation — users can return to the banner any time and have not been coerced into rejection. Plan this explicitly.

2. **Should CookieBanner be inside or outside `<Providers>`?**
   - What we know: Zustand stores are module-level singletons — they don't need React Context. `CookieBanner` can go anywhere in the React tree.
   - What's unclear: Whether placing inside `Providers` causes any ordering issues with `GoogleReCaptchaProvider`.
   - Recommendation: Place outside `Providers`, directly in `<body>`. This keeps the component independent and makes the SSR render of `Providers` cleaner.

3. **Mobile z-index conflict with ToastContainer at `bottom-right`?**
   - What we know: `ToastContainer` uses z-index 9999. Banner uses z-index 1000. On mobile, both the banner and toasts will appear at the bottom of the screen.
   - What's unclear: On very small mobile viewports, toasts may appear half-obscured by the banner. The 4-second autoClose mitigates this, but could be jarring.
   - Recommendation: Document this as a known acceptable limitation. After consent is given/rejected, the banner disappears and toasts behave normally. The overlap window is brief and during a one-time event.

---

## Sources

### Primary (HIGH confidence)
- Existing `src/store/consentStore.ts` — hydration pattern reference (project-verified)
- Existing `src/store/authStore.ts` — `isHydrated` / `onRehydrateStorage` pattern (project-verified)
- W3C Technique C43: https://www.w3.org/WAI/WCAG22/Techniques/css/C43.html — `scroll-padding-bottom` for WCAG 2.4.11
- WCAG 2.2 Understanding 2.4.11: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum — focus not obscured requirements
- Color contrast ratios — computed in-session using WCAG 2.0 relative luminance formula (verified independently)
- `src/constants/colors.ts` — project color palette (project-verified)
- `src/components/Footer/Footer.module.css` — footer dark background colors (project-verified)

### Secondary (MEDIUM confidence)
- WCAG 2.2 Compliance for Cookie Banners: https://www.consentmanager.net/en/knowledge/wcag-cookie-banners/ — confirmed 4.5:1 minimum contrast, keyboard navigation requirements
- Accessible Cookie Notice example: https://techservicesillinois.github.io/accessibility/examples/notice/index.html — confirmed `role="dialog"`, `aria-modal="false"`, `aria-labelledby`, `aria-describedby` pattern for non-modal notices
- ICO cookie compliance enforcement: https://www.didomi.io/blog/ico-review-uk-websites-cookie-compliance — equal prominence enforcement confirmed, 134 warnings issued 2025
- ReedSmith "Reject All" button guidance: https://www.technologylawdispatch.com/2023/11/privacy-data-protection/reject-all-button-in-cookie-consent-banners-an-update-from-the-uk-and-the-eu — both buttons same visual weight required
- Next.js hydration error patterns: https://nextjs.org/docs/messages/react-hydration-error — confirmed SSR/client mismatch issues with localStorage

### Tertiary (LOW confidence)
- react-toastify z-index 9999 default — reported from multiple community sources but not verified against v11 source code; treat as likely but validate empirically

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already in the project; no new dependencies needed; verified against `package.json`
- Architecture: HIGH — patterns directly derived from existing project code (`authStore.ts`, `Footer.tsx`, `layout.tsx`) and W3C official technique C43
- Color contrast: HIGH — computed using WCAG 2.0 luminance formula in-session; not relying on external tools
- WCAG requirements: HIGH — sourced from W3C official docs and WCAG 2.2 understanding documents
- Pitfalls: HIGH for hydration and contrast (project-verified patterns); MEDIUM for z-index conflict (behavior observed but version-specific details LOW confidence)

**Research date:** 2026-02-19
**Valid until:** 2026-03-19 (stable domain; WCAG 2.2 is current standard through at least 2026; Next.js 15 patterns stable)
