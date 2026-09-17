import { motion } from "framer-motion";
import { BadgeCheck, Check, Sparkles } from "lucide-react";
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
    <section id="pricing" className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Pricing"
          title="Start with the system agents usually have to build themselves."
          lede="Both plans include a 14-day free trial. Basic gives you the Complete Agent System. Advanced adds the full AI engine, 6-month Smart Nurture AI, and white-glove setup."
        />

        <div className="mt-10 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex rounded-full border border-line bg-card p-1"
          >
            {(
              [
                ["monthly", "Monthly"],
                ["yearly", "Yearly — 2 months free"],
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
          className="mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-2"
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
                  "relative flex flex-col rounded-3xl border p-8",
                  featured
                    ? "border-transparent bg-teal-ink text-cream shadow-teal lg:-my-3"
                    : "border-line bg-card shadow-soft",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-clay px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    <Sparkles className="size-3" aria-hidden="true" />
                    Recommended
                  </span>
                )}

                <h3 className={cx("text-[13px] font-bold uppercase tracking-[0.14em]", featured ? "text-mist/70" : "text-teal")}>
                  {plan.name} plan
                </h3>
                <p className={cx("mt-2 text-[21px] font-extrabold tracking-[-0.02em]", featured ? "text-cream" : "text-ink")}>
                  {plan.subtitle}
                </p>
                <p className={cx("mt-2 text-[14.5px] leading-[1.65]", featured ? "text-mist/80" : "text-ink-soft")}>
                  {plan.summary}
                </p>

                <p className="mt-7 flex items-end gap-2">
                  <span
                    className={cx(
                      "text-[3rem] font-extrabold leading-none tracking-[-0.035em]",
                      featured ? "text-cream" : "text-ink",
                    )}
                  >
                    ${price.toFixed(2)}
                  </span>
                  <span className={cx("pb-1.5 text-[14px] font-medium", featured ? "text-mist/70" : "text-ink-soft")}>
                    {yearly ? "/year" : "/month"} {plan.currency}
                  </span>
                </p>
                {yearly && (
                  <p className={cx("mt-1.5 text-[13px]", featured ? "text-mist/75" : "text-ink-soft")}>
                    ${(plan.priceYearly / 12).toFixed(2)} per month, billed annually
                  </p>
                )}
                <p className={cx("mt-2 text-[12.5px] font-semibold", featured ? "text-mist/65" : "text-ink-soft")}>
                  {note}
                </p>

                {/* What the plan adds beyond the monthly price, given its
                    own tile so it reads as part of the offer rather than
                    small print under it. */}
                {plan.setupNote && (
                  <div
                    className={cx(
                      "mt-5 flex items-center gap-3.5 rounded-2xl p-4",
                      featured
                        ? "bg-cream/[0.09] ring-1 ring-cream/25"
                        : "bg-teal/[0.06] ring-1 ring-teal/20",
                    )}
                  >
                    <span
                      className={cx(
                        "grid size-11 shrink-0 place-items-center rounded-xl",
                        featured ? "bg-clay text-white" : "bg-teal text-white",
                      )}
                    >
                      <BadgeCheck className="size-[22px]" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cx(
                          "block text-[16px] font-extrabold tracking-[-0.015em]",
                          featured ? "text-cream" : "text-ink",
                        )}
                      >
                        {plan.setupNote}
                      </span>
                      {plan.setupDetail && (
                        <span
                          className={cx(
                            "mt-0.5 block text-[13px] leading-snug",
                            featured ? "text-mist/75" : "text-ink-soft",
                          )}
                        >
                          {plan.setupDetail}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "mt-7 inline-flex h-12 items-center justify-center rounded-full text-[15px] font-bold transition-colors duration-200",
                    featured
                      ? "bg-cream text-teal-ink hover:bg-white"
                      : "bg-teal text-white hover:bg-teal-deep",
                  )}
                >
                  {plan.cta}
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px]">
                      <Check
                        className={cx("mt-0.5 size-4 shrink-0", featured ? "text-mist" : "text-teal")}
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span className={featured ? "text-mist/90" : "text-ink"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="mt-8 text-center text-[13.5px] text-ink-soft">
          Early access is limited and closes once we hit capacity.
        </p>
      </div>
    </section>
  );
}
