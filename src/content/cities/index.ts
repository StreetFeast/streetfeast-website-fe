// src/content/cities/index.ts
import type { CityContent } from '@/lib/content/types';
import { bowlingGreen } from './kentucky/bowling-green';
import { glasgow } from './kentucky/glasgow';
import { somerset } from './kentucky/somerset';
import { elizabethtown } from './kentucky/elizabethtown';
import { owensboro } from './kentucky/owensboro';
import { scottsville } from './kentucky/scottsville';

export const ALL_CITIES: CityContent[] = [
  bowlingGreen,
  glasgow,
  somerset,
  elizabethtown,
  owensboro,
  scottsville,
];

export function getCityContent(stateSlug: string, citySlug: string): CityContent | null {
  return (
    ALL_CITIES.find((c) => c.stateSlug === stateSlug && c.slug === citySlug) ?? null
  );
}

export function getAllCityRoutes(): Array<{ state: string; city: string }> {
  return ALL_CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }));
}

export function getCitiesByState(stateSlug: string): CityContent[] {
  return ALL_CITIES.filter((c) => c.stateSlug === stateSlug);
}
