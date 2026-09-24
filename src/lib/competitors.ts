import type { Faq } from "./seo";

/**
 * Head-to-head comparison pages, one per CRM agents most often switch from.
 * Each entry feeds its page, its route meta, its FAQPage schema and the
 * cross-links between pages, so adding a competitor here is the whole job.
 *
 * Competitor columns reflect their publicly published product and pricing
 * information; the page says so beside the table. FollowUpHub's column is
 * shared (see `OUR_COLUMN`) so its claims cannot drift between pages.
 */

export const COMPARE_SLUGS = [
  "follow-up-boss",
  "lofty",
  "kvcore",
  "boldtrail",
  "liondesk",
  "cinc",
  "sisu",
  "top-producer",
] as const;

export type CompareSlug = (typeof COMPARE_SLUGS)[number];
export type ComparePath = `/followuphub-vs-${CompareSlug}`;

export const comparePath = (slug: CompareSlug): ComparePath => `/followuphub-vs-${slug}`;
export const COMPARE_PATHS = COMPARE_SLUGS.map(comparePath);

/** Bump `modified` by hand when a comparison's content actually changes. */
export const COMPARE_DATES = { published: "2026-09-25", modified: "2026-09-25" } as const;

/** Row order is fixed; each competitor supplies a value for every key. */
export const CAPABILITIES = [
  ["calling", "AI calling with multiple voice options"],
  ["texting", "AI texting and WhatsApp follow-up"],
  ["workflows", "Pre-built real estate workflows"],
  ["pipeline", "Visual sales pipeline"],
  ["websites", "Agent websites and funnels"],
  ["reputation", "Reputation management"],
  ["payments", "Invoicing and payments"],
  ["community", "Community management"],
  ["migration", "Migration help"],
  ["pricing", "Pricing model"],
] as const;

type CapabilityKey = (typeof CAPABILITIES)[number][0];

export const OUR_COLUMN: Record<CapabilityKey, string> = {
  calling: "Built in: dials each new lead within a minute, up to six attempts",
  texting: "Built in: one AI agent across SMS, WhatsApp and email",
  workflows: "Buyer, seller, open house and reactivation sequences ready",
  pipeline: "Real estate stages, tasks and deal tracking",
  websites: "Included on both plans",
  reputation: "Built in: review requests, monitoring and replies",
  payments: "Built in: send invoices and collect payments",
  community: "Built in: run your client or team community",
  migration: "Free: contacts, pipelines and history",
  pricing: "Flat $49.99/mo, no contract",
};

export type Competitor = {
  slug: CompareSlug;
  name: string;
  /** What kind of product it is, shown as the page kicker. */
  category: string;
  /** Meta description, and the card blurb on other pages. */
  summary: string;
  /** Hero paragraph: what the product is and where it stops. */
  intro: string;
  reasons: { title: string; body: string }[];
  theirs: Record<CapabilityKey, string>;
  faqs: Faq[];
};

const pricingFaq = (name: string, theirs: string): Faq => ({
  q: `How does FollowUpHub pricing compare to ${name}?`,
  a: `FollowUpHub is $49.99 per month on the Basic plan. The Advanced plan is the same $49.99 per month plus a one-time $299 setup fee, and adds the full Voice AI engine. Both include a 14-day free trial and no contract. ${theirs}`,
});

export const COMPETITORS: Record<CompareSlug, Competitor> = {
  "follow-up-boss": {
    slug: "follow-up-boss",
    name: "Follow Up Boss",
    category: "Real estate CRM",
    summary:
      "FollowUpHub vs Follow Up Boss: AI calling, texting and WhatsApp follow-up, websites, reputation and payments from $49.99/month, with free migration.",
    intro:
      "Follow Up Boss is a well-built lead-management CRM, but it assumes you already own the rest of your stack: the dialer, the texting tool, the website and the campaigns. FollowUpHub replaces the whole stack and puts an AI agent on every lead the moment it arrives.",
    reasons: [
      {
        title: "You still pay for a separate dialer and ISA",
        body: "Follow Up Boss routes and reminds, but someone still has to make the calls. FollowUpHub's AI makes the first six attempts across phone, SMS, WhatsApp and email before you ever pick up.",
      },
      {
        title: "The add-on bill grows fast",
        body: "Between per-seat pricing, calling add-ons and third-party marketing tools, most teams end up well past their original budget. FollowUpHub bundles it into one flat monthly price.",
      },
      {
        title: "No websites, reputation or payments",
        body: "You will still buy an IDX site, a review tool and an invoicing tool. All three ship inside FollowUpHub.",
      },
      {
        title: "Automation stops at the reminder",
        body: "FollowUpHub's workflows run the conversation itself, and escalate only the leads that reply and are ready to talk.",
      },
    ],
    theirs: {
      calling: "Dialer and call logging; AI calling needs third-party add-ons",
      texting: "SMS and email; WhatsApp via integration",
      workflows: "Action Plans you build yourself",
      pipeline: "Included",
      websites: "Not included",
      reputation: "Not included",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Per user, scaling with team size",
    },
    faqs: [
      {
        q: "What is the best Follow Up Boss alternative?",
        a: "For agents and teams who want AI follow-up included rather than bolted on, FollowUpHub is the closest like-for-like replacement: the same lead routing and pipeline discipline, plus AI calling, texting, WhatsApp, websites, reputation management and payments in one subscription.",
      },
      {
        q: "Can I migrate my Follow Up Boss data to FollowUpHub?",
        a: "Yes. Contacts, tags, pipelines, notes and conversation history are migrated for you at no extra charge, and a live import is part of onboarding on both plans.",
      },
      pricingFaq("Follow Up Boss", "Follow Up Boss prices per user, so the gap widens as your team grows."),
    ],
  },

  lofty: {
    slug: "lofty",
    name: "Lofty",
    category: "Real estate CRM, formerly Chime",
    summary:
      "FollowUpHub vs Lofty: AI calling, texting and WhatsApp follow-up, websites, pipeline, reputation and payments from $49.99/month, month to month.",
    intro:
      "Lofty, formerly Chime, bundles a lot, but agents consistently flag long contracts, heavy setup and AI features gated behind higher tiers. FollowUpHub gives you the same breadth without the lock-in.",
    reasons: [
      {
        title: "Annual contracts and setup fees",
        body: "Lofty typically sells on an annual agreement. FollowUpHub is month to month with a 14-day free trial and no cancellation fee.",
      },
      {
        title: "AI is an upsell",
        body: "Lofty's AI assistant sits in premium tiers. FollowUpHub's AI calling, texting and WhatsApp are the core product, not an add-on line item.",
      },
      {
        title: "Steep onboarding",
        body: "Teams report weeks of configuration before they see value. FollowUpHub ships pre-built buyer, seller and reactivation workflows on day one.",
      },
    ],
    theirs: {
      calling: "AI assistant on higher tiers",
      texting: "SMS and email; limited WhatsApp support",
      workflows: "Smart plans, mostly self-built",
      pipeline: "Included",
      websites: "IDX sites included",
      reputation: "Limited",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Annual contract, setup fee common",
    },
    faqs: [
      {
        q: "Is there a Lofty alternative without an annual contract?",
        a: "Yes. FollowUpHub is month to month with a 14-day free trial, so you can leave any time without a cancellation penalty.",
      },
      {
        q: "Does FollowUpHub replace Lofty's AI assistant?",
        a: "FollowUpHub's AI calls, texts and WhatsApps every new lead with up to six attempts, then hands warm conversations to you. It is part of the plan rather than sold as a premium tier.",
      },
      pricingFaq("Lofty", "Lofty is typically sold on an annual agreement, often with a setup fee."),
    ],
  },

  kvcore: {
    slug: "kvcore",
    name: "kvCORE",
    category: "Brokerage platform",
    summary:
      "FollowUpHub vs kvCORE: an agent-owned AI real estate CRM with calling, texting, WhatsApp, websites, reputation and payments from $49.99/month.",
    intro:
      "kvCORE is sold to brokerages, not to you. If you change brokerages, your database, campaigns and websites usually stay behind. FollowUpHub is owned by the agent or team who pays for it.",
    reasons: [
      {
        title: "Your database belongs to the brokerage",
        body: "Leave the brokerage and you often leave the CRM with it. FollowUpHub travels with you.",
      },
      {
        title: "Bloated interface, low adoption",
        body: "Most agents use a fraction of kvCORE. FollowUpHub keeps one clean pipeline and lets automation do the rest.",
      },
      {
        title: "AI follow-up is limited",
        body: "Smart CRM nudges are not the same as an AI agent that calls, texts and WhatsApps until the lead replies.",
      },
    ],
    theirs: {
      calling: "Behavioural nudges; no true AI voice agent",
      texting: "SMS and email",
      workflows: "Smart campaigns configured by the brokerage",
      pipeline: "Included",
      websites: "IDX sites, controlled by the brokerage",
      reputation: "Limited",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Brokerage-negotiated, agent add-on fees common",
    },
    faqs: [
      {
        q: "What is the best kvCORE alternative for individual agents?",
        a: "FollowUpHub. It is bought by the agent or team, so the database, workflows and websites stay with you whatever brokerage you are with.",
      },
      {
        q: "Can I export my kvCORE contacts into FollowUpHub?",
        a: "Yes. Export your contacts and the FollowUpHub team imports them with tags, stages and notes intact at no extra cost.",
      },
      pricingFaq("kvCORE", "kvCORE is negotiated by the brokerage, and agent add-on fees are common."),
    ],
  },

  boldtrail: {
    slug: "boldtrail",
    name: "BoldTrail",
    category: "Brokerage platform",
    summary:
      "FollowUpHub vs BoldTrail: a simpler, agent-owned AI real estate CRM with AI calling, texting, WhatsApp, websites, reputation and payments from $49.99/month.",
    intro:
      "BoldTrail is the enterprise evolution of kvCORE: powerful, but built around brokerage rollouts and long onboarding cycles. FollowUpHub gets a single agent or a 20-agent team producing in a day.",
    reasons: [
      {
        title: "Enterprise complexity for a small team",
        body: "Most of BoldTrail's surface area exists for brokerage admins. Agents just want follow-up that happens without them.",
      },
      {
        title: "Onboarding measured in weeks",
        body: "FollowUpHub ships with the workflows already built, so leads get worked from day one.",
      },
      {
        title: "AI features vary by brokerage package",
        body: "What you get depends on what your brokerage bought. FollowUpHub's AI is the same for everyone.",
      },
    ],
    theirs: {
      calling: "Depends on the brokerage package",
      texting: "SMS and email",
      workflows: "Smart campaigns, configured by an admin",
      pipeline: "Included",
      websites: "IDX sites, controlled by the brokerage",
      reputation: "Limited",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Brokerage-negotiated enterprise pricing",
    },
    faqs: [
      {
        q: "Is FollowUpHub a good BoldTrail alternative for a small team?",
        a: "Yes. It is designed for solo agents and teams of up to about 25 agents who want AI follow-up and marketing without an enterprise rollout.",
      },
      {
        q: "How long does it take to switch from BoldTrail?",
        a: "Most teams are migrated and running automated follow-up within one business day.",
      },
      pricingFaq("BoldTrail", "BoldTrail is sold on brokerage-negotiated enterprise pricing."),
    ],
  },

  liondesk: {
    slug: "liondesk",
    name: "LionDesk",
    category: "Real estate CRM",
    summary:
      "FollowUpHub vs LionDesk: a modern AI real estate CRM with AI calling, texting, WhatsApp, websites and payments from $49.99/month.",
    intro:
      "LionDesk built its reputation on affordable video texting and drips. Since the Lone Wolf transition, many agents have been looking for something modern that still costs about the same. FollowUpHub starts at $49.99 per month with AI included.",
    reasons: [
      {
        title: "Ageing interface and an uncertain roadmap",
        body: "Agents want to know their CRM will still be invested in next year. FollowUpHub ships new AI capability continuously.",
      },
      {
        title: "Drip campaigns, not conversations",
        body: "Templated drips get ignored. FollowUpHub's AI answers replies, qualifies the lead and books the appointment.",
      },
      {
        title: "No websites, reputation or payments",
        body: "FollowUpHub includes all three, so you can retire two or three other subscriptions.",
      },
    ],
    theirs: {
      calling: "Click-to-call and power dialer; no AI voice agent",
      texting: "SMS, video text and email",
      workflows: "Drip campaigns you build yourself",
      pipeline: "Included",
      websites: "Not included",
      reputation: "Not included",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Low monthly base, add-ons for calling and texting",
    },
    faqs: [
      {
        q: "What should LionDesk users switch to?",
        a: "FollowUpHub keeps the low entry price LionDesk users are used to, at $49.99 per month, while adding AI calling, texting and WhatsApp, websites, reputation management and payments.",
      },
      {
        q: "Will I lose my LionDesk drip campaigns?",
        a: "No. The migration team rebuilds your sequences inside FollowUpHub's workflow builder as part of onboarding.",
      },
      pricingFaq("LionDesk", "LionDesk has a low monthly base, with calling and texting sold as add-ons."),
    ],
  },

  cinc: {
    slug: "cinc",
    name: "CINC",
    category: "Lead generation platform",
    summary:
      "FollowUpHub vs CINC: AI calling, texting and WhatsApp on every lead, without the long contract or ad spend commitment. From $49.99/month.",
    intro:
      "CINC sells lead generation with a CRM attached, usually on an annual agreement with a minimum monthly ad spend on top. If you already have lead sources and just need those leads worked properly, FollowUpHub gives you the follow-up engine without the ad commitment.",
    reasons: [
      {
        title: "You are buying leads, not just software",
        body: "The CRM is bundled with paid lead generation, so the real monthly cost includes ad spend. FollowUpHub is a flat software subscription that works with the lead sources you already run.",
      },
      {
        title: "Annual agreements with minimum spend",
        body: "FollowUpHub is month to month with a 14-day free trial and no cancellation fee.",
      },
      {
        title: "Follow-up still needs an ISA",
        body: "High lead volume only pays off if every lead is contacted fast. FollowUpHub's AI calls, texts and WhatsApps each new lead within a minute and retries up to six times.",
      },
      {
        title: "No reputation, invoicing or community tools",
        body: "You will still buy those separately. All three are included in FollowUpHub.",
      },
    ],
    theirs: {
      calling: "Dialer and lead routing; AI voice agent not standard",
      texting: "SMS and email",
      workflows: "Campaigns built around CINC-sourced leads",
      pipeline: "Included",
      websites: "IDX sites included",
      reputation: "Not included",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Annual agreement plus monthly ad spend",
    },
    faqs: [
      {
        q: "What is the best CINC alternative?",
        a: "If you want the follow-up engine without committing to paid lead generation, FollowUpHub is the closest fit: AI calling, texting and WhatsApp on every lead, pre-built real estate workflows, websites, reputation management and payments from $49.99 per month, month to month.",
      },
      {
        q: "Can FollowUpHub work with the leads I already buy?",
        a: "Yes. FollowUpHub connects to your existing lead sources and portals, and the AI starts working each new lead the moment it lands, wherever it came from.",
      },
      pricingFaq("CINC", "CINC is typically an annual agreement with a separate monthly advertising commitment."),
    ],
  },

  sisu: {
    slug: "sisu",
    name: "Sisu",
    category: "Analytics and transaction tracking",
    summary:
      "FollowUpHub vs Sisu: pipeline, agent accountability and reporting, plus AI calling, texting and WhatsApp follow-up, in one platform from $49.99/month.",
    intro:
      "Sisu is a strong transaction-tracking and agent-accountability layer, but it sits on top of a CRM rather than replacing one. FollowUpHub gives you the pipeline, the reporting and the follow-up that actually produces the numbers you are tracking.",
    reasons: [
      {
        title: "It measures activity, it does not create it",
        body: "Dashboards tell you calls were not made. FollowUpHub's AI makes them: up to six attempts across phone, SMS, WhatsApp and email before an agent lifts a finger.",
      },
      {
        title: "You still pay for a CRM underneath",
        body: "Sisu is an addition to your stack. FollowUpHub replaces the CRM, dialer, texting tool, website and review tool in one subscription.",
      },
      {
        title: "Per-agent pricing on top of everything else",
        body: "Costs climb with headcount. FollowUpHub is one flat monthly price.",
      },
    ],
    theirs: {
      calling: "Not included; tracks calls made elsewhere",
      texting: "Not included",
      workflows: "Goal and accountability tracking, not lead workflows",
      pipeline: "Included",
      websites: "Not included",
      reputation: "Not included",
      payments: "Commission and transaction tracking",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Per agent, on top of your existing CRM",
    },
    faqs: [
      {
        q: "Is FollowUpHub a replacement for Sisu?",
        a: "For teams that adopted Sisu mainly to see whether leads were being worked, yes. FollowUpHub shows the same pipeline and agent activity while also doing the follow-up automatically. Teams that need deep commission and transaction accounting may still want a dedicated tool.",
      },
      {
        q: "Does FollowUpHub track agent accountability?",
        a: "Yes. Agent accountability loops, pipeline stages, response times and appointment outcomes are all tracked in the platform, so you can see who is converting and where deals stall.",
      },
      pricingFaq("Sisu", "Sisu is priced per agent, on top of the CRM you already pay for."),
    ],
  },

  "top-producer": {
    slug: "top-producer",
    name: "Top Producer",
    category: "Real estate CRM",
    summary:
      "FollowUpHub vs Top Producer: real AI follow-up by call, text and WhatsApp, plus websites, reputation and payments from $49.99/month, with free migration.",
    intro:
      "Top Producer is one of the longest-running real estate CRMs, and agents still rely on it for contact management and farming. What it does not do is work your leads for you. FollowUpHub keeps the database discipline and adds an AI agent on every new lead.",
    reasons: [
      {
        title: "Dated workflow, heavy manual entry",
        body: "Agents spend time updating records instead of talking to clients. FollowUpHub logs every AI call, text and WhatsApp automatically.",
      },
      {
        title: "Smart insights, but no AI conversations",
        body: "Reminders and suggested actions still depend on you acting. FollowUpHub's AI holds the conversation and books the appointment.",
      },
      {
        title: "Add-ons for leads, websites and marketing",
        body: "Websites, funnels, reputation management and payments are all included in FollowUpHub.",
      },
    ],
    theirs: {
      calling: "Calling and reminders; no AI voice agent",
      texting: "SMS and email",
      workflows: "Action plans and reminders you build",
      pipeline: "Included",
      websites: "Paid add-on",
      reputation: "Not included",
      payments: "Not included",
      community: "Not included",
      migration: "Varies by plan",
      pricing: "Per user, with paid add-ons",
    },
    faqs: [
      {
        q: "What should Top Producer users switch to?",
        a: "FollowUpHub keeps what Top Producer users rely on, including contacts, farming, pipeline and follow-up plans, and adds AI calling, texting and WhatsApp, agent websites, reputation management and payments from $49.99 per month.",
      },
      {
        q: "Can I move my Top Producer database over?",
        a: "Yes. Contacts, notes, tags and follow-up plans are migrated for you at no extra cost as part of onboarding.",
      },
      pricingFaq("Top Producer", "Top Producer prices per user, with websites and leads sold as paid add-ons."),
    ],
  },
};

/** Resolves a route back to its competitor, or null for any other path. */
export function competitorForPath(path: string): Competitor | null {
  const slug = COMPARE_SLUGS.find((s) => comparePath(s) === path);
  return slug ? COMPETITORS[slug] : null;
}
