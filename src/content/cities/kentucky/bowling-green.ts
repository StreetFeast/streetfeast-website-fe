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

  intro: `Bowling Green has a vibrant and growing food truck scene, with new operators rolling out across town and a real range of cuisine on offer. Latin American street food, sweet and savory crepes, slow-smoked BBQ, southern-style cooking, smash burgers, and plenty more are all in regular rotation.

You'll usually spot trucks parked off Scottsville Road or Nashville Road, where the highway corridors give them visibility and easy access for the lunch crowd. This is especially true in the warmer months.

The scene reflects Bowling Green's mix of college-town energy and broader Kentucky food culture, with operators ranging from longtime locals to newcomers building a following one parking lot at a time. Hours vary truck to truck: some focus on weekday office lunches, others run dinner shifts at breweries, and many work private events you'd never find unless you knew where to look.

That's where StreetFeast comes in. Schedules shift, weather forces moves, and the best trucks don't always post in advance, but the app shows you which trucks in Bowling Green are open right now, where they're parked, and where they're heading next. [Download today!](/download)`,

  // TODO: ADD CONTENT — popular spots where food trucks actually park. These render
  // visibly and pick up hyperlocal search traffic ("food trucks WKU", etc.).
  neighborhoods: [
    'Fountain Square Park',
    "Circus Square Park",
    'WKU Campus',
    'White Squirrel Brewery',
    'Fruit Of The Loom',
    "Joe B's Bar",
    "Leachman Buick"
  ],

  // TODO: ADD CONTENT — 4-6 questions specific to Bowling Green. Make answers genuinely useful.
  faq: [
    {
      q: 'Where are food trucks parked in Bowling Green?',
      a: "Bowling Green food trucks tend to cluster along the Scottsville Road and Nashville Road corridors, where steady traffic and visible lots make it easy to pull in for lunch. You'll also see regular stops at Fountain Square Park, Circus Square Park, breweries like White Squirrel, and workplaces like Fruit of the Loom and Leachman Buick.",
    },
    {
      q: 'When do food trucks operate in Bowling Green?',
      a: "Hours vary truck to truck. Most weekday operators run a lunch shift between 11am and 2pm at office parks and busy corridors, while others focus on dinner and weekend service at breweries and event venues. Activity peaks in the warmer months, but you'll find trucks rolling out year round.",
    },
    {
      q: "How do I find tonight's food trucks in Bowling Green?",
      a: "Schedules in Bowling Green change daily, with weather, brewery bookings, and private events shifting where trucks end up. The easiest way to find what's open tonight is to [download the StreetFeast app](/download). It shows you which trucks are serving right now, where they're parked, and where they plan to head next.",
    },
  ],

  // Optional: if a nearby postal community resolves via zipcode to something other than
  // "Bowling Green" but should appear on this city page, add the slugified name here.
  // aliases: ['plum-springs', 'oakland'],
};
