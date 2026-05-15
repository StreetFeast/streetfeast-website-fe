import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import { CitiesGrid } from '@/components/CitiesGrid';
import { TruckCard } from '@/components/TruckCard';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/lib/seo/json-ld';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
} from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getStateContent,
  getAllStateRoutes,
} from '@/content/states';
import { getCitiesByState } from '@/content/cities';
import { getTrucksByState, getTruckOccurrencesServer } from '@/lib/api/server';
import styles from './page.module.css';

export const dynamicParams = false;
export const revalidate = 3600;

type PageProps = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return getAllStateRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const content = getStateContent(state);
  if (!content) return { robots: { index: false, follow: false } };
  return buildMetadata({
    title: `Food Trucks in ${content.name} — Find Street Food Across ${content.abbreviation}`,
    description: content.metaDescription,
    path: `/food-trucks/${state}`,
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

export default async function StateHub({ params }: PageProps) {
  const { state } = await params;
  const content = getStateContent(state);
  if (!content) notFound();

  const cities = getCitiesByState(state);
  const allTrucksInState = await getTrucksByState(state);
  const featured = allTrucksInState.filter((t) => t.isFeatured).slice(0, 6);

  const start = todayISO();
  const end = in30DaysISO();
  const featuredOccurrences = await Promise.all(
    featured.map((t) => getTruckOccurrencesServer(String(t.id), start, end))
  );

  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    { name: content.name, path: `/food-trucks/${state}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {cities.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            `${content.name} cities with food trucks`,
            cities.map((c) => ({
              url: `/food-trucks/${state}/${c.slug}`,
              name: c.name,
            }))
          )}
        />
      )}
      {content.faq.length > 0 && <JsonLd data={faqPageJsonLd(content.faq)} />}
      <Header />
      <main className={styles.main}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.h1}>Food Trucks in {content.name}</h1>
        <div className={styles.intro}>
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {featured.length > 0 && (
          <section className={styles.featured}>
            <h2 className={styles.h2}>Featured trucks</h2>
            <div className={styles.featuredGrid}>
              {featured.map((truck, i) => (
                <TruckCard
                  key={truck.id}
                  truck={truck}
                  occurrences={featuredOccurrences[i]}
                />
              ))}
            </div>
          </section>
        )}

        {cities.length > 0 && <CitiesGrid cities={cities} />}

        <Faq items={content.faq} heading={`${content.name} food truck FAQ`} />
      </main>
      <Footer />
    </>
  );
}
