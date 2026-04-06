import { motion } from "framer-motion";
import {
  Database,
  Search,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Upload,
  Settings,
  Target,
  BarChart3,
  Users,
  MessageCircle,
  Zap,
  Eye,
  AlertCircle,
  Package,
  FileText,
  Clock,
  Award,
  Play,
  ArrowRight,
} from "lucide-react";

interface ServiceFlowDiagramProps {
  type: "linear" | "branching" | "circular" | "hierarchical";
  gradient: string;
}

const ServiceFlowDiagram = ({ type, gradient }: ServiceFlowDiagramProps) => {
  const getGradientColor = (gradientClass: string) => {
    if (gradientClass.includes("blue")) return "from-blue-500 to-cyan-500";
    if (gradientClass.includes("purple")) return "from-purple-500 to-pink-500";
    if (gradientClass.includes("green")) return "from-green-500 to-emerald-500";
    if (gradientClass.includes("orange")) return "from-orange-500 to-amber-500";
    if (gradientClass.includes("indigo"))
      return "from-indigo-500 to-purple-500";
    if (gradientClass.includes("cyan")) return "from-cyan-500 to-blue-500";
    if (gradientClass.includes("rose")) return "from-rose-500 to-red-500";
    return "from-blue-500 to-cyan-500";
  };

  const gradientColor = getGradientColor(gradient);

  // Análisis de Datos: Cómo transformamos tus datos en decisiones
  const DataAnalysisFlow = () => (
    <div className="flex flex-col items-center justify-center gap-4 px-2 w-full">
      <div className="flex items-center gap-8 w-full max-w-4xl -ml-[100px]">
        {[
          { icon: <Database size={36} />, label: "Tus datos actuales" },
          { icon: <ArrowRight size={28} className="text-jhedai-primary/40" /> },
          { icon: <Search size={36} />, label: "Analizamos patrones" },
          { icon: <ArrowRight size={28} className="text-jhedai-primary/40" /> },
          { icon: <Lightbulb size={36} />, label: "Descubrimos insights" },
          { icon: <ArrowRight size={28} className="text-jhedai-primary/40" /> },
          { icon: <Target size={36} />, label: "Tomas decisiones informadas" },
        ].map((step, i) =>
          step.icon.type === ArrowRight ? (
            <div key={i} className="shrink-0">
              {step.icon}
            </div>
          ) : (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
              className="relative group flex-1"
            >
              <div
                className={`w-full aspect-square max-w-[100px] mx-auto rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {step.icon}
              </div>
              <p className="text-sm font-semibold text-jhedai-primary/80 text-center mt-3 leading-tight px-0.5">
                {step.label}
              </p>
            </motion.div>
          ),
        )}
      </div>
    </div>
  );

  // Machine Learning: El ciclo de aprendizaje automático
  const MachineLearningFlow = () => (
    <div className="relative w-full h-96 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              className="text-purple-500"
              style={{ stopColor: "currentColor" }}
            />
            <stop
              offset="100%"
              className="text-pink-500"
              style={{ stopColor: "currentColor" }}
            />
          </linearGradient>
        </defs>
        {/* Main path - usando centros de nodos */}
        <motion.line
          x1="40"
          y1="190"
          x2="170"
          y2="190"
          stroke="url(#mlGrad)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.line
          x1="170"
          y1="190"
          x2="290"
          y2="130"
          stroke="url(#mlGrad)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.line
          x1="170"
          y1="190"
          x2="290"
          y2="250"
          stroke="url(#mlGrad)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.line
          x1="290"
          y1="130"
          x2="410"
          y2="190"
          stroke="url(#mlGrad)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.line
          x1="290"
          y1="250"
          x2="410"
          y2="190"
          stroke="url(#mlGrad)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </svg>

      {[
        {
          icon: <Users size={32} />,
          x: 40,
          y: 190,
          label: "Datos históricos",
          sublabel: "de tu negocio",
          textPos: "bottom",
        },
        {
          icon: <Settings size={32} />,
          x: 170,
          y: 190,
          label: "Entrenamiento",
          sublabel: "del modelo",
          textPos: "bottom",
        },
        {
          icon: <Target size={32} />,
          x: 290,
          y: 130,
          label: "Predicciones",
          sublabel: "precisas",
          textPos: "top",
        },
        {
          icon: <Zap size={32} />,
          x: 290,
          y: 250,
          label: "Automatización",
          sublabel: "de procesos",
          textPos: "bottom",
        },
        {
          icon: <TrendingUp size={32} />,
          x: 410,
          y: 190,
          label: "Resultados",
          sublabel: "medibles",
          textPos: "bottom",
        },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
          className="absolute group"
          style={{ left: node.x - 45, top: node.y - 45 }}
        >
          <div
            className={`w-[90px] h-[90px] rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
          >
            {node.icon}
          </div>
          <div
            className={`absolute ${node.textPos === "top" ? "-top-16" : "-bottom-20"} left-1/2 -translate-x-1/2 text-center w-40`}
          >
            <p className="text-base font-bold text-jhedai-primary leading-tight">
              {node.label}
            </p>
            <p className="text-sm text-jhedai-primary/60 mt-0.5">
              {node.sublabel}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Business Intelligence: Ciclo continuo de mejora
  const BusinessIntelligenceFlow = () => {
    const radius = 160;
    const centerX = 240;
    const centerY = 180;
    const icons = [
      {
        icon: <Upload size={32} />,
        label: "Conectas",
        sublabel: "tus fuentes de datos",
      },
      {
        icon: <BarChart3 size={32} />,
        label: "Visualizas",
        sublabel: "en dashboards",
      },
      {
        icon: <Eye size={32} />,
        label: "Monitoreas",
        sublabel: "KPIs en tiempo real",
      },
      {
        icon: <Lightbulb size={32} />,
        label: "Identificas",
        sublabel: "oportunidades",
      },
      { icon: <Play size={32} />, label: "Actúas", sublabel: "de inmediato" },
    ];

    return (
      <div className="relative w-full h-96 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="biGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                className="text-green-500"
                style={{ stopColor: "currentColor" }}
              />
              <stop
                offset="100%"
                className="text-emerald-500"
                style={{ stopColor: "currentColor" }}
              />
            </linearGradient>
          </defs>
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="url(#biGrad)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Arrows */}
          {icons.map((_, i) => {
            const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
            const nextAngle =
              ((i + 1) / icons.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <motion.path
                key={i}
                d={`M ${centerX + (radius - 10) * Math.cos(angle + 0.3)} ${centerY + (radius - 10) * Math.sin(angle + 0.3)} L ${centerX + (radius - 5) * Math.cos((angle + nextAngle) / 2)} ${centerY + (radius - 5) * Math.sin((angle + nextAngle) / 2)}`}
                stroke="url(#biGrad)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.3 + 1 }}
              />
            );
          })}
        </svg>

        {icons.map((item, i) => {
          const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          // Determinar posición del texto según el ángulo
          let textPosition = "";
          let textClass = "";
          if (i === 0) {
            // Conectas - arriba
            textPosition = "-top-16";
            textClass = "left-1/2 -translate-x-1/2";
          } else if (i === 1) {
            // Visualizas - derecha
            textPosition = "top-1/2 -translate-y-1/2";
            textClass = "-right-36";
          } else if (i === 2 || i === 3) {
            // Monitoreas e Identificas - abajo (como estaban)
            textPosition = "-bottom-16";
            textClass = "left-1/2 -translate-x-1/2";
          } else {
            // Actúas - izquierda
            textPosition = "top-1/2 -translate-y-1/2";
            textClass = "-left-36";
          }

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.25, type: "spring", stiffness: 200 }}
              className="absolute group"
              style={{ left: x - 40, top: y - 40 }}
            >
              <div
                className={`w-[80px] h-[80px] rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                {item.icon}
              </div>
              <div
                className={`absolute ${textPosition} ${textClass} text-center w-40`}
              >
                <p className="text-base font-bold text-jhedai-primary leading-tight">
                  {item.label}
                </p>
                <p className="text-sm text-jhedai-primary/60 mt-0.5">
                  {item.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Center text */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="absolute z-20 text-center"
          style={{ left: centerX - 32, top: centerY - 14 }}
        >
          <p className="text-base font-bold text-jhedai-primary">Mejora</p>
          <p className="text-sm text-jhedai-secondary">continua</p>
        </motion.div>
      </div>
    );
  };

  // NLP: Flujo de conversación inteligente
  const NLPFlow = () => (
    <div className="flex flex-col items-center justify-center gap-4 px-2 w-full">
      <div className="flex items-center gap-8 w-full max-w-4xl -ml-[60px]">
        {[
          { icon: <MessageCircle size={36} />, label: "Cliente pregunta" },
          { icon: <ArrowRight size={28} className="text-jhedai-primary/40" /> },
          { icon: <Search size={36} />, label: "IA comprende intención" },
          { icon: <ArrowRight size={28} className="text-jhedai-primary/40" /> },
          { icon: <Lightbulb size={36} />, label: "Procesa contexto" },
          { icon: <ArrowRight size={28} className="text-jhedai-primary/40" /> },
          { icon: <CheckCircle size={36} />, label: "Responde con precisión" },
        ].map((step, i) =>
          step.icon.type === ArrowRight ? (
            <div key={i} className="shrink-0">
              {step.icon}
            </div>
          ) : (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
              className="relative group flex-1"
            >
              <div
                className={`w-full aspect-square max-w-[100px] mx-auto rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {step.icon}
              </div>
              <p className="text-sm font-semibold text-jhedai-primary/80 text-center mt-3 leading-tight px-0.5">
                {step.label}
              </p>
            </motion.div>
          ),
        )}
      </div>
    </div>
  );

  // Computer Vision: Sistema de inspección visual
  const ComputerVisionFlow = () => (
    <div className="relative w-full h-96 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="cvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              className="text-indigo-500"
              style={{ stopColor: "currentColor" }}
            />
            <stop
              offset="100%"
              className="text-purple-500"
              style={{ stopColor: "currentColor" }}
            />
          </linearGradient>
        </defs>
        <motion.line
          x1="220"
          y1="86"
          x2="220"
          y2="110"
          stroke="url(#cvGrad)"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.line
          x1="220"
          y1="150"
          x2="120"
          y2="250"
          stroke="url(#cvGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.line
          x1="220"
          y1="150"
          x2="320"
          y2="250"
          stroke="url(#cvGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.line
          x1="120"
          y1="250"
          x2="220"
          y2="330"
          stroke="url(#cvGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        <motion.line
          x1="320"
          y1="250"
          x2="220"
          y2="330"
          stroke="url(#cvGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>

      {[
        {
          icon: <Upload size={28} />,
          x: 220,
          y: 50,
          label: "Captura",
          sublabel: "de imagen/video",
          textPosition: "top",
        },
        {
          icon: <Eye size={28} />,
          x: 220,
          y: 150,
          label: "Análisis",
          sublabel: "visual automático",
          textPosition: "bottom",
        },
        {
          icon: <CheckCircle size={28} />,
          x: 120,
          y: 250,
          label: "Aprobado",
          sublabel: "cumple estándares",
          textPosition: "bottom",
        },
        {
          icon: <AlertCircle size={28} />,
          x: 320,
          y: 250,
          label: "Defecto",
          sublabel: "detectado",
          textPosition: "bottom",
        },
        {
          icon: <Award size={28} />,
          x: 220,
          y: 330,
          label: "Decisión",
          sublabel: "instantánea",
          textPosition: "bottom",
        },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
          className="absolute group"
          style={{ left: node.x - 40, top: node.y - 40 }}
        >
          <div
            className={`w-[80px] h-[80px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
          >
            {node.icon}
          </div>
          <div
            className={`absolute ${node.textPosition === "top" ? "-top-16" : "-bottom-16"} left-1/2 -translate-x-1/2 text-center w-36`}
          >
            <p className="text-sm font-bold text-jhedai-primary leading-tight">
              {node.label}
            </p>
            <p className="text-xs text-jhedai-primary/60 mt-0.5">
              {node.sublabel}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Automatizaciones: Flujo de trabajo automatizado
  const AutomationFlow = () => (
    <div className="relative w-full h-96 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              className="text-cyan-500"
              style={{ stopColor: "currentColor" }}
            />
            <stop
              offset="100%"
              className="text-blue-500"
              style={{ stopColor: "currentColor" }}
            />
          </linearGradient>
        </defs>
        <motion.line
          x1="50"
          y1="190"
          x2="170"
          y2="190"
          stroke="url(#autoGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.line
          x1="170"
          y1="190"
          x2="290"
          y2="110"
          stroke="url(#autoGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.line
          x1="170"
          y1="190"
          x2="290"
          y2="270"
          stroke="url(#autoGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.line
          x1="290"
          y1="110"
          x2="410"
          y2="190"
          stroke="url(#autoGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.line
          x1="290"
          y1="270"
          x2="410"
          y2="190"
          stroke="url(#autoGrad)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </svg>

      {[
        {
          icon: <FileText size={28} />,
          x: 50,
          y: 190,
          label: "Tarea",
          sublabel: "manual repetitiva",
        },
        {
          icon: <Zap size={28} />,
          x: 170,
          y: 190,
          label: "Automatización",
          sublabel: "inteligente",
        },
        {
          icon: <Package size={28} />,
          x: 290,
          y: 110,
          label: "Procesa",
          sublabel: "documentos",
        },
        {
          icon: <MessageCircle size={28} />,
          x: 290,
          y: 270,
          label: "Responde",
          sublabel: "solicitudes",
        },
        {
          icon: <Clock size={28} />,
          x: 410,
          y: 190,
          label: "Ahorro",
          sublabel: "de tiempo",
        },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
          className="absolute group"
          style={{ left: node.x - 40, top: node.y - 40 }}
        >
          <div
            className={`w-[80px] h-[80px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
          >
            {node.icon}
          </div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-36">
            <p className="text-sm font-bold text-jhedai-primary leading-tight">
              {node.label}
            </p>
            <p className="text-xs text-jhedai-primary/60 mt-0.5">
              {node.sublabel}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Data Science: Ciclo de experimentación
  const DataScienceFlow = () => {
    const radius = 160;
    const centerX = 230;
    const centerY = 200;
    const icons = [
      {
        icon: <Lightbulb size={32} />,
        label: "Hipótesis",
        sublabel: "de negocio",
      },
      {
        icon: <Settings size={32} />,
        label: "Diseño",
        sublabel: "de experimento",
      },
      { icon: <Play size={32} />, label: "Ejecución", sublabel: "controlada" },
      {
        icon: <BarChart3 size={32} />,
        label: "Análisis",
        sublabel: "de resultados",
      },
      {
        icon: <CheckCircle size={32} />,
        label: "Validación",
        sublabel: "estadística",
      },
    ];

    return (
      <div className="relative w-full h-96">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="dsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                className="text-rose-500"
                style={{ stopColor: "currentColor" }}
              />
              <stop
                offset="100%"
                className="text-red-500"
                style={{ stopColor: "currentColor" }}
              />
            </linearGradient>
          </defs>
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="url(#dsGrad)"
            strokeWidth="5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {icons.map((item, i) => {
          const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          // Posicionar texto radialmente hacia afuera
          const textOffsetDistance = 100;
          let textX = textOffsetDistance * Math.cos(angle);
          const textY = textOffsetDistance * Math.sin(angle);

          // Ajustar "Diseño" levemente a la derecha
          if (i === 1) {
            textX += 10;
          }

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.25, type: "spring", stiffness: 200 }}
              className="absolute group"
              style={{ left: x - 40, top: y - 40 }}
            >
              <div
                className={`w-[80px] h-[80px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                {item.icon}
              </div>
              <div
                className="absolute text-center w-28"
                style={{
                  left: `calc(50% + ${textX}px)`,
                  top: `calc(50% + ${textY}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-base font-bold text-jhedai-primary leading-tight">
                  {item.label}
                </p>
                <p className="text-sm text-jhedai-primary/60 mt-0.5">
                  {item.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="absolute z-20 text-center w-24"
          style={{ left: `${centerX - 48}px`, top: `${centerY - 24}px` }}
        >
          <p className="text-base font-bold text-jhedai-primary">Mejora</p>
          <p className="text-sm text-jhedai-secondary">continua</p>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[350px] rounded-xl overflow-visible bg-gradient-to-br from-gray-50 to-blue-50/20 flex items-center justify-center p-8 lg:p-10">
      {type === "linear" && gradient.includes("blue") && <DataAnalysisFlow />}
      {type === "branching" && gradient.includes("purple") && (
        <MachineLearningFlow />
      )}
      {type === "circular" && gradient.includes("green") && (
        <BusinessIntelligenceFlow />
      )}
      {type === "linear" && gradient.includes("orange") && <NLPFlow />}
      {type === "hierarchical" && gradient.includes("indigo") && (
        <ComputerVisionFlow />
      )}
      {type === "branching" && gradient.includes("cyan") && <AutomationFlow />}
      {type === "circular" && gradient.includes("rose") && <DataScienceFlow />}
    </div>
  );
};

export default ServiceFlowDiagram;
// v2.0 - Optimized spacing
