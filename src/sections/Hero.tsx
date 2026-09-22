import { motion } from "framer-motion";
import {
  AudioLines,
  BarChart3,
  Bot,
  Headphones,
  Layers,
  Leaf,
  Star,
  TrendingUp,
} from "lucide-react";
import { PEOPLE } from "../lib/assets";
import { EASE_OUT } from "../lib/motion";
import { SITE } from "../lib/seo";
import { HeroTexture } from "../components/HeroTexture";
import { ShaderBackground } from "../components/ShaderBackground";
import { PillCta, Portrait } from "../components/ui";

/**
 * One screen, in the reference's order.
 *
 * Headline, the tagline, the four points that back the tagline up, the way
 * in, who already uses it, and a thin band of standing facts across the foot.
 *
 * The four points sit directly under the tagline because they are evidence
 * for it, and they are set small and light for the same reason: 13px medium
 * in soft ink against a 17px lede, so they read as support rather than as a
 * second claim. All four icons are the one dark green: a single colour
 * keeps the row calm, and the icons carry meaning by shape instead.
 *
 * Everything is one orchestrated entrance on load. Nothing here waits for a
 * scroll, because none of it needs to be scrolled to.
 */

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT, delay: 0.07 * i },
  }),
};

const badges = [
  { icon: Leaf, label: "Canadian-made" },
  { icon: Headphones, label: "7-day phone support" },
  { icon: AudioLines, label: "Voice AI included" },
];

/* Set as text the three facts are narrower than they were as pills, so one
   pass has to be laid down more times to cross a wide screen before the -50%
   translate can look continuous. Derived rather than written down, so the
   strip keeps working if a fourth fact is added. */
const PASS = Math.max(1, Math.ceil(15 / badges.length));
const BADGE_RUN = Array.from({ length: PASS }, () => badges).flat();

/* One colour for all four. Each icon is picked to say what its point says:
   stacked layers for the apps you drop, a bot for the work that runs itself,
   a chart for what you can see, a rising line for what closes. */
const proof = [
  { icon: Layers, text: "Stop switching between 10+ disconnected apps" },
  { icon: Bot, text: "AI handles follow-ups while you focus on clients" },
  { icon: BarChart3, text: "See your entire pipeline and team performance at a glance" },
  { icon: TrendingUp, text: "Close more deals in less time, without adding hours" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-teal-ink"
    >
      {/*
        Two layers. The drawn ground is the floor: it is what shows when WebGL
        is unavailable or the reader asks for reduced motion, both of which
        leave the canvas above it transparent. When the shader does run it
        paints over the whole thing.
      */}
      <HeroTexture />
      <ShaderBackground className="pointer-events-none absolute inset-0" />

      {/*
        The scrim, and it is not optional.

        The recipe's two lightest stops are near #f4ffc7. Left bare, cream
        type over them measured 1.0:1 on the first recipe tried here and the
        headline simply vanished. Two layers fix it without flattening the
        motion: a flat wash over everything, and a soft ellipse that deepens
        only where the copy sits, so the drift stays open at the margins.

        These numbers are not decorative. A lighter pass was tried and
        measured, and it failed badly: the drift carries a near-white blob on
        a slow orbit, and when it passes behind the headline cream type on it
        falls to 1.06:1. Five frames of sampling missed it entirely. The
        numbers below are checked against sixteen frames spanning a full
        cycle of the slowest blob, which is the only sample that catches it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-teal-ink/60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_46%,rgba(7,28,23,0.66),rgba(7,28,23,0.14)_74%,transparent)]"
      />
      {/* The foot, where the running band's small caps sit. The drawn ground
          had its own ramp here; the shader paints over that, so the ramp has
          to exist as a layer too. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-[#04130f]/90 via-[#04130f]/45 to-transparent"
      />

      <div className="hero-fit relative flex flex-1 flex-col pb-8 pt-[6rem] sm:pb-12 sm:pt-[8.5rem]">
        <motion.div
          initial="hidden"
          animate="show"
          className="container-x flex flex-1 flex-col items-center justify-center text-center"
        >
          <motion.h1 id="hero-title" custom={0} variants={rise} className="t-display max-w-[22ch] text-cream">
            Every missed <span className="whitespace-nowrap">follow-up</span> is a lost deal.
          </motion.h1>

          <motion.p custom={1} variants={rise} className="t-lede hero-lede mt-5 max-w-[48ch] text-cream/85 sm:mt-6">
            Your AI agent calls, texts and WhatsApps every new lead,{" "}
            <span className="font-semibold text-mint">24/7</span>.
          </motion.p>

          {/*
            Two by two rather than four across: at four columns each point got
            a 10em measure and broke into three ragged lines, and the row read
            as a feature strip. Paired, each one holds a single line at the
            width the hero already uses.

            Translucent fill over the wash rather than an opaque card, so the
            boxes sit in the gradient instead of punching holes in it, and a
            hairline instead of a shadow for the same reason.
          */}
          <motion.ul className="mt-6 grid w-full max-w-[44rem] gap-2.5 text-left sm:mt-8 sm:grid-cols-2 sm:gap-3">
            {proof.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                custom={2 + i}
                variants={rise}
                className="flex items-start gap-3 rounded-[0.875rem] border border-cream/[0.14] bg-cream/[0.07] px-4 py-3 backdrop-blur-md sm:py-3.5"
              >
                <Icon
                  className="mt-[0.1em] size-[18px] shrink-0 text-mint"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium leading-[1.45] tracking-[-0.01em] text-cream/90">
                  {text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            custom={6}
            variants={rise}
            className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-9 sm:w-auto sm:flex-row"
          >
            <PillCta href="/#pricing" tone="cream" className="w-full justify-between sm:w-auto sm:justify-start">
              Start free trial
            </PillCta>
            <PillCta href={SITE.demo} tone="outline-light" className="w-full justify-between sm:w-auto sm:justify-start">
              Book a demo
            </PillCta>
          </motion.div>

          <motion.div custom={7} variants={rise} className="mt-6 flex items-center gap-3 sm:mt-7">
            <ul className="flex -space-x-2.5">
              {["grace", "mateo", "elias", "marissa"].map((k) => (
                <li key={k}>
                  <Portrait src={PEOPLE[k].photo} name={PEOPLE[k].name} size={32} />
                </li>
              ))}
            </ul>
            <div className="text-left">
              <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold-soft text-gold-soft" aria-hidden="true" />
                ))}
              </div>
              <p className="t-meta mt-0.5 text-cream/90">Used by 1,000+ Canadian agents</p>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/*
        The standing facts, set as a running band across the foot of the hero
        rather than as pills sitting inside it.

        Flush to the section edge and outside the padded column on purpose: a
        thin full-bleed strip closes the screen off, where three capsules
        floating inside it read as another row of content competing with the
        four points. Only the first real pass is announced.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
        className="marquee relative border-t border-cream/15 py-3.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <ul className="marquee-track flex w-max items-center">
          {[...BADGE_RUN, ...BADGE_RUN].map(({ icon: Icon, label }, i) => (
            <li
              key={`${label}-${i}`}
              aria-hidden={i < badges.length ? undefined : true}
              className="flex shrink-0 items-center gap-2.5 px-7"
            >
              <Icon className="size-3.5 shrink-0 text-mint" aria-hidden="true" />
              <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.1em] text-cream">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
