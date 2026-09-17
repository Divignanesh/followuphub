import { motion, type Variants } from "framer-motion";
import { ArrowLeftRight, ShieldCheck, Undo2 } from "lucide-react";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";
import { SITE } from "../lib/seo";
import { Button, cx } from "../components/ui";
import { IMG, PEOPLE } from "../lib/assets";

/**
 * Figures carried over from the proof points this hero used to list, each now
 * attached to the number behind it. Every one appears elsewhere on the site:
 * Grace Lim's result in Results, the speed-to-lead figure in the same table,
 * and the agent count in the closing call to action.
 */
const stats = [
  { value: "+$155K", unit: "GCI", caption: "Grace Lim's team, four months after switching", face: true },
  { value: "Under 1", unit: "min", caption: "Speed to lead, once the AI picks up a new enquiry" },
  { value: "1,000+", unit: "agents", caption: "Across 36 Canadian brokerages, on one platform" },
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
 * instead of wrapping inside its own box.
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
      className="hero-fit relative flex min-h-svh items-center overflow-hidden pb-12 pt-24 text-cream sm:pb-16 sm:pt-28"
      aria-labelledby="hero-title"
    >
      {/*
        The photograph is a real <img> rather than a CSS background so it can
        carry fetchPriority and be the page's LCP element on its own terms.
      */}
      <img
        src={IMG.hero}
        alt="A real estate team celebrating a closed deal together in their office"
        width={1200}
        height={1008}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />

      {/*
        Two scrims rather than one: a flat wash that guarantees the contrast
        floor wherever the photograph happens to be light, and a vertical
        gradient that deepens the top and bottom so the fixed nav and the stat
        row both sit on darkness instead of on someone's face.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-teal-ink/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-teal-ink/85 via-teal-ink/35 to-teal-ink/90"
      />

      <motion.div
        variants={stagger(0.07, 0.05)}
        initial="hidden"
        animate="show"
        className="container-x relative w-full text-center"
      >
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
            The real estate operating system
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          variants={stagger(0.12, 0.1)}
          className="mx-auto mt-6 max-w-5xl text-[2rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-cream sm:text-[3rem] lg:text-[4rem]"
        >
          <Clause>Every missed follow-up</Clause>
          <Clause className="text-[#7fd8bd]">is a lost commission.</Clause>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="hero-lede mx-auto mt-5 max-w-2xl text-[16.5px] leading-[1.65] text-mist/85 sm:text-[17.5px]"
        >
          FollowUpHub is the AI real estate CRM that calls, texts, WhatsApps and emails every lead
          within seconds, then keeps nurturing until they book. Pipeline, marketing and client
          websites included. Built in Canada for agents and teams.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/#pricing" size="lg" variant="cream" withArrow className="w-full sm:w-auto">
            Start 14-day free trial
          </Button>
          <Button href={SITE.demo} size="lg" variant="ghost-cream" className="w-full sm:w-auto">
            Book a 10-minute demo
          </Button>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-mist/80"
        >
          {[
            { icon: ShieldCheck, label: "No credit card required" },
            { icon: Undo2, label: "Cancel anytime" },
            { icon: ArrowLeftRight, label: "Migration handled free" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon className="size-4 shrink-0 text-[#7fd8bd]" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>

        {/* proof, resting on the darkest part of the frame */}
        <motion.ul
          variants={fadeUp}
          className="mx-auto mt-10 grid max-w-4xl gap-3 sm:mt-12 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <li
              key={s.caption}
              className="rounded-2xl border border-cream/15 bg-cream/[0.08] p-4 text-left backdrop-blur-sm"
            >
              <p className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-extrabold leading-none tracking-[-0.025em] text-cream">
                  {s.value}
                </span>
                <span className="text-[13px] font-bold text-mist/70">{s.unit}</span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-[12.5px] leading-snug text-mist/80">
                {s.face && (
                  <img
                    src={PEOPLE.grace.photo}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="size-6 shrink-0 rounded-full object-cover ring-1 ring-cream/30"
                  />
                )}
                {s.caption}
              </p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
