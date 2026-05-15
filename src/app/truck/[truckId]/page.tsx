// src/app/truck/[truckId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getTruckDetailsServer,
  getTruckOccurrencesServer,
  getTruckMenuServer,
} from '@/lib/api/server';
import { cityFromZipcode } from '@/lib/location/zipcode';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  foodEstablishmentJsonLd,
  breadcrumbJsonLd,
} from '@/lib/seo/jsonld';
import { JsonLd } from '@/lib/seo/json-ld';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import TruckProfileClient from './TruckProfileClient';

const STORAGE_PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? '';

export const revalidate = 300;

type PageProps = { params: Promise<{ truckId: string }> };

function todayLocalISO(): string {
  return new Date().toISOString().split('T')[0];
}

function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

function heroImageMeta(truck: { images?: Array<{ imageUri?: string | null }> | null }) {
  const uri = truck.images?.[0]?.imageUri;
  if (!uri) return undefined;
  const url = uri.startsWith('http') ? uri : `${STORAGE_PREFIX}${uri}`;
  return { url, width: 1200, height: 630, alt: 'Food truck' };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { truckId } = await params;
  const truck = await getTruckDetailsServer(truckId);
  if (!truck) return { robots: { index: false, follow: false } };

  const location = cityFromZipcode(truck.zipCode);
  const locationSuffix = location
    ? ` — Food Truck in ${location.city}, ${location.state}`
    : '';

  const description = truncate(
    truck.description ??
      `${truck.name} is a food truck${
        location ? ` operating in ${location.city}, ${location.state}` : ''
      }. View their menu, hours, and upcoming schedule on StreetFeast.`,
    160
  );

  return buildMetadata({
    title: `${truck.name}${locationSuffix}`,
    description,
    path: `/truck/${truckId}`,
    image: heroImageMeta(truck),
  });
}

export default async function TruckPage({ params }: PageProps) {
  const { truckId } = await params;
  const truck = await getTruckDetailsServer(truckId);
  if (!truck) notFound();

  const [occurrences, defaultMenu] = await Promise.all([
    getTruckOccurrencesServer(truckId, todayLocalISO(), in30DaysISO()),
    truck.defaultMenuId
      ? getTruckMenuServer(truckId, truck.defaultMenuId)
      : Promise.resolve(null),
  ]);

  const location = cityFromZipcode(truck.zipCode);

  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    ...(location
      ? [
          { name: location.stateName, path: `/food-trucks/${location.stateSlug}` },
          {
            name: location.city,
            path: `/food-trucks/${location.stateSlug}/${location.citySlug}`,
          },
        ]
      : []),
    { name: truck.name, path: `/truck/${truckId}` },
  ];

  return (
    <>
      <JsonLd
        data={foodEstablishmentJsonLd(truck, location, occurrences, STORAGE_PREFIX)}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumb items={crumbs} />
      <TruckProfileClient
        truck={truck}
        initialOccurrences={occurrences}
        initialDefaultMenu={defaultMenu}
        location={location}
      />
    </>
  );
}
