import { renderToString } from "react-dom/server";
import App, { type RoutePath } from "./App";
import { CRM_FAQS } from "./pages/BestCrmForRealtors";
import {
  FAQS,
  SITE,
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  softwareSchema,
  websiteSchema,
  type Faq,
} from "./lib/seo";

export type RouteMeta = {
  path: RoutePath;
  /** Output file, relative to dist/ */
  out: string;
  title: string;
  description: string;
  canonical: string;
  ogImageAlt: string;
  schema: string;
  /** Sitemap hints */
  priority: string;
  changefreq: string;
};

// Existing production asset — swap for a purpose-built 1200x630 card when one exists.
const OG_IMAGE =
  "https://www.followuphub.ai/__l5e/assets-v1/6e4e9167-e19c-4074-9807-84fa89a51e2f/fuh-hero.jpg";
const OG_W = "1920";
const OG_H = "1280";

function pageSchema(extra: object[], faqs: readonly Faq[]) {
  return graph([
    organizationSchema(),
    websiteSchema(),
    softwareSchema(),
    faqSchema(faqs),
    ...extra,
  ]);
}

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    out: "index.html",
    title: "FollowUpHub — AI Real Estate CRM for Agents and Teams",
    description:
      "AI real estate CRM with voice AI calling, SMS, WhatsApp and email follow-up, visual pipeline, marketing automation and IDX websites. From $49.99/mo. 14-day free trial.",
    canonical: `${SITE.domain}/`,
    ogImageAlt: "FollowUpHub AI real estate CRM dashboard",
    priority: "1.0",
    changefreq: "weekly",
    schema: pageSchema(
      [breadcrumbSchema([{ name: "Home", url: `${SITE.domain}/` }])],
      FAQS,
    ),
  },
  {
    path: "/best-crm-for-realtors",
    out: "best-crm-for-realtors/index.html",
    title: "Best CRM for Realtors in 2026 | FollowUpHub",
    description:
      "The best CRM for realtors follows up faster than you can by hand. Compare AI calling, texting, pipeline and marketing features, and see real estate CRM pricing for 2026.",
    canonical: `${SITE.domain}/best-crm-for-realtors`,
    ogImageAlt: "Comparison of the best CRM options for realtors in 2026",
    priority: "0.9",
    changefreq: "weekly",
    schema: pageSchema(
      [
        breadcrumbSchema([
          { name: "Home", url: `${SITE.domain}/` },
          { name: "Best CRM for realtors", url: `${SITE.domain}/best-crm-for-realtors` },
        ]),
      ],
      CRM_FAQS,
    ),
  },
];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderHead(r: RouteMeta): string {
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${r.canonical}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="theme-color" content="#faf7f2" />`,
    `<meta property="og:site_name" content="FollowUpHub" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${r.canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="${OG_W}" />`,
    `<meta property="og:image:height" content="${OG_H}" />`,
    `<meta property="og:image:alt" content="${esc(r.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${esc(r.ogImageAlt)}" />`,
    `<script type="application/ld+json">${r.schema}</script>`,
  ].join("\n    ");
}

export function render(path: RoutePath): string {
  return renderToString(<App path={path} />);
}
