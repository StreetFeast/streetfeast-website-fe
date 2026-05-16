// src/content/cities/kentucky/somerset.ts
import type { CityContent } from '@/lib/content/types';

export const somerset: CityContent = {
  slug: 'somerset',
  name: 'Somerset',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  metaDescription:
    'Find food trucks in Somerset, Kentucky. Real-time locations, menus, and schedules for downtown lunch spots, Lake Cumberland events, and more.',

  intro: `Somerset has a small but active food truck scene that has grown steadily over the past few years. You'll find Kentucky BBQ and smoked meats, tacos and Latin street food, loaded mac and potatoes, Asian dishes, ice cream, and classic concession favorites all in regular rotation.

The most reliable lunch spot is Judicial Center Plaza downtown, where a rotating lineup of trucks sets up on weekdays. Weekends bring trucks to Fountain Square and the surrounding blocks of East Mt. Vernon Street, and Jarfly Brewing Company regularly hosts trucks on-site for dinner crowds. Activity picks up sharply from Memorial Day through Labor Day, when Lake Cumberland tourism brings extra foot traffic to Burnside and the marinas.

Somerset's calendar also pulls trucks in for bigger events. Foodstock takes over Fountain Square each spring, the Master Musicians Festival fills Somerset Community College's Festival Field with a full vendor row each July, and Thunder Over Burnside draws trucks to the lake on Labor Day weekend.

Hours and locations shift truck to truck. Some run weekday lunch only, others chase festivals and brewery nights, and a few work private events you wouldn't find otherwise. That's where StreetFeast comes in. The app shows you which trucks in Somerset are open right now, where they're parked, and where they're heading next. [Download today!](/download)`,

  neighborhoods: [
    'Fountain Square',
    'Judicial Center Plaza',
    'East Mt. Vernon Street',
    'Somerset Community College',
    'Jarfly Brewing Company',
    'SomerSplash Waterpark',
    'Burnside',
  ],

  faq: [
    {
      q: 'Where are food trucks parked in Somerset, KY?',
      a: "Judicial Center Plaza downtown is the most reliable weekday lunch spot, with a rotating lineup of trucks setting up through the week. On weekends, trucks cluster around Fountain Square and the East Mt. Vernon Street corridor, and Jarfly Brewing Company regularly hosts trucks on-site. During lake season, you'll also find them at events around Burnside and Lake Cumberland.",
    },
    {
      q: 'When do food trucks operate in Somerset?',
      a: "Hours vary truck to truck. Weekday operators usually run lunch from around 11am to 2pm at Judicial Center Plaza and downtown, while breweries and festivals draw trucks for dinner and weekend service. The scene peaks from Memorial Day through Labor Day when lake tourism is in full swing, but core downtown trucks run year round.",
    },
    {
      q: 'Are there food truck festivals in Somerset?',
      a: "Yes. Foodstock is the biggest, a spring food truck festival hosted at Fountain Square each year by the City of Somerset. The Master Musicians Festival in July brings a full vendor row to Somerset Community College's Festival Field, and Thunder Over Burnside on Labor Day weekend pulls trucks to the lake.",
    },
    {
      q: "How do I find tonight's food trucks in Somerset?",
      a: "Schedules in Somerset shift daily, with weather, brewery bookings, lake events, and private gigs moving trucks around. The easiest way to see what's open tonight is to [download the StreetFeast app](/download). It shows which trucks are serving right now, where they're parked, and where they plan to head next.",
    },
  ],
};
