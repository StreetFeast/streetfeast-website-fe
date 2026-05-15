import { Faq } from '@/components/Faq';
import { JsonLd } from '@/lib/seo/json-ld';
import { faqPageJsonLd } from '@/lib/seo/jsonld';
import { HOME_FAQ } from '@/content/home';

export default function HomeFaq() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQ)} />
      <Faq items={HOME_FAQ} heading="Food Truck FAQ" />
    </>
  );
}
