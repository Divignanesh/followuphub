import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { SectionHeading, cx } from "../components/ui";
import { fadeUp, stagger, viewport } from "../lib/motion";

const before = [
  "Zillow leads exported to a spreadsheet",
  "Email leads keyed in by hand",
  "Addresses copied and pasted from Google Maps",
  "Five different inboxes to check",
  "Social scheduled separately in each platform",
  "Two or three website builders",
];

const after = [
  "Every lead source syncs automatically",
  "One contact record, updated everywhere",
  "One dashboard for the whole operation",
  "One conversation thread per lead",
  "Unified automation rules across channels",
  "Websites, funnels and analytics built in",
];

export function Integrations() {
  return (
    <section id="integrations" className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="split"
          kicker="Open platform, infinite possibilities"
          title="Choose the tools that give you an edge."
          lede="FollowUpHub connects to 250+ lead sources, websites and tools. Pick what works for you now, and add more whenever you want without interrupting your work."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 lg:grid-cols-2"
        >
          {/* without */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-line bg-card p-7 sm:p-8"
          >
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
              Without FollowUpHub
            </h3>
            <ul className="mt-6 space-y-3">
              {before.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-ink-soft">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sand">
                    <X className="size-3 text-ink-faint" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* with */}
          <motion.div
            variants={fadeUp}
            className={cx(
              "relative overflow-hidden rounded-2xl border border-transparent bg-teal-ink p-7 text-cream shadow-teal sm:p-8",
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-teal/30 blur-3xl"
            />
            <div className="relative">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-mist/70">
                With FollowUpHub
              </h3>
              <ul className="mt-6 space-y-3">
                {after.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[14.5px] text-mist/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cream/15">
                      <Check className="size-3 text-cream" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-cream/12 pt-5 text-[13.5px] font-semibold text-mist/80">
                Works with GitHub-style webhooks, Zapier, and a documented REST API for anything
                custom.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 text-center"
        >
          <a
            href="/#platform"
            className="group inline-flex items-center gap-1.5 text-[15px] font-bold text-teal transition-colors hover:text-teal-deep"
          >
            Explore the platform
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.p>
      </div>
    </section>
  );
}
