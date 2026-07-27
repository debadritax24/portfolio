import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-zinc-500 transition-colors duration-200 group-hover:border-slate-300 dark:group-hover:border-white/[0.1] group-hover:text-slate-900 dark:group-hover:text-zinc-400",
        className
      )}
    >
      {tech}
    </span>
  );
}
