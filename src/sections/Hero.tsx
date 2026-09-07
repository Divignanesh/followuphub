import { motion, type Variants } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";
import { SITE } from "../lib/seo";
import { Button, cx } from "../components/ui";
import { IMG } from "../lib/assets";

const proofPoints = [
  "Stop paying for ten disconnected apps",
  "AI works every lead while you are in showings",
  "One pipeline for your whole team",
];

const headlineClause: Variants = {
  hidden: { opacity: 0, y: "0.3em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/**
 * Animates the headline one clause at a time rather than one word at a time.
 * Word-splitting scatters the most important heading on the page across a
 * dozen nested spans; keeping whole phrases intact means anything parsing the
 * raw HTML reads them as written.
 */
function Clause({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span variants={headlineClause} className={cx("inline-block", className)}>
      {children}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section
      className="hero-fit relative flex min-h-svh items-center overflow-hidden pb-10 pt-20 sm:pb-14 sm:pt-24"
      aria-labelledby="hero-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grain [mask-image:radial-gradient(ellipse_60%_50%_at_20%_0%,black_20%,transparent_75%)]" />
        <div className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(26_107_90/0.14),transparent)]" />
      </div>

      <div className="container-x grid w-full items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* ---------------- copy ---------------- */}
        <motion.div variants={stagger(0.07, 0.05)} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-teal shadow-soft">
              <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
              The real estate operating system
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={stagger(0.12, 0.1)}
            className="mt-5 text-[2.5rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[3.1rem] lg:text-[3.6rem]"
          >
            <Clause>Every missed follow-up</Clause>{" "}
            <Clause className="text-teal">is a lost commission.</Clause>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-lede mt-4 max-w-xl text-[17px] leading-[1.65] text-ink-soft">
            FollowUpHub is the AI real estate CRM that calls, texts, WhatsApps and emails every
            lead within seconds, then keeps nurturing until they book. Pipeline, marketing and
            client websites included. Built in Canada for agents and teams.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-5 space-y-2">
            {proofPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mist">
                  <Check className="size-3 text-teal" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/#pricing" size="lg" withArrow className="w-full sm:w-auto">
              Start 14-day free trial
            </Button>
            <Button href={SITE.demo} size="lg" variant="secondary" className="w-full sm:w-auto">
              Book a 10-minute demo
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-teal" aria-hidden="true" />
              No credit card required
            </span>
            <span>Cancel anytime</span>
            <span>Migration handled free</span>
          </motion.p>
        </motion.div>

        {/* ------------- photograph + live demo overlay ------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
          className="relative"
        >
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
              <img
                src={IMG.hero}
                alt="A real estate team celebrating a closed deal together in their office"
                width={1200}
                height={1008}
                fetchPriority="high"
                decoding="async"
                className="aspect-[5/4] w-full object-cover lg:aspect-[10/9]"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-b from-teal-ink/50 via-transparent to-teal-ink/25"
            />

            {/* headline result, top-left over the photo */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 1 }}
              className="absolute left-4 top-4 max-w-[15rem] rounded-2xl bg-cream/95 p-3.5 shadow-soft backdrop-blur-sm"
            >
              <p className="text-[22px] leading-none font-extrabold tracking-[-0.02em] text-teal">
                +$155K GCI
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-ink-soft">
                for Grace Lim&rsquo;s team in the four months after switching.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
