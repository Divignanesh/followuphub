import type { Transition, Variants } from "framer-motion";

/** Expo-out: fast start, long settle. Used for entrances. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = { type: "spring", stiffness: 240, damping: 30, mass: 0.8 };
export const springSnappy: Transition = { type: "spring", stiffness: 520, damping: 34 };

/** Variant functions read `custom` as a delay in seconds. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  }),
};

/** Orchestration-only parent variant. */
export const stagger = (each = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

export const viewport = { once: true, margin: "-80px 0px -10% 0px" } as const;
