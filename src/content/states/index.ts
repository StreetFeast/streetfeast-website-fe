// src/content/states/index.ts
import type { StateContent } from '@/lib/content/types';
import { kentucky } from './kentucky';

export const ALL_STATES: StateContent[] = [kentucky];

export function getStateContent(stateSlug: string): StateContent | null {
  return ALL_STATES.find((s) => s.slug === stateSlug) ?? null;
}

export function getAllStateRoutes(): Array<{ state: string }> {
  return ALL_STATES.map((s) => ({ state: s.slug }));
}
