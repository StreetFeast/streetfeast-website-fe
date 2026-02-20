# Technology Stack

**Analysis Date:** 2026-02-19

## Languages

**Primary:**
- TypeScript 5.x - Full frontend and configuration codebase with strict mode enabled
- JSX/TSX - React component templates

**Secondary:**
- JavaScript (ESM) - ESLint configuration in `.mjs` format

## Runtime

**Environment:**
- Node.js (version not pinned, inferred from Next.js 15.5.7 requirements)
- Browser (modern ES2017+ support)

**Package Manager:**
- npm - Primary package manager
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 15.5.7 - React framework with App Router and Turbopack for bundling/development
  - Turbopack enabled for both dev (`next dev --turbopack`) and build (`next build --turbopack`)
  - App Router with file-based routing in `/src/app`
  - Metadata and robots generation via `robots.ts`

**Frontend:**
- React 19.1.0 - Core UI library
- React DOM 19.1.0 - DOM rendering

**State Management:**
- Zustand 5.0.8 - Lightweight state management with persistence middleware
  - Used for authentication state in `src/store/authStore.ts`
  - Supports localStorage persistence

**Build/Dev:**
- ESLint 9.x - Code linting
  - Config extends Next.js core-web-vitals and TypeScript rules
  - Config file: `eslint.config.mjs` (flat config format)
- TypeScript 5.x - Type checking

## Key Dependencies

**Critical:**
- @supabase/supabase-js 2.76.1 - Backend authentication and database client
  - Handles user signup, login, session refresh, and Postgres database access
  - Public client initialized with URL and anonymous key from environment

- axios 1.12.2 - HTTP client for API requests
  - Custom instance in `src/utils/axiosConfig.ts` with request/response interceptors
  - Automatic bearer token injection and 401 token refresh handling

- react-google-recaptcha-v3 1.11.0 - Google reCAPTCHA v3 integration
  - Provider wrapper in `src/components/Providers/Providers.tsx`
  - Used for bot prevention on contact form

**Security & Validation:**
- @fingerprintjs/fingerprintjs 5.0.1 - Device fingerprinting for fraud detection
  - Used in contact form to add `X-Device-Fingerprint` header
  - Generates unique visitor ID based on device/browser characteristics

- libphonenumber-js 1.12.25 - Phone number formatting and validation
  - AsYouType formatting for US phone numbers in truck registration form
  - Phone validation with country-specific rules

- jwt-decode 4.0.0 - JWT token parsing utility
  - Available for token inspection (no active usage found in codebase)

**Data & Utilities:**
- dayjs 1.11.18 - Date manipulation library
  - Available for date operations (no active usage found in codebase)

- zipcodes 8.0.0 - US zipcode lookup and validation
  - Validates 5-digit US zips in registration form
  - Returns latitude/longitude for truck location initialization

**UI & Notifications:**
- react-icons 5.5.0 - Icon library (multiple icon sets available)
- react-loading-skeleton 3.5.0 - Loading skeleton UI components
- react-toastify 11.0.5 - Toast notification system
  - Configured in Providers with bottom-right positioning

**Type Definitions:**
- @types/node 20.x - Node.js type definitions
- @types/react 19.x - React type definitions
- @types/react-dom 19.x - React DOM type definitions
- @types/google.maps 3.58.1 - Google Maps JavaScript API types

## Configuration

**TypeScript:**
- File: `tsconfig.json`
- Target: ES2017
- Module resolution: bundler
- Strict mode: enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: preserve (for Next.js processing)

**ESLint:**
- File: `eslint.config.mjs`
- Format: Flat config (latest ESLint format)
- Extends: next/core-web-vitals, next/typescript
- Ignores: node_modules, .next, out, build, next-env.d.ts

**Next.js:**
- File: `next.config.ts`
- No custom config applied (default configuration)

**Environment:**
- Configuration file: `.env` (exists, contents not detailed)
- Public environment variables use `NEXT_PUBLIC_` prefix:
  - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
  - `NEXT_PUBLIC_API_URL` - Custom backend API base URL
  - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA v3 site key
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps JavaScript API key
  - `NEXT_PUBLIC_STRIPE_DASHBOARD_URL` - Stripe dashboard link (referenced on subscription page)
  - `NEXT_PUBLIC_DOMAIN` - Domain for email redirect URLs

## Platform Requirements

**Development:**
- Node.js 18+ (inferred from Next.js 15 requirements)
- npm 9+ (package-lock.json v3)
- Modern terminal for npm scripts
- Browser with ES2017+ support for testing

**Production:**
- Deployment to Node.js runtime (Vercel, self-hosted Node, Docker container, etc.)
- Turbopack-optimized build outputs in `.next/` directory
- Environment variables injected at build time (public vars) and runtime (server vars)

---

*Stack analysis: 2026-02-19*
