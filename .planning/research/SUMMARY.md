# Project Research Summary

**Project:** Cookie Consent / Privacy Compliance Implementation
**Domain:** GDPR-compliant cookie consent for Next.js website with third-party tracking
**Researched:** 2026-02-19
**Confidence:** HIGH

## Executive Summary

StreetFeast's Next.js 15 website currently violates GDPR by loading reCAPTCHA v3 and FingerprintJS before obtaining user consent. The research reveals that modern 2026 compliance requires a custom client-side implementation prioritizing conditional script loading over cosmetic consent banners. The standard approach uses Zustand for state management (already in the stack), cookie storage for consent preferences, and conditional provider rendering to prevent third-party scripts from executing until consent is granted.

The critical architectural insight is that most implementations fail by treating consent as a UI problem rather than a script-loading problem. Simply showing a banner while reCAPTCHA loads in the background is a GDPR violation that has resulted in €125,000 fines. The solution requires moving from always-loaded providers to conditionally-rendered providers based on user consent, with special attention to Next.js SSR/hydration challenges.

A secondary legal complexity emerges from Google's April 2, 2026 data controller policy shift, making StreetFeast fully liable for reCAPTCHA GDPR compliance. Additionally, FingerprintJS used for fraud prevention may qualify as "legitimate interest" and not require explicit consent, though this requires legal validation. The implementation must avoid dark patterns (asymmetric buttons, cookie walls, pre-checked boxes) that invalidate consent under European enforcement guidelines.

## Key Findings

### Recommended Stack

The standard 2025/2026 approach favors custom implementation over third-party consent libraries, providing full control over conditional script loading while integrating seamlessly with existing Zustand state management. This avoids bundle bloat and library update maintenance burden.

**Core technologies:**
- **Custom Cookie Banner** (DIY component) — Full UX/UI control, no bundle bloat, integrates with existing CSS Modules pattern, easier to maintain than third-party library updates
- **Cookie Storage** (`document.cookie`) — Server-side accessible (unlike localStorage), GDPR-compliant for consent, works across Next.js server/client boundary
- **Zustand** (5.0.8, existing) — Already in stack for state management, client-side reactive state with localStorage persistence via middleware
- **js-cookie** (optional, 3KB) — Helper library for cleaner cookie read/write/delete operations

**Implementation pattern:**
- **Cookie-based Storage** — Store consent in `cookie_consent` cookie (not localStorage) for server accessibility and GDPR compliance
- **Conditional Provider Wrapper** — Wrap `GoogleReCaptchaProvider` in client component that only renders when consent granted, preventing script load until approved
- **On-demand FingerprintJS** — Keep existing lazy-load pattern in hook, potentially classify as legitimate interest (fraud prevention) to avoid consent requirement

### Expected Features

Research confirms GDPR compliance features are non-negotiable table stakes, while UX differentiators center on privacy-first messaging and minimal disruption.

**Must have (table stakes):**
- Banner on first visit with prior consent blocking (scripts cannot load before consent)
- Accept All and Reject All buttons with equal visual prominence (Austria high court 2025 ruling)
- Cookie categories (minimum: Necessary, Analytics/Security)
- Preference center with category-by-category toggles
- Persistent footer link to manage/withdraw consent anytime
- Mobile responsive design with WCAG 2.2 accessibility
- Contact form gating with alternative UI when consent declined
- Clear service disclosure (explicitly name reCAPTCHA, FingerprintJS, their purposes)

**Should have (competitive differentiators):**
- Privacy-first messaging explaining why specific tracking is needed ("prevent spam" vs generic privacy text)
- Smooth animations with bottom-aligned banner (doesn't block primary content)
- No cookie wall — allow browsing without consent, only gate contact form
- Transparent service list naming third parties explicitly
- Contextual consent triggering (show banner when user navigates to Contact page, not homepage)

**Defer (v2+):**
- Route-based banner triggering (only show before Contact page access)
- Consent analytics dashboard tracking acceptance rates
- Multi-language support (add when traffic shows international need)
- Consent audit logs with timestamps (enterprise compliance feature)
- Geolocation-based rules (defer — apply strictest standard globally initially)
- IAB TCF 2.3 compliance (not relevant — no programmatic advertising)

### Architecture Approach

The recommended architecture uses a hybrid Context + Zustand pattern matching the existing authStore implementation. Zustand handles state persistence and hydration, while React Context provides component tree access without prop drilling. The key pattern is conditional provider rendering — GoogleReCaptchaProvider only mounts when analytics consent is granted.

**Major components:**
1. **CookieConsentProvider** (Context + Zustand) — Manages global consent state, hydration, and persistence with localStorage sync
2. **CookieBanner** — Displays consent UI, captures user choice, unmounts when consent decision exists
3. **ConditionalReCaptchaProvider** — Wraps children with GoogleReCaptchaProvider only when `hasConsent('all')` returns true
4. **Modified ContactForm** — Renders full form with tracking OR fallback UI with email link based on consent state
5. **useCookieConsent** — Custom hook for accessing consent state throughout component tree

**Critical patterns:**
- **Hydration handling** — Use `skipHydration: true` in Zustand persist config, manually rehydrate in useEffect to prevent SSR/CSR mismatch
- **Conditional provider mounting** — Don't load GoogleReCaptchaProvider until consent granted (prevents script execution entirely)
- **Fallback UI** — Show email link when consent declined instead of blocking access (GDPR "freely given" requirement)
- **Lazy script loading** — FingerprintJS already uses dynamic import on form submission, add consent check before execution

### Critical Pitfalls

Research identified seven critical pitfalls with regulatory and technical consequences:

1. **reCAPTCHA loads before consent (GDPR violation)** — Current implementation renders GoogleReCaptchaProvider unconditionally at root, loading Google scripts immediately. French authorities fined Cityscoot €125,000 for this. **Prevention:** Conditionally render provider only when `hasConsent('all') === true`, verify Network tab shows no google.com/recaptcha requests before user clicks Accept.

2. **Conditional provider breaks useGoogleReCaptcha hook** — When provider isn't mounted (user declined), hook throws "Context has not yet been implemented" errors, crashing forms. **Prevention:** Check if `executeRecaptcha` exists before use, implement fallback UI when undefined, consider honeypot-only validation as graceful degradation.

3. **SSR/hydration mismatch with localStorage** — Reading localStorage during server render causes "Hydration failed" errors and visual flash. **Prevention:** Use `skipHydration: true` in Zustand persist config, call `.persist.rehydrate()` in useEffect, add `suppressHydrationWarning` to elements with client/server differences.

4. **FingerprintJS consent gray area** — Currently loads unconditionally without consent or disclosure. While fraud detection may qualify as "legitimate interest," browser fingerprinting in contact form has weak justification. **Prevention:** Document legitimate interest assessment, update privacy policy to disclose fingerprinting, consider gating behind consent, or remove if contact form is primary use case.

5. **Cookie walls violate GDPR** — Blocking functionality with "Accept cookies or leave" invalidates consent (not freely given). Denmark's DPA announced cookie consent enforcement as priority for 2026. **Prevention:** Provide equally prominent Reject All button, ensure core functionality works without non-essential cookies, offer email alternative for contact.

6. **Dark patterns invalidate consent** — Asymmetric buttons (bright Accept, gray Reject), pre-checked boxes, multi-click rejection paths are regulatory violations. **Prevention:** Make Accept All and Reject All identical in size, color, position, and click count; no pre-checked boxes; test both paths require same effort.

7. **Google's 2026 data controller shift** — As of April 2, 2026, StreetFeast becomes data controller for reCAPTCHA, fully liable for GDPR compliance. **Prevention:** Update privacy policy before deadline, remove references to Google as controller, detail what reCAPTCHA collects, ensure DPA with Google is in place.

## Implications for Roadmap

Based on research, implementation should follow a three-phase structure prioritizing compliance foundation before features:

### Phase 1: Foundation & Compliance Core
**Rationale:** Legal compliance is non-negotiable and must be architected correctly from the start to avoid complete rewrite. SSR hydration handling, consent state management, and privacy policy updates have zero dependencies and enable all subsequent work.

**Delivers:**
- Zustand consent store with cookie persistence
- CookieConsentContext provider wrapping app
- TypeScript types for consent levels
- Updated privacy policy for Google data controller shift (pre-April 2, 2026)
- SSR hydration strategy preventing mismatch errors

**Addresses features:**
- Cookie categories (Necessary, Analytics/Security)
- Consent persistence across sessions
- Foundation for all tracking consent checks

**Avoids pitfalls:**
- SSR/hydration mismatch (Pitfall #3)
- Google 2026 data controller liability (Pitfall #7)
- FingerprintJS consent gray area requires legal review (Pitfall #4)

**Research needed:** None — standard Zustand patterns well-documented in existing codebase (authStore, profileStore).

---

### Phase 2: Banner UI & Consent Flow
**Rationale:** With state management foundation in place, UI layer can consume context without architectural dependencies. Banner design must address dark pattern avoidance from the start — fixing asymmetric buttons post-launch is compliance risk.

**Delivers:**
- CookieBanner component with Accept All/Reject All buttons
- Preference center with category toggles
- Persistent footer link to reopen preferences
- Mobile responsive design with WCAG 2.2 accessibility
- Equal visual prominence for Accept/Reject (Austria ruling compliance)

**Addresses features:**
- Banner on first visit (table stakes)
- Equal visual prominence (mandatory)
- Customize/manage preferences (GDPR requirement)
- Persistent preferences link (GDPR Article 7.3)
- Mobile responsive (compliance requirement)

**Avoids pitfalls:**
- Cookie walls (Pitfall #5) — Both buttons equally prominent, no blocking
- Dark patterns (Pitfall #6) — Symmetric design, no pre-checked boxes

**Research needed:** None — standard CSS Modules banner implementation, existing design system patterns apply.

---

### Phase 3: Conditional Script Loading
**Rationale:** This is the most technically complex phase addressing the core GDPR violation. Requires modifying Providers component and contact form hook to conditionally load third-party scripts based on consent state. Must come after Phases 1-2 so consent state and UI are available.

**Delivers:**
- ConditionalReCaptchaProvider wrapper component
- Modified Providers.tsx to conditionally mount GoogleReCaptchaProvider
- Modified useContactForm.ts to check consent before FingerprintJS execution
- Null checks for `executeRecaptcha` to prevent hook context errors
- Contact form fallback UI showing email link when consent declined

**Addresses features:**
- Prior consent blocking (critical table stakes)
- Contact form gating (required)
- No cookie wall (allow email alternative)

**Avoids pitfalls:**
- reCAPTCHA loads before consent (Pitfall #1) — Script blocked until approved
- Conditional provider breaks hooks (Pitfall #2) — Null checks prevent crashes
- FingerprintJS consent (Pitfall #4) — Gated behind consent check

**Research needed:** None — standard conditional provider pattern documented in research, matches Next.js composition patterns.

---

### Phase Ordering Rationale

**Dependencies drive sequence:**
1. **Phase 1 first** — Zustand store and Context must exist before banner can consume state
2. **Phase 2 second** — Banner UI needs to read/write consent state from Phase 1
3. **Phase 3 last** — Conditional providers need consent state from Phase 1 to decide mounting

**Risk mitigation:**
- Phase 1 addresses SSR hydration (non-trivial debugging if deferred)
- Phase 2 prevents dark pattern violations at design stage
- Phase 3 tackles GDPR violation creating immediate regulatory exposure

**Iterative validation:**
- Phase 1: Unit test store persistence, hydration timing
- Phase 2: Integration test banner appearance, button parity
- Phase 3: E2E test full flow (decline → email link, accept → form works)

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Zustand + Context hybrid matches existing authStore pattern exactly
- **Phase 2:** CSS Modules banner follows existing component structure (CookieBanner folder with .tsx + .module.css + index.ts)
- **Phase 3:** Conditional provider pattern documented extensively in Next.js composition guides

**Validation needed during planning:**
- **Phase 1:** Legal team review of FingerprintJS legitimate interest claim (may avoid consent requirement if classified as fraud prevention)
- **Phase 1:** Privacy policy text review for April 2, 2026 Google data controller compliance
- **Phase 3:** Backend team confirmation that contact form API accepts submissions without reCAPTCHA token (for reject-consent path)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Custom implementation with Zustand is 2025/2026 standard, multiple Next.js 15 guides converge on same pattern, js-cookie widely adopted |
| Features | HIGH | GDPR requirements well-defined by EDPB guidelines, table stakes features verified across compliance sources, dark pattern avoidance codified in 2025 Austria ruling |
| Architecture | HIGH | Conditional provider pattern documented in official Next.js composition docs, Context + Zustand hybrid matches existing authStore implementation, SSR hydration strategies proven |
| Pitfalls | HIGH | reCAPTCHA GDPR violations have regulatory precedent (€125,000 Cityscoot fine), hydration errors common Next.js issue with known solutions, Google 2026 shift official policy |

**Overall confidence:** HIGH

Research draws from official documentation (Next.js, Zustand, reCAPTCHA), regulatory sources (EDPB guidelines, court rulings), and recent 2025/2026 compliance updates. The custom implementation approach is industry standard for simple use cases (2-3 tracking services) vs. enterprise consent platforms (OneTrust, Cookiebot).

### Gaps to Address

**Legal validation required:**
- **FingerprintJS legitimate interest assessment** — Research suggests fraud prevention qualifies, but contact form fingerprinting has weaker justification than payment fraud detection. Needs legal team confirmation of whether consent is required or legitimate interest applies. **Resolution:** Phase 1 planning includes legal review checkpoint before implementation decisions.

**Backend coordination needed:**
- **Contact form without reCAPTCHA** — Reject-consent path requires form to work without reCAPTCHA token. Backend must accept submissions with honeypot-only validation or alternative spam prevention. **Resolution:** Phase 3 planning includes backend team confirmation of API behavior when `recaptchaToken` is null/missing.

**Browser compatibility edge case:**
- **localStorage quota exceeded** — Rare but possible if user has 5MB+ data stored for domain. Research provides recovery strategy (try/catch + error handling). **Resolution:** Phase 2 implementation includes `try/catch` around `localStorage.setItem()` per performance trap guidance.

**Future regulatory changes:**
- **Geolocation-based consent** — Current approach applies strictest standard (GDPR) globally. If US-only traffic dominates, could simplify to informational banner. **Resolution:** Defer to v2 based on analytics post-launch, not a Phase 1 concern.

## Sources

### Primary (HIGH confidence)

**Next.js 15 Implementation:**
- [Next.js Cookie Consent Banner: Build GDPR-Compliant System (No Libraries)](https://www.buildwithmatija.com/blog/build-cookie-consent-banner-nextjs-15-server-client) — Next.js 15 server/client patterns, conditional rendering approach
- [Configuring Google Cookies Consent with Next.js 15](https://medium.com/@sdanvudi/configuring-google-cookies-consent-with-next-js-15-ca159a2bea13) — Conditional provider architecture
- [Next.js Server and Client Components Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) — Official provider patterns

**GDPR Legal Requirements:**
- [reCAPTCHA Privacy – How to Stay GDPR Compliant in 2026](https://capmonster.cloud/en/blog/recaptcha-privacy-how-to-stay-gdpr-compliant-in-2026) — Updated 2026 compliance analysis, Google data controller shift
- [Cookie Banner Design 2026 | Compliance & UX Best Practices](https://secureprivacy.ai/blog/cookie-banner-design-2026) — Dark pattern avoidance, button parity requirements
- [5 GDPR-compliant Cookie Banner Guidelines from the EDPB](https://www.onetrust.com/resources/5-gdpr-compliant-cookie-banner-guidelines-from-the-edpb-infographic/) — Official EDPB regulatory guidance

**Technical Integration:**
- [Privacy and compliance - Fingerprint Documentation](https://dev.fingerprint.com/docs/privacy-and-compliance) — Official FingerprintJS GDPR guidance, legitimate interest discussion
- [Zustand Persist Documentation](https://github.com/pmndrs/zustand) — Hydration handling with `skipHydration`, localStorage middleware

### Secondary (MEDIUM confidence)

**Enforcement & Precedents:**
- [Cookie Compliance in 2026: Where GDPR Enforcement Stands Now](https://www.gerrishlegal.com/blog/cookie-compliance-in-2026-where-gdpr-enforcement-stands-now) — Denmark DPA 2026 priorities, Cityscoot €125,000 fine
- [Dark Patterns in Cookie Consent: How to Avoid Them](https://www.cookieyes.com/blog/dark-patterns-in-cookie-consent/) — Austria high court ruling on button parity
- [Cookie Walls and GDPR](https://www.cookieyes.com/blog/cookie-wall/) — "Freely given" consent interpretation

**Implementation Patterns:**
- [React Cookie Consent: GDPR Implementation Guide for Next.js](https://www.cookietrust.io/react-nextjs-cookie-consent-gdpr-guide/) — Community best practices
- [Cookies vs. Local Storage in Next.js](https://mgshamalidilrukshi.medium.com/cookies-vs-local-storage-in-next-js-which-is-best-for-your-website-b3c45199de40) — Storage comparison for consent state

### Tertiary (context validation)

**Hydration Issues:**
- [Text Content Hydration Errors - Next.js Docs](https://nextjs.org/docs/messages/react-hydration-error) — Official debugging guide
- [Resolving Hydration Mismatch Errors - LogRocket](https://blog.logrocket.com/resolving-hydration-mismatch-errors-next-js/) — Community solutions

**Security:**
- [Always Catch localStorage Errors](http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors) — Quota exceeded handling
- [GDPR Cookie Compliance XSS Vulnerability](https://research.cleantalk.org/cve-2025-1622/) — WordPress plugin vulnerability case study

---

*Research completed: 2026-02-19*
*Ready for roadmap: yes*
