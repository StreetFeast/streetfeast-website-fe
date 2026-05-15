// src/content/trucks.ts
// The list of truck IDs this site is responsible for. Drives the sitemap and
// city pages. Append a one-liner here when onboarding a new truck.
//
// All other truck data (name, description, zipcode → city, cuisine, menus,
// schedule, images, social links) comes LIVE from the backend at request
// time and is cached for 5 minutes via ISR. No PR needed for routine changes.

// TODO: ADD CONTENT — replace with your real truck IDs (strings, not numbers).
export const TRUCK_IDS: string[] = [
  // 'XXXXX',
  // 'XXXXX',
];

// Optional: surfaces a truck in the "Featured" slot on state/city hubs.
export const FEATURED_TRUCK_IDS = new Set<string>([
  // 'XXXXX',
]);
