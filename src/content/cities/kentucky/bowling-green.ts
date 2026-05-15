// src/content/cities/kentucky/bowling-green.ts
import type { CityContent } from '@/lib/content/types';

export const bowlingGreen: CityContent = {
  slug: 'bowling-green',
  name: 'Bowling Green',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  // TODO: ADD CONTENT — 150-160 chars. Must include "food trucks" + "Bowling Green" + "Kentucky".
  metaDescription:
    'Find food trucks in Bowling Green, Kentucky. Real-time locations, menus, and schedules for the best street food in BG.',

  // TODO: ADD CONTENT — 200+ words of unique editorial. Mention WKU, Fountain Square,
  // common parking spots, when/where trucks cluster, the cultural angle. AVOID duplicating
  // copy across cities — Google penalizes templated location pages.
  intro: `Bowling Green's food truck scene...`,

  // TODO: ADD CONTENT — popular spots where food trucks actually park. These render
  // visibly and pick up hyperlocal search traffic ("food trucks WKU", etc.).
  neighborhoods: [
    'Downtown / Fountain Square',
    'WKU Campus',
    // 'Greenwood Mall area',
    // 'Scottsville Road corridor',
  ],

  // TODO: ADD CONTENT — 4-6 questions specific to Bowling Green. Make answers genuinely useful.
  faq: [
    { q: 'Where are food trucks parked in Bowling Green?', a: '...' },
    { q: 'Are there food trucks near WKU?', a: '...' },
    { q: 'When do food trucks operate in Bowling Green?', a: '...' },
    { q: "How do I find tonight's food trucks in Bowling Green?", a: '...' },
  ],

  // Optional: if a nearby postal community resolves via zipcode to something other than
  // "Bowling Green" but should appear on this city page, add the slugified name here.
  // aliases: ['plum-springs', 'oakland'],
};
