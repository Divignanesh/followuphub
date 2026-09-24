import { renderToString } from "react-dom/server";
import App, { type RoutePath } from "./App";
import { CRM_FAQS, GUIDE_DATES } from "./pages/BestCrmForRealtors";
import { COMPARE_DATES, COMPARE_SLUGS, COMPETITORS, comparePath } from "./lib/competitors";
import {
  FAQS,
  SITE,
  articleSchema,
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
  /** Sitemap hints. Omitted on routes that must not be listed. */
  priority?: string;
  changefreq?: string;
  /** Keeps the route out of sitemap.xml and out of the index. */
  noindex?: boolean;
};

// 1200x630 is the size every social platform crops to; serving it directly
// avoids their lossy re-crop of the taller hero photograph.
const OG_IMAGE = `${SITE.domain}/images/og-image.jpg`;
const OG_W = "1200";
const OG_H = "630";

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
    title: "FollowUpHub · AI Real Estate CRM for Agents and Teams",
    description:
      "AI real estate CRM with voice AI calling, SMS, WhatsApp and email follow-up, pipeline, marketing and client websites. From $49.99/mo with a 14-day free trial.",
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
      "The best CRM for realtors follows up faster than you can. Compare AI calling, texting, pipeline and marketing features, and 2026 real estate CRM pricing.",
    canonical: `${SITE.domain}/best-crm-for-realtors`,
    ogImageAlt: "Comparison of the best CRM options for realtors in 2026",
    priority: "0.9",
    changefreq: "weekly",
    schema: pageSchema(
      [
        articleSchema({
          url: `${SITE.domain}/best-crm-for-realtors`,
          headline: "The best CRM for realtors in 2026",
          description:
            "What to look for in a real estate CRM, a feature comparison, and how real estate CRM pricing works in 2026.",
          image: OG_IMAGE,
          ...GUIDE_DATES,
        }),
        breadcrumbSchema([
          { name: "Home", url: `${SITE.domain}/` },
          { name: "Best CRM for realtors", url: `${SITE.domain}/best-crm-for-realtors` },
        ]),
      ],
      CRM_FAQS,
    ),
  },
  ...COMPARE_SLUGS.map((slug): RouteMeta => {
    const c = COMPETITORS[slug];
    const path = comparePath(slug);
    const url = `${SITE.domain}${path}`;
    const headline = `FollowUpHub vs ${c.name}`;
    return {
      path,
      out: `${path.slice(1)}/index.html`,
      title: `FollowUpHub vs ${c.name}: 2026 CRM Comparison`,
      description: c.summary,
      canonical: url,
      ogImageAlt: `Feature and pricing comparison of FollowUpHub and ${c.name}`,
      priority: "0.8",
      changefreq: "monthly",
      schema: pageSchema(
        [
          articleSchema({
            url,
            headline,
            description: c.summary,
            image: OG_IMAGE,
            ...COMPARE_DATES,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE.domain}/` },
            { name: headline, url },
          ]),
        ],
        c.faqs,
      ),
    };
  }),
  {
    path: "/privacy",
    out: "privacy/index.html",
    title: "Privacy policy | FollowUpHub",
    description:
      "How FollowUpHub collects, uses and protects personal information under PIPEDA, Quebec's Law 25 and CASL, including call recording and your access rights.",
    canonical: `${SITE.domain}/privacy`,
    ogImageAlt: "FollowUpHub privacy policy",
    priority: "0.3",
    changefreq: "yearly",
    schema: graph([organizationSchema(), websiteSchema()]),
  },
  {
    path: "/terms",
    out: "terms/index.html",
    title: "Terms of service | FollowUpHub",
    description:
      "The terms governing use of FollowUpHub, including subscription and billing, acceptable use, and the CASL and Do Not Call consent obligations you carry.",
    canonical: `${SITE.domain}/terms`,
    ogImageAlt: "FollowUpHub terms of service",
    priority: "0.3",
    changefreq: "yearly",
    schema: graph([organizationSchema(), websiteSchema()]),
  },
  {
    path: "/404",
    out: "404.html",
    title: "Page not found | FollowUpHub",
    description:
      "That page could not be found. Browse the FollowUpHub platform, pricing and AI calling demo, or head back to the home page.",
    canonical: `${SITE.domain}/404`,
    ogImageAlt: "FollowUpHub page not found",
    // "follow" on purpose: the page is not worth indexing, but the links out
    // of it are worth crawling, so authority pointed at a dead URL keeps
    // flowing into the live pages.
    noindex: true,
    schema: graph([organizationSchema(), websiteSchema()]),
  },
];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderHead(r: RouteMeta): string {
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${r.canonical}" />`,
    r.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
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
