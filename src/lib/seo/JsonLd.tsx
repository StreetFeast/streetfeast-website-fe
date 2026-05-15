// src/lib/seo/JsonLd.tsx
// Server-rendered <script> tag for JSON-LD structured data.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
