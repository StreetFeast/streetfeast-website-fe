# Roadmap: StreetFeast Website Frontend

## Milestones

- ✅ **v1.0 Cookie Consent** — Phases 1–3 (shipped 2026-02-19)
- 🚧 **v1.1 App Download Page** — Phases 4–6 (in progress)

## Phases

<details>
<summary>✅ v1.0 Cookie Consent (Phases 1–3) — SHIPPED 2026-02-19</summary>

### Phase 1: State Management Foundation
**Goal**: Consent state is managed, persisted, and accessible throughout the application without SSR/hydration errors

**Depends on**: Nothing (first phase)

**Requirements**: BNRR-05

**Success Criteria** (what must be TRUE):
  1. User's consent choice (accept/reject/unset) persists across browser sessions via localStorage
  2. Application can read consent state on client without hydration mismatch errors
  3. Privacy policy is updated to reflect Google's April 2, 2026 data controller shift for reCAPTCHA compliance
  4. Zustand consent store integrates with existing state management patterns (matches authStore architecture)

**Plans:** 1 plan

Plans:
- [x] 01-01-PLAN.md — Consent store creation and privacy policy update

### Phase 2: Banner UI & User Controls
**Goal**: Users see a compliant cookie consent banner on first visit and can manage preferences anytime

**Depends on**: Phase 1

**Requirements**: BNRR-01, BNRR-02, BNRR-03, BNRR-04, BNRR-06, BNRR-07, A11Y-01, A11Y-02, A11Y-03

**Success Criteria** (what must be TRUE):
  1. User sees bottom-bar cookie banner on first visit before any non-essential scripts load
  2. User can click "Accept All" or "Reject All" with equal visual prominence (identical size, color, position)
  3. User can navigate the banner using keyboard only (Tab, Enter, Escape) with proper focus management
  4. User sees clear, plain language explaining reCAPTCHA and FingerprintJS purposes (spam prevention)
  5. User can reopen the banner via "Cookie Preferences" link in the footer to change their mind

**Plans:** 1 plan

Plans:
- [x] 02-01-PLAN.md — Cookie consent banner component and footer re-consent link

### Phase 3: Script Blocking & Form Gating
**Goal**: Third-party tracking scripts only load after user consent, and contact form provides alternative when consent is declined or undecided

**Depends on**: Phase 2

**Requirements**: SCRP-01, SCRP-02, SCRP-03

**Success Criteria** (what must be TRUE):
  1. When user declines cookies, no reCAPTCHA or FingerprintJS scripts load (verified in browser Network tab)
  2. When user accepts cookies, GoogleReCaptchaProvider mounts and reCAPTCHA scripts load successfully
  3. When user declines cookies OR has not yet made a choice, contact form shows email link alternative instead of form
  4. When user accepts cookies, contact form loads with full reCAPTCHA and FingerprintJS spam prevention
  5. Application handles missing executeRecaptcha context gracefully without crashes when provider isn't mounted

**Plans:** 2 plans

Plans:
- [x] 03-01-PLAN.md — Consent-gated reCAPTCHA provider and contact form no-consent alternative
- [x] 03-02-PLAN.md — Fix ContactForm consent branching to require explicit accept (gap closure)

</details>

---

### 🚧 v1.1 App Download Page (In Progress)

**Milestone Goal:** Provide a shareable, SEO-optimized download page at /download that auto-redirects mobile users to the correct app store and shows a fallback page with both store badges for desktop and unknown devices.

#### Phase 4: Device Detection & Middleware
**Goal**: Mobile users visiting /download are automatically routed to the correct app store before any page renders, while desktop users and search engine crawlers pass through unaffected

**Depends on**: Phase 3

**Requirements**: RDIR-01, RDIR-02, RDIR-03, RDIR-04, RDIR-05

**Success Criteria** (what must be TRUE):
  1. An iOS user visiting /download is immediately redirected to the App Store (307 redirect) without seeing any page content
  2. An Android user visiting /download is immediately redirected to Google Play (307 redirect) without seeing any page content
  3. A search engine crawler (Googlebot) visiting /download is NOT redirected — it passes through to see the page
  4. An iPadOS user visiting /download sees the fallback page with both store options (not auto-redirected)
  5. Redirect logic runs in Next.js middleware before any React rendering occurs

**Plans:** 1 plan

Plans:
- [ ] 04-01-PLAN.md — Bot patterns constants and /download middleware redirect logic

#### Phase 5: Fallback Page & Component
**Goal**: Desktop users and undetected devices see a complete, branded landing page with both app store download options

**Depends on**: Phase 4

**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04

**Success Criteria** (what must be TRUE):
  1. A desktop user visiting /download sees StreetFeast branding and both App Store and Google Play badge buttons
  2. Clicking either badge button opens the correct app store in the browser
  3. An iOS Safari user visiting /download on desktop sees the Apple Smart App Banner at the top of the browser
  4. The page renders without any client-side JavaScript (pure server component, no hydration)

**Plans**: TBD

#### Phase 6: SEO & Sitemap
**Goal**: The /download page is discoverable by search engines, previews correctly when shared on social platforms, and is eligible for Google rich results

**Depends on**: Phase 5

**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04

**Success Criteria** (what must be TRUE):
  1. Sharing /download in iMessage, Slack, or social media shows a preview card with title, description, and OG image
  2. The page has a canonical URL tag and Twitter card meta tags
  3. The page includes MobileApplication JSON-LD structured data visible to Google
  4. /download appears in sitemap.xml so search engines can discover and index it

**Plans**: TBD

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. State Management Foundation | v1.0 | 1/1 | Complete | 2026-02-19 |
| 2. Banner UI & User Controls | v1.0 | 1/1 | Complete | 2026-02-19 |
| 3. Script Blocking & Form Gating | v1.0 | 2/2 | Complete | 2026-02-19 |
| 4. Device Detection & Middleware | v1.1 | 0/1 | Not started | - |
| 5. Fallback Page & Component | v1.1 | 0/TBD | Not started | - |
| 6. SEO & Sitemap | v1.1 | 0/TBD | Not started | - |

---
*Roadmap created: 2026-02-19 (v1.0)*
*Updated: 2026-02-27 (v1.1 phases added)*
