import type { Variants } from "framer-motion";

/**
 * Staggered container — children animate in sequence.
 * Usage: Apply to parent with `variants={staggerContainer}`,
 *        and `fadeInUp` (or similar) to each child.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item — standard child variant for use inside a stagger container.
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Create a stagger container with custom timing.
 */
export function createStaggerContainer(
  staggerMs = 0.1,
  delayMs = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerMs,
        delayChildren: delayMs,
      },
    },
  };
}
