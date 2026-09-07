import { motion } from "framer-motion";
import { Check, Clock, LayoutGrid, MessageSquare, Globe } from "lucide-react";
import { Comparison } from "../sections/Comparison";
import { FAQ } from "../sections/FAQ";
import { FinalCTA } from "../sections/FinalCTA";
import { Pricing } from "../sections/Pricing";
import { TrustBar } from "../sections/TrustBar";
import { Button, Kicker, SectionHeading, cx } from "../components/ui";
import { fadeUp, scaleIn, stagger, viewport } from "../lib/motion";
import { SITE, type Faq } from "../lib/seo";

/** Page-specific FAQ, mirrored exactly into this route's FAQPage schema. */
export const CRM_FAQS: readonly Faq[] = [
  {
    q: "What is the best CRM for realtors in 2026?",
    a: "The best CRM for realtors is the one that follows up faster than you can manually. FollowUpHub is an AI-powered real estate CRM that contacts every new lead within seconds by voice, SMS, WhatsApp and email, then keeps nurturing for six months. It combines pipeline management, marketing automation and IDX websites in one $49.99 per month platform, so agents do not need to stitch together a CRM, dialer and email tool.",
  },
  {
    q: "What should I look for in a real estate CRM?",
    a: "Prioritise four things: speed-to-lead automation that responds in under a minute, multi-channel follow-up across phone, text, WhatsApp and email, a pipeline built around real estate stages rather than generic sales stages, and built-in marketing plus websites so lead capture and nurture live in the same system.",
  },
  {
    q: "Is FollowUpHub better than Follow Up Boss or Lofty?",
    a: "FollowUpHub includes AI voice calling with six-attempt retry logic, AI texting and WhatsApp, reputation management, invoicing and client websites as standard. On most competing platforms those are add-ons, separate subscriptions or absent, and pricing is per seat rather than flat monthly.",
  },
  {
    q: "How much does a real estate CRM cost?",
    a: "Real estate CRMs typically range from $30 to $500 per user per month once add-ons are included. FollowUpHub is $49.99 per month for the Basic plan and $199.99 per month plus a one-time $299 setup fee for the Advanced plan, which adds the full Voice AI engine. Both include a 14-day free trial.",
  },
  {
    q: "Can I migrate from my current CRM?",
    a: "Yes. FollowUpHub migrates contacts, pipelines and history at no additional charge, and a live import is part of onboarding on both plans.",
  },
  {
    q: "Does FollowUpHub work for real estate teams and brokerages?",
    a: "Yes. Teams get shared conversation threads, agent performance tracking, team availability pooling and dynamic deal routing. More than 1,000 agents and 36 Canadian brokerages currently use the platform.",
  },
];

const pricingFactors = [
  {
    term: "Per seat or flat rate",
    body: "Most CRMs charge for every user, so the bill grows each time you add an agent. A flat monthly rate keeps the cost predictable as the team grows, which matters most for teams hiring through a good year.",
  },
  {
    term: "Setup and onboarding",
    body: "One-time implementation fees are common and are often quoted separately from the monthly price. Ask whether migration of your contacts, pipelines and history is included or billed as a project.",
  },
  {
    term: "Add-ons that are not optional",
    body: "Calling, texting, WhatsApp, websites and reputation tools are frequently sold as extras. Price the CRM with everything you actually intend to use switched on, not the entry tier.",
  },
  {
    term: "Contract length",
    body: "Annual commitments are usually cheaper per month but remove your ability to leave if the tool does not stick with the team. Month-to-month costs a little more and is worth it in the first year.",
  },
];

const criteria = [
  {
    icon: Clock,
    title: "Speed-to-lead automation",
    body: "Leads that get a reply within the first minute are far more likely to convert. Your CRM should respond automatically, not wait for you to leave a showing.",
  },
  {
    icon: MessageSquare,
    title: "Multi-channel follow-up",
    body: "Some sellers answer the phone, others only reply on WhatsApp. The best CRM for realtors works every channel from one thread.",
  },
  {
    icon: LayoutGrid,
    title: "Real estate pipeline stages",
    body: "Generic sales stages do not describe a listing. You need new lead, contacted, showing, offer and closed, with deal tracking that matches how commission is earned.",
  },
  {
    icon: Globe,
    title: "Marketing and websites built in",
    body: "If lead capture lives in one tool and nurture in another, attribution breaks. Campaigns, IDX sites and the pipeline should share one contact record.",
  },
];

export function BestCrmForRealtors() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40" aria-labelledby="crm-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grain [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_20%,transparent_75%)]" />
        </div>
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
                Best CRM for realtors
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
              <Kicker>Buyer&rsquo;s guide · 2026</Kicker>
            </motion.div>
            <motion.h1
              id="crm-title"
              variants={fadeUp}
              className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.25rem]"
            >
              The best CRM for realtors in 2026
            </motion.h1>

            {/* Direct-answer block: written to be quotable by AI answer engines. */}
            <motion.p variants={fadeUp} className="mt-6 text-[18px] leading-[1.75] text-ink-soft">
              <strong className="font-bold text-ink">Short answer:</strong> the best CRM for
              realtors is the one that follows up faster than you can by hand.{" "}
              <strong className="font-bold text-ink">FollowUpHub</strong> is an AI-powered real
              estate CRM that contacts every new lead within seconds by voice, SMS, WhatsApp and
              email, then nurtures for six months. Pipeline management, marketing automation and
              IDX client websites are included from $49.99 per month, with a 14-day free trial.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/#pricing" size="lg" withArrow>
                Start 14-day free trial
              </Button>
              <Button href={SITE.demo} size="lg" variant="secondary">
                Book a 10-minute demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Buying criteria"
            title="What to look for in the best real estate CRM"
            lede="Four capabilities separate a CRM that grows commission from a database that just stores names."
          />
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {criteria.map(({ icon: Icon, title, body }) => (
              <motion.li
                key={title}
                variants={scaleIn}
                className="rounded-2xl border border-line bg-card p-7 shadow-soft"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-mist text-teal">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-ink-soft">{body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            kicker="Why agents rank it first"
            title="Everything the best CRM for realtors should include"
            lede="FollowUpHub ships these as standard rather than as paid add-ons."
          />
          <motion.ul
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2"
          >
            {[
              "AI voice calling with 6-attempt retry logic",
              "Conversational SMS, WhatsApp and email agents",
              "Visual pipeline with real estate stages",
              "Omni-channel shared team inbox",
              "Automated email and social campaigns",
              "IDX client websites and funnel builder",
              "Reputation and review management",
              "Invoicing, payments and deal routing",
              "250+ lead source integrations",
              "Free migration from your current CRM",
            ].map((f) => (
              <motion.li
                key={f}
                variants={fadeUp}
                className={cx(
                  "flex items-start gap-2.5 rounded-xl border border-line bg-cream px-4 py-3.5",
                  "text-[14.5px] font-medium text-ink",
                )}
              >
                <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={3} aria-hidden="true" />
                {f}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Comparison />

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="split"
            kicker="What it costs"
            title="How real estate CRM pricing actually works"
            lede="Advertised prices rarely match the invoice. These are the four things that move the real number."
          />
          <motion.ol
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-12 grid gap-5 md:grid-cols-2"
          >
            {pricingFactors.map(({ term, body }, i) => (
              <motion.li
                key={term}
                variants={fadeUp}
                className="rounded-2xl border border-line bg-card p-7 shadow-soft"
              >
                <span className="font-mono text-[12px] font-bold text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                  {term}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-ink-soft">{body}</p>
              </motion.li>
            ))}
          </motion.ol>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[14.5px] leading-[1.7] text-ink-soft">
            Total the whole stack before comparing: the CRM, the dialer, the texting
            credits, the email tool, the website and the onboarding fee. A platform that
            looks dearer per month is often cheaper once those line items collapse into one.
          </p>
        </div>
      </section>

      <Pricing />
      <FAQ faqs={CRM_FAQS} heading="Common questions about the best CRM for realtors" />
      <FinalCTA />
    </>
  );
}
