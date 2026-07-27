import type { Variants } from "framer-motion";

/**
 * Fade in from below — the most common section entrance animation.
 * Used across Hero, GitHub, Projects, Experience, Blogs, Contact, etc.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Simple opacity fade.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Fade in from below with configurable delay.
 * Useful for elements that appear after the main section heading.
 */
export function fadeInUpWithDelay(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: "easeOut" },
    },
  };
}
