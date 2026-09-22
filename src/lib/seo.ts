/**
 * Single source of truth for site-wide SEO + AEO data.
 *
 * Everything here is emitted into static HTML at build time by
 * scripts/prerender.mjs, so crawlers and AI answer engines get the
 * full content without executing JavaScript.
 */

export const SITE = {
  name: "FollowUpHub",
  legalName: "FollowUpHub",
  domain: "https://www.followuphub.ai",
  tagline: "The AI real estate operating system",
  email: "support@followuphub.ai",
  app: "https://app.followuphub.ai",
  demo: "https://api.followuphub.ai/widget/bookings/discuss-crm-solution",
  /*
    Kept as data but no longer published anywhere: not in visible copy, not in
    the Organization schema, not in llms.txt. Removing the locality and region
    costs some local-search signal for "real estate CRM Toronto" style
    queries; restore them in organizationSchema() if that trade stops being
    worth it.
  */
  city: "Toronto",
  region: "ON",
  country: "CA",
  social: [
    "https://www.facebook.com/followuphub",
    "https://www.instagram.com/followuphub",
    "https://www.linkedin.com/company/followuphub",
    "https://www.youtube.com/@followuphub",
  ],
} as const;

/**
 * Checkout links, kept beside the prices they belong to so the two can
 * never drift apart the way they did on the previous build.
 *
 * All four are verified against the live site: each link was opened and the
 * plan name and billing period on the checkout page were read back. Monthly
 * and yearly are genuinely different links, so the yearly toggle no longer
 * falls back to the monthly one and bills the wrong period.
 */
export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Complete Agent System",
    price: 49.99,
    priceYearly: 499.9,
    currency: "CAD",
    setup: null as number | null,
    billingNote: "14-day free trial · monthly billing · self-serve onboarding",
    billingNoteYearly: "14-day free trial · billed annually · self-serve onboarding",
    setupNote: null as string | null,
    setupDetail: null as string | null,
    checkout: "https://api.followuphub.ai/payment-link/6a50ecd6a655fa0b802a3a0b",
    checkoutYearly: "https://api.followuphub.ai/payment-link/6a50ecf6a655fa0b802a3a0c",
    cta: "Start 14-day free trial",
    summary:
      "Funnels, conversational AI, pipeline and an omni-channel inbox.",
    features: [
      "Pre-built home evaluation funnel",
      "Conversational SMS and email AI agents",
      "Anti-ghosting appointment reminders",
      "Agent accountability loops",
      "Dynamic deal routing and proposal tracking",
      "Visual pipeline management",
      "Omni-channel inbox",
      "Website and funnel builder",
      "Email campaigns and social media planner",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "Full AI Engine",
    price: 49.99,
    priceYearly: 499.9,
    currency: "CAD",
    setup: 299,
    billingNote: "14-day free trial · monthly billing",
    billingNoteYearly: "14-day free trial · billed annually",
    setupNote: "$299 one-time setup",
    setupDetail: "White-glove onboarding included",
    checkout: "https://api.followuphub.ai/payment-link/6a50b8cdc981f3feae6e866c",
    checkoutYearly: "https://api.followuphub.ai/payment-link/6a50ecbba655fa0b802a3a0a",
    cta: "Start 14-day free trial",
    recommended: true,
    summary:
      "Basic plus the voice AI engine, Smart Nurture and your own agents.",
    features: [
      "Everything in Basic",
      "Voice AI engine with 6-attempt retry, 10am to 9pm",
      "6-month Smart Nurture AI with 24 touchpoints",
      "Visual workflow builder",
      "Build your own AI agents",
      "Reviews AI on auto-pilot",
      "AI Studio prompt-to-build",
      "White-glove onboarding and A2P handled for you",
    ],
  },
] as const;

/**
 * FAQ content. This array feeds BOTH the visible accordion and the
 * FAQPage JSON-LD — Google requires the two to match exactly, and a
 * single source guarantees they do.
 */
export type Faq = { q: string; a: string };

export const FAQS: readonly Faq[] = [
  {
    q: "How much does FollowUpHub cost?",
    a: "FollowUpHub has two plans. Basic is $49.99 per month and includes the Complete Agent System. Advanced is also $49.99 per month plus a one-time $299 setup fee, and adds the full Voice AI engine, six-month Smart Nurture AI and white-glove onboarding. Both plans include a 14-day free trial with no credit card required.",
  },
  {
    q: "Which CRMs does FollowUpHub replace?",
    a: "It is built to replace your CRM, dialer, SMS and email platform, calendar system and AI communication stack in a single subscription, so most agents cancel several tools in the first week.",
  },
  {
    q: "Will I lose control over my follow-up?",
    a: "No. You can see exactly what the system is doing, review every sequence, adjust timing and override any automation. FollowUpHub handles execution while you stay in control of strategy.",
  },
  {
    q: "What happens to my existing CRM data?",
    a: "The FollowUpHub team handles migration at no additional charge, including contacts, pipelines and history. A live import is part of onboarding on both plans.",
  },
  {
    q: "Does FollowUpHub work outside Canada?",
    a: "Yes. FollowUpHub is built in Canada and serves real estate agents, teams and brokerages across both Canada and the United States.",
  },
  {
    q: "Can I build custom workflows and AI agents?",
    a: "Yes. The pre-built systems give you a head start, and the Advanced plan adds a visual workflow builder plus AI Studio so you can build your own agents without writing code.",
  },
  {
    q: "Is there a contract or cancellation fee?",
    a: "No contract and no cancellation fee. You pay month to month and can cancel from your billing settings in two clicks. Yearly billing is optional and gives you two months free.",
  },
  {
    q: "What does onboarding include?",
    a: "A live import of your existing contacts, pipeline stages configured to match how you work, your first AI follow-up sequence turned on, and a walkthrough with an onboarding specialist. On the Advanced plan onboarding is white-glove and A2P registration is handled for you.",
  },
  {
    q: "How does the 14-day free trial work?",
    a: "You get the full platform and every feature with no credit card. If you decide not to continue, do nothing and the account simply pauses. Your data stays exportable either way.",
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                     */
/* ------------------------------------------------------------------ */

const ORG_ID = `${SITE.domain}/#organization`;
const SITE_ID = `${SITE.domain}/#website`;
const SOFTWARE_ID = `${SITE.domain}/#software`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: "FollowUpHub.ai",
    url: SITE.domain,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.domain}/logo.svg`,
      width: 512,
      height: 512,
    },
    email: SITE.email,
    // Country only. The locality and region were removed at the client's
    // request; see the note beside SITE.city.
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.country,
    },
    sameAs: [...SITE.social],
    description:
      "FollowUpHub is an AI-powered real estate operating system that helps agents, teams and brokerages capture leads and follow up automatically by voice, SMS, WhatsApp and email.",
    areaServed: [
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United States" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        areaServed: ["CA", "US"],
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE.name,
    alternateName: "FollowUpHub.ai",
    url: SITE.domain,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * SoftwareApplication with offers generated from PLANS.
 *
 * Deliberately omits aggregateRating/review: Google treats
 * self-serving review markup (a business rating itself on its own
 * site) as ineligible for rich results, and it risks a structured-data
 * manual action. Testimonials still render as visible content.
 */
export function softwareSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "FollowUpHub",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Real Estate CRM",
    operatingSystem: "Web browser",
    url: SITE.domain,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    description:
      "AI real estate CRM with voice AI calling, SMS, WhatsApp and email follow-up, visual pipeline management, marketing automation and client websites.",
    featureList: [
      "AI voice calling with 6-attempt retry logic",
      "Conversational SMS, WhatsApp and email AI agents",
      "Visual real estate sales pipeline",
      "Omni-channel shared inbox",
      "Marketing automation and social scheduling",
      "Client websites and funnel builder",
      "Reputation management",
      "Invoicing and payments",
    ],
    /*
      The price is the subscription and nothing else: $49.99 a month on both
      plans. Advanced also carries a one-time $299 setup charge, and that is
      deliberately not folded in here — it is an additional charge, not the
      price of the offer, and putting it in `price` would have search and
      answer engines quoting a number no one is ever billed monthly.
      `referenceQuantity` is what makes the period explicit; without it a bare
      "49.99" reads as a flat, one-off price.
    */
    offers: PLANS.map((p) => ({
      "@type": "Offer",
      name: `${p.name}: ${p.subtitle}`,
      price: p.price.toFixed(2),
      priceCurrency: p.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE.domain}/#pricing`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price.toFixed(2),
        priceCurrency: p.currency,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
    })),
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

export function graph(nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
