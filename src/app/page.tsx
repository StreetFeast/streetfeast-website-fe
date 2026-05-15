import { Header } from '@/components/Header';
import { HeroHeader } from '@/components/HeroHeader';
import { Footer } from '@/components/Footer';
import { HomeFeaturedCities } from '@/components/HomeFeaturedCities';
import { HomeHowItWorks } from '@/components/HomeHowItWorks';
import { HomeFaq } from '@/components/HomeFaq';
import { JsonLd } from '@/lib/seo/json-ld';
import { mobileApplicationJsonLd } from '@/lib/seo/jsonld';
import { getCitiesByState } from '@/content/cities';

export default function Home() {
  const kyCities = getCitiesByState('kentucky');
  return (
    <>
      <JsonLd data={mobileApplicationJsonLd()} />
      <Header />
      <HeroHeader />
      <HomeFeaturedCities cities={kyCities} />
      <HomeHowItWorks />
      <HomeFaq />
      <Footer />
    </>
  );
}
