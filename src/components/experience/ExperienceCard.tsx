"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { FlatExperience } from "@/types/experience";
import { getStatusBadge, getTypeBadge, getDurationMonths, getInitials } from "./utils/experience.utils";
import { TechBadge } from "@/components/common/TechBadge";

interface ExperienceCardProps {
  exp: FlatExperience;
  index: number;
  variants: any;
  prefersReducedMotion: boolean;
}

export function ExperienceCard({
  exp,
  index,
  variants,
  prefersReducedMotion,
}: ExperienceCardProps) {
  const statusBadge = getStatusBadge(exp);
  const typeInfo = getTypeBadge(exp.type);
  const TypeIcon = typeInfo.icon;
  const duration = getDurationMonths(exp.startDate, exp.endDate);

  return (
    <motion.article
      variants={variants}
      className="relative flex flex-col sm:flex-row gap-6 sm:gap-10 pb-12 border-b border-slate-200 dark:border-white/10 last:border-0 group"
      aria-label={`${exp.title} at ${exp.company}`}
    >
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-end mb-5">
          <div className="flex items-center gap-2">
            {statusBadge && (
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusBadge.classes}`}
              >
                <statusBadge.icon className="w-2.5 h-2.5" />
                {statusBadge.label}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeInfo.color}`}
            >
              <TypeIcon className="w-2.5 h-2.5" />
              {typeInfo.label}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="shrink-0 hidden sm:block">
              {exp.logoUrl ? (
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-2.5 flex items-center justify-center overflow-hidden">
                  <img
                    src={exp.logoUrl}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-sm font-bold text-zinc-500 tracking-wider">
                    {getInitials(exp.company)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 mt-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-2">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  {exp.company}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.date}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-medium text-zinc-500">
                <Clock className="w-3 h-3" />
                {duration}
              </div>
            </div>
          </div>
        </div>

        <div className="flex sm:hidden items-center gap-3 mb-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {duration}
          </div>
          {exp.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </div>
            </>
          )}
        </div>

        {exp.description.length > 0 && (
          <div className="mb-5">
            <div className="space-y-1.5">
              {exp.description.slice(0, 3).map((paragraph, i) => (
                <p key={i} className="text-sm text-zinc-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {exp.achievements && exp.achievements.length > 0 && (
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-2.5">
              Highlights
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5" role="list">
              {exp.achievements.slice(0, 6).map((ach, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent-cyan shrink-0" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {exp.technologies.slice(0, 8).map((tech, i) => (
              <TechBadge key={i} tech={tech} />
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {exp.location && (
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </div>
            )}
            {exp.website && (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-white transition-colors"
              >
                Visit
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
