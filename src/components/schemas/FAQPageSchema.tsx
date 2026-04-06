import { JsonLd } from "react-schemaorg";
import type { FAQPage, Question } from "schema-dts";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQItem[];
}

const FAQPageSchema = ({ faqs }: FAQPageSchemaProps) => {
  return (
    <JsonLd<FAQPage>
      item={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(
          (faq): Question => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          }),
        ),
      }}
    />
  );
};

export default FAQPageSchema;
