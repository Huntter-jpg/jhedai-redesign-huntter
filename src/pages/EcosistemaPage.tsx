import { motion } from "framer-motion";
import {
  Server,
  Landmark,
  Award,
  Globe,
  CheckCircle2,
  Building2,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { BreadcrumbSchema } from "../components/schemas/BreadcrumbSchema";

const pillars = [
  {
    icon: <Server size={28} />,
    tag: "INFRAESTRUCTURA",
    title: "CSIAA — Centro de Supercómputo e IA Aplicada",
    description:
      "Centro de supercómputo en Viña del Mar, financiado por CORFO, con JhedAI como empresa asociada fundadora. Infraestructura de clase mundial para entrenar modelos de IA a escala industrial.",
    bullets: [
      "Fondo CORFO adjudicado (Junio 2025)",
      "MOU con AMD para colaboración en supercómputo (Noviembre 2025)",
      "Sede en Viña del Mar, Región de Valparaíso",
    ],
    badge: "Empresa Asociada Fundadora",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Landmark size={28} />,
    tag: "INSTITUCIONAL",
    title: "CChIA — Cámara Chilena de Inteligencia Artificial",
    description:
      "Asociación gremial constituida en Enero 2025 para representar al sector de IA ante el Estado y la industria. Edison Vásquez, CEO de JhedAI, ejerce como presidente.",
    bullets: [
      "Constituida Enero 2025",
      "Edison Vásquez (CEO JhedAI) como Presidente",
      "Interlocutor sectorial ante gobierno y reguladores",
    ],
    badge: "Presidencia",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Award size={28} />,
    tag: "ESTÁNDARES PROFESIONALES",
    title: "ChileValora — Perfiles Profesionales de IA",
    description:
      "JhedAI participó activamente en el desarrollo y creación de los perfiles profesionales de IA de Chile Valora, en conjunto con el Ministerio de Ciencia, contribuyendo a la definición de estándares profesionales para la industria.",
    bullets: [
      "Participación en el desarrollo de perfiles de IA",
      "Colaboración con ChileValora y Min. de Ciencia",
      "Contribución a estándares profesionales del sector",
    ],
    badge: "Contribuidor ChileValora",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Globe size={28} />,
    tag: "COMUNIDAD",
    title: "Comunidad Latam AI",
    description:
      "Participación activa en la comunidad latinoamericana de Inteligencia Artificial, con más de 2.000 miembros, conectando talento, conocimiento y oportunidades de colaboración a lo largo de la región.",
    bullets: [
      "Más de 2.000 miembros en Latinoamérica",
      "Intercambio de conocimiento regional",
      "Colaboración transfronteriza en IA",
    ],
    badge: "Miembro Activo",
    gradient: "from-orange-500 to-amber-500",
  },
];

const allianceCategories = [
  {
    icon: <Briefcase size={20} />,
    title: "Industria",
    partners: [
      "NVIDIA Inception",
      "AMD",
      "Tenpo",
      "Banco Cuscatlán",
      "Datamate",
      "Minverso",
    ],
  },
  {
    icon: <Building2 size={20} />,
    title: "Sector Público",
    partners: [
      "Ministerio de Ciencia y Tecnología",
      "ChileValora",
      "Ilustre Municipalidad de Viña del Mar",
      "Congreso Nacional",
      "Corporación de Innovación de Viña del Mar",
    ],
  },
  {
    icon: <Landmark size={20} />,
    title: "Corporaciones y Gremios",
    partners: [
      "CSIAA",
      "CRTIC",
      "CChIA",
      "EIVA",
      "Latam-GPT",
      "CENIA",
    ],
  },
  {
    icon: <GraduationCap size={20} />,
    title: "Academia",
    partners: [
      "U. San Sebastián",
      "NLHPC",
    ],
  },
];

const EcosistemaPage = () => {
  return (
    <>
      <SEOHead
        title="Ecosistema de IA | Infraestructura, Instituciones y Comunidad - JhedAI"
        description="Conoce el ecosistema de Inteligencia Artificial que JhedAI está construyendo en Chile: CSIAA, Cámara Chilena de IA, perfiles ChileValora y comunidad Latam AI."
        canonical="/ecosistema"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Ecosistema de IA - JhedAI",
          description:
            "Infraestructura, instituciones y estándares para la IA en Chile",
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://jhedai.com" },
          { name: "Ecosistema", url: "https://jhedai.com/ecosistema" },
        ]}
      />

      <div className="pt-28 pb-24 bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-jhedai-primary via-jhedai-primary to-jhedai-secondary py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-[14px] text-white/80 font-bold tracking-widest mb-4">
                ECOSISTEMA
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Construyendo la Infraestructura de IA de Chile
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Lideramos la creaci&oacute;n de instituciones, infraestructura
                de superc&oacute;mputo, est&aacute;ndares profesionales y
                comunidad para acelerar la adopci&oacute;n responsable de
                Inteligencia Artificial en Chile y Latinoam&eacute;rica.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Gráfico del Ecosistema */}
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <img
              src="/Ecosistema JhedAi.png"
              alt="Ecosistema de Inteligencia Artificial de JhedAI"
              className="w-full h-auto rounded-2xl shadow-lg border border-jhedai-neutral/20"
            />
          </motion.div>
        </div>

        {/* 4 Pilares Institucionales */}
        <div className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              PILARES INSTITUCIONALES
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Cuatro Ejes que Definen el Ecosistema
            </h2>
            <p className="text-jhedai-primary/60 text-lg max-w-3xl mx-auto">
              No solo ofrecemos servicios de IA &mdash; construimos las
              instituciones, la infraestructura y los est&aacute;ndares que el
              pa&iacute;s necesita.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-2xl border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-jhedai-primary to-jhedai-secondary flex items-center justify-center text-white shrink-0">
                        {pillar.icon}
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-jhedai-secondary tracking-widest">
                          {pillar.tag}
                        </span>
                        <h3 className="text-xl font-bold text-jhedai-primary leading-tight">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="mb-6">
                    <span className="inline-block bg-jhedai-secondary/10 text-jhedai-secondary text-[13px] font-bold px-4 py-1.5 rounded-full">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-jhedai-primary/70 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Bullets */}
                  <div className="space-y-3">
                    {pillar.bullets.map((bullet, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-jhedai-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2
                            size={12}
                            className="text-jhedai-secondary"
                          />
                        </div>
                        <p className="text-[15px] text-jhedai-primary/60 leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Red de Alianzas */}
        <div className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              RED ESTRAT&Eacute;GICA
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Alianzas que Sostienen el Ecosistema
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allianceCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-jhedai-primary">
                    {cat.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {cat.partners.map((partner, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-[15px] text-jhedai-primary/60"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-jhedai-secondary shrink-0"
                      />
                      {partner}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-jhedai-primary to-jhedai-secondary rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                S&eacute; Parte del Ecosistema de IA de Chile
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Conecta con nosotros para explorar oportunidades de
                colaboraci&oacute;n institucional, alianzas estrat&eacute;gicas
                o integraci&oacute;n tecnol&oacute;gica.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-white text-jhedai-primary px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Conversar sobre Alianzas
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EcosistemaPage;
