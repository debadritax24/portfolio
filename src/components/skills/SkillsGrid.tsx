"use client";

import { motion } from "framer-motion";
import { type Skill, type SkillLayer, skillLayers as layers } from "@/data/skills";
import { SectionHeading } from "@/components/common/SectionHeading";

function TechPill({ tech }: { tech: Skill }) {
  const Icon = tech.icon;
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/[0.06] bg-slate-100 dark:bg-white/[0.02] hover:border-blue-500/25 hover:bg-blue-500/[0.03] transition-all duration-200 cursor-default group/tech">
      <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover/tech:text-blue-400 transition-colors duration-200" />
      <span className="text-xs font-medium text-slate-700 dark:text-zinc-400 group-hover/tech:text-slate-900 dark:group-hover/tech:text-zinc-200 transition-colors duration-200">{tech.name}</span>
    </div>
  );
}

function LayerBlock({ layer, index }: { layer: SkillLayer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
        <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 dark:text-zinc-500">{layer.label}</span>
      </div>

      <div className="flex flex-wrap gap-2 pl-4">
        {layer.skills.map((tech) => (
          <TechPill key={tech.name} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsGrid() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I use to design, build, and deploy scalable web applications while continuously learning new tools."
          centered
          className="mb-0"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {layers.map((layer, index) => (
          <LayerBlock key={layer.label} layer={layer} index={index} />
        ))}
      </div>
    </section>
  );
}
