import { motion } from "framer-motion";
import { Button } from "../components/ui";
import { scaleIn, viewport } from "../lib/motion";
import { SITE } from "../lib/seo";

export function FinalCTA() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-x">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="wash-deep relative overflow-hidden rounded-[1.5rem] px-6 py-16 text-center sm:px-12 sm:py-20"
        >
    
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-cream sm:text-[2.75rem]">
              Reclaim 10+ hours a week, starting this one.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.7] text-mist/90">
              Free trial, free migration, no credit card.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/#pricing" size="lg" variant="cream">
                Start free trial
              </Button>
              <Button href={SITE.demo} size="lg" variant="ghost-cream">
                Book a demo
              </Button>
            </div>
            <p className="mt-6 text-[13.5px] text-mist/90">
              Questions?{" "}
              <a href={`mailto:${SITE.email}`} className="font-bold text-cream underline underline-offset-4">
                {SITE.email}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
