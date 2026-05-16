// src/content/home.ts
import type { FaqItem } from '@/lib/content/types';

export const HOME_FAQ: FaqItem[] = [
  {
    q: 'How do I find food trucks near me?',
    a: '[Download the StreetFeast app](/download) to see food trucks near your current location in real time. The map shows which trucks are open right now, where they are parked, and when they plan to move next - so you can grab a meal without guessing.',
  },
  {
    q: 'Are food truck schedules updated in real time?',
    a: 'Yes. Vendors maintain and update their schedules directly inside StreetFeast, so opening hours, stops, and last-minute changes are reflected on the map within minutes instead of living on social media posts you might miss.',
  },
  {
    q: 'Can I see menus before visiting a food truck?',
    a: 'Yes. StreetFeast lets food trucks upload their menu so you know exactly what to expect before you make the trip.',
  },
  {
    q: 'Does StreetFeast cover food trucks in Kentucky?',
    a: 'Yes. StreetFeast tracks food trucks across Kentucky, with active coverage in Bowling Green, Glasgow, Somerset, and Scottsville, and we are adding new cities as more vendors join.',
  },
  {
    q: 'Does StreetFeast work outside of Kentucky?',
    a: 'Yes. While our deepest coverage is in Kentucky, food trucks across the country are already registered on StreetFeast, and any vendor can list their truck and start sharing their schedule with hungry locals nationwide.',
  },
  {
    q: 'Is StreetFeast free to use?',
    a: 'Yes. StreetFeast is free for food truck vendors and for the foodies hunting them down - no subscription, just an easier way to connect trucks with the people who want to eat at them.',
  },
];

export const HOW_IT_WORKS: Array<{ title: string; body: string }> = [
  {
    title: 'Discover trucks near you',
    body: 'Open the StreetFeast app to see every food truck operating nearby right now. The live map shows where each truck is parked, and what kind of food they serve. Allowing you to decide where to eat in seconds.',
  },
  {
    title: 'See real-time schedules',
    body: 'Trucks maintain and update their schedule in real time inside StreetFeast. You will always see current hours, today\'s stops, and any last-minute changes - no more driving across town to a spot that closed an hour ago.',
  },
  {
    title: 'Follow your favorite trucks',
    body: 'Save the trucks you love and we will let you know each morning which of your favorites are out, where they are headed, and what they are serving - so you never miss a visit from the trucks you crave most.',
  },
];
