import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const PrivacidadPage = () => {
  return (
    <>
      <SEOHead
        title="Política de Privacidad"
        description="Política de privacidad de JhedAi. Conoce cómo recopilamos, usamos y protegemos tus datos personales."
        canonical="/privacidad"
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
              Política de Privacidad
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-2">
              Política de Privacidad
            </h1>
            <p className="text-[14px] text-jhedai-primary/40 mb-10">
              Última actualización: 20 de febrero de 2026
            </p>

            <div className="prose">
              <p>
                En JhedAi, respetamos tu privacidad y nos comprometemos a
                proteger tus datos personales. Esta política describe cómo
                recopilamos, usamos y protegemos la información que nos
                proporcionas a través de nuestro sitio web y servicios.
              </p>

              <h2>1. Información que Recopilamos</h2>
              <p>Podemos recopilar los siguientes tipos de información:</p>
              <ul>
                <li>
                  <strong>Datos de contacto:</strong> nombre, correo
                  electrónico, teléfono y empresa, proporcionados
                  voluntariamente a través de nuestros formularios de contacto.
                </li>
                <li>
                  <strong>Datos de navegación:</strong> dirección IP, tipo de
                  navegador, páginas visitadas y tiempo de permanencia,
                  recopilados automáticamente mediante cookies y tecnologías
                  similares.
                </li>
                <li>
                  <strong>Datos de uso:</strong> interacciones con nuestro
                  contenido, como artículos leídos y servicios consultados.
                </li>
              </ul>

              <h2>2. Uso de la Información</h2>
              <p>Utilizamos tu información para:</p>
              <ul>
                <li>Responder a tus consultas y solicitudes de contacto</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>
                  Enviar comunicaciones relevantes sobre nuestros servicios,
                  siempre con tu consentimiento
                </li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>

              <h2>3. Cookies</h2>
              <p>
                Nuestro sitio utiliza cookies técnicas necesarias para su
                funcionamiento y cookies analíticas para comprender cómo los
                visitantes interactúan con el sitio. Puedes configurar tu
                navegador para rechazar cookies, aunque algunas funcionalidades
                podrían verse afectadas.
              </p>

              <h2>4. Compartir Información</h2>
              <p>
                No vendemos, alquilamos ni compartimos tus datos personales con
                terceros, excepto cuando sea necesario para prestar nuestros
                servicios o cumplir con requerimientos legales.
              </p>

              <h2>5. Seguridad</h2>
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para
                proteger tus datos personales contra acceso no autorizado,
                alteración, divulgación o destrucción.
              </p>

              <h2>6. Tus Derechos</h2>
              <p>
                De acuerdo con la legislación chilena vigente, tienes derecho a:
              </p>
              <ul>
                <li>
                  <strong>Acceso:</strong> solicitar información sobre los datos
                  personales que tenemos sobre ti
                </li>
                <li>
                  <strong>Rectificación:</strong> corregir datos inexactos o
                  incompletos
                </li>
                <li>
                  <strong>Cancelación:</strong> solicitar la eliminación de tus
                  datos personales
                </li>
                <li>
                  <strong>Oposición:</strong> oponerte al tratamiento de tus
                  datos en determinadas circunstancias
                </li>
              </ul>

              <h2>7. Contacto</h2>
              <p>
                Para ejercer tus derechos o realizar consultas sobre esta
                política, puedes contactarnos en{" "}
                <a href="mailto:contacto@jhedai.com">contacto@jhedai.com</a>.
              </p>

              <h2>8. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de actualizar esta política
                periódicamente. Las modificaciones serán publicadas en esta
                página con la fecha de última actualización.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacidadPage;
