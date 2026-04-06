import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface MarketplaceItem {
  name: string;
  desc: string;
}

interface MarketplaceSectionProps {
  title: string;
  description: string;
  items: MarketplaceItem[];
  accent?: string;
}

const MarketplaceSection = ({
  title,
  description,
  items,
}: MarketplaceSectionProps) => {
  return (
    <section id="marketplace" className="py-24 relative bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-3">
              MARKETPLACE
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              {title}
            </h2>
            <p className="text-jhedai-primary/60 text-[16px] leading-relaxed mb-8">
              {description}
            </p>
            <button className="boton-secundario text-[14px] inline-flex items-center gap-2">
              Ver catálogo completo <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* Right - Cards */}
          <div className="lg:w-2/3 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card p-8 flex items-start gap-6 cursor-pointer relative overflow-hidden bg-white hover:bg-jhedai-primary/[0.02]"
              >
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-jhedai-primary group-hover:text-jhedai-secondary transition-colors">
                      {item.name}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-jhedai-primary/20 group-hover:text-jhedai-secondary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p className="text-[15px] text-jhedai-primary/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Status dot */}
                <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-jhedai-primary/30 shrink-0 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Disponible
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
