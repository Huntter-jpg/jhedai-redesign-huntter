import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = "JhedAi";
const SITE_URL = "https://jhedai.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const SEOHead = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  twitterCard = "summary_large_image",
  noindex = false,
  article,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_CL" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Article-specific OG */}
      {article?.publishedTime && (
        <meta
          property="article:published_time"
          content={article.publishedTime}
        />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {article?.tags?.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO Tags */}
      <meta name="language" content="Spanish" />
      <meta httpEquiv="content-language" content="es-CL" />
      <link rel="icon" href="/favicon.ico" />

      {/* JSON-LD — separate <script> per schema entity */}
      {jsonLd &&
        (Array.isArray(jsonLd) ? (
          jsonLd.filter(Boolean).map((schema, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        ))}
    </Helmet>
  );
};

export { SITE_NAME, SITE_URL };
export default SEOHead;
