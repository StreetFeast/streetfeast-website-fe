# Codebase Structure

**Analysis Date:** 2026-02-19

## Directory Layout

```
streetfeast-website-fe/
├── src/                           # Source code root
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout with Providers
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Global styles
│   │   ├── page.module.css       # Homepage styles
│   │   ├── register-truck/       # Truck registration flow
│   │   ├── login-truck/          # Truck login flow
│   │   ├── truck/[truckId]/      # Dynamic truck detail pages
│   │   ├── profile/              # User profile pages (authenticated)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── home/
│   │   │   ├── contact/
│   │   │   ├── subscription/
│   │   │   └── tutorials/
│   │   ├── verify/               # Email verification
│   │   ├── contact/              # Contact form page
│   │   ├── features/             # Feature showcase
│   │   ├── privacy/              # Privacy policy
│   │   ├── terms/                # Terms of service
│   │   ├── delete-my-data/       # GDPR data deletion
│   │   ├── forgot-password/      # Password reset request
│   │   ├── reset-password/       # Password reset form
│   │   ├── truck-verification/   # Truck verification flow
│   │   ├── tutorials/            # Tutorial index and detail
│   │   ├── m/[[...path]]/        # Mobile app redirect (catch-all)
│   │   ├── robots.ts             # SEO robots.txt
│   │   └── sitemap.ts            # SEO sitemap.xml
│   │
│   ├── components/               # React components
│   │   ├── FormInput/            # Reusable text input component
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormInput.module.css
│   │   │   └── index.ts
│   │   ├── PasswordInput/        # Reusable password input component
│   │   │   ├── PasswordInput.tsx
│   │   │   ├── PasswordInput.module.css
│   │   │   └── index.ts
│   │   ├── Header/               # Navigation header
│   │   ├── Footer/               # Footer component
│   │   ├── HeroHeader/           # Landing page hero
│   │   ├── ProfileSidebar/       # Profile navigation sidebar
│   │   ├── ContactForm/          # Reusable contact form
│   │   ├── GoogleMap/            # Google Maps embed
│   │   ├── LayoutContent/        # Pre-launch gate wrapper
│   │   ├── ComingSoon/           # Coming soon fallback UI
│   │   ├── TruckProfileSkeleton/ # Loading skeleton for truck profile
│   │   ├── TableOfContents/      # TOC for markdown pages
│   │   ├── Providers/            # App-wide provider wrapper
│   │   │   ├── Providers.tsx     # GoogleReCaptcha + Toastify setup
│   │   │   └── index.ts
│   │   └── tutorials/            # Tutorial-specific components
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useRegisterTruckForm.ts  # Truck registration form logic
│   │   ├── useContactForm.ts        # Contact form submission
│   │   └── useRequireAuth.ts        # Auth guard for protected routes
│   │
│   ├── store/                    # Zustand global state
│   │   ├── authStore.ts          # User, tokens, email verification
│   │   └── profileStore.ts       # User profile, loading, errors
│   │
│   ├── lib/                      # Third-party library configuration
│   │   └── supabase.ts           # Supabase client initialization
│   │
│   ├── utils/                    # Pure utility functions
│   │   ├── api.ts                # API endpoint wrappers
│   │   ├── validation.ts         # Form validation functions
│   │   ├── auth.ts               # Authentication helpers
│   │   ├── axiosConfig.ts        # HTTP client with interceptors
│   │   └── tokenRefresh.ts       # JWT token refresh logic
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── api.ts                # Backend response types
│   │   └── zipcodes.d.ts         # Zipcode library types
│   │
│   └── constants/                # Shared constants
│       ├── colors.ts             # Color values
│       └── tutorials.ts          # Tutorial data
│
├── public/                       # Static assets
│   ├── app-vector-file.svg      # Logo
│   ├── app-store-badge.svg      # App Store button
│   ├── google-play-badge.png    # Google Play button
│   └── ...other assets
│
├── package.json                  # npm dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── eslint.config.mjs             # ESLint rules
├── .env.example                  # Environment variables template
└── CLAUDE.md                      # Claude Code instructions
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router file-based routing and page components
- Contains: Page files (page.tsx), layouts, API routes (if any)
- Key files: `layout.tsx` (root), `page.tsx` (homepage), dynamic routes like `truck/[truckId]/page.tsx`

**`src/components/`:**
- Purpose: Reusable React UI components
- Contains: Functional components with TypeScript, co-located CSS Module styles
- Pattern: Each component in its own folder with `ComponentName.tsx`, `ComponentName.module.css`, `index.ts`
- Examples: FormInput, Header, Footer, GoogleMap

**`src/hooks/`:**
- Purpose: Custom hooks for stateful logic and side effects
- Contains: Form management, authentication guards, data fetching
- Examples: useRegisterTruckForm, useRequireAuth, useContactForm

**`src/store/`:**
- Purpose: Global state management via Zustand
- Contains: authStore (user, tokens), profileStore (user data, loading states)
- Persisted to localStorage for session continuity

**`src/lib/`:**
- Purpose: Third-party library initialization and configuration
- Contains: Supabase client setup
- Used by: Utilities, hooks, components that need external services

**`src/utils/`:**
- Purpose: Pure, reusable utility functions (no state, no side effects)
- Contains: API wrappers, validation, authentication helpers, HTTP client
- Examples: validatePassword(), getUserProfile(), refreshToken()

**`src/types/`:**
- Purpose: TypeScript type definitions
- Contains: API response interfaces, domain models
- Examples: UserResponse, TruckDetailResponse, TruckOccurrence

**`src/constants/`:**
- Purpose: Centralized constants
- Contains: Color values, tutorial data, feature flags
- Usage: Import and use throughout app

**`public/`:**
- Purpose: Static assets served directly
- Contains: Images, SVGs, favicons
- Accessed via `/filename` in code

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout, app initialization, global metadata
- `src/app/page.tsx`: Homepage (/)
- `src/app/register-truck/page.tsx`: Truck registration (/register-truck)
- `src/app/truck/[truckId]/page.tsx`: Truck detail pages (/truck/:truckId)

**Configuration:**
- `tsconfig.json`: TypeScript config, path aliases (@/* → ./src/*)
- `next.config.ts`: Next.js configuration
- `eslint.config.mjs`: Linting rules
- `package.json`: Dependencies, scripts

**Core Logic:**
- `src/utils/api.ts`: All backend API endpoints
- `src/store/authStore.ts`: Authentication state
- `src/hooks/useRegisterTruckForm.ts`: Complex form logic example
- `src/lib/supabase.ts`: Supabase client configuration

**Testing:**
- No test files present in codebase (not currently tested)

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `FormInput.tsx`, `Header.tsx`)
- Utilities: camelCase (e.g., `validation.ts`, `axiosConfig.ts`)
- Hooks: camelCase with use prefix (e.g., `useRegisterTruckForm.ts`)
- Styles: Same as component with `.module.css` suffix (e.g., `FormInput.module.css`)

**Directories:**
- Components: PascalCase (e.g., `FormInput/`, `Header/`)
- Features: kebab-case for routes (e.g., `register-truck/`, `forgot-password/`)
- Utilities: camelCase (e.g., `utils/`, `hooks/`, `store/`)

**TypeScript/Variables:**
- Types/Interfaces: PascalCase (e.g., `UserResponse`, `FormInputProps`)
- Functions: camelCase (e.g., `validatePassword()`, `getTruckDetails()`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`)
- Variables: camelCase (e.g., `formData`, `isLoading`)

**CSS Classes:**
- Kebab-case in CSS files
- Accessed via styles object: `styles.containerName`
- BEM convention encouraged: `styles.inputError`, `styles.buttonPrimary`

## Where to Add New Code

**New Feature (e.g., truck search):**
- Primary code: `src/app/search/page.tsx` (new route)
- Component: `src/components/SearchForm/SearchForm.tsx` (if reusable)
- Hook: `src/hooks/useSearchForm.ts` (if complex state)
- API: Add endpoint to `src/utils/api.ts`
- Types: Add response type to `src/types/api.ts`
- Tests: Create `src/app/search/__tests__/page.test.tsx` (if testing added)

**New Component (e.g., LoadingSpinner):**
- Implementation: `src/components/LoadingSpinner/LoadingSpinner.tsx`
- Styles: `src/components/LoadingSpinner/LoadingSpinner.module.css`
- Export: `src/components/LoadingSpinner/index.ts`
- Make it generic and reusable across multiple pages

**New Utility Function:**
- General utilities: `src/utils/newUtility.ts`
- Add TypeScript types for inputs/outputs
- Use pure functions without side effects
- Export clearly with JSDoc comments

**New API Integration:**
- Add endpoint wrapper to `src/utils/api.ts`
- Create type in `src/types/api.ts`
- If it requires auth: use `apiClient` (includes token)
- If public: can use `apiClient` directly (no setup needed)

**New Global State:**
- Create new store: `src/store/newFeatureStore.ts`
- Pattern: Use Zustand create() with clear getters/setters
- Persist to localStorage if user data: add persist middleware

**Authentication-Protected Page:**
- Create page at appropriate route: `src/app/protected/page.tsx`
- Add "use client" directive
- Import `useRequireAuth` hook
- Add to component: `const { isAuthenticated, isLoading } = useRequireAuth()`
- Show loading spinner while hydrating
- Component conditionally renders based on isAuthenticated

## Special Directories

**`src/app/profile/`:**
- Purpose: User dashboard routes (authentication required)
- Generated: No
- Committed: Yes
- Protected by: `useRequireAuth` hook in layout
- Sub-routes: home, contact, subscription, roadmap, tutorials

**`src/components/tutorials/`:**
- Purpose: Tutorial-specific components
- Generated: No
- Committed: Yes
- Used by: Tutorial pages in `src/app/tutorials/`

**`src/app/m/[[...path]]/`:**
- Purpose: Catch-all route for mobile app deeplinks
- Generated: No
- Committed: Yes
- Pattern: Redirects users to mobile app stores based on device

**`public/`:**
- Purpose: Static assets
- Generated: No
- Committed: Yes
- Accessed as: `/filename` in HTML/CSS

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes (by `npm run build`)
- Committed: No
- Contains: Optimized bundles, server-side code

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No
- Installed from: package.json

## Path Aliases

**`@/*`** → `./src/*`

Usage: `import { FormInput } from '@/components/FormInput'` instead of relative paths.

Benefits:
- Easier refactoring (no relative path changes)
- Cleaner imports (no `../../../` chains)
- Works across the entire codebase consistently

---

*Structure analysis: 2026-02-19*
