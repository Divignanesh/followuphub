import { motion } from "framer-motion";
import { BadgeCheck, Check } from "lucide-react";
import { useState } from "react";
import { SectionHeading, cx } from "../components/ui";
import { scaleIn, stagger, viewport } from "../lib/motion";
import { PLANS } from "../lib/seo";

type Billing = "monthly" | "yearly";

export function Pricing() {
  // Monthly is the initial render, so the prerendered HTML a crawler reads is
  // the headline price rather than a state it has to run JavaScript to reach.
  const [billing, setBilling] = useState<Billing>("monthly");
  const yearly = billing === "yearly";

  return (
    <section id="pricing" className="py-6">
      <div className="container-x">
        <SectionHeading
          kicker="Pricing"
          title="Two plans. One price."
          lede="Both include a free trial. Advanced includes a one-time setup fee."
        />

        <div className="mt-8 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex rounded-full border border-line bg-card p-1"
          >
            {(
              [
                ["monthly", "Monthly"],
                ["yearly", "Yearly, 2 months free"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={billing === key}
                onClick={() => setBilling(key)}
                className={cx(
                  "rounded-full px-5 py-2 text-[14px] font-semibold transition-colors",
                  billing === key ? "bg-teal text-cream" : "text-ink-soft hover:text-teal",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-8 grid max-w-4xl gap-4 lg:grid-cols-2"
        >
          {PLANS.map((plan) => {
            const featured = "recommended" in plan && plan.recommended;
            const price = yearly ? plan.priceYearly : plan.price;
            const note = yearly ? plan.billingNoteYearly : plan.billingNote;
            // Falls back to the monthly link until annual links exist — see
            // the note beside PLANS in lib/seo.ts.
            const href = (yearly && plan.checkoutYearly) || plan.checkout;

            return (
              <motion.li
                key={plan.id}
                variants={scaleIn}
                className={cx(
                  "relative flex flex-col gap-4 rounded-[1rem] p-6",
                  featured
                    ? "border-2 border-teal bg-card shadow-[0_18px_50px_-24px_rgb(26_107_90/0.45)]"
                    : "border border-line bg-card shadow-card",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-teal px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white">
                    Recommended
                  </span>
                )}

                <div className="flex flex-col gap-1.5">
                  {/* The setup fee is the first thing people ask about, so it
                      shares the title row rather than sitting in small print. */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal">
                        {plan.name} plan
                      </p>
                      <h3 className="mt-1.5 t-h3 text-ink">
                        {plan.subtitle}
                      </h3>
                    </div>
                    {plan.setupNote && (
                      <span className="-mt-1 shrink-0 rounded-lg border border-teal/25 bg-mist px-3 py-1.5 text-right">
                        <span className="flex items-center justify-end gap-1.5">
                          <BadgeCheck className="size-4 shrink-0 text-teal" strokeWidth={2.4} aria-hidden="true" />
                          <span className="text-[12.5px] font-extrabold leading-tight text-teal">
                            {plan.setupNote}
                          </span>
                        </span>
                        {plan.setupDetail && (
                          <span className="block text-[10.5px] leading-tight text-ink-soft">
                            {plan.setupDetail}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">{plan.summary}</p>
                </div>

                <div className="flex items-baseline gap-2 border-y border-line py-3">
                  <span className="text-[2.6rem] font-extrabold leading-none tracking-[-0.035em] text-ink">
                    ${price.toFixed(2)}
                  </span>
                  {/* The period follows the toggle. It was hardcoded to "/month", so
                      switching to yearly rendered "$499.90 /month CAD" beside a
                      link that charges once a year. */}
                  <span className="text-[14px] font-medium text-ink-soft">
                    {yearly ? "/year CAD" : "/month CAD"}
                  </span>
                </div>

                <p className="-mt-2 text-[13px] text-ink-soft">{note}</p>

                <ul className="flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-ink">
                      <Check className="mt-1 size-3.5 shrink-0 text-teal" strokeWidth={3} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold transition-colors duration-200",
                    featured
                      ? "bg-teal text-white hover:bg-teal-deep"
                      : "border border-line bg-card text-ink hover:bg-sand",
                  )}
                >
                  {plan.cta}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="mt-5 text-center text-[13px] text-ink-soft">
          Cancel any time from your account. No contract, no cancellation fee.
        </p>
      </div>
    </section>
  );
}
