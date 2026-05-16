// src/content/cities/kentucky/scottsville.ts
import type { CityContent } from '@/lib/content/types';

export const scottsville: CityContent = {
  slug: 'scottsville',
  name: 'Scottsville',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  // TODO: ADD CONTENT — 150-160 chars. Must include "food trucks" + "Scottsville" + "Kentucky".
  metaDescription:
    'Find food trucks in Scottsville, Kentucky. Real-time locations, menus, and schedules for street food across Allen County.',

  // TODO: ADD CONTENT — 200+ words unique to Scottsville. Mention the courthouse square,
  // Dollar General Park, the Highland Stoneware area, lake/Barren River traffic, etc.
  // AVOID reusing copy from other Kentucky city pages — Google penalizes templated location pages.
  intro: `Scottsville's food truck scene...`,

  // TODO: ADD CONTENT — popular spots where food trucks actually park in Scottsville.
  neighborhoods: [
    // 'Downtown Square',
    // 'Dollar General Park',
    // 'Highway 31E corridor',
  ],

  // TODO: ADD CONTENT — 4-6 questions specific to Scottsville. Make answers useful.
  faq: [
    { q: 'Where are food trucks parked in Scottsville, KY?', a: '...' },
    { q: 'When do food trucks operate in Scottsville?', a: '...' },
    { q: "How do I find tonight's food trucks in Scottsville?", a: '...' },
  ],

  // Optional: if a nearby postal community resolves via zipcode to something other than
  // "Scottsville" but should appear on this city page, add the slugified name here.
  // aliases: ['holland', 'fountain-run'],
};
