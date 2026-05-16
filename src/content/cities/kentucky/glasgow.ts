// src/content/cities/kentucky/glasgow.ts
import type { CityContent } from '@/lib/content/types';

export const glasgow: CityContent = {
  slug: 'glasgow',
  name: 'Glasgow',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  metaDescription:
    'Find food trucks in Glasgow, Kentucky. See real-time locations, menus, and schedules for the best street food, BBQ, and dessert across Barren County.',

  intro: `Glasgow has a friendly small-town food truck scene that grows a little bigger each year. You'll find BBQ smokers, taco trucks, burger trailers, and dessert stands pulling into lots around town, often near where folks already gather for shopping, work, or events.

A lot of trucks set up along the US-31E Bypass and over near The Plaza, since those spots stay busy with lunch traffic and have room for cars to pull in. Downtown around the Public Square also sees pop-ups during festivals and warm weekends, and Happy Valley Road catches steady weekday traffic.

Beyond the regular lunch spots, you'll see trucks pop up at car shows, church events, school fundraisers, and Friday nights outside local shops. A few park near T.J. Samson Community Hospital and The Grove to catch the lunch crowd from nearby offices, and breweries and event venues book trucks for weekend service.

Hours and locations shift a lot in Glasgow. A truck might post up at The Plaza one day and run a private event the next, and weather has a way of changing plans fast. That's where StreetFeast helps. The app shows you which Glasgow trucks are open right now, where they're parked, and where they plan to head next. [Download today!](/download)`,

  neighborhoods: [
    'Downtown Glasgow',
    'The Plaza',
    'Happy Valley Road',
    'South Glasgow / Bypass',
    'The Grove',
  ],

  faq: [
    {
      q: 'Where are food trucks parked in Glasgow, KY?',
      a: "Glasgow food trucks usually park along the US-31E Bypass and around The Plaza, where lunch traffic is steady and there's room to pull in. You'll also spot them downtown near the Public Square during festivals and warm weekends, on Happy Valley Road, and near T.J. Samson and The Grove for office lunches. Car shows, church events, and brewery nights bring extra trucks out around town.",
    },
    {
      q: 'How do I know which trucks are open right now?',
      a: "The easiest way is to [download the StreetFeast app](/download). It shows you which Glasgow trucks are serving right now, where they're parked, and what they have on the menu. Schedules shift daily based on weather, private bookings, and events, so checking the app beats driving around hoping to spot one.",
    },
    {
      q: 'What hours do Glasgow food trucks usually serve?',
      a: "Most Glasgow trucks run a lunch shift between 11am and 2pm at busy lots and office areas. Dinner service is less common on weekdays but picks up on Friday and Saturday nights, especially in the warmer months. Festivals, ball games, and community events bring extra trucks out, often serving from late morning into the evening.",
    },
  ],
};
