import { cn } from "@/lib/utils";

interface AvailableBadgeProps {
  className?: string;
}

export function AvailableBadge({ className }: AvailableBadgeProps) {
  return (
    <span className={cn("flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-500", className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      Available
    </span>
  );
}
