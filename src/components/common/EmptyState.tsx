import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: any;
  className?: string;
}

export function EmptyState({ title, description, icon: Icon = Briefcase, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 px-4 text-center", className)}>
      <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-slate-500 dark:text-zinc-500" />
      </div>
      <h3 className="text-base font-medium text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-zinc-500 max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}
