"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../layout/ThemeToggle";
import { useState, useEffect } from "react";
import { getExperiences } from "@/lib/data";

type Experience = {
  id: string;
  slug: string;
  company: string;
  role: string;
  summary: string;
  startDate: string;
  endDate: string;
  location: string;
  tags: string[];
  published: boolean;
};

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const router = useRouter();

  useEffect(() => {
    getExperiences().then((data) =>
      setExperiences(
        (data as Experience[]).filter(
          (e) => (e as unknown as { published: boolean }).published !== false
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
              <h1 className="text-xl font-bold text-slate-900 dark:text-white ">
                Experiences
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="w-full h-px bg-slate-200 dark:bg-[#333] mb-4" />

          <div className="mb-5 text-sm text-slate-600 dark:text-slate-300 ">
            <p>
              I build and ship full stack products with a focus on reliable
              delivery, clean architecture, and practical DevOps.
            </p>
          </div>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="border-t border-slate-200/50 dark:border-[#2A2A2A] first:border-t-0"
              >
                <div className="w-full py-4 sm:py-5 flex items-center gap-2 sm:gap-4 transition-colors group">
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3
                        className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate "
                        title={exp.company}
                      >
                        {exp.company}
                      </h3>
                      {exp.endDate === "" && (
                        <span className="shrink-0 px-1.5 py-0.5 sm:px-2 text-[10px] sm:text-xs font-medium bg-green-900/20 text-green-400 rounded border border-green-800">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-5 font-normal text-[#70717B] dark:text-[#989898] ">
                      {exp.role}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 sm:gap-3">
                    <div className="text-right">
                      <p className="text-xs sm:text-sm leading-5 font-medium text-[#333333] dark:text-[#EBEBEB]">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                      {exp.location && (
                        <p className="text-xs sm:text-sm text-[#70717B] dark:text-[#989898]">
                          {exp.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pb-5 pl-0 sm:pl-0">
                  {exp.summary && (
                    <p className="dark:text-slate-300 text-slate-600 text-sm mb-3">
                      {exp.summary}
                    </p>
                  )}

                  <div className="mt-3">
                    <a
                      href={`/experiences/${exp.slug}`}
                      className="dark:text-slate-300 font-medium gap-1 hover:underline inline-flex items-center text-slate-700 text-sm"
                    >
                      View experience details
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-[#262626] text-center">
            <p className="text-base font-medium text-slate-600 dark:text-slate-400 ">
              Love what I do?{" "}
              <a
                href="mailto:debagoswamiali.200@gmail.com"
                className="font-bold text-slate-900 dark:text-white hover:underline transition-all hover-glitch inline-block"
              >
                Hire me!
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
