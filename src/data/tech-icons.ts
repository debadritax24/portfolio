/**
 * Tech icon mapping — maps technology names to their visual representation.
 *
 * Extracted from ProjectCard.tsx to separate data from presentation.
 * Used by project cards to display tech stack icons.
 */

import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiFirebase,
  SiVercel,
  SiPrisma,
  SiMongodb,
  SiPython,
} from "react-icons/si";
import type { IconType } from "react-icons";

export interface TechIconMapping {
  Icon?: IconType;
  bg: string;
  color: string;
  initial?: string;
}

const techIconMap: Array<{ match: string; Icon: IconType; bg: string; color: string }> = [
  { match: "react", Icon: SiReact, bg: "bg-[#141414]", color: "text-[#61DAFB]" },
  { match: "next", Icon: SiNextdotjs, bg: "bg-white", color: "text-black" },
  { match: "tailwind", Icon: SiTailwindcss, bg: "bg-[#141414]", color: "text-[#06B6D4]" },
  { match: "type", Icon: SiTypescript, bg: "bg-[#3178C6]", color: "text-white" },
  { match: "ts", Icon: SiTypescript, bg: "bg-[#3178C6]", color: "text-white" },
  { match: "node", Icon: SiNodedotjs, bg: "bg-[#141414]", color: "text-[#339933]" },
  { match: "postgres", Icon: SiPostgresql, bg: "bg-[#4169E1]", color: "text-white" },
  { match: "firebase", Icon: SiFirebase, bg: "bg-[#141414]", color: "text-[#FFCA28]" },
  { match: "vercel", Icon: SiVercel, bg: "bg-black", color: "text-white" },
  { match: "prisma", Icon: SiPrisma, bg: "bg-[#141414]", color: "text-white" },
  { match: "mongo", Icon: SiMongodb, bg: "bg-[#141414]", color: "text-[#47A248]" },
  { match: "python", Icon: SiPython, bg: "bg-[#141414]", color: "text-[#3776AB]" },
];

/**
 * Resolve a technology name to its icon, background color, and text color.
 * Falls back to a text initial if no icon match is found.
 */
export function getTechIcon(tech: string): TechIconMapping {
  const normalized = tech.toLowerCase();

  for (const entry of techIconMap) {
    if (normalized.includes(entry.match)) {
      return { Icon: entry.Icon, bg: entry.bg, color: entry.color };
    }
  }

  // Fallback: display first letter as initial
  return { bg: "bg-[#222]", color: "text-white", initial: tech.charAt(0).toUpperCase() };
}
