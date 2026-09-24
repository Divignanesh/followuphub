import { SITE } from "./seo";

/**
 * The facts the legal pages are built on, in one file.
 *
 * STILL TO ADD, once the incorporation details are confirmed:
 *
 *   - the registered legal name. "FollowUpHub" is a trading name, and a
 *     Canadian privacy policy has to identify the accountable organization by
 *     its legal one. It belongs in clause 1 of the privacy policy and clause
 *     1 of the terms.
 *   - a registered postal address, for written access and correction
 *     requests. It belongs in clause 14 of the privacy policy and clause 16
 *     of the terms.
 *   - the Privacy Officer by name. Law 25 wants the accountable person
 *     identified, not just a role mailbox. It belongs in clause 14 of the
 *     privacy policy.
 *
 * Add them as fields here rather than inline in the pages, so there stays one
 * place to correct them.
 */
export const LEGAL = {
  /** Shown as "Last updated" on both documents. */
  effective: "22 September 2026",

  officerTitle: "Privacy Officer",
  email: SITE.email,

  /**
   * Governing law for the terms only. Canadian contracts are governed by a
   * province's law, so one has to be named here even though the site
   * publishes no city or province as a location.
   */
  province: "Ontario",
} as const;

/**
 * Sub-processors, by what they actually do.
 *
 * Quebec's Law 25 favours naming these rather than describing categories, and
 * a reader cannot assess a cross-border transfer they are not told about.
 * Everything here is evidenced from the running product rather than assumed:
 * the DNS records for api. and app.followuphub.ai, and the assets the live
 * checkout page loads.
 *
 * Note this list discloses the stack the product is built on. That is a
 * commercial decision, not a legal one. Swapping a `name` for its `category`
 * is the only change needed if the client would rather not publish it.
 */
export type Subprocessor = {
  name: string;
  category: string;
  purpose: string;
  location: string;
};

export const SUBPROCESSORS: Subprocessor[] = [
  {
    name: "HighLevel",
    category: "Platform and messaging infrastructure",
    purpose: "Hosts the CRM, the shared inbox, campaigns and the scheduling and checkout pages.",
    location: "United States",
  },
  {
    name: "Ludicrous",
    category: "White-label platform delivery",
    purpose: "Operates the branded application and API domains the platform is served from.",
    location: "United States",
  },
  {
    name: "Cloudflare",
    category: "Network, DNS and security",
    purpose: "Routes and filters traffic to our domains and protects them from attack.",
    location: "Global edge network",
  },
  {
    name: "Google Cloud",
    category: "File and media storage",
    purpose: "Stores files, images and media uploaded to the platform.",
    location: "United States",
  },
  {
    name: "PayPal",
    category: "Payment processing",
    purpose: "Processes subscription and setup payments. We never receive full card numbers.",
    location: "United States",
  },
  {
    name: "Telephony and messaging carriers",
    category: "Voice and SMS delivery",
    purpose: "Place and receive calls and deliver SMS and WhatsApp messages on your instruction.",
    location: "Canada and United States",
  },
  {
    name: "Speech and language processing providers",
    category: "AI voice and transcription",
    purpose: "Convert speech to text, generate call audio and draft message content.",
    location: "United States",
  },
];

/**
 * Retention schedule. Split out of the policy text so each period can be
 * confirmed against what the platform actually does, which is the part of a
 * privacy policy that most often turns out to be aspirational.
 */
export const RETENTION: [string, string][] = [
  [
    "Customer content",
    "For the life of your account. On closure it is deleted within 90 days, and we will export it for you first in a structured, commonly used format if you ask.",
  ],
  ["Billing records", "Seven years, as Canadian tax law requires."],
  [
    "Call recordings and transcripts",
    "For the life of your account, or until you delete them, whichever comes first.",
  ],
  ["Usage and security logs", "Thirteen months, then deleted."],
  ["Backups", "Purged on a rolling cycle, at most 35 days behind live data."],
];

