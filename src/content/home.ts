// src/content/home.ts
import type { FaqItem } from '@/lib/content/types';

// TODO: ADD CONTENT — 4-6 general FAQs. These are app-level, not city-specific.
// Make answers helpful enough to be eligible for FAQ rich snippets in SERP.
export const HOME_FAQ: FaqItem[] = [
  {
    q: 'How do I find food trucks near me?',
    a: 'Download the StreetFeast app to see food trucks near your current location in real time...',
  },
  {
    q: 'Are food truck schedules updated in real time?',
    a: '...',
  },
  {
    q: 'Can I see menus before visiting a food truck?',
    a: '...',
  },
  {
    q: 'Does StreetFeast cover food trucks in Kentucky?',
    a: 'Yes. StreetFeast tracks food trucks across Kentucky, with active coverage in Bowling Green, Glasgow, and Somerset...',
  },
  {
    q: 'Is StreetFeast free to use?',
    a: '...',
  },
];

// TODO: ADD CONTENT — 3-step explainer, ~50 words each.
export const HOW_IT_WORKS: Array<{ title: string; body: string }> = [
  {
    title: 'Discover trucks near you',
    body: 'Open the StreetFeast app to see every food truck operating nearby right now...',
  },
  {
    title: 'See real-time schedules',
    body: '...',
  },
  {
    title: 'Favorite and follow your top trucks',
    body: '...',
  },
];
