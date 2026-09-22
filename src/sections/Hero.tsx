import { motion } from "framer-motion";
import { AudioLines, Check, Headphones, Leaf, Star } from "lucide-react";
import { PEOPLE } from "../lib/assets";
import { EASE_OUT } from "../lib/motion";
import { SITE } from "../lib/seo";
import { PillCta, Portrait } from "../components/ui";

/**
 * One screen, in the reference's order.
 *
 * Headline, subtext, the way in, who already uses it, a moving strip of
 * standing facts, and then the four things that change, sitting down in the
 * band. That sequence is lifted from the reference deliberately: it answers
 * what it is, what it does, who trusts it and what you get, in the order a
 * reader asks those questions.
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

/* Three pills is roughly 620px of track, nowhere near enough to cross a wide
   screen, so the strip is laid down until one pass clears it. Same reasoning
   as the brokerage row: derive the count rather than write it down, and the
   strip keeps working if a fourth fact is added. */
const PASS = Math.max(1, Math.ceil(12 / badges.length));
const BADGE_RUN = Array.from({ length: PASS }, () => badges).flat();

const proof = [
  "Stop switching between 10+ disconnected apps",
  "AI handles follow-ups while you focus on clients",
  "See your entire pipeline and team performance at a glance",
  "Close more deals in less time",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      {/*
        Two stops, and the band starts below the headline.

        The banding came from the stop list, not from where the element sat:
        five stops bunched in the back half made the colour accelerate, slow
        and accelerate again, and the eye reads any change in that rate as an
        edge. A single pair of stops fades at one constant rate.

        Where it sits differs from the reference because the colour does. Grey
        to orange holds its red channel at 245 the whole way, so the
        reference's first third barely tints. Cream to teal drops all three
        channels at once, so run across the whole panel it would put the
        headline on green by the second line.
      */}
      <div
        aria-hidden="true"
        className="wash-teal pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
      />

      {/* the ruled ground, over the gradient, gone before the colour arrives */}
      <div
        aria-hidden="true"
        className="bg-rule pointer-events-none absolute inset-x-0 top-0 h-[55%] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="relative flex flex-1 flex-col pb-12 pt-[7.5rem] sm:pb-14 sm:pt-[8.5rem]">
        <motion.div
          initial="hidden"
          animate="show"
          className="container-x flex flex-1 flex-col items-center justify-center text-center"
        >
          <motion.h1 id="hero-title" custom={0} variants={rise} className="t-display max-w-[22ch] text-ink">
            Every missed <span className="whitespace-nowrap">follow-up</span> is a lost deal.
          </motion.h1>

          <motion.p custom={1} variants={rise} className="t-lede mt-6 max-w-[48ch] text-ink-soft">
            Your AI agent calls, texts and WhatsApps every new lead,{" "}
            <span className="font-semibold text-teal">24/7</span>.
          </motion.p>

          <motion.div
            custom={2}
            variants={rise}
            className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <PillCta href="/#pricing" className="w-full justify-between sm:w-auto sm:justify-start">
              Start free trial
            </PillCta>
            <PillCta href={SITE.demo} tone="outline" className="w-full justify-between sm:w-auto sm:justify-start">
              Book a demo
            </PillCta>
          </motion.div>

          <motion.div custom={3} variants={rise} className="mt-7 flex items-center gap-3">
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
                  <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                ))}
              </div>
              <p className="t-meta mt-0.5 text-ink-soft">Used by 1,000+ Canadian agents</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Full-bleed, so the strip runs off both edges rather than stopping
            inside the column. Only the first real pass is announced. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.32 }}
          className="marquee relative mt-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
        >
          <ul className="marquee-track flex w-max items-center gap-3 pr-3">
            {[...BADGE_RUN, ...BADGE_RUN].map(({ icon: Icon, label }, i) => (
              <li
                key={`${label}-${i}`}
                aria-hidden={i < badges.length ? undefined : true}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-ink/10 bg-card/80 px-4 py-2.5 backdrop-blur-sm"
              >
                <Icon className="size-4 shrink-0 text-teal" aria-hidden="true" />
                <span className="whitespace-nowrap text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The band: the tick sits above its line rather than beside it, which
            is what lets four sentences of different lengths line up. */}
        <motion.ul
          initial="hidden"
          animate="show"
          className="container-x mt-10 grid w-full gap-x-8 gap-y-7 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          {proof.map((pt, i) => (
            <motion.li key={pt} custom={5 + i} variants={rise}>
              <span className="grid size-7 place-items-center rounded-full bg-teal text-cream">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <p className="mt-3 max-w-[26ch] text-[15px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {pt}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
