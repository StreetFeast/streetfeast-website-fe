import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import { TruckCard } from '@/components/TruckCard';
import { EmptyCityState } from '@/components/EmptyCityState';
import { NearbyCities } from '@/components/NearbyCities';
import { NeighborhoodsBlock } from '@/components/NeighborhoodsBlock';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/lib/seo/json-ld';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
} from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getCityContent,
  getAllCityRoutes,
  getCitiesByState,
} from '@/content/cities';
import { getTrucksByCity, getTruckOccurrencesServer } from '@/lib/api/server';
import styles from './page.module.css';

export const dynamicParams = false;
export const revalidate = 3600;

type PageProps = { params: Promise<{ state: string; city: string }> };

export async function generateStaticParams() {
  return getAllCityRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const content = getCityContent(state, city);
  if (!content) return { robots: { index: false, follow: false } };
  const trucks = await getTrucksByCity(state, city, content.aliases ?? []);
  return buildMetadata({
    title: `${content.name} Food Trucks — Where to Find Street Food in ${content.stateName}`,
    description: content.metaDescription,
    path: `/food-trucks/${state}/${city}`,
    noindex: trucks.length === 0,
  });
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}
function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const content = getCityContent(state, city);
  if (!content) notFound();

  const trucks = await getTrucksByCity(state, city, content.aliases ?? []);
  const otherCities = getCitiesByState(state).filter((c) => c.slug !== city);

  const start = todayISO();
  const end = in30DaysISO();
  const truckOccurrences = await Promise.all(
    trucks.map((t) => getTruckOccurrencesServer(String(t.id), start, end))
  );

  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    { name: content.stateName, path: `/food-trucks/${state}` },
    { name: content.name, path: `/food-trucks/${state}/${city}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {trucks.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            `Food trucks in ${content.name}, ${content.stateName}`,
            trucks.map((t) => ({
              url: `/truck/${t.id}`,
              name: t.name,
            }))
          )}
        />
      )}
      {content.faq.length > 0 && <JsonLd data={faqPageJsonLd(content.faq)} />}
      <Header />
      <main className={styles.main}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.h1}>
          Food Trucks in {content.name}, {content.stateName}
        </h1>
        <div className={styles.intro}>
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {trucks.length > 0 ? (
          <section className={styles.trucks}>
            <h2 className={styles.h2}>Active food trucks in {content.name}</h2>
            <div className={styles.truckGrid}>
              {trucks.map((truck, i) => (
                <TruckCard
                  key={truck.id}
                  truck={truck}
                  occurrences={truckOccurrences[i]}
                />
              ))}
            </div>
          </section>
        ) : (
          <EmptyCityState cityName={content.name} />
        )}

        {content.neighborhoods && content.neighborhoods.length > 0 && (
          <NeighborhoodsBlock items={content.neighborhoods} cityName={content.name} />
        )}

        {otherCities.length > 0 && (
          <NearbyCities cities={otherCities} stateSlug={state} />
        )}

        <Faq items={content.faq} heading={`${content.name} food truck FAQ`} />
      </main>
      <Footer />
    </>
  );
}
