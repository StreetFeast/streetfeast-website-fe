// src/lib/api/server.ts
import 'server-only';
import { unstable_cache } from 'next/cache';
import { TRUCK_IDS, FEATURED_TRUCK_IDS } from '@/content/trucks';
import { cityFromZipcode, type CityLocation } from '@/lib/location/zipcode';
import type { TruckDetailResponse, TruckOccurrence, Menu } from '@/types/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export type EnrichedTruck = TruckDetailResponse & {
  location: CityLocation | null;
  isFeatured: boolean;
};

async function safeFetchJson<T>(
  url: string,
  next: { revalidate?: number; tags?: string[] }
): Promise<T | null> {
  try {
    const res = await fetch(url, { next });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function fetchTruckDetails(truckId: string): Promise<TruckDetailResponse | null> {
  return safeFetchJson<TruckDetailResponse>(`${API_BASE}/api/v1/Truck/${truckId}`, {
    revalidate: 300,
    tags: [`truck:${truckId}`],
  });
}

export function getTruckDetailsServer(
  truckId: string
): Promise<TruckDetailResponse | null> {
  return fetchTruckDetails(truckId);
}

export async function getTruckOccurrencesServer(
  truckId: string,
  startLocal: string,
  endLocal: string
): Promise<TruckOccurrence[]> {
  const url = `${API_BASE}/api/v1/Truck/${truckId}/Schedule/Occurrences?startLocal=${encodeURIComponent(startLocal)}&endLocal=${encodeURIComponent(endLocal)}`;
  const result = await safeFetchJson<TruckOccurrence[]>(url, {
    revalidate: 300,
    tags: [`truck:${truckId}`],
  });
  return result ?? [];
}

export async function getTruckMenuServer(
  truckId: string,
  menuId: number
): Promise<Menu | null> {
  const url = `${API_BASE}/api/v1/Truck/${truckId}/Menu?menuId=${menuId}`;
  const data = await safeFetchJson<Menu | Menu[]>(url, {
    revalidate: 600,
    tags: [`truck:${truckId}`],
  });
  if (!data) return null;
  // API may return an array; normalize to single Menu
  if (Array.isArray(data)) {
    const first = data[0];
    if (!first) return null;
    return {
      id: menuId,
      truckId: Number(truckId),
      name: '',
      description: null,
      categories: first.categories,
      isDefault: true,
      imageUri: first.imageUri,
    };
  }
  return data;
}

// Group surrounding-area cities under their nearest hub city.
const CITY_REMAP: Record<string, { city: string; citySlug: string }> = {
  monticello: { city: 'Somerset', citySlug: 'somerset' },
  alvaton: { city: 'Bowling Green', citySlug: 'bowling-green' },
};

function applyCityRemap(location: CityLocation | null): CityLocation | null {
  if (!location) return location;
  const remap = CITY_REMAP[location.citySlug];
  if (!remap) return location;
  return { ...location, city: remap.city, citySlug: remap.citySlug };
}

export const getEnrichedTrucks = unstable_cache(
  async (): Promise<EnrichedTruck[]> => {
    const results = await Promise.all(
      TRUCK_IDS.map(async (id) => {
        const truck = await fetchTruckDetails(id);
        if (!truck) return null;
        return {
          ...truck,
          location: applyCityRemap(cityFromZipcode(truck.zipCode)),
          isFeatured: FEATURED_TRUCK_IDS.has(id),
        };
      })
    );
    return results.filter((t): t is EnrichedTruck => t !== null);
  },
  ['enriched-trucks-v2'],
  { revalidate: 3600, tags: ['trucks'] }
);

export async function getTrucksByCity(
  stateSlug: string,
  citySlug: string,
  acceptedAliases: string[] = []
): Promise<EnrichedTruck[]> {
  const accepted = new Set<string>([citySlug, ...acceptedAliases]);
  const all = await getEnrichedTrucks();
  return all.filter(
    (t) => t.location?.stateSlug === stateSlug && accepted.has(t.location.citySlug)
  );
}

export async function getTrucksByState(stateSlug: string): Promise<EnrichedTruck[]> {
  const all = await getEnrichedTrucks();
  return all.filter((t) => t.location?.stateSlug === stateSlug);
}
