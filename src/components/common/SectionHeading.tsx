import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-10",
        centered ? "items-center justify-center text-center" : "",
        className
      )}
    >
      <h2
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-normal font-serif text-slate-900 dark:text-white",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm font-serif text-zinc-500 dark:text-zinc-400",
            !centered && "max-w-xl",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
