import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { getTechIcon } from "@/data/tech-icons";
import type { ProjectListItem } from "@/types/project";
import Link from "next/link";

function FallbackImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [error, setError] = useState(false);

  if (!src || error || src === "null" || src === "undefined") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-[#1a1a1a] text-slate-400 dark:text-slate-600">
        <span className="text-xs font-medium tracking-wide">No Image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
}

export function ProjectCard({ project, index }: { project: ProjectListItem; index: number }) {
  const displayDate = new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="group h-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col h-full p-3 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[20px] transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20"
      >
        {/* Main Card Link Overlay */}
        <Link 
          href={`/projects/${project.slug}`} 
          className="absolute inset-0 z-0 rounded-[20px]" 
          aria-label={`View project details for ${project.title}`}
        />

        <div className="relative z-10 w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-[#141414] border border-slate-200/50 dark:border-white/[0.04] pointer-events-none">
          <FallbackImage
            src={project.imageUrl || ""}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </div>

        <div className="relative z-10 flex flex-col flex-1 px-1 pt-4 pb-2 pointer-events-none">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors duration-200 tracking-tight leading-none">
              {project.title}
            </h3>
            
            <div className="flex items-center gap-3 text-slate-400 dark:text-zinc-500 shrink-0 pointer-events-auto z-20">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="View live demo"
                >
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <FaGithub className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-auto pt-2 pointer-events-auto z-20">
            <span className="text-[13px] text-slate-500 dark:text-zinc-500 font-medium pointer-events-none">
              {displayDate}
            </span>
            
            <div className="flex -space-x-2">
              {project.techStack.slice(0, 5).map((tech, i) => {
                const iconData = getTechIcon(tech);
                return (
                  <div 
                    key={i} 
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0a0a0a] shadow-sm ${iconData.bg} ${iconData.color}`}
                    style={{ zIndex: 5 - i }}
                    title={tech}
                  >
                    {iconData.Icon ? (
                      <iconData.Icon className="w-3 h-3" />
                    ) : (
                      <span className="text-[9px] font-bold">{iconData.initial}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
