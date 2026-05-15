// src/content/states/kentucky.ts
import type { StateContent } from '@/lib/content/types';

export const kentucky: StateContent = {
  slug: 'kentucky',
  name: 'Kentucky',
  abbreviation: 'KY',

  // TODO: ADD CONTENT — 150-160 char description with "food trucks" + "Kentucky" + a city or two.
  metaDescription:
    'Find food trucks across Kentucky — real-time locations, menus, and schedules in Bowling Green, Glasgow, Somerset, and beyond.',

  // TODO: ADD CONTENT — 200-300 words. Talk about KY's food truck scene, what makes it
  // distinct, where trucks tend to gather, the cultural/regional angle. This is the page's
  // main ranking signal — make it genuinely useful, not boilerplate.
  intro: `Kentucky's food truck scene...`,

  // TODO: ADD CONTENT — 4-6 state-level FAQs. Examples below; rewrite with real answers.
  faq: [
    {
      q: 'Where can I find food trucks in Kentucky?',
      a: 'Food trucks operate across Kentucky in cities like Bowling Green, Glasgow, Somerset, Elizabethtown, and Owensboro...',
    },
    {
      q: 'Do Kentucky food trucks operate year-round?',
      a: '...',
    },
    {
      q: 'How do I find the schedule for a Kentucky food truck?',
      a: '...',
    },
    {
      q: 'Can I book a Kentucky food truck for a private event?',
      a: '...',
    },
  ],
};
