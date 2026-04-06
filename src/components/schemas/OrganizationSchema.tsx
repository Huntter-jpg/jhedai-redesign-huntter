import { JsonLd } from "react-schemaorg";
import type { Organization } from "schema-dts";

/**
 * Organization Schema component for JhedAI
 * Provides structured data for search engines about the company
 * Use on homepage
 */
export const OrganizationSchema = () => {
  return (
    <JsonLd<Organization>
      item={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://jhedai.com/#organization",
        name: "JhedAI",
        url: "https://jhedai.com",
        logo: {
          "@type": "ImageObject",
          url: "https://jhedai.com/isotipo-jhedai.png",
          width: "512",
          height: "512",
        } as unknown as string,
        description:
          "Consultora de Inteligencia Artificial en Chile especializada en diagnóstico, implementación y capacitación para la industria y gobierno.",
        knowsAbout: [
          "Inteligencia Artificial",
          "Machine Learning",
          "Visión Computacional",
          "Procesamiento de Lenguaje Natural",
          "Automatización Inteligente",
          "Business Intelligence",
          "Data Science",
        ] as unknown as string,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          email: "contacto@jhedai.com",
          areaServed: "CL",
          availableLanguage: ["es", "en"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "CL",
          addressRegion: "Región Metropolitana",
        },
        sameAs: [
          "https://www.linkedin.com/company/jhedai/",
          "https://www.instagram.com/jhedai/",
          "https://www.youtube.com/@jhedai",
        ],
        foundingDate: "2023",
        areaServed: {
          "@type": "Country",
          name: "Chile",
        },
      }}
    />
  );
};
