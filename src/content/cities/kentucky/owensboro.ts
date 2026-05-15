// src/content/cities/kentucky/owensboro.ts
// NOTE: This city has no active trucks at launch. The page renders with noindex
// until at least one truck's zipcode resolves to Owensboro.
import type { CityContent } from '@/lib/content/types';

export const owensboro: CityContent = {
  slug: 'owensboro',
  name: 'Owensboro',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  // TODO: ADD CONTENT
  metaDescription:
    'Find food trucks in Owensboro, Kentucky. Real-time locations, menus, and schedules.',

  // TODO: ADD CONTENT — 200+ words unique to Owensboro.
  intro: `Owensboro's food truck scene...`,

  // TODO: ADD CONTENT
  neighborhoods: [
    // 'Downtown Owensboro',
    // 'Riverfront / Smothers Park',
  ],

  // TODO: ADD CONTENT
  faq: [
    { q: 'Are there food trucks in Owensboro, KY?', a: '...' },
    { q: '...', a: '...' },
  ],
};
