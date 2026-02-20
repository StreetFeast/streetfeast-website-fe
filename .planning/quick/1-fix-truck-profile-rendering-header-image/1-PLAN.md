---
phase: quick-1
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/truck/[truckId]/page.tsx
  - src/app/truck/[truckId]/page.module.css
  - src/types/api.ts
  - src/utils/api.ts
autonomous: true
must_haves:
  truths:
    - "Hero image renders when truck has images with valid imageUri"
    - "Report button is visible and clickable on hero section"
    - "Menu tab shows items from defaultMenu when no schedule-specific menu exists"
    - "Menu item photos render from item.image or item.images fallback"
    - "Website link appears in contact info when truck has a website"
    - "Social media links render when truck has social media URLs"
  artifacts:
    - path: "src/app/truck/[truckId]/page.tsx"
      provides: "Fixed truck profile with hero image, default menu, website/social links"
    - path: "src/types/api.ts"
      provides: "TruckDetailResponse with social media fields"
    - path: "src/utils/api.ts"
      provides: "getTruckMenu API function"
  key_links:
    - from: "src/app/truck/[truckId]/page.tsx"
      to: "src/utils/api.ts"
      via: "getTruckMenu import and call"
      pattern: "getTruckMenu"
    - from: "src/app/truck/[truckId]/page.tsx"
      to: "src/types/api.ts"
      via: "Menu type import"
      pattern: "import.*Menu.*from"
---

<objective>
Fix five rendering issues on the truck profile page: hero image not displaying, report button visibility, menu not loading from defaultMenu, menu item photos broken, and missing website/social media links.

Purpose: The truck profile page is the public-facing page for food trucks and currently has several broken or missing features that degrade the user experience.
Output: Fully functional truck profile with working hero image, report button, default menu fallback, menu item photos, and website/social links.
</objective>

<execution_context>
@/Users/zachshearer/.claude/get-shit-done/workflows/execute-plan.md
@/Users/zachshearer/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/truck/[truckId]/page.tsx
@src/app/truck/[truckId]/page.module.css
@src/types/api.ts
@src/utils/api.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix hero image, report button, and menu item photos</name>
  <files>src/app/truck/[truckId]/page.tsx</files>
  <action>
  Fix three rendering bugs in page.tsx:

  **1. Hero image (lines 190-192):** The current code blindly uses `truckData.images[0].imageUri` without checking if imageUri is null. Also does not handle cases where imageUri might already be a full URL.

  Replace the heroImage logic with:
  ```typescript
  const getImageUrl = (uri: string | null | undefined): string | null => {
    if (!uri) return null;
    if (uri.startsWith('http')) return uri;
    return `https://streetfeastdevelopment.blob.core.windows.net${uri}`;
  };

  const heroImage = truckData.images && truckData.images.length > 0
    ? getImageUrl(truckData.images[0].imageUri)
    : null;
  ```

  This helper function will also be reused for menu item images.

  **2. Report button (lines 442-446):** Add `z-index: 2` inline to the report button to ensure it renders above the hero background image. The button markup and CSS look correct but z-index ensures visibility:
  ```tsx
  <button className={styles.reportButton} aria-label="Report" onClick={handleReportClick} style={{ zIndex: 2 }}>
  ```

  **3. Menu item photos (lines 619-624):** Fix the redundant null check and add fallback to `item.images` array. Also remove the `console.log(item)` debug statement at line 624.

  Replace:
  ```typescript
  const itemImage = item.image &&
      item.image
      ? `https://streetfeastdevelopment.blob.core.windows.net${item.image}`
      : null;

  console.log(item)
  ```
  With:
  ```typescript
  const itemImageUri = item.image || (item.images && item.images.length > 0 ? item.images[0].imageUri : null);
  const itemImage = getImageUrl(itemImageUri);
  ```

  The `getImageUrl` helper handles null checks and full URL detection in one place.
  </action>
  <verify>Run `npm run lint` to confirm no lint errors. Visually confirm in dev server that: (1) hero image renders if truck has images, (2) report button is visible in top-right of hero, (3) menu item photos render, (4) no console.log output in browser console.</verify>
  <done>Hero image renders from truck images array with null-safe URI handling. Report button is visible with z-index. Menu item photos use image field with images array fallback. Debug console.log removed.</done>
</task>

<task type="auto">
  <name>Task 2: Add default menu fetching and website/social media links</name>
  <files>src/utils/api.ts, src/types/api.ts, src/app/truck/[truckId]/page.tsx, src/app/truck/[truckId]/page.module.css</files>
  <action>
  **1. Add social media fields to TruckDetailResponse (src/types/api.ts):**

  Add optional social media fields to the `TruckDetailResponse` interface (after the existing `website` field inherited from Truck, but TruckDetailResponse doesn't directly have `website` — it does, from the Truck base shape at line 44). Confirm `website` is already present in TruckDetailResponse (it is, inherited pattern from Truck). Add these optional fields at the end of TruckDetailResponse:
  ```typescript
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  x?: string | null;
  ```

  **2. Add getTruckMenu API function (src/utils/api.ts):**

  Add a new exported function to fetch a menu by truck ID and menu ID:
  ```typescript
  import { UserResponse, TruckDetailResponse, Menu } from '@/types/api';

  /**
   * Fetches a specific menu for a truck by menu ID
   * This endpoint is public and does not require authentication
   */
  export const getTruckMenu = async (truckId: string, menuId: number): Promise<Menu> => {
    const response = await apiClient.get<Menu>(`/api/v1/Truck/${truckId}/Menu/${menuId}`);
    return response.data;
  };
  ```

  Update the existing import at top of api.ts to include `Menu` type.

  **3. Add default menu state and fetching (src/app/truck/[truckId]/page.tsx):**

  - Add import for `getTruckMenu` alongside existing imports from `@/utils/api`
  - Add import for `Menu` type alongside existing imports from `@/types/api`
  - Add state: `const [defaultMenu, setDefaultMenu] = useState<Menu | null>(null);`
  - Add a new useEffect that fires when truckData loads to fetch the default menu:
    ```typescript
    useEffect(() => {
      if (!truckData?.defaultMenuId || !truckId) return;
      const fetchDefaultMenu = async () => {
        try {
          const menu = await getTruckMenu(truckId, truckData.defaultMenuId!);
          setDefaultMenu(menu);
        } catch (err) {
          console.error('Error fetching default menu:', err);
        }
      };
      fetchDefaultMenu();
    }, [truckData?.defaultMenuId, truckId]);
    ```
  - Update the menuCategories derivation (line 361) to use defaultMenu as fallback:
    ```typescript
    const menuCategories = selectedSchedule?.menu?.categories || defaultMenu?.categories || [];
    ```

  **4. Add website link to contact info section (src/app/truck/[truckId]/page.tsx):**

  After the phone contact row (after line 498, before the location row), add a website row:
  ```tsx
  {truckData.website && (
    <a href={truckData.website.startsWith('http') ? truckData.website : `https://${truckData.website}`} className={styles.contactRow} target="_blank" rel="noopener noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span>{truckData.website.replace(/^https?:\/\//, '')}</span>
      <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )}
  ```

  **5. Add social media links section (src/app/truck/[truckId]/page.tsx and page.module.css):**

  After the contactInfo div closing tag (after line 512), add a social media links row. Only render if at least one social field exists:
  ```tsx
  {(truckData.instagram || truckData.facebook || truckData.tiktok || truckData.x) && (
    <div className={styles.socialLinks}>
      {truckData.instagram && (
        <a href={truckData.instagram.startsWith('http') ? truckData.instagram : `https://instagram.com/${truckData.instagram.replace('@', '')}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
      )}
      {truckData.facebook && (
        <a href={truckData.facebook.startsWith('http') ? truckData.facebook : `https://facebook.com/${truckData.facebook}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
      )}
      {truckData.tiktok && (
        <a href={truckData.tiktok.startsWith('http') ? truckData.tiktok : `https://tiktok.com/@${truckData.tiktok.replace('@', '')}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
        </a>
      )}
      {truckData.x && (
        <a href={truckData.x.startsWith('http') ? truckData.x : `https://x.com/${truckData.x.replace('@', '')}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="X">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      )}
    </div>
  )}
  ```

  **6. Add social link CSS styles (src/app/truck/[truckId]/page.module.css):**

  Add after the `.contactRow` styles (around line 487):
  ```css
  .socialLinks {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }

  .socialLink {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #F5F5F5;
    color: #636363;
    transition: all 0.2s;
    text-decoration: none;
  }

  .socialLink:hover {
    background: #ED6A00;
    color: white;
    transform: scale(1.1);
  }
  ```
  </action>
  <verify>Run `npm run lint` to confirm no errors. Run `npm run build` to confirm TypeScript compiles. Check that the Menu tab shows menu items when truck has a defaultMenuId. Check website link appears in contact section. Social media links render conditionally.</verify>
  <done>Default menu fetched via getTruckMenu API and used as fallback when no schedule-specific menu. Website link displays in contact info. Social media icons render conditionally with hover states. All new types properly defined.</done>
</task>

</tasks>

<verification>
1. `npm run lint` passes with no errors
2. `npm run build` compiles successfully
3. Visit a truck profile page with images — hero image renders
4. Report button visible in top-right corner of hero
5. Menu tab shows items (from schedule menu or default menu fallback)
6. Menu item photos render correctly
7. Website link appears in contact section if truck has website
8. Social media icons appear if truck has social fields
9. No console.log debug output in browser console
</verification>

<success_criteria>
- Hero image renders correctly with null-safe URI handling and full-URL detection
- Report button is visible and clickable on all hero backgrounds
- Menu tab displays items from defaultMenu when no schedule-specific menu is attached
- Menu item photos render using image field with images array fallback
- Website appears as clickable link in contact info section
- Social media links render conditionally with proper icons and hover states
- Console.log debug statement removed
- Build and lint pass cleanly
</success_criteria>

<output>
After completion, create `.planning/quick/1-fix-truck-profile-rendering-header-image/1-SUMMARY.md`
</output>
