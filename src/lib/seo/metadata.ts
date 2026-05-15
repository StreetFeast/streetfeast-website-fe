// src/lib/seo/metadata.ts
import type { Metadata } from 'next';

const SITE_URL = 'https://streetfeastapp.com';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

const DEFAULT_IMAGE = {
  url: '/social-media-logo.png',
  width: 1352,
  height: 632,
  alt: 'StreetFeast',
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const image = input.image ?? DEFAULT_IMAGE;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: 'StreetFeast',
      images: [image],
      locale: 'en_US',
      type: input.type ?? 'website',
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image.url],
      creator: '@streetfeast',
    },
  };
}
