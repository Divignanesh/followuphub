import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EASE_OUT, fadeUp, springSnappy, stagger, viewport } from "../lib/motion";
import { SectionHeading } from "../components/ui";
import type { Faq } from "../lib/seo";

/**
 * Answers render as real text in the DOM at all times — the accordion
 * animates height only. Collapsed answers stay in the markup so search
 * crawlers and AI answer engines can read every one, which is what keeps
 * the visible content in sync with the FAQPage structured data.
 */
export function FAQ({ faqs, heading }: { faqs: readonly Faq[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            kicker="FAQ"
            title={heading ?? "Questions agents ask before switching."}
            lede="Straight answers about pricing, migration and what the AI actually does."
          />
        </div>

        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="border-t border-line"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <motion.li key={f.q} variants={fadeUp} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`${id}-button`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16.5px] font-bold tracking-[-0.01em] text-ink transition-colors hover:text-teal"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={springSnappy}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink-soft"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-panel`}
                      role="region"
                      aria-labelledby={`${id}-button`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-[15px] leading-[1.75] text-ink-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
