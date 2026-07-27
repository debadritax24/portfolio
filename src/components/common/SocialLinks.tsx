import { socialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-slate-400 dark:text-zinc-500 transition-colors",
            link.hoverColor
          )}
          aria-label={link.ariaLabel}
        >
          <link.icon className={cn("w-5 h-5", iconClassName)} />
        </a>
      ))}
    </div>
  );
}
