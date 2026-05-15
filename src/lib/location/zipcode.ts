// src/lib/location/zipcode.ts
// IMPORTANT: This file imports the `zipcodes` package which contains the full
// US zipcode database. Never import this file from a client component.
// The `import 'server-only'` directive throws a build-time error if you try.

import 'server-only';
import { lookup } from 'zipcodes';

export type CityLocation = {
  city: string;       // "Bowling Green"
  citySlug: string;   // "bowling-green"
  state: string;      // "KY"
  stateName: string;  // "Kentucky"
  stateSlug: string;  // "kentucky"
  latitude: number;
  longitude: number;
};

// Add states here as the platform expands beyond Kentucky.
const STATE_NAMES: Record<string, string> = {
  KY: 'Kentucky',
  // LA: 'Louisiana',
  // VA: 'Virginia',
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function cityFromZipcode(zip: string | null | undefined): CityLocation | null {
  if (!zip) return null;
  const data = lookup(zip);
  if (!data) return null;
  const stateName = STATE_NAMES[data.state] ?? data.state;
  return {
    city: data.city,
    citySlug: slugify(data.city),
    state: data.state,
    stateName,
    stateSlug: slugify(stateName),
    latitude: data.latitude,
    longitude: data.longitude,
  };
}
