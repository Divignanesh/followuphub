import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

/**
 * A statistic that is physically incapable of displaying the wrong number.
 *
 * The digits are plain text — server-rendered, never interpolated, never
 * driven by an animation frame. Only the reveal is animated, so the figure
 * is correct for crawlers, AI answer engines, no-JS visitors, background
 * tabs, and anyone whose animation frames are throttled.
 *
 * This deliberately replaces a count-up. The previous site animated these
 * from a hardcoded 0 and shipped "0% ROI" and "+$0,000 GCI" in its static
 * HTML, because nothing guaranteed the animation ever finished.
 */
export function StatCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const text = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={className}
    >
      {prefix}
      <span className="tabular-nums">{text}</span>
      {suffix}
    </motion.span>
  );
}
