import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Clock, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { BreadcrumbSchema } from "../components/schemas/BreadcrumbSchema";
import { submitContactForm } from "../lib/apiClient";

const servicios = [
  "Consultoría Estratégica",
  "Implementación Técnica",
  "Formación y Capacitación",
  "DeepLab",
  "Otro",
];

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: "contacto@jhedai.com",
    href: "mailto:contacto@jhedai.com",
  },
  { icon: <MapPin size={18} />, label: "Viña del Mar, Chile", href: undefined },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/jhedai/",
  },
  {
    icon: <Clock size={18} />,
    label: "Lunes a Viernes, 9:00 - 18:00",
    href: undefined,
  },
];

const ContactoPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      empresa: formData.get("empresa") as string,
      telefono: formData.get("telefono") as string,
      servicio: formData.get("servicio") as string,
      mensaje: formData.get("mensaje") as string,
    };

    try {
      const response = await submitContactForm(data);

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(
          response.error ||
            "Error al enviar el mensaje. Por favor intenta nuevamente.",
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al enviar el mensaje. Por favor intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-white/70 border border-jhedai-neutral/20 rounded-lg px-3.5 py-2.5 text-[14px] text-jhedai-primary placeholder:text-jhedai-primary/25 focus:border-jhedai-secondary focus:ring-2 focus:ring-jhedai-secondary/15 outline-none transition-all";

  return (
    <>
      <SEOHead
        title="Contacto"
        description="Agenda una consulta con el equipo de JhedAi. Diagnóstico, implementación y capacitación en inteligencia artificial para tu empresa."
        canonical="/contacto"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto JhedAi",
          url: "https://jhedai.com/contacto",
          mainEntity: {
            "@type": "Organization",
            name: "JhedAi",
            email: "contacto@jhedai.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Viña del Mar",
              addressCountry: "CL",
            },
          },
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://jhedai.com" },
          { name: "Contacto", url: "https://jhedai.com/contacto" },
        ]}
      />

      <div className="pt-28 pb-24 bg-white">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[13px] text-jhedai-secondary font-bold tracking-widest uppercase mb-3">
              Contacto
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-3">
              Conversemos sobre tu proyecto
            </h1>
            <p className="text-jhedai-primary/55 text-[16px] max-w-xl mx-auto leading-relaxed">
              Agenda una consulta con nuestro equipo. Respondemos en menos de 24
              horas hábiles.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start max-w-5xl mx-auto">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-5/12 space-y-3 lg:sticky lg:top-32"
            >
              <div className="glass-card p-6 mb-6">
                <h2 className="text-[17px] font-semibold text-jhedai-primary mb-1">
                  ¿Cómo podemos ayudarte?
                </h2>
                <p className="text-[14px] text-jhedai-primary/55 leading-relaxed">
                  Desde diagnóstico inicial hasta implementación completa de
                  soluciones de IA para tu industria.
                </p>
              </div>
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 px-5 py-3.5 rounded-xl border border-jhedai-neutral/15 bg-white/60"
                >
                  <div className="w-9 h-9 rounded-lg bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary shrink-0">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-[14px] text-jhedai-primary font-medium hover:text-jhedai-secondary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-[14px] text-jhedai-primary/70">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-7/12 w-full"
            >
              <div className="glass-card p-6 lg:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-14"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                      <Check size={30} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-jhedai-primary mb-2">
                      Mensaje enviado
                    </h3>
                    <p className="text-jhedai-primary/55 text-[15px] mb-7">
                      Nos pondremos en contacto contigo a la brevedad.
                    </p>
                    <Link
                      to="/"
                      className="boton-secundario inline-flex items-center gap-2"
                    >
                      Volver al inicio
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-[13px] text-red-600">{error}</p>
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Fila 1: Nombre + Empresa */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[13px] font-medium text-jhedai-primary/70 mb-1.5 block">
                            Nombre <span className="text-jhedai-accent">*</span>
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            required
                            placeholder="Tu nombre completo"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="text-[13px] font-medium text-jhedai-primary/70 mb-1.5 block">
                            Empresa
                          </label>
                          <input
                            type="text"
                            name="empresa"
                            placeholder="Nombre de tu empresa"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Fila 2: Email + Teléfono */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[13px] font-medium text-jhedai-primary/70 mb-1.5 block">
                            Email <span className="text-jhedai-accent">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="tu@email.com"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="text-[13px] font-medium text-jhedai-primary/70 mb-1.5 block">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="telefono"
                            placeholder="+56 9 1234 5678"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Servicio */}
                      <div>
                        <label className="text-[13px] font-medium text-jhedai-primary/70 mb-1.5 block">
                          Servicio de interés
                        </label>
                        <select name="servicio" className={inputClasses}>
                          <option value="">Selecciona un servicio</option>
                          {servicios.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Mensaje */}
                      <div>
                        <label className="text-[13px] font-medium text-jhedai-primary/70 mb-1.5 block">
                          Mensaje <span className="text-jhedai-accent">*</span>
                        </label>
                        <textarea
                          name="mensaje"
                          required
                          rows={4}
                          placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={loading}
                          className="boton-principal w-full py-3.5 inline-flex items-center justify-center gap-2 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Enviando..." : "Enviar mensaje"}
                          {!loading && <ArrowRight size={17} />}
                        </button>
                        <p className="text-center text-[12px] text-jhedai-primary/35 mt-3">
                          Los campos con{" "}
                          <span className="text-jhedai-accent">*</span> son
                          obligatorios
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactoPage;
