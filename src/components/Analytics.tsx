import { Helmet } from "react-helmet-async";

/**
 * Analytics Component
 *
 * Configura Plausible Analytics (privacy-first, sin cookies)
 * Para activar: Crear cuenta en plausible.io y agregar dominio jhedai.com
 *
 * Alternativa: Google Tag Manager
 * Para GTM: Reemplazar data-domain con tu GTM ID
 */
const Analytics = () => {
  // Si quieres usar Plausible Analytics (recomendado para privacidad)
  const PLAUSIBLE_DOMAIN = "jhedai.com";
  const USE_PLAUSIBLE = false; // Cambiar a true cuando tengas cuenta Plausible

  // Si prefieres Google Tag Manager
  const GTM_ID = ""; // Agregar tu GTM ID aquí (ej: 'GTM-XXXXXX')
  const USE_GTM = false; // Cambiar a true cuando tengas GTM configurado

  return (
    <Helmet>
      {/* Plausible Analytics - Privacy-first, sin cookies */}
      {USE_PLAUSIBLE && (
        <script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}

      {/* Google Tag Manager - Alternativa */}
      {USE_GTM && GTM_ID && (
        <script>
          {`
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GTM_ID}');
                        `}
        </script>
      )}
    </Helmet>
  );
};

export default Analytics;
