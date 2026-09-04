import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionHeading, cx } from "../components/ui";
import { scaleIn, stagger, viewport } from "../lib/motion";
import { PLANS } from "../lib/seo";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Pricing"
          title="Start with the system agents usually have to build themselves."
          lede="Both plans include a 14-day free trial and free migration of your existing CRM data. No contract, no cancellation fee."
        />

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-2"
        >
          {PLANS.map((plan) => {
            const featured = "recommended" in plan && plan.recommended;
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
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className={cx("pb-1.5 text-[14px] font-medium", featured ? "text-mist/70" : "text-ink-soft")}>
                    /month {plan.currency}
                  </span>
                </p>
                <p className={cx("mt-2 text-[12.5px] font-semibold", featured ? "text-mist/65" : "text-ink-soft")}>
                  {plan.billingNote}
                </p>

                <a
                  href={plan.checkout}
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
          Prices in USD. Yearly billing is optional and gives you two months free.
        </p>
      </div>
    </section>
  );
}
