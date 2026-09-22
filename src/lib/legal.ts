import { SITE } from "./seo";

/**
 * Every fact in the legal pages that a lawyer has to confirm, in one file.
 *
 * Two kinds of value live here. Plain strings are things we know and can
 * defend. `pending()` marks something we do not know and must not invent: a
 * registered company name or a named privacy officer is a statement of fact in
 * a binding document, and a plausible-looking guess is worse than an obvious
 * gap because it survives review unnoticed.
 *
 * Pending values render on the page as a visible amber chip, so an
 * unfinished document cannot be mistaken for a finished one, and
 * `OPEN_ITEMS` counts them into the review banner automatically. Replace a
 * `pending(...)` with a string and both the chip and its line in the banner
 * disappear on their own.
 */
export type Pending = { readonly pending: string };

export const pending = (label: string): Pending => ({ pending: label });

export const isPending = (v: string | Pending): v is Pending =>
  typeof v === "object" && v !== null && "pending" in v;

export const LEGAL = {
  /** Shown as "Last updated" on both documents. */
  effective: "22 September 2026",

  /*
    Nothing in the repo, the live site or its DNS names an incorporated
    entity, so these stay pending. A Canadian privacy policy has to identify
    the accountable organization by its legal name, and terms have to name the
    party you are contracting with; "FollowUpHub" is a brand, which is not the
    same thing. Typical shapes: "FollowUpHub Inc." or "1234567 Ontario Inc.
    carrying on business as FollowUpHub".
  */
  entity: pending("registered legal name"),
  /** Law 25 and PIPEDA both expect a real postal address for written requests. */
  address: pending("registered business address"),

  /*
    Law 25 requires the person accountable for privacy to be identified by
    name and their contact details published. A role mailbox alone does not
    satisfy it, so the name stays pending and the mailbox is the route to
    them.
  */
  officer: pending("privacy officer name"),
  officerTitle: "Privacy Officer",
  email: SITE.email,

  /** Matches the province in the schema address the site already published. */
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
  /** false where the role is inferred from the platform rather than observed. */
  confirmed: boolean;
};

export const SUBPROCESSORS: Subprocessor[] = [
  {
    name: "HighLevel",
    category: "Platform and messaging infrastructure",
    purpose: "Hosts the CRM, the shared inbox, campaigns and the scheduling and checkout pages.",
    location: "United States",
    confirmed: true,
  },
  {
    name: "Ludicrous",
    category: "White-label platform delivery",
    purpose: "Operates the branded application and API domains the platform is served from.",
    location: "United States",
    confirmed: true,
  },
  {
    name: "Cloudflare",
    category: "Network, DNS and security",
    purpose: "Routes and filters traffic to our domains and protects them from attack.",
    location: "Global edge network",
    confirmed: true,
  },
  {
    name: "Google Cloud",
    category: "File and media storage",
    purpose: "Stores files, images and media uploaded to the platform.",
    location: "United States",
    confirmed: true,
  },
  {
    name: "PayPal",
    category: "Payment processing",
    purpose: "Processes subscription and setup payments. We never receive full card numbers.",
    location: "United States",
    confirmed: true,
  },
  {
    name: "Telephony and messaging carriers",
    category: "Voice and SMS delivery",
    purpose: "Place and receive calls and deliver SMS and WhatsApp messages on your instruction.",
    location: "Canada and United States",
    confirmed: false,
  },
  {
    name: "Speech and language processing providers",
    category: "AI voice and transcription",
    purpose: "Convert speech to text, generate call audio and draft message content.",
    location: "United States",
    confirmed: false,
  },
];

/**
 * Retention schedule. Split out of the policy text so the client can confirm
 * each period against what the platform actually does, which is the part of a
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

/** Fills the review banner, so the checklist can never drift from the page. */
export const OPEN_ITEMS: string[] = [
  ...Object.values(LEGAL)
    .filter((v): v is Pending => typeof v === "object" && isPending(v))
    .map((v) => v.pending),
  ...(SUBPROCESSORS.some((s) => !s.confirmed)
    ? ["named providers behind the two unconfirmed sub-processor roles"]
    : []),
  "the retention periods, checked against what the platform actually does",
];
