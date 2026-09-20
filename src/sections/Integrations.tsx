import { motion } from "framer-motion";
import { Check, CircleDashed, CircleCheck } from "lucide-react";
import { SectionHeading } from "../components/ui";
import { fadeUp, stagger, viewport } from "../lib/motion";

/**
 * Before and after in one frame.
 *
 * Pattern from 21st.dev "Comparison Section" (@hirael/comparison-03): a single
 * bordered container split by one divider, each side introduced by a small
 * icon-and-label header, the old way struck through and the new way checked,
 * closing on a strip of outcomes. Two floating panels with an arrow between
 * them read as two separate things; this reads as one trade.
 */

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

const outcomes: [string, string][] = [
  ["250+", "lead sources that sync on their own"],
  ["1", "contact record behind every channel"],
  ["0", "copy-paste between tools"],
];

export function Integrations() {
  return (
    <section id="integrations" className="py-8 sm:py-10">
      <div className="container-x">
        <SectionHeading
          align="split"
          title={
            <>
              The same week, run <span className="grad-teal">two ways</span>.
            </>
          }
          lede="What actually changes on the Monday after you switch."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 overflow-hidden rounded-2xl border border-line bg-card"
        >
          <div className="grid md:grid-cols-2">
            {/* before */}
            <motion.div variants={fadeUp} className="border-line p-7 max-md:border-b md:border-r sm:p-8">
              <p className="flex items-center gap-2">
                <CircleDashed className="size-4 text-ink-faint" aria-hidden="true" />
                <span className="t-label text-ink-faint">The stack you have now</span>
              </p>
              <ul className="mt-6 space-y-3.5">
                {before.map((b) => (
                  <li key={b} className="flex items-start gap-3 t-body text-ink-faint">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-ink-faint/50" />
                    <span className="line-through decoration-ink-faint/35 decoration-1">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* after */}
            <motion.div variants={fadeUp} className="bg-mist/40 p-7 sm:p-8">
              <p className="flex items-center gap-2">
                <CircleCheck className="size-4 text-teal" aria-hidden="true" />
                <span className="t-label text-teal">With FollowUpHub</span>
              </p>
              <ul className="mt-6 space-y-3.5">
                {after.map((a) => (
                  <li key={a} className="flex items-start gap-3 t-body text-ink">
                    <Check className="mt-1 size-3.5 shrink-0 text-teal" strokeWidth={3} aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* the trade, in numbers */}
          <motion.div
            variants={fadeUp}
            className="grid gap-px border-t border-line bg-line sm:grid-cols-3"
          >
            {outcomes.map(([n, label]) => (
              <div key={label} className="flex items-baseline gap-3 bg-card px-7 py-5">
                <span className="font-mono text-[1.6rem] font-extrabold leading-none tracking-[-0.03em] text-teal">
                  {n}
                </span>
                <span className="t-meta text-ink-soft">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <p className="mt-6 text-center t-meta text-ink-soft">
          Plus webhooks, Zapier and a documented REST API for anything custom.{" "}
          <a
            href="/#platform"
            className="font-bold text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:text-teal-deep hover:decoration-teal"
          >
            Explore the platform
          </a>
        </p>
      </div>
    </section>
  );
}
