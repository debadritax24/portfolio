interface JsonLdProps {
  data: Record<string, unknown>;
  nonce?: string;
}

export function JsonLd({ data, nonce }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface JsonLdGraphProps {
  items: Array<Record<string, unknown>>;
  nonce?: string;
}

export function JsonLdGraph({ items, nonce }: JsonLdGraphProps) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": items,
        }),
      }}
    />
  );
}
