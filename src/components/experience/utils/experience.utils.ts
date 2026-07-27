import { Briefcase, Sparkles, GraduationCap, Heart, Zap } from "lucide-react";
import type { FlatExperience } from "@/types/experience";
import type { Experience } from "@prisma/client";

export function mapExperienceToFlat(exp: Experience, index: number): FlatExperience {
  const rawSummary = exp.summary || "";
  const descriptionBullets = rawSummary
    .split("\n")
    .map((l: string) => l.trim().replace(/^[-•]\s*/, ""))
    .filter((l: string) => l !== "");
  const achievements = exp.achievements || [];
  const isCurrent = exp.endDate ? false : true;
  const dateString = exp.endDate
    ? `${exp.startDate} — ${exp.endDate}`
    : `${exp.startDate} — Present`;
  return {
    id: exp.id || `exp-${index}`,
    company: exp.company || "Unknown Company",
    location: exp.location || "",
    title: exp.role || "",
    date: dateString,
    description: descriptionBullets,
    technologies: exp.tags || [],
    achievements,
    type:
      exp.type ||
      (exp.company?.toLowerCase().includes("freelance")
        ? "Freelance"
        : "Full-time"),
    logoUrl: exp.imageUrl || undefined,
    website: (exp as any).website || undefined,
    isCurrent,
    startDate: exp.startDate || "",
    endDate: exp.endDate || "",
  };
}
export function getStatusBadge(exp: FlatExperience) {
  if (exp.isCurrent) {
    return {
      label: "Present",
      icon: Zap,
      classes: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    };
  }
  return null;
}

export function getTypeBadge(type: string) {
  const map: Record<
    string,
    { icon: typeof Briefcase; label: string; color: string }
  > = {
    "Full-time": {
      icon: Briefcase,
      label: "Full-time",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    Freelance: {
      icon: Sparkles,
      label: "Freelance",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    Internship: {
      icon: GraduationCap,
      label: "Internship",
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    Contract: {
      icon: Briefcase,
      label: "Contract",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    Volunteer: {
      icon: Heart,
      label: "Volunteer",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  };
  return (
    map[type] || {
      icon: Briefcase,
      label: type,
      color: "text-zinc-400 bg-white/[0.04] border-white/[0.08]",
    }
  );
}

export function getDurationMonths(startDate: string, endDate: string): string {
  const parse = (d: string) => {
    const parts = d.split(/[\/\-]/);
    if (parts.length >= 2) {
      const month = parseInt(parts[0], 10) - 1;
      const year = parseInt(parts[1], 10);
      return new Date(year, month);
    }
    return new Date(d);
  };
  const start = parse(startDate);
  const end = endDate ? parse(endDate) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (months < 1) return "< 1 mo";
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs === 0) return `${mos} mo`;
  if (mos === 0) return `${yrs} yr`;
  return `${yrs} yr ${mos} mo`;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}
