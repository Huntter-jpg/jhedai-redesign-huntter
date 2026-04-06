import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList } from "schema-dts";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Schema component
 * Provides structured navigation data for search engines
 *
 * @example
 * <BreadcrumbSchema items={[
 *   { name: 'Home', url: 'https://jhedai.com' },
 *   { name: 'Servicios', url: 'https://jhedai.com/servicios' }
 * ]} />
 */
export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  return (
    <JsonLd<BreadcrumbList>
      item={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
};
