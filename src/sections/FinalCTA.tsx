import { motion } from "framer-motion";
import { Button } from "../components/ui";
import { scaleIn, viewport } from "../lib/motion";
import { SITE } from "../lib/seo";

export function FinalCTA() {
  return (
    <section className="pb-24 sm:pb-28">
      <div className="container-x">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2rem] bg-teal px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-32 size-96 rounded-full bg-cream/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 size-[26rem] rounded-full bg-[#b3541e]/25 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-cream sm:text-[2.75rem]">
              Reclaim 10+ hours a week, starting this one.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.7] text-mist/90">
              Join 1,000+ Canadian agents who replaced the app chaos with one system. Free trial,
              free migration, no credit card.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/#pricing" size="lg" variant="cream" withArrow>
                Start 14-day free trial
              </Button>
              <Button href={SITE.demo} size="lg" variant="ghost-cream">
                Book a 10-minute demo
              </Button>
            </div>
            <p className="mt-6 text-[13.5px] text-mist/90">
              Prefer to talk?{" "}
              <a href={`tel:${SITE.phone}`} className="font-bold text-cream underline underline-offset-4">
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
