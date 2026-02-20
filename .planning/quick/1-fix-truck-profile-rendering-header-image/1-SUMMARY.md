---
phase: quick-1
plan: "01"
subsystem: truck-profile
tags: [bug-fix, rendering, api, ui]
dependency_graph:
  requires: []
  provides:
    - truck-profile hero image rendering with null-safe URI handling
    - default menu fallback via getTruckMenu API
    - website and social media links in contact section
  affects:
    - src/app/truck/[truckId]/page.tsx
    - src/types/api.ts
    - src/utils/api.ts
    - src/app/truck/[truckId]/page.module.css
tech_stack:
  added: []
  patterns:
    - getImageUrl helper for null-safe URI normalization
    - defaultMenu useEffect fallback pattern
    - conditional social media link rendering
key_files:
  created: []
  modified:
    - src/app/truck/[truckId]/page.tsx
    - src/types/api.ts
    - src/utils/api.ts
    - src/app/truck/[truckId]/page.module.css
decisions:
  - getImageUrl helper centralizes null-safe URI logic for both hero and menu item images
  - defaultMenu state fetched in separate useEffect keyed on truckData.defaultMenuId
  - Social fields added as optional to TruckDetailResponse to match backend API shape
metrics:
  duration: "2 min"
  completed: "2026-02-20"
---

# Quick Task 1: Fix Truck Profile Rendering - Header Image Summary

**One-liner:** Fixed five truck profile rendering bugs: null-safe hero image via getImageUrl helper, report button z-index, menu item photo fallback with images array, getTruckMenu API for defaultMenu fallback, and website/social media links in contact section.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix hero image, report button, and menu item photos | 6dd9f44 | src/app/truck/[truckId]/page.tsx |
| 2 | Add default menu fetching and website/social media links | 4496637 | page.tsx, page.module.css, api.ts, types/api.ts |

## What Was Built

### Task 1: Hero Image, Report Button, Menu Item Photos

**Hero image null-safety:** Added `getImageUrl` helper that returns `null` for falsy URIs, passes full URLs through as-is, and prepends the Azure blob storage base URL for relative paths. Used for `heroImage` derived from `truckData.images[0].imageUri`.

**Report button visibility:** Added `style={{ zIndex: 2 }}` inline to ensure the button renders above the hero background image in all cases.

**Menu item photos:** Replaced redundant double-check `item.image && item.image ? ...` with a clean `itemImageUri = item.image || (item.images && item.images.length > 0 ? item.images[0].imageUri : null)` then routed through `getImageUrl`. Removed `console.log(item)` debug statement.

### Task 2: Default Menu, Website Link, Social Media Links

**getTruckMenu API function** (`src/utils/api.ts`): Added exported async function calling `/api/v1/Truck/{truckId}/Menu/{menuId}`, returns `Menu` type. Updated import to include `Menu` from types.

**TruckDetailResponse social fields** (`src/types/api.ts`): Added `instagram`, `facebook`, `tiktok`, `x` as optional nullable string fields.

**Default menu state** (`page.tsx`): Added `defaultMenu` state with `useEffect` that fires when `truckData.defaultMenuId` is available, fetches via `getTruckMenu`, and handles errors gracefully. Updated `menuCategories` derivation: `selectedSchedule?.menu?.categories || defaultMenu?.categories || []`.

**Website link:** Added conditional `<a>` element in the contactInfo section with globe SVG icon, URL normalization (prepends `https://` if missing), and displays the cleaned URL as link text.

**Social media links:** Added conditional `<div className={styles.socialLinks}>` rendered only when at least one social field exists. Each platform (Instagram, Facebook, TikTok, X) gets its own circular icon button with URL normalization and `aria-label`. Added `.socialLinks` and `.socialLink` CSS with orange hover state in `page.module.css`.

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- `npm run lint`: 0 errors (3 pre-existing warnings in unrelated files)
- `npm run build`: Compiled successfully, all 23 pages generated
- TypeScript: No type errors

## Self-Check: PASSED

Files verified:
- src/app/truck/[truckId]/page.tsx — modified, committed at 6dd9f44 and 4496637
- src/types/api.ts — modified, committed at 4496637
- src/utils/api.ts — modified, committed at 4496637
- src/app/truck/[truckId]/page.module.css — modified, committed at 4496637
