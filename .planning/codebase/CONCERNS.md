# Codebase Concerns

**Analysis Date:** 2026-02-19

## Tech Debt

**Large page components with mixed responsibilities:**
- Issue: The truck profile page (`src/app/truck/[truckId]/page.tsx`) is 690 lines and handles data fetching, state management, date logic, schedule calculations, formatting, and rendering. This violates separation of concerns and makes testing/maintenance difficult.
- Files: `src/app/truck/[truckId]/page.tsx`
- Impact: Hard to test individual features (status calculation, date grouping, filtering). Changes to business logic require editing the render function. Reusability of scheduling logic is blocked.
- Fix approach: Extract scheduling logic into custom hooks (e.g., `useTruckScheduling`, `useTruckStatus`), move date/time formatting to utilities, create helper components for schedule cards and menu sections.

**Hardcoded Azure Blob Storage URLs:**
- Issue: Image URLs are hardcoded to `https://streetfeastdevelopment.blob.core.windows.net` in multiple files. This is tightly coupled to the storage provider and doesn't support environment-specific configuration.
- Files: `src/app/truck/[truckId]/page.tsx` (lines 190, 620)
- Impact: Changing storage provider or URLs requires code changes across the codebase. No way to use different storage URLs for staging/production without env vars or URL construction helpers.
- Fix approach: Create a utility function `getImageUrl(imageUri: string)` in `src/utils/` that reads from env config. Update all image URL construction to use this helper.

**Console logging in production code:**
- Issue: Multiple console.log() calls scattered throughout, including in the truck profile page (line 623) and verification flow. These aren't wrapped in development-only conditions.
- Files: `src/app/truck/[truckId]/page.tsx` (line 623), `src/app/verify/page.tsx` (lines 38, 55, 75, 94, 126)
- Impact: Unnecessary console output in production that could expose data structure information. Performance impact from logging in hot code paths.
- Fix approach: Wrap console calls with `if (process.env.NODE_ENV === 'development')` or create a logger utility that respects environment.

**Token refresh subscribers pattern has memory leak potential:**
- Issue: In `src/utils/axiosConfig.ts`, the `refreshSubscribers` array can accumulate callbacks if multiple 401s occur simultaneously before the first refresh completes, then an error occurs.
- Files: `src/utils/axiosConfig.ts` (lines 14, 20, 26)
- Impact: If token refresh fails, subscribers array isn't cleared, and subsequent 401 errors could cause exponential subscriber growth. Could cause memory issues in long-lived sessions.
- Fix approach: Always clear subscribers array in the finally block after token refresh attempt completes, whether success or failure.

**Timezone handling is fragile:**
- Issue: The truck schedule page does complex timezone conversions using local date strings (YYYY-MM-DD) but server provides times in multiple formats: `openTimeLocal`, `closeTimeLocal`, `openTimeUtc`, `closeTimeUtc`. Local date string comparison (`getDateString()`) could fail across day boundaries.
- Files: `src/app/truck/[truckId]/page.tsx` (lines 234-303, 311-331)
- Impact: Schedule display could show incorrect dates if server timezone differs from client timezone. Date boundaries might be off when occurrence spans UTC midnight differently than local midnight.
- Fix approach: Use a dedicated date library (dayjs is already imported in package.json) with timezone support. Create utility for comparing occurrence dates that accounts for timezone context.

## Known Bugs

**console.log left in production code:**
- Symptom: `console.log(item)` appears on line 623 of truck profile page when menu items are rendered
- Files: `src/app/truck/[truckId]/page.tsx` (line 623)
- Trigger: View any truck with a menu
- Workaround: Filter browser console manually

**Unvalidated app store links:**
- Symptom: App store links in error states hardcoded to `https://apps.apple.com` and `https://play.google.com` without actual app URLs
- Files: `src/app/truck/[truckId]/page.tsx` (lines 117, 132, 396, 410)
- Trigger: When truck profile fails to load or user clicks download app links
- Workaround: None - links don't go to the actual StreetFeast app stores

## Security Considerations

**API Base URL from environment but no validation:**
- Risk: `process.env.NEXT_PUBLIC_API_URL` is used to configure the axios base URL but there's no validation that it matches the expected domain. A misconfigured env var could send auth tokens to the wrong server.
- Files: `src/utils/axiosConfig.ts` (line 5)
- Current mitigation: None
- Recommendations: Add validation that API_BASE_URL starts with expected domain(s). Log a warning if unexpected URL detected. Consider moving API URL to non-public env var and fetch it from a config endpoint.

**Authentication tokens stored in localStorage via Zustand:**
- Risk: Access tokens and refresh tokens are persisted to localStorage (via Zustand persist middleware). If XSS occurs, attacker has direct access to auth tokens.
- Files: `src/store/authStore.ts` (line 37-43)
- Current mitigation: None detected
- Recommendations: Consider httpOnly cookie approach if backend supports it. At minimum, implement Content Security Policy. Add token encryption at rest in localStorage. Implement automatic token cleanup on tab close.

**Supabase anonymous key exposed in frontend code:**
- Risk: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is by design public, but it's used for authentication. If a user is compromised, the key is visible in source and network requests could be replayed.
- Files: `src/lib/supabase.ts` (line 4)
- Current mitigation: Reliance on Supabase RLS policies
- Recommendations: Ensure all Supabase tables have Row Level Security policies enforced. Regular audit of RLS rules. Consider using Supabase custom claims for fine-grained access control.

**Form submission includes device fingerprint but validation unclear:**
- Risk: Contact form sends device fingerprint via custom header (`X-Device-Fingerprint`) for spam prevention, but no server-side rate limiting evident. Fingerprint algorithm is external dependency that could be compromised.
- Files: `src/hooks/useContactForm.ts` (lines 48-62)
- Current mitigation: reCAPTCHA v3 token also sent
- Recommendations: Verify backend implements rate limiting per fingerprint. Consider session-based rate limiting in addition to fingerprint-based. Monitor FingerprintJS for security updates.

## Performance Bottlenecks

**Truck profile generates 30 date cards on every render:**
- Problem: `generateDateCards()` creates date card objects for 30 days on every render without memoization
- Files: `src/app/truck/[truckId]/page.tsx` (lines 334-350)
- Cause: No useMemo or useCallback; complex date grouping logic runs even when props haven't changed
- Improvement path: Wrap `generateDateCards` result in useMemo with dependencies on `futureOccurrences`. Extract grouping logic to utility function that can be easily memoized.

**Google Maps loaded dynamically but no caching:**
- Problem: Google Maps script is appended to DOM on every mount, and there's no check if script already loading (race condition possible)
- Files: `src/components/GoogleMap/GoogleMap.tsx` (lines 20-50)
- Cause: Script loading happens in useEffect without debouncing or singleton pattern
- Improvement path: Create a singleton service to manage Google Maps script loading. Return a promise that resolves when script is ready. Cache the loaded maps.Map instance.

**No pagination or virtualization for long occurrence lists:**
- Problem: All menu items for a truck category render at once. Large menus could cause layout thrashing.
- Files: `src/app/truck/[truckId]/page.tsx` (lines 610-647)
- Cause: Direct map over category.menuItems array with no virtualization
- Improvement path: Implement virtualization using react-window for menus with >20 items. Add lazy loading with intersection observer.

## Fragile Areas

**Schedule status calculation logic:**
- Files: `src/app/truck/[truckId]/page.tsx` (lines 234-303)
- Why fragile: Complex priority-based selection of truck status from multiple occurrences. Multiple date comparison functions. Depends on current time being accurate (could drift). If business rules change (e.g., "closing soon" threshold), multiple hardcoded values (60 minute threshold on lines 271, 278) need updating.
- Safe modification: Extract to utility function with unit tests covering edge cases (day boundaries, multiple occurrences same day, closing soon logic). Create constants for thresholds. Mock Date in tests.
- Test coverage: No test files detected. This logic needs comprehensive test coverage.

**Token refresh and auth state synchronization:**
- Files: `src/utils/axiosConfig.ts`, `src/store/authStore.ts`, `src/utils/tokenRefresh.ts`
- Why fragile: Multiple places manage auth state (store, tokens passed as function args). If one place fails to update others, auth becomes inconsistent. Subscribers pattern in axios interceptor is easy to break with race conditions.
- Safe modification: Create single source of truth for auth state. Have all token updates go through auth store. Consider removing subscribers pattern in favor of event emitter or store subscription.
- Test coverage: No test files for auth flow. Critical path needs integration tests.

**Middleware mobile detection:**
- Files: `src/middleware.ts` (lines 12-15)
- Why fragile: User agent parsing is unreliable. New mobile device User agents could break detection. Regex is simplistic and could match non-mobile strings.
- Safe modification: Use established library like ua-parser-js. Test with actual modern mobile device user agents. Add fallback detection (e.g., viewport width from client hints if available).
- Test coverage: No test files for middleware.

## Scaling Limits

**No caching of truck details or occurrences:**
- Current capacity: Each page load fetches truck data and occurrences fresh
- Limit: With multiple users viewing popular trucks, this creates N requests to backend per user
- Scaling path: Implement client-side caching (stale-while-revalidate pattern). Cache truck details for 5 minutes, occurrences for 2 minutes. Add Next.js ISR (incremental static regeneration) for truck pages if possible.

**Infinite date scroll implementation:**
- Current capacity: 30 days hardcoded
- Limit: If 30 days becomes inadequate, entire page calculation needs refactoring
- Scaling path: Implement virtual scrolling with dynamic date loading. Fetch next batch of dates on scroll. Consider weekly grouping for large date ranges.

## Dependencies at Risk

**react-google-recaptcha-v3 last updated 2021:**
- Risk: Package hasn't been updated in ~4 years. May have security issues. reCAPTCHA v3 API could change with incompatibility.
- Impact: Form spam protection could fail silently
- Migration plan: Monitor for security advisories. Have fallback rate limiting on backend. Plan migration to React 19 compatible reCAPTCHA library if maintained version available.

**FingerprintJS v5.0.1:**
- Risk: External device fingerprinting dependency. Service could change pricing or availability. Algorithm could be fingerprinted itself.
- Impact: Device-based rate limiting in contact form fails
- Migration plan: Evaluate in-house fingerprinting or session-based alternatives. Maintain fallback to basic rate limiting.

**zustand v5.0.8 is recent:**
- Risk: Low - actively maintained
- Impact: Low
- Migration plan: Keep up with minor version updates

## Missing Critical Features

**No offline support or error recovery:**
- Problem: If API is unavailable, users see error state with no graceful degradation
- Blocks: Cannot use app when network unreliable. No data caching layer.

**No analytics or error tracking:**
- Problem: No Sentry, LogRocket, or similar error tracking configured
- Blocks: Cannot diagnose production issues. Cannot track user behavior.

**No loading states for image assets:**
- Problem: Hero images and menu item images have no placeholder or loading skeleton
- Blocks: Poor UX on slow networks. CLS (Cumulative Layout Shift) issues possible.

## Test Coverage Gaps

**No tests for auth flow:**
- What's not tested: Token refresh, login redirect, email verification flow
- Files: `src/utils/axiosConfig.ts`, `src/utils/tokenRefresh.ts`, `src/app/verify/page.tsx`, `src/hooks/useRequireAuth.ts`
- Risk: Auth bugs would only be caught in manual testing. Regression on each change.
- Priority: High

**No tests for truck schedule calculation:**
- What's not tested: Status determination logic, date grouping, occurrence filtering, timezone handling
- Files: `src/app/truck/[truckId]/page.tsx`
- Risk: Schedule display bugs only caught manually. Complex date logic is easy to break.
- Priority: High

**No tests for form submission:**
- What's not tested: ContactForm submission, reCAPTCHA integration, device fingerprinting
- Files: `src/hooks/useContactForm.ts`, `src/components/ContactForm/ContactForm.tsx`
- Risk: Form spam protection could fail without detection. Submission logic could break silently.
- Priority: Medium

**No E2E tests:**
- What's not tested: Complete user flows (browse truck, view schedule, submit contact form)
- Risk: Integration issues only caught in production
- Priority: Medium

---

*Concerns audit: 2026-02-19*
