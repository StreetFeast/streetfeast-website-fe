// src/content/cities/kentucky/elizabethtown.ts
// NOTE: This city has no active trucks at launch. The page renders with noindex
// until at least one truck's zipcode resolves to Elizabethtown.
import type { CityContent } from '@/lib/content/types';

export const elizabethtown: CityContent = {
  slug: 'elizabethtown',
  name: 'Elizabethtown',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  // TODO: ADD CONTENT
  metaDescription:
    'Find food trucks in Elizabethtown, Kentucky. Real-time locations, menus, and schedules.',

  // TODO: ADD CONTENT — 200+ words unique to Elizabethtown.
  intro: `Elizabethtown's food truck scene...`,

  // TODO: ADD CONTENT
  neighborhoods: [
    // 'Downtown E-town',
    // 'Freeman Lake Park',
  ],

  // TODO: ADD CONTENT
  faq: [
    { q: 'Are there food trucks in Elizabethtown, KY?', a: '...' },
    { q: '...', a: '...' },
  ],
};
