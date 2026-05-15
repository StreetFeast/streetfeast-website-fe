// src/lib/content/types.ts
export type FaqItem = { q: string; a: string };

export type StateContent = {
  slug: string;
  name: string;
  abbreviation: string;
  metaDescription: string;
  intro: string;
  faq: FaqItem[];
  heroImage?: { src: string; alt: string };
};

export type CityContent = {
  slug: string;
  name: string;
  stateSlug: string;
  stateName: string;
  stateAbbr: string;
  metaDescription: string;
  intro: string;
  neighborhoods?: string[];
  faq: FaqItem[];
  aliases?: string[];
  heroImage?: { src: string; alt: string };
};
