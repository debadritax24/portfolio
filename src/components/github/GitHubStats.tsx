"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { Activity, Flame, Folder, Terminal, ArrowRight, GitBranch } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContributionGraph from "./ContributionGraph";
import { fetchGitHubContributions, fetchGitHubUser, fetchGitHubRepos } from "@/services/github";
import { siteConfig } from "@/config/site";

export default function GitHubStats() {
  const [stats, setStats] = useState({
    contributions: "",
    streak: "",
    repos: "",
    topLanguage: ""
  });

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const username = siteConfig.socialLinks.github.split("/").filter(Boolean).pop();
        if (!username) throw new Error("GitHub username not configured");

        const contribs = await fetchGitHubContributions(username);

        let streak = 0;
        const allDays = contribs?.weeks?.flatMap(w => w.contributionDays) || [];

        if (allDays.length > 0) {
          let currentIndex = allDays.length - 1;
          if (currentIndex >= 0 && allDays[currentIndex].contributionCount === 0) {
            currentIndex--;
          }
          while (currentIndex >= 0 && allDays[currentIndex].contributionCount > 0) {
            streak++;
            currentIndex--;
          }
        }

        let reposCount = "";
        try {
          const user = await fetchGitHubUser(username);
          reposCount = user.public_repos?.toString() || "";
        } catch (err) {
          console.error("Failed to fetch repo count:", err);
        }

        let topLang = "";
        try {
          const repos = await fetchGitHubRepos(username);
          const langs: Record<string, number> = {};
          repos.forEach((r) => {
            if (r.language) {
              langs[r.language] = (langs[r.language] || 0) + 1;
            }
          });
          let maxCount = 0;
          for (const [lang, count] of Object.entries(langs)) {
            if (count > maxCount) {
              maxCount = count;
              topLang = lang;
            }
          }
        } catch (err) {
          console.error("Failed to fetch top language:", err);
        }

        if (isMounted) {
          setStats({
            contributions: contribs?.totalContributions?.toLocaleString() || "",
            streak: `${streak}`,
            repos: reposCount,
            topLanguage: topLang
          });
        }
      } catch (error) {
        console.error("Failed to load GitHub stats:", error);
        if (isMounted) {
          setStats({
            contributions: "",
            streak: "",
            repos: "",
            topLanguage: ""
          });
        }
      }
    }
    loadStats();
    return () => { isMounted = false; };
  }, []);

  const statCards = [
    { label: "Contributions", value: stats.contributions, icon: Activity, color: "text-slate-900 dark:text-white" },
    { label: "Current streak", value: `${stats.streak} Days`, icon: Flame, color: "text-slate-900 dark:text-white" },
    { label: "Repositories", value: stats.repos, icon: Folder, color: "text-slate-900 dark:text-white" },
    { label: "Top language", value: stats.topLanguage, icon: Terminal, color: "text-blue-600 dark:text-blue-500" },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section id="github" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:pt-0 sm:pb-16">
        
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-10 gap-2"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-normal font-serif text-slate-900 dark:text-white mb-2">
              GitHub Activity
            </h2>
            <p className="text-sm font-serif text-zinc-500 dark:text-zinc-400">
              Recent open-source contributions and coding consistency.
            </p>
          </div>
          <Link
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors mt-2"
          >
            View GitHub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </m.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

          {/* Contribution Graph */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="relative lg:col-span-8 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/50 flex flex-col transition-all duration-300 overflow-hidden"
          >
            {/* Editor Chrome Header */}
            <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-100/50 dark:bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <div className="flex-1 text-center flex justify-center">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/60 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.05]">
                  <GitBranch className="w-3 h-3 text-zinc-500" />
                  <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 font-mono tracking-wide">activity.sh</span>
                </div>
              </div>
              <div className="w-[42px]" /> {/* Spacer to balance the dots */}
            </div>

            {/* Graph Content */}
            <div className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center overflow-x-auto scrollbar-hide">
              {/* Background gradient/glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative min-w-max flex justify-center scale-[0.85] sm:scale-100 origin-center z-10">
                <ContributionGraph />
              </div>
            </div>
          </m.div>

          {/* Metrics Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 h-full content-start">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + (i * 0.05), ease: "easeOut" }}
                  className="flex flex-col justify-between p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20 hover:translate-y-[-2px] aspect-square sm:aspect-auto sm:h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-zinc-500 shrink-0" strokeWidth={2} />
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{stat.label}</span>
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${stat.color}`}>
                    {stat.value}
                  </div>
                </m.div>
              );
            })}
          </div>

        </div>
      </section>
    </LazyMotion>
  );
}