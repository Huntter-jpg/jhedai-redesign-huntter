import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const TerminosPage = () => {
  return (
    <>
      <SEOHead
        title="Términos y Condiciones"
        description="Términos y condiciones de uso del sitio web de JhedAi."
        canonical="/terminos"
        noindex
      />

      <div className="pt-28 pb-24 bg-white">
        <div className="container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-[13px] text-jhedai-primary/40 mb-8">
            <Link
              to="/"
              className="hover:text-jhedai-secondary transition-colors"
            >
              Inicio
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-jhedai-primary/60">
              Términos y Condiciones
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-2">
              Términos y Condiciones
            </h1>
            <p className="text-[14px] text-jhedai-primary/40 mb-10">
              Última actualización: 20 de febrero de 2026
            </p>

            <div className="prose">
              <p>
                Al acceder y utilizar el sitio web de JhedAi (jhedai.com),
                aceptas los siguientes términos y condiciones. Si no estás de
                acuerdo con alguno de estos términos, te recomendamos no
                utilizar nuestro sitio.
              </p>

              <h2>1. Uso del Sitio</h2>
              <p>
                Este sitio web tiene como propósito informar sobre los servicios
                de consultoría en inteligencia artificial ofrecidos por JhedAi.
                El contenido es de carácter informativo y no constituye asesoría
                profesional específica.
              </p>
              <ul>
                <li>
                  Debes utilizar el sitio de manera lícita y conforme a estos
                  términos
                </li>
                <li>
                  No debes intentar acceder a áreas restringidas del sitio sin
                  autorización
                </li>
                <li>
                  No debes utilizar el sitio de manera que pueda dañar,
                  deshabilitar o sobrecargar nuestros servidores
                </li>
              </ul>

              <h2>2. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio — incluyendo textos, gráficos,
                logotipos, iconos, imágenes, software y cualquier otro material
                — es propiedad de JhedAi o de sus respectivos titulares y está
                protegido por las leyes de propiedad intelectual chilenas e
                internacionales.
              </p>
              <p>
                Queda prohibida la reproducción, distribución, modificación o
                uso comercial del contenido sin autorización expresa y por
                escrito de JhedAi.
              </p>

              <h2>3. Servicios</h2>
              <p>
                La información sobre servicios presentada en este sitio es de
                carácter general. Las condiciones específicas de cada servicio
                serán acordadas mediante contrato individual entre JhedAi y el
                cliente.
              </p>

              <h2>4. Limitación de Responsabilidad</h2>
              <p>
                JhedAi no garantiza que el sitio web esté libre de errores o
                interrupciones. No seremos responsables por:
              </p>
              <ul>
                <li>Daños directos o indirectos derivados del uso del sitio</li>
                <li>Pérdida de datos o interrupciones en el servicio</li>
                <li>
                  Contenido de sitios web de terceros enlazados desde nuestro
                  sitio
                </li>
                <li>
                  Decisiones tomadas basándose únicamente en la información del
                  sitio
                </li>
              </ul>

              <h2>5. Enlaces a Terceros</h2>
              <p>
                Nuestro sitio puede contener enlaces a sitios web de terceros.
                Estos enlaces se proporcionan únicamente para tu conveniencia.
                No controlamos ni somos responsables del contenido o las
                prácticas de privacidad de estos sitios.
              </p>

              <h2>6. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos términos se rigen por las leyes de la República de Chile.
                Cualquier controversia será sometida a los tribunales ordinarios
                de justicia de la ciudad de Santiago de Chile.
              </p>

              <h2>7. Modificaciones</h2>
              <p>
                JhedAi se reserva el derecho de modificar estos términos en
                cualquier momento. Las modificaciones entrarán en vigor desde su
                publicación en el sitio. El uso continuado del sitio después de
                cualquier cambio constituye la aceptación de los nuevos
                términos.
              </p>

              <h2>8. Contacto</h2>
              <p>
                Para consultas sobre estos términos, puedes contactarnos en{" "}
                <a href="mailto:contacto@jhedai.com">contacto@jhedai.com</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TerminosPage;
