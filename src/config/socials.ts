import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";

export type SocialLink = {
  name: string;
  href: string;
  icon: typeof FaGithub;
  ariaLabel: string;
  hoverColor?: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/debagoswami83",
    icon: FaGithub,
    ariaLabel: "GitHub Profile",
    hoverColor: "hover:text-slate-900 dark:hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/debagoswami83/",
    icon: FaLinkedin,
    ariaLabel: "LinkedIn Profile",
    hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/debagoswami83",
    icon: FaInstagram,
    ariaLabel: "Instagram Profile",
    hoverColor: "hover:text-pink-600 dark:hover:text-pink-400",
  },
  {
    name: "Discord",
    href: "https://discord.com/channels/@debagoswamiali8642",
    icon: FaDiscord,
    ariaLabel: "Discord Profile",
    hoverColor: "hover:text-indigo-600 dark:hover:text-indigo-400",
  },
] as const;
