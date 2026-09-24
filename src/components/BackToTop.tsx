import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "../lib/motion";

/**
 * Driven frame by frame rather than handed to native smooth scrolling. Framer
 * Motion restores window.scrollY with scrollTo(0, y) whenever a whileInView
 * animation needs a layout measurement, and that call cancels a native smooth
 * scroll halfway up the page. Setting the position every frame from elapsed
 * time means an interruption costs one frame, not the whole trip.
 */
function scrollToTop() {
  const from = window.scrollY;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  const duration = Math.min(900, 350 + from / 12);
  const start = performance.now();
  let cancelled = false;
  const cancel = () => (cancelled = true);
  // The reader grabbing the page mid-flight wins over the animation.
  window.addEventListener("wheel", cancel, { once: true, passive: true });
  window.addEventListener("touchstart", cancel, { once: true, passive: true });

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    if (cancelled) return;
    window.scrollTo({ top: from * (1 - eased), behavior: "instant" });
    if (t < 1) requestAnimationFrame(step);
    else {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    }
  };
  requestAnimationFrame(step);
}

/** Appears once the reader is a screen and a half down. */
export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > window.innerHeight * 1.5));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="shadow-pill fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 z-40 grid size-12 place-items-center rounded-full bg-teal text-white transition-colors hover:bg-teal-deep sm:bottom-8 sm:right-8"
        >
          <ArrowUp aria-hidden="true" className="size-5" strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
