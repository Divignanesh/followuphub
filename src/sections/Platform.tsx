import { motion } from "framer-motion";
import { Globe, LayoutGrid, Megaphone, PhoneCall, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { scaleIn, springSoft, stagger, viewport } from "../lib/motion";
import { SectionHeading, cx } from "../components/ui";

/* ------------------------------ mini panels ------------------------------ */

const pipeline = [
  { stage: "New lead", n: 24, w: "100%" },
  { stage: "Contacted", n: 15, w: "68%" },
  { stage: "Showing", n: 10, w: "45%" },
  { stage: "Offer", n: 5, w: "24%" },
];

function PipelineMini() {
  return (
    <ul className="space-y-2">
      {pipeline.map((p) => (
        <li key={p.stage} className="grid grid-cols-[76px_1fr_28px] items-center gap-3 text-[12px]">
          <span className="text-ink-soft">{p.stage}</span>
          <span className="h-6 overflow-hidden rounded-md bg-sand">
            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              style={{ width: p.w, originX: 0 }}
              className="block h-full rounded-md bg-teal/85"
            />
          </span>
          <span className="text-right font-mono font-semibold text-ink">{p.n}</span>
        </li>
      ))}
    </ul>
  );
}

const channels = [
  { label: "Voice AI call", meta: "08:24 · positive", tone: "bg-mist text-teal" },
  { label: "WhatsApp reply", meta: "2 min response", tone: "bg-[#f7ebe3] text-clay" },
  { label: "Showing booked", meta: "Thu 4:00 PM", tone: "bg-[#f7f0dd] text-gold" },
];

function ChannelMini() {
  return (
    <ul className="space-y-2">
      {channels.map((c) => (
        <li
          key={c.label}
          className="flex items-center justify-between rounded-lg border border-line bg-cream px-3 py-2.5"
        >
          <span className="text-[12.5px] font-semibold text-ink">{c.label}</span>
          <span className={cx("rounded-md px-2 py-0.5 text-[10.5px] font-bold", c.tone)}>
            {c.meta}
          </span>
        </li>
      ))}
    </ul>
  );
}

const campaign = [
  { d: "Mon", t: "Listing reel" },
  { d: "Wed", t: "Email blast" },
  { d: "Fri", t: "Open house" },
];

function CampaignMini() {
  return (
    <ul className="space-y-2">
      {campaign.map((c) => (
        <li key={c.d} className="flex items-center gap-3 rounded-lg border border-line bg-cream px-3 py-2.5">
          <span className="w-9 shrink-0 font-mono text-[11px] font-bold text-teal">{c.d}</span>
          <span className="text-[12.5px] font-semibold text-ink">{c.t}</span>
        </li>
      ))}
    </ul>
  );
}

function WebsiteMini() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-cream">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="ml-1 font-mono text-[10px] text-ink-faint">yourname.ca</span>
      </div>
      <div className="space-y-2 p-3">
        <div className="h-12 rounded bg-teal/15" />
        <div className="grid grid-cols-3 gap-1.5">
          <div className="h-8 rounded bg-sand" />
          <div className="h-8 rounded bg-sand" />
          <div className="h-8 rounded bg-sand" />
        </div>
        <div className="flex justify-between pt-0.5 text-[10.5px] font-semibold">
          <span className="text-ink-soft">IDX feed</span>
          <span className="text-teal">Connected</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- section -------------------------------- */

type Pillar = {
  icon: LucideIcon;
  n: string;
  title: string;
  desc: string;
  visual: ReactNode;
};

const pillars: Pillar[] = [
  {
    icon: LayoutGrid,
    n: "01",
    title: "Pipeline management",
    desc: "A visual pipeline with real estate stages, deal tracking and live team visibility. You always know where every opportunity stands.",
    visual: <PipelineMini />,
  },
  {
    icon: PhoneCall,
    n: "02",
    title: "AI calling, texting and WhatsApp",
    desc: "AI agents work warm leads by phone, SMS and WhatsApp around the clock, track sentiment, and escalate to a human the moment it matters.",
    visual: <ChannelMini />,
  },
  {
    icon: Megaphone,
    n: "03",
    title: "Marketing automation",
    desc: "Social scheduling, email campaigns and AI-generated post ideas run from one dashboard, with every lead source attributed back to the pipeline.",
    visual: <CampaignMini />,
  },
  {
    icon: Globe,
    n: "04",
    title: "Client IDX websites",
    desc: "Launch a professional, SEO-ready IDX website in minutes. It is mobile-first and wired straight into your pipeline.",
    visual: <WebsiteMini />,
  },
];

export function Platform() {
  return (
    <section id="platform" className="border-y border-line bg-sand py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="The platform"
          title="Four connected products, one subscription."
          lede="This replaces the tangle of tools most agents pay for separately — and unlike a bundle, each part shares the same contact record."
        />

        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {pillars.map(({ icon: Icon, n, title, desc, visual }) => (
            <motion.article
              key={title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={springSoft}
              className="flex flex-col rounded-2xl border border-line bg-cream p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-teal text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[12px] font-bold text-ink-faint">{n}</span>
              </div>
              <h3 className="mt-5 text-[19px] font-extrabold tracking-[-0.02em] text-ink">
                {title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.65] text-ink-soft">{desc}</p>
              <div className="mt-6 flex-1" aria-hidden="true">
                {visual}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
