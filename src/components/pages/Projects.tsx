"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../layout/ThemeToggle";
import { useState, useEffect } from "react";
import { getProjects } from "@/lib/data";
import type { ProjectListItem } from "@/types/project";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    getProjects().then((data) =>
      setProjects(
        (data as ProjectListItem[]).filter(
          (p) => (p as unknown as { published: boolean }).published !== false
        )
      )
    );
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="dark:text-white font-bold text-slate-900 text-xl">
                Projects
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-6" />

          <p className="dark:text-slate-300 mb-5 text-slate-600 text-sm">
            These projects showcase my work across full stack development,
            cloud, and product engineering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                passHref
                legacyBehavior
              >
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group relative bg-white dark:bg-[#0E0D09] rounded-xl overflow-hidden border border-dashed border-gray-200 dark:border-[#3A3A3A] transition-all duration-400 shadow-sm dark:shadow-none"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="pt-12 px-4 pb-0 bg-white dark:bg-[#1a1a1a] overflow-hidden">
                  <div className="relative h-44 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] p-3 flex items-center justify-center overflow-hidden">
                    {project.imageUrl &&
                    (project.imageUrl.startsWith("http") ||
                      project.imageUrl.startsWith("/")) ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-contain rounded-md will-change-transform"
                        style={{
                          transition:
                            "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    ) : (
                      <span className="text-4xl font-bold text-slate-400 dark:text-slate-500 ">
                        {project.title.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3
                    className="text-[#333333] dark:text-[#EBEBEB] transition-colors duration-500 ease-out mb-1"
                    style={{
                      fontSize: "17.6px",
                      lineHeight: "19.36px",
                      fontWeight: 700,
                      letterSpacing: "normal",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-[#70717B] dark:text-[#989898] mb-1"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                      letterSpacing: "normal",
                    }}
                  >
                    {project.shortDescription}
                  </p>
                  <p
                    className="text-[12px] text-slate-500 dark:text-[#A0A0A0]"
                    style={{ lineHeight: "18px", fontWeight: 500 }}
                  >
                    Tech: {project.techStack?.join(", ")}
                  </p>

                  <div className="mt-auto">
                    <span
                      className="inline-flex items-center gap-1.5 text-[#333333] dark:text-[#D4D4D4] transition-all duration-400 ease-out border-b border-transparent pb-0.5"
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                    >
                      View Project
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-400 ease-out" />
                    </span>
                  </div>
                </div>
                </motion.a>
              </Link>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
            <p className="dark:text-slate-400 font-medium text-base text-slate-600">
              For more projects, visit my{" "}
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 dark:text-white hover:underline transition-all inline-flex items-center gap-1 hover-glitch"
              >
                Github
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
