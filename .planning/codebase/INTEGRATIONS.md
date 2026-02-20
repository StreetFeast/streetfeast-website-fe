# External Integrations

**Analysis Date:** 2026-02-19

## APIs & External Services

**Backend API:**
- Custom REST API (StreetFeast backend)
  - Base URL: `process.env.NEXT_PUBLIC_API_URL`
  - SDK/Client: axios via `src/utils/axiosConfig.ts`
  - Authentication: Bearer token (JWT) via Authorization header
  - Token refresh: Automatic 401 interception with token refresh on `POST /api/v1/User/RefreshToken`
  - Endpoints used:
    - `GET /api/v1/User/Profile` - Fetch authenticated user profile
    - `GET /api/v1/Truck/{truckId}` - Get truck details (public)
    - `GET /api/v1/Truck/{truckId}/Schedule/Occurrences` - Get truck schedule (public)
    - `POST /api/v1/Business/ContactUs` - Submit contact form with reCAPTCHA and device fingerprint

**Google Services:**
- Google Maps JavaScript API
  - API Key: `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
  - Usage: Interactive maps for truck location display in `src/components/GoogleMap/GoogleMap.tsx`
  - Libraries: places (for address geocoding)
  - Geocoding: Address-to-coordinates conversion via `google.maps.Geocoder`

- Google reCAPTCHA v3
  - Site Key: `process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - SDK: react-google-recaptcha-v3
  - Provider: `src/components/Providers/Providers.tsx`
  - Action tokens: 'contactus' action used on contact form submission
  - Integration: Token sent to backend via `recaptchaToken` parameter in contact form

**FingerprintJS (Device Fingerprinting):**
- Service: FingerprintJS Pro (via @fingerprintjs/fingerprintjs)
- Usage: Generate unique device identifiers for fraud detection
- Implementation: `src/hooks/useContactForm.ts`
- Header: `X-Device-Fingerprint` sent with contact form requests
- Visitor ID: Unique string based on device/browser characteristics

## Data Storage

**Databases:**
- Supabase PostgreSQL (Backend managed by Supabase)
  - Connection: Supabase URL `process.env.NEXT_PUBLIC_SUPABASE_URL`
  - Client: @supabase/supabase-js 2.76.1
  - Anonymous Key: `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Authentication: Supabase Auth handles signup, login, email verification
  - Tables/Schema: Not exposed to frontend (backend manages)

**Client-Side Storage:**
- localStorage (via Zustand persistence)
  - Storage key: 'auth-storage'
  - Content: User object, accessToken, refreshToken, emailVerified status
  - Used in `src/store/authStore.ts`

**File Storage:**
- Not integrated (no file upload functionality detected in codebase)

**Caching:**
- None detected (axios response caching not configured)

## Authentication & Identity

**Auth Provider:**
- Supabase Auth (managed backend service)
  - Implementation: Email/password authentication
  - Signup: `supabase.auth.signUp()` with email, password, and user_metadata
  - Session refresh: Automatic token refresh via `supabase.auth.refreshSession()`
  - Email verification: Required before full account access
  - Email redirect: `{NEXT_PUBLIC_DOMAIN}/verify` for confirmation link

**Token Management:**
- Access Token: Short-lived JWT stored in Zustand auth store
- Refresh Token: Long-lived token for obtaining new access tokens
- Refresh mechanism:
  - Axios interceptor detects 401 responses
  - Calls `src/utils/tokenRefresh.ts` `refreshAccessToken()` function
  - Updates store and retries original request with new token
  - Queue system prevents simultaneous refresh attempts

**User Metadata:**
- Stored in Supabase user_metadata during signup:
  - truckName
  - phoneNumber
  - firstName
  - lastName
  - zipCode (numeric)
  - latitude (from zipcode lookup)
  - longitude (from zipcode lookup)

## Monitoring & Observability

**Error Tracking:**
- Not detected (no Sentry, Rollbar, or similar service integration)

**Logs:**
- Console logging only via `console.error()` and `console.log()`
- Contact form submission errors logged to console
- Token refresh errors logged to console
- No centralized logging service

**Analytics:**
- Not detected (no Google Analytics, Mixpanel, or similar)

## CI/CD & Deployment

**Hosting:**
- Deployment platform not hardcoded (likely Vercel based on Next.js default, but configurable)
- Environment: Node.js runtime with .next build artifacts

**CI Pipeline:**
- Not configured in repository (no GitHub Actions, GitLab CI, CircleCI configs)

**Build Process:**
- Command: `npm run build` (runs `next build --turbopack`)
- Output: Optimized `.next/` directory with server and client bundles
- Type checking: TypeScript strict mode as part of build

## Environment Configuration

**Required env vars (public - visible to client):**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public by design)
- `NEXT_PUBLIC_API_URL` - Custom backend API base URL
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA v3 site key (public)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key (public)
- `NEXT_PUBLIC_STRIPE_DASHBOARD_URL` - Stripe dashboard URL (referenced on subscription page)
- `NEXT_PUBLIC_DOMAIN` - Application domain for redirect URLs

**Server-side vars (if needed):**
- None detected in frontend codebase (backend handles server secrets)

**Secrets location:**
- `.env` file (git-ignored, not committed)
- At runtime: Environment variables injected by deployment platform

## Webhooks & Callbacks

**Incoming:**
- Email verification callback: Supabase Auth sends verification link to user email
  - Redirect: `{NEXT_PUBLIC_DOMAIN}/verify` page handles callback
  - Implementation: `src/app/verify/page.tsx`

**Outgoing:**
- Contact form submission: `POST /api/v1/Business/ContactUs`
  - Includes reCAPTCHA token for backend validation
  - Includes device fingerprint in header for fraud detection
  - Backend handles spam/rate-limit detection (frontend receives 429 response)

**Password Reset:**
- Supabase Auth flow: User requests reset via form
- Recovery email sent by Supabase Auth
- Redirect to: `{NEXT_PUBLIC_DOMAIN}/reset-password` page
- Implementation: `src/app/reset-password/page.tsx`

---

*Integration audit: 2026-02-19*
