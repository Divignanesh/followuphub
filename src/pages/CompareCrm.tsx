import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Comparison } from "../sections/Comparison";
import { FAQ } from "../sections/FAQ";
import { FinalCTA } from "../sections/FinalCTA";
import { Pricing } from "../sections/Pricing";
import { TrustBar } from "../sections/TrustBar";
import { Button, Kicker, SectionHeading, cx } from "../components/ui";
import { fadeUp, scaleIn, stagger, viewport } from "../lib/motion";
import { SITE } from "../lib/seo";
import {
  CAPABILITIES,
  COMPARE_DATES,
  COMPARE_SLUGS,
  COMPETITORS,
  OUR_COLUMN,
  comparePath,
  type Competitor,
} from "../lib/competitors";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const highlights = [
  "AI calls, texts and WhatsApps every new lead in under a minute",
  "Pre-built buyer, seller and database-reactivation workflows",
  "Websites, reputation management and payments included",
  "Free migration of contacts, pipelines and history",
];

/** Links to every other head-to-head page, plus the buyer's guide. */
export function CompareLinks({ exclude }: { exclude?: Competitor["slug"] }) {
  const others = COMPARE_SLUGS.filter((s) => s !== exclude).map((s) => COMPETITORS[s]);
  return (
    <section className="py-24 sm:py-28" aria-labelledby="compare-more">
      <div className="container-x">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Kicker>Compare</Kicker>
          </motion.div>
          <motion.h2 id="compare-more" variants={fadeUp} className="t-h2 mt-5 text-ink">
            {exclude ? "Compare FollowUpHub with other real estate CRMs" : "FollowUpHub against the CRMs agents switch from"}
          </motion.h2>
        </motion.div>
        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {others.map((c) => (
            <motion.li key={c.slug} variants={fadeUp}>
              <a
                href={comparePath(c.slug)}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 shadow-soft transition-colors hover:border-teal/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                  {c.category}
                </span>
                <span className="mt-2 flex items-center justify-between gap-2 text-[16px] font-extrabold tracking-[-0.02em] text-ink group-hover:text-teal">
                  FollowUpHub vs {c.name}
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            </motion.li>
          ))}
          {exclude && (
            <motion.li variants={fadeUp}>
              <a
                href="/best-crm-for-realtors"
                className="group flex h-full flex-col rounded-2xl border border-teal/25 bg-mist p-5 transition-colors hover:border-teal/50"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                  Buyer&rsquo;s guide
                </span>
                <span className="mt-2 flex items-center justify-between gap-2 text-[16px] font-extrabold tracking-[-0.02em] text-ink group-hover:text-teal">
                  Best CRM for realtors
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            </motion.li>
          )}
        </motion.ul>
      </div>
    </section>
  );
}

export function CompareCrm({ competitor: c }: { competitor: Competitor }) {
  const rows = CAPABILITIES.map(([key, label]) => [label, c.theirs[key], OUR_COLUMN[key]] as const);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40" aria-labelledby="compare-title">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[13px] text-ink-soft">
              <li>
                <a href="/" className="font-semibold transition-colors hover:text-teal">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-ink">
                FollowUpHub vs {c.name}
              </li>
            </ol>
          </nav>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Kicker>{c.category} · 2026</Kicker>
              <p className="mt-3 text-[14px] text-ink-soft">
                By FollowUpHub · Updated{" "}
                <time dateTime={COMPARE_DATES.modified}>{formatDate(COMPARE_DATES.modified)}</time>
              </p>
            </motion.div>
            <motion.h1
              id="compare-title"
              variants={fadeUp}
              className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.25rem]"
            >
              FollowUpHub vs {c.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-[18px] leading-[1.75] text-ink-soft">
              {c.intro}
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[14.5px] font-medium text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={3} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/#pricing" size="lg">
                Start 14-day free trial
              </Button>
              <Button href={SITE.demo} size="lg" variant="secondary">
                Book a 10-minute demo
              </Button>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-[13.5px] text-ink-soft">
              1,000+ agents run their follow-up on FollowUpHub · no contract, cancel any time
            </motion.p>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Why agents switch"
            title={`Why agents look beyond ${c.name}`}
            lede={`Where ${c.name} stops, and what FollowUpHub does instead.`}
          />
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className={cx(
              "mt-14 grid gap-5 md:grid-cols-2",
              c.reasons.length === 3 && "lg:grid-cols-3",
            )}
          >
            {c.reasons.map(({ title, body }, i) => (
              <motion.li
                key={title}
                variants={scaleIn}
                className="rounded-2xl border border-line bg-card p-7 shadow-soft"
              >
                <span className="font-mono text-[12px] font-bold text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-ink-soft">{body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Comparison
        rows={rows}
        otherLabel={c.name}
        kicker="Feature comparison"
        title={`${c.name} vs FollowUpHub`}
        lede="Based on publicly published product and pricing information. Features change, so check both vendors before you decide."
        caption={`Feature-by-feature comparison of ${c.name} and FollowUpHub`}
      />

      <Pricing />
      <FAQ faqs={c.faqs} heading={`FollowUpHub vs ${c.name}: common questions`} />
      <CompareLinks exclude={c.slug} />
      <FinalCTA />
    </>
  );
}
