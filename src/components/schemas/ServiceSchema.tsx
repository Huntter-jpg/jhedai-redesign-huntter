import { JsonLd } from "react-schemaorg";
import type { Service } from "schema-dts";

/**
 * Service Schema component for JhedAI
 * Provides structured data for services page
 * Use on /servicios page
 */
export const ServiceSchema = () => {
  return (
    <JsonLd<Service>
      item={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Consultoría en Inteligencia Artificial",
        provider: {
          "@type": "Organization",
          name: "JhedAI",
          url: "https://jhedai.com",
        },
        areaServed: {
          "@type": "Country",
          name: "Chile",
        },
        description:
          "Servicios de consultoría especializada en IA: diagnóstico empresarial, implementación de soluciones AI, capacitación corporativa y desarrollo de agentes autónomos.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "CLP",
        },
      }}
    />
  );
};
