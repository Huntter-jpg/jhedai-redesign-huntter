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
  Shield,
  Layers,
  GitBranch,
  ArrowDown,
  Sparkles,
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

  // ─── VALUE BADGE ───
  const ValueBadge = ({
    label,
    delay = 0,
    className = "",
  }: {
    label: string;
    delay?: number;
    className?: string;
  }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 ${className}`}
    >
      <Sparkles size={10} className="text-emerald-600" />
      <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">
        {label}
      </span>
    </motion.div>
  );

  // ─── FLOW NODE ───
  const FlowNode = ({
    icon,
    label,
    sublabel,
    delay = 0,
    size = "md",
  }: {
    icon: React.ReactNode;
    label: string;
    sublabel: string;
    delay?: number;
    size?: "sm" | "md" | "lg";
  }) => {
    const sizeClasses = {
      sm: "w-[56px] h-[56px] rounded-xl",
      md: "w-[68px] h-[68px] rounded-2xl",
      lg: "w-[80px] h-[80px] rounded-2xl",
    };
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        className="flex flex-col items-center gap-2 group"
      >
        <div
          className={`${sizeClasses[size]} bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-jhedai-primary leading-tight">
            {label}
          </p>
          <p className="text-xs text-jhedai-primary/60">{sublabel}</p>
        </div>
      </motion.div>
    );
  };

  // ─── CONNECTOR ARROW ───
  const ConnectorArrow = ({
    delay = 0,
    vertical = false,
  }: {
    delay?: number;
    vertical?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex items-center justify-center ${vertical ? "py-1" : "px-1"} shrink-0`}
    >
      <ArrowDown
        size={20}
        className={`text-jhedai-primary/30 ${!vertical ? "-rotate-90" : ""}`}
      />
    </motion.div>
  );

  // ═══════════════════════════════════════════════════════════
  // 1. ANÁLISIS DE DATOS — Pipeline de Transformación de Datos
  // ═══════════════════════════════════════════════════════════
  const DataAnalysisFlow = () => (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Pipeline horizontal */}
      <div className="flex items-start justify-center gap-3 w-full max-w-lg">
        <FlowNode
          icon={<Database size={28} />}
          label="Ingesta"
          sublabel="Múltiples fuentes"
          delay={0.1}
        />
        <ConnectorArrow delay={0.3} />
        <FlowNode
          icon={<Shield size={28} />}
          label="Calidad"
          sublabel="ETL & validación"
          delay={0.3}
        />
        <ConnectorArrow delay={0.5} />
        <FlowNode
          icon={<Search size={28} />}
          label="Análisis"
          sublabel="ML + Estadística"
          delay={0.5}
        />
        <ConnectorArrow delay={0.7} />
        <FlowNode
          icon={<Target size={28} />}
          label="Decisión"
          sublabel="Accionable"
          delay={0.7}
        />
      </div>

      {/* Value callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-4"
      >
        <ValueBadge label="Datos confiables" delay={1.3} />
        <ValueBadge label="Insights en tiempo real" delay={1.5} />
      </motion.div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // 2. MACHINE LEARNING — Ciclo de Aprendizaje y Producción
  // ═══════════════════════════════════════════════════════════
  const MachineLearningFlow = () => (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 460 400"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="mlGradV2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#a855f7" }} />
            <stop offset="100%" style={{ stopColor: "#ec4899" }} />
          </linearGradient>
        </defs>
        {/* Trunk: left to center */}
        <motion.line
          x1="80" y1="200" x2="180" y2="200"
          stroke="url(#mlGradV2)" strokeWidth="3" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {/* Branch up */}
        <motion.line
          x1="180" y1="200" x2="290" y2="110"
          stroke="url(#mlGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        {/* Branch down */}
        <motion.line
          x1="180" y1="200" x2="290" y2="290"
          stroke="url(#mlGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        {/* Converge up */}
        <motion.line
          x1="290" y1="110" x2="390" y2="200"
          stroke="url(#mlGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />
        {/* Converge down */}
        <motion.line
          x1="290" y1="290" x2="390" y2="200"
          stroke="url(#mlGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />
      </svg>

      {/* Nodes */}
      {[
        {
          icon: <Users size={26} />,
          x: 80, y: 200,
          label: "Datos del Negocio",
          sublabel: "Históricos + real-time",
          textPos: "bottom" as const,
        },
        {
          icon: <GitBranch size={26} />,
          x: 180, y: 200,
          label: "Feature Engineering",
          sublabel: "Variables clave",
          textPos: "bottom" as const,
        },
        {
          icon: <Target size={26} />,
          x: 290, y: 110,
          label: "Predicción",
          sublabel: "Clasificación & forecast",
          textPos: "top" as const,
        },
        {
          icon: <Zap size={26} />,
          x: 290, y: 290,
          label: "Automatización",
          sublabel: "Decisiones autónomas",
          textPos: "bottom" as const,
        },
        {
          icon: <TrendingUp size={26} />,
          x: 390, y: 200,
          label: "Producción",
          sublabel: "Monitoreo continuo",
          textPos: "bottom" as const,
        },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
          className="absolute group"
          style={{ left: node.x - 35, top: node.y - 35 }}
        >
          <div
            className={`w-[70px] h-[70px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
          >
            {node.icon}
          </div>
          <div
            className={`absolute ${node.textPos === "top" ? "-top-14" : "-bottom-14"} left-1/2 -translate-x-1/2 text-center w-36`}
          >
            <p className="text-sm font-bold text-jhedai-primary leading-tight">
              {node.label}
            </p>
            <p className="text-xs text-jhedai-primary/60">{node.sublabel}</p>
          </div>
        </motion.div>
      ))}

      {/* Value badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-2 right-4"
      >
        <ValueBadge label="Precisión > 95%" delay={1.7} />
      </motion.div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // 3. BUSINESS INTELLIGENCE — Ciclo Continuo de Mejora
  // ═══════════════════════════════════════════════════════════
  const BusinessIntelligenceFlow = () => {
    const radius = 140;
    const centerX = 230;
    const centerY = 180;
    const stages = [
      {
        icon: <Upload size={26} />,
        label: "Integración",
        sublabel: "de fuentes",
      },
      {
        icon: <BarChart3 size={26} />,
        label: "Dashboard",
        sublabel: "ejecutivo",
      },
      {
        icon: <Eye size={26} />,
        label: "Monitoreo",
        sublabel: "KPIs en vivo",
      },
      {
        icon: <Lightbulb size={26} />,
        label: "Oportunidades",
        sublabel: "detectadas",
      },
      {
        icon: <Play size={26} />,
        label: "Acción",
        sublabel: "inmediata",
      },
    ];

    return (
      <div className="relative w-full h-[400px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 380">
          <defs>
            <linearGradient id="biGradV2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#22c55e" }} />
              <stop offset="100%" style={{ stopColor: "#10b981" }} />
            </linearGradient>
          </defs>
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="url(#biGradV2)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {stages.map((item, i) => {
          const angle = (i / stages.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const labelDist = 75;
          const lx = labelDist * Math.cos(angle);
          const ly = labelDist * Math.sin(angle);

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: i * 0.25,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute group"
              style={{ left: x - 32, top: y - 32 }}
            >
              <div
                className={`w-[64px] h-[64px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                {item.icon}
              </div>
              <div
                className="absolute text-center w-28"
                style={{
                  left: `calc(50% + ${lx}px)`,
                  top: `calc(50% + ${ly}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-sm font-bold text-jhedai-primary leading-tight">
                  {item.label}
                </p>
                <p className="text-xs text-jhedai-primary/60">
                  {item.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Center label */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute z-20 text-center"
          style={{ left: centerX - 40, top: centerY - 16 }}
        >
          <p className="text-xs font-bold text-emerald-600 tracking-widest">
            CICLO
          </p>
          <p className="text-sm font-bold text-jhedai-primary">Inteligente</p>
        </motion.div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // 4. NLP — Pipeline de Lenguaje Natural
  // ═══════════════════════════════════════════════════════════
  const NLPFlow = () => {
    const stages = [
      {
        icon: <MessageCircle size={26} />,
        label: "Entrada",
        sublabel: "Texto / Voz / Docs",
        y: 60,
      },
      {
        icon: <Layers size={26} />,
        label: "Comprensión",
        sublabel: "Intención + entidades",
        y: 150,
      },
      {
        icon: <Settings size={26} />,
        label: "Procesamiento",
        sublabel: "Contexto + memoria",
        y: 240,
      },
      {
        icon: <CheckCircle size={26} />,
        label: "Respuesta",
        sublabel: "Acción inteligente",
        y: 330,
      },
    ];

    return (
      <div className="relative w-full h-[420px] flex items-center justify-center">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 460 420"
        >
          <defs>
            <linearGradient
              id="nlpGradV3"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "#f97316" }} />
              <stop offset="100%" style={{ stopColor: "#eab308" }} />
            </linearGradient>
          </defs>
          {/* Central pipeline */}
          <motion.line
            x1="230" y1="95" x2="230" y2="310"
            stroke="url(#nlpGradV3)" strokeWidth="3" strokeDasharray="8 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          {/* Side connectors */}
          <motion.line
            x1="270" y1="150" x2="340" y2="150"
            stroke="#f97316" strokeWidth="1.5" opacity="0.25"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.line
            x1="270" y1="240" x2="340" y2="240"
            stroke="#f97316" strokeWidth="1.5" opacity="0.25"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          />
        </svg>

        {/* Side value annotations */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute text-xs text-jhedai-primary/50 font-medium"
          style={{ right: "12%", top: "33%" }}
        >
          <ValueBadge label="NER + Sentimiento" delay={1.3} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute text-xs text-jhedai-primary/50 font-medium"
          style={{ right: "12%", top: "55%" }}
        >
          <ValueBadge label="RAG + LLMs" delay={1.5} />
        </motion.div>

        {stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
            className="absolute group"
            style={{ left: "calc(50% - 34px)", top: stage.y - 34 }}
          >
            <div
              className={`w-[68px] h-[68px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
            >
              {stage.icon}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-32 text-right w-28">
              <p className="text-sm font-bold text-jhedai-primary leading-tight">
                {stage.label}
              </p>
              <p className="text-xs text-jhedai-primary/60">
                {stage.sublabel}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // 5. COMPUTER VISION — Pipeline de Inspección Visual
  // ═══════════════════════════════════════════════════════════
  const ComputerVisionFlow = () => (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 400">
        <defs>
          <linearGradient id="cvGradV2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#6366f1" }} />
            <stop offset="100%" style={{ stopColor: "#a855f7" }} />
          </linearGradient>
        </defs>
        {/* Top to analysis */}
        <motion.line
          x1="230" y1="85" x2="230" y2="140"
          stroke="url(#cvGradV2)" strokeWidth="3" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {/* Analysis to branches */}
        <motion.line
          x1="230" y1="195" x2="130" y2="270"
          stroke="url(#cvGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.line
          x1="230" y1="195" x2="330" y2="270"
          stroke="url(#cvGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        {/* Branches to decision */}
        <motion.line
          x1="130" y1="310" x2="230" y2="355"
          stroke="url(#cvGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.line
          x1="330" y1="310" x2="230" y2="355"
          stroke="url(#cvGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </svg>

      {[
        {
          icon: <Upload size={24} />,
          x: 230, y: 55,
          label: "Captura",
          sublabel: "Imagen / Video / CCTV",
          textPos: "top" as const,
        },
        {
          icon: <Eye size={24} />,
          x: 230, y: 165,
          label: "Detección",
          sublabel: "CNN + YOLO",
          textPos: "right" as const,
        },
        {
          icon: <CheckCircle size={24} />,
          x: 130, y: 280,
          label: "Conforme",
          sublabel: "Pasa inspección",
          textPos: "left" as const,
        },
        {
          icon: <AlertCircle size={24} />,
          x: 330, y: 280,
          label: "Anomalía",
          sublabel: "Alerta inmediata",
          textPos: "right" as const,
        },
        {
          icon: <Award size={24} />,
          x: 230, y: 360,
          label: "Decisión",
          sublabel: "Automatizada",
          textPos: "bottom" as const,
        },
      ].map((node, i) => {
        const getTextPosition = () => {
          switch (node.textPos) {
            case "top":
              return "-top-14 left-1/2 -translate-x-1/2";
            case "bottom":
              return "-bottom-14 left-1/2 -translate-x-1/2";
            case "left":
              return "top-1/2 -translate-y-1/2 -left-32";
            case "right":
              return "top-1/2 -translate-y-1/2 -right-36";
            default:
              return "-bottom-14 left-1/2 -translate-x-1/2";
          }
        };

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
            className="absolute group"
            style={{ left: node.x - 30, top: node.y - 30 }}
          >
            <div
              className={`w-[60px] h-[60px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
            >
              {node.icon}
            </div>
            <div
              className={`absolute ${getTextPosition()} text-center w-32`}
            >
              <p className="text-sm font-bold text-jhedai-primary leading-tight">
                {node.label}
              </p>
              <p className="text-xs text-jhedai-primary/60">
                {node.sublabel}
              </p>
            </div>
          </motion.div>
        );
      })}

      {/* Value badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-2 left-4"
      >
        <ValueBadge label="< 50ms latencia" delay={1.5} />
      </motion.div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // 6. AUTOMATIZACIONES — De Manual a Inteligente
  // ═══════════════════════════════════════════════════════════
  const AutomationFlow = () => (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 400">
        <defs>
          <linearGradient id="autoGradV2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#06b6d4" }} />
            <stop offset="100%" style={{ stopColor: "#3b82f6" }} />
          </linearGradient>
        </defs>
        {/* Main trunk */}
        <motion.line
          x1="80" y1="200" x2="170" y2="200"
          stroke="url(#autoGradV2)" strokeWidth="3" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* Branch up */}
        <motion.line
          x1="170" y1="200" x2="270" y2="120"
          stroke="url(#autoGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        {/* Branch down */}
        <motion.line
          x1="170" y1="200" x2="270" y2="280"
          stroke="url(#autoGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        {/* Converge */}
        <motion.line
          x1="270" y1="120" x2="380" y2="200"
          stroke="url(#autoGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.line
          x1="270" y1="280" x2="380" y2="200"
          stroke="url(#autoGradV2)" strokeWidth="2.5" strokeDasharray="8 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </svg>

      {[
        {
          icon: <FileText size={26} />,
          x: 80, y: 200,
          label: "Proceso Manual",
          sublabel: "Tareas repetitivas",
          textPos: "bottom" as const,
        },
        {
          icon: <Zap size={26} />,
          x: 170, y: 200,
          label: "Orquestador IA",
          sublabel: "Agentes autónomos",
          textPos: "bottom" as const,
        },
        {
          icon: <Package size={26} />,
          x: 270, y: 120,
          label: "Documentos",
          sublabel: "Procesamiento auto.",
          textPos: "top" as const,
        },
        {
          icon: <MessageCircle size={26} />,
          x: 270, y: 280,
          label: "Comunicación",
          sublabel: "Respuesta inteligente",
          textPos: "bottom" as const,
        },
        {
          icon: <Clock size={26} />,
          x: 380, y: 200,
          label: "Resultado",
          sublabel: "Eficiencia operativa",
          textPos: "bottom" as const,
        },
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
          className="absolute group"
          style={{ left: node.x - 35, top: node.y - 35 }}
        >
          <div
            className={`w-[70px] h-[70px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
          >
            {node.icon}
          </div>
          <div
            className={`absolute ${node.textPos === "top" ? "-top-14" : "-bottom-16"} left-1/2 -translate-x-1/2 text-center w-36`}
          >
            <p className="text-sm font-bold text-jhedai-primary leading-tight">
              {node.label}
            </p>
            <p className="text-xs text-jhedai-primary/60">{node.sublabel}</p>
          </div>
        </motion.div>
      ))}

      {/* Value badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-2 right-4"
      >
        <ValueBadge label="↓ 70% tiempo operativo" delay={1.6} />
      </motion.div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // 7. DATA SCIENCE — Ciclo de Experimentación Rigurosa
  // ═══════════════════════════════════════════════════════════
  const DataScienceFlow = () => {
    const stages = [
      {
        icon: <Lightbulb size={24} />,
        label: "Hipótesis",
        sublabel: "de negocio",
      },
      {
        icon: <Settings size={24} />,
        label: "Diseño",
        sublabel: "experimental",
      },
      {
        icon: <Play size={24} />,
        label: "Ejecución",
        sublabel: "controlada",
      },
      {
        icon: <BarChart3 size={24} />,
        label: "Análisis",
        sublabel: "estadístico",
      },
      {
        icon: <CheckCircle size={24} />,
        label: "Validación",
        sublabel: "y deployment",
      },
    ];

    const radius = 125;
    const centerX = 220;
    const centerY = 190;

    const points = stages.map((_, i) => {
      const angle = (i / stages.length) * 2 * Math.PI - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    const pentagonPath =
      points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
      " Z";

    return (
      <div className="relative w-full h-[420px] flex items-center justify-center">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 440 400"
        >
          <defs>
            <linearGradient
              id="dsGradV3"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "#f43f5e" }} />
              <stop offset="100%" style={{ stopColor: "#f97316" }} />
            </linearGradient>
          </defs>
          {/* Pentagon outline */}
          <motion.path
            d={pentagonPath}
            fill="none"
            stroke="url(#dsGradV3)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Inner star lines */}
          {points.map((p, i) => {
            const next = points[(i + 2) % points.length];
            return (
              <motion.line
                key={i}
                x1={p.x} y1={p.y} x2={next.x} y2={next.y}
                stroke="#f43f5e" strokeWidth="1" opacity="0.12"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.5 + i * 0.15 }}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute z-20 text-center"
          style={{ left: centerX - 40, top: centerY - 20 }}
        >
          <p className="text-xs font-bold text-rose-500 tracking-widest">
            CICLO
          </p>
          <p className="text-sm font-bold text-jhedai-primary">Data Science</p>
        </motion.div>

        {stages.map((stage, i) => {
          const angle = (i / stages.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const labelDist = 75;
          const lx = labelDist * Math.cos(angle);
          const ly = labelDist * Math.sin(angle);

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: i * 0.2 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute group"
              style={{ left: x - 30, top: y - 30 }}
            >
              <div
                className={`w-[60px] h-[60px] rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                {stage.icon}
              </div>
              <div
                className="absolute text-center w-28"
                style={{
                  left: `calc(50% + ${lx}px)`,
                  top: `calc(50% + ${ly}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-sm font-bold text-jhedai-primary leading-tight">
                  {stage.label}
                </p>
                <p className="text-xs text-jhedai-primary/60">
                  {stage.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}
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
      {type === "branching" && gradient.includes("cyan") && (
        <AutomationFlow />
      )}
      {type === "circular" && gradient.includes("rose") && (
        <DataScienceFlow />
      )}
    </div>
  );
};

export default ServiceFlowDiagram;
