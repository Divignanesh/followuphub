import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowLeftRight, Check, ShieldCheck, Undo2 } from "lucide-react";
import { RayField } from "../components/RayField";
import { Button, cx } from "../components/ui";
import { BROKERAGES } from "../lib/assets";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";
import { SITE } from "../lib/seo";

/**
 * One dark panel, everything centred inside it, closing on the brokerages.
 *
 * The panel is where the texture lives — the page above and below it is solid
 * cream, so the rays read as a deliberate surface rather than wallpaper. The
 * logo row sits inside the panel rather than in a strip beneath it, so the
 * first screen answers what it is, what it does and who already uses it
 * without the reader leaving the frame.
 */

const proofPoints = [
  "Stop switching between 10+ disconnected apps",
  "AI handles follow-ups while you focus on clients",
  "See your entire pipeline and team performance at a glance",
  "Close more deals in less time",
];

const trust = [
  { icon: ShieldCheck, label: "No credit card required" },
  { icon: Undo2, label: "Cancel anytime" },
  { icon: ArrowLeftRight, label: "Migration handled free" },
];

const headlineClause: Variants = {
  hidden: { opacity: 0, y: "0.3em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

function Clause({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span variants={headlineClause} className={cx("block", className)}>
      {children}
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} aria-labelledby="hero-title">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        style={reduce ? undefined : { opacity: fade, y: lift }}
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      >
        <RayField />

        <motion.div
          variants={stagger(0.07, 0.2)}
          initial="hidden"
          animate="show"
          className="container-x relative flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-24"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-mist backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
              The real estate operating system
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={stagger(0.12, 0.28)}
            className="mt-5 max-w-[17ch] text-[2.05rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-cream sm:mt-7 sm:text-[3.4rem] lg:text-[4.1rem]"
          >
            <Clause>Every missed follow-up</Clause>
            <Clause className="grad-cream">is a lost business.</Clause>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3.5 max-w-[52ch] text-[15px] font-bold leading-[1.4] text-mist sm:mt-5 sm:text-[18px] sm:leading-[1.45]"
          >
            One system for the follow-up, the pipeline and the marketing.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-[62ch] text-[13.5px] leading-[1.55] text-mist/75 sm:text-[15.5px] sm:leading-[1.6]"
          >
            The all-in-one real estate OS with AI follow-ups &mdash; your AI agent calls,
            WhatsApp, texts, and nurtures every lead 24/7 &mdash; pipeline management, and
            a full marketing suite. Built in Canada, built for growth.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="mx-auto mt-5 hidden max-w-2xl gap-x-8 gap-y-2 text-left sm:mt-6 sm:grid sm:grid-cols-2"
          >
            {proofPoints.map((pt) => (
              <li key={pt} className="flex items-center gap-2 text-[14px] font-medium text-mist/90">
                <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-cream/15">
                  <Check className="size-2.5 text-cream" strokeWidth={3.5} aria-hidden="true" />
                </span>
                {pt}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-6 flex w-full flex-col gap-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:gap-3">
            <Button href="/#pricing" size="lg" variant="cream" withArrow className="w-full sm:w-auto">
              Start free trial
            </Button>
            <Button href={SITE.demo} size="lg" variant="ghost-cream" className="w-full sm:w-auto">
              Schedule 10-min demo
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-mist/70"
          >
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5 shrink-0 text-mist/70" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>

          {/* who already runs on it, inside the frame */}
          <motion.p
            variants={fadeUp}
            className="mt-auto pt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-mist/60 sm:pt-10 sm:text-[12px]"
          >
            Used by 1,000+ agents and 36 of Canada&rsquo;s top brokerages
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="mt-5 flex w-full flex-wrap items-center justify-center gap-2.5 sm:mt-6 sm:gap-3.5"
          >
            {BROKERAGES.slice(0, 6).map((b, i) => (
              <li
                key={b.name}
                className={cx(
                  "flex h-10 w-[6.25rem] items-center justify-center rounded-xl bg-cream/95 px-2.5 shadow-[0_6px_20px_-10px_rgb(13_44_38/0.6)] sm:h-12 sm:w-[7.5rem] sm:px-3",
                  i > 3 && "hidden sm:flex",
                )}
              >
                <img
                  src={b.src}
                  alt={b.name}
                  loading="eager"
                  decoding="async"
                  className="max-h-6 w-auto max-w-full object-contain sm:max-h-7"
                />
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
