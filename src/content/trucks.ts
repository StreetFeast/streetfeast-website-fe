// src/content/trucks.ts
// The list of truck IDs this site is responsible for. Drives the sitemap and
// city pages. Append a one-liner here when onboarding a new truck.
//
// All other truck data (name, description, zipcode → city, cuisine, menus,
// schedule, images, social links) comes LIVE from the backend at request
// time and is cached for 5 minutes via ISR. No PR needed for routine changes.

// TODO: ADD CONTENT — replace with your real truck IDs (strings, not numbers).
export const TRUCK_IDS: string[] = [
  "9",
  "14",
  "10",
  "13",
  "15",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22", 
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68"
];

// Optional: surfaces a truck in the "Featured" slot on state/city hubs.
export const FEATURED_TRUCK_IDS = new Set<string>([
  // 'XXXXX',
]);
