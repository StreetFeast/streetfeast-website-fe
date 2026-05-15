// src/lib/seo/jsonld.ts
import type { TruckDetailResponse, TruckOccurrence } from '@/types/api';
import type { CityLocation } from '@/lib/location/zipcode';
import type { FaqItem } from '@/lib/content/types';

const SITE_URL = 'https://streetfeastapp.com';
const SITE_NAME = 'StreetFeast';
const LOGO_URL = `${SITE_URL}/streetfeastlogowhite.png`;

const APP_STORE_URL = 'https://apps.apple.com/app/streetfeast/id6504638546';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.streetfeast.app';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: [
      'https://www.instagram.com/streetfeastapp',
      'https://www.facebook.com/streetfeastapp',
      'https://x.com/streetfeast',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

export function mobileApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${SITE_URL}#app`,
    name: SITE_NAME,
    operatingSystem: 'iOS, ANDROID',
    applicationCategory: 'FoodAndDrink',
    description:
      'Find food trucks, street vendors, and pop-up restaurants near you with real-time locations, menus, and schedules.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    installUrl: [APP_STORE_URL, PLAY_STORE_URL],
    downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: Array<{ url: string; name: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}${item.url}`,
      name: item.name,
    })),
  };
}

function buildOpeningHoursSpec(occurrences: TruckOccurrence[]) {
  return occurrences
    .filter((o) => !o.isClosed)
    .slice(0, 7)
    .map((o) => ({
      '@type': 'OpeningHoursSpecification',
      opens: o.openTimeLocal,
      closes: o.closeTimeLocal,
      validFrom: o.openTimeLocal,
      validThrough: o.closeTimeLocal,
    }));
}

export function foodEstablishmentJsonLd(
  truck: TruckDetailResponse,
  location: CityLocation | null,
  occurrences: TruckOccurrence[],
  storagePrefix: string
) {
  const heroImage = truck.images?.[0]?.imageUri
    ? truck.images[0].imageUri.startsWith('http')
      ? truck.images[0].imageUri
      : `${storagePrefix}${truck.images[0].imageUri}`
    : undefined;

  const sameAs = [
    truck.instagram && (truck.instagram.startsWith('http')
      ? truck.instagram
      : `https://instagram.com/${truck.instagram.replace('@', '')}`),
    truck.facebook && (truck.facebook.startsWith('http')
      ? truck.facebook
      : `https://facebook.com/${truck.facebook}`),
    truck.tiktok && (truck.tiktok.startsWith('http')
      ? truck.tiktok
      : `https://tiktok.com/@${truck.tiktok.replace('@', '')}`),
    truck.x && (truck.x.startsWith('http')
      ? truck.x
      : `https://x.com/${truck.x.replace('@', '')}`),
    truck.website && (truck.website.startsWith('http')
      ? truck.website
      : `https://${truck.website}`),
  ].filter((s): s is string => Boolean(s));

  const url = `${SITE_URL}/truck/${truck.id}`;
  const openingHours = buildOpeningHoursSpec(occurrences);

  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${url}#truck`,
    name: truck.name,
    ...(truck.description && { description: truck.description }),
    url,
    ...(heroImage && { image: [heroImage] }),
    ...(truck.phone && { telephone: truck.phone }),
    ...(truck.cuisine && { servesCuisine: truck.cuisine }),
    ...(location && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.latitude,
        longitude: location.longitude,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.city,
        addressRegion: location.state,
        addressCountry: 'US',
        ...(truck.zipcode && { postalCode: truck.zipcode }),
      },
    }),
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
