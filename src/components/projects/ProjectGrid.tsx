"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getProjects } from "@/lib/data";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { fadeInUp } from "@/animations";
import type { ProjectListItem } from "@/types/project";

export function ProjectGrid({ initialData }: { initialData?: ProjectListItem[] }) {
  const [projects, setProjects] = useState<ProjectListItem[]>(initialData || []);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      getProjects().then((data) =>
        setProjects(
          (data as ProjectListItem[]).filter(
            (p) => (p as unknown as { published: boolean }).published !== false
          )
        )
      );
    } else {
      requestAnimationFrame(() => setProjects(initialData));
    }
  }, [initialData]);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-8 flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-normal font-serif text-slate-900 dark:text-white mb-2">
          Projects.
        </h2>
        <p className="text-sm font-serif text-zinc-500 dark:text-zinc-400">
          Some of the key projects I've built and open-sourced.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="flex justify-center mt-10"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.04] text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-colors duration-200 border border-slate-200 dark:border-white/[0.06]"
        >
          View All Projects
        </Link>
      </motion.div>
    </section>
  );
}
