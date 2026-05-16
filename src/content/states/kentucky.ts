// src/content/states/kentucky.ts
import type { StateContent } from '@/lib/content/types';

export const kentucky: StateContent = {
  slug: 'kentucky',
  name: 'Kentucky',
  abbreviation: 'KY',

  // TODO: ADD CONTENT — 150-160 char description with "food trucks" + "Kentucky" + a city or two.
  metaDescription:
    'Find food trucks across Kentucky — real-time locations, menus, and schedules in Bowling Green, Glasgow, Somerset, and beyond.',

  intro: `Kentucky has a lot more food trucks than most people realize, and they cover a wide range of food. On any given weekend you might see smoked brisket and pulled pork coming out of a trailer at a brewery, street tacos and elotes at a farmers market, Korean fried chicken parked near campus, Detroit style pizza outside a hardware store, or loaded gyros working the late shift at a downtown event. For a state best known for bourbon, basketball, and country ham, the food showing up at the curb is a lot broader than most folks expect.

The reason this works so well is that a food truck makes it easy to try something new without much risk. Opening a real restaurant in a small Kentucky town is a big step, and a lot of the food you would find in a bigger city has been hard to track down outside of Louisville or Lexington. A truck changes that. A cook with a good recipe and some basic gear can park at a brewery in Bowling Green, a lunch spot in Glasgow, or a festival in Somerset and feed a real crowd without signing a long lease. That means you can try a Mexican plate from a specific region, a Thai noodle bowl, or Caribbean jerk chicken on a Tuesday lunch break without driving two hours.

Trucks usually show up where people are already gathered, so breweries, coffee shops, Friday night markets, college campuses, county fairs, and park events are the best places to check. Schedules change week to week, so a current map is more useful here than a list of fixed addresses.`,

  // TODO: ADD CONTENT — 4-6 state-level FAQs. Examples below; rewrite with real answers.
  faq: [
    {
      q: 'Where can I find food trucks in Kentucky?',
      a: 'You can find trucks all over the state, from Bowling Green and Glasgow to Somerset and Scottsville. Most park at breweries, coffee shops, farmers markets, college campuses, and weekend events. Since locations move around, the easiest way to track them down is to check a live map.',
    },
    {
      q: 'Do Kentucky food trucks operate year-round?',
      a: 'A lot of trucks run all year, but the lineup gets bigger from spring through fall when outdoor events pick up. In the winter, many trucks pull back to indoor brewery taprooms, private catering, or a smaller weekly schedule. Checking the current week is the best way to see who is actually out.',
    },
    {
      q: 'How do I find the schedule for a Kentucky food truck?',
      a: 'Most trucks post their week on social media or share it with the spots they park at, which makes it hard to keep up with more than one or two. StreetFeast pulls these schedules together in one place so you can see who is open near you today without checking each truck on its own.',
    },
    {
      q: 'Can I book a Kentucky food truck for a private event?',
      a: 'Yes, most trucks take private bookings for weddings, birthday parties, company lunches, and neighborhood get-togethers. Pricing and minimums depend on the truck, your guest count, and how far they have to drive. Reach out a few weeks ahead, especially for weekends in spring and fall.',
    },
  ],
};
