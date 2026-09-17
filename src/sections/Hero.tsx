import { motion, type Variants } from "framer-motion";
import { ArrowLeftRight, Check, ShieldCheck, Undo2 } from "lucide-react";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";
import { SITE } from "../lib/seo";
import { Button, cx } from "../components/ui";
import { IMG, PEOPLE } from "../lib/assets";

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
 * raw HTML reads them as written. Block-level so each clause owns its line
 * rather than wrapping inside its own box and breaking mid-phrase.
 */
function Clause({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span variants={headlineClause} className={cx("block", className)}>
      {children}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section
      className="hero-fit relative flex min-h-svh flex-col overflow-hidden pb-10 pt-24 sm:pb-12 sm:pt-28"
      aria-labelledby="hero-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grain [mask-image:radial-gradient(ellipse_60%_50%_at_20%_0%,black_20%,transparent_75%)]" />
        <div className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(26_107_90/0.14),transparent)]" />
      </div>

      <div className="container-x grid w-full flex-1 items-center gap-10 lg:grid-cols-[1.12fr_1fr] lg:items-stretch lg:gap-12">
        {/* ---------------- copy ---------------- */}
        <motion.div
          variants={stagger(0.07, 0.05)}
          initial="hidden"
          animate="show"
          className="lg:flex lg:flex-col lg:justify-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-teal shadow-soft">
              <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
              The real estate operating system
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={stagger(0.12, 0.1)}
            className="mt-5 text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[2.9rem] lg:text-[3.3rem]"
          >
            <Clause>Every missed follow-up</Clause>
            <Clause className="text-teal">is a lost commission.</Clause>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="hero-lede mt-4 max-w-xl text-[17px] leading-[1.65] text-ink-soft"
          >
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

          <motion.ul
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-ink-soft"
          >
            {[
              { icon: ShieldCheck, label: "No credit card required" },
              { icon: Undo2, label: "Cancel anytime" },
              { icon: ArrowLeftRight, label: "Migration handled free" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon className="size-4 shrink-0 text-teal" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ------------- photograph + attributed result ------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
          className="relative lg:mr-[calc(-1*(max(0px,(100vw-76rem)/2)+2rem))]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-line shadow-lift lg:rounded-r-none lg:border-r-0">
            <img
              src={IMG.hero}
              alt="Four colleagues at a desk throwing their arms up to celebrate a deal closing"
              width={1200}
              height={960}
              fetchPriority="high"
              decoding="async"
              className="aspect-[5/4] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            />
          </div>
          {/* only a light base gradient: the card carries its own background,
              so the photograph never needed a wash across the whole frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-t from-teal-ink/30 via-transparent to-transparent lg:rounded-r-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 1 }}
            className="absolute left-4 top-4 max-w-[16.5rem] rounded-2xl bg-cream/95 p-3.5 shadow-lift backdrop-blur-sm"
          >
            <p className="text-[26px] font-extrabold leading-none tracking-[-0.025em] text-teal">
              +$155K GCI
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-ink-soft">
              in the four months after switching.
            </p>
            {/* Attribution is text only: the headshots are served from the
                live domain, which is currently 404ing every asset URL, and a
                broken image icon in the hero is worse than no portrait. */}
            <span className="mt-3 block border-t border-line pt-2.5">
              <span className="block text-[11.5px] font-bold leading-tight text-ink">
                {PEOPLE.grace.name}
              </span>
              <span className="block text-[10.5px] leading-tight text-ink-soft">
                {PEOPLE.grace.role}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
