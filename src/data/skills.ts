/**
 * Skills data — static content for the Skills & Technologies section.
 *
 * Extracted from SkillsGrid.tsx to separate data from presentation.
 * To add or reorder skills, modify only this file.
 */

import {
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiTailwindcss,
  SiPostman,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiTypescript,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SkillLayer {
  label: string;
  skills: Skill[];
}

export const skillLayers: SkillLayer[] = [
  {
    label: "Application",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Prisma", icon: SiPrisma },
      { name: "Python", icon: SiPython },
      { name: "C/C++", icon: SiCplusplus },
    ],
  },
  {
    label: "Data",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    label: "Infrastructure",
    skills: [
      { name: "Vercel", icon: SiVercel },
      { name: "GitHub Actions", icon: SiGithub },
    ],
  },
  {
    label: "Workflow",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "Postman", icon: SiPostman },
      { name: "Figma", icon: SiFigma },
    ],
  },
];
