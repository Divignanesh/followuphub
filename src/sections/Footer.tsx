import { PaperField } from "../components/PaperField";
import { Mail } from "lucide-react";
import { Logo } from "../components/ui";
import { SITE } from "../lib/seo";

const groups = [
  {
    title: "Platform",
    links: [
      { label: "Pipeline management", href: "/#platform" },
      { label: "AI calling and texting", href: "/#ai" },
      { label: "Marketing automation", href: "/#platform" },
      { label: "Client websites", href: "/#platform" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "Best CRM for realtors", href: "/best-crm-for-realtors" },
      { label: "vs. other CRMs", href: "/#compare" },
      { label: "Compare CRMs", href: "/#compare" },
      { label: "What's included", href: "/#included" },
      { label: "Migration and onboarding", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Questions", href: "/#faq" },
      { label: "Book a demo", href: SITE.demo },
      { label: "Log in", href: SITE.app },
      { label: "Support", href: `mailto:${SITE.email}` },
    ],
  },
];

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-sand">
      <PaperField />
      <div className="relative container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-[1.7] text-ink-soft">
              The AI real estate operating system. Capture every lead, follow up automatically, and
              close more deals from one platform. Built in {SITE.city}, Canada.
            </p>
            <ul className="mt-5 space-y-2 text-[14px]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-teal"
                >
                  <Mail className="size-4 text-teal" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                {g.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="-my-1 inline-block py-1.5 text-[14px] text-ink-soft transition-colors hover:text-teal"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-soft">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. {SITE.city},{" "}
            {SITE.region}, Canada.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {SITE.social.map((url) => {
              const key = Object.keys(socialLabels).find((k) => url.includes(k)) ?? "link";
              return (
                <li key={url}>
                  <a
                    href={url}
                    rel="noopener"
                    className="-my-1 inline-block py-1.5 text-[13px] font-semibold text-ink-soft transition-colors hover:text-teal"
                  >
                    {socialLabels[key] ?? "Link"}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* The name at display scale, outlined rather than filled and sunk into
          the bottom edge so the last fifth of the letterforms runs off the page.
          The viewBox stops above the baseline, which does the cropping: the
          glyphs are drawn at y=126 but only 0-104 is ever painted. */}
      <div className="overflow-hidden border-t border-line/70 px-6 pt-8 sm:px-10 sm:pt-10">
        <svg
          viewBox="0 0 1000 104"
          role="img"
          aria-label="FollowUpHub"
          className="mx-auto block w-full max-w-[72rem]"
        >
          <defs>
            <linearGradient id="fuh-wordmark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a6b5a" />
              <stop offset="55%" stopColor="#2f8b74" />
              <stop offset="100%" stopColor="#58a894" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="126"
            textLength="1000"
            lengthAdjust="spacing"
            fill="none"
            stroke="url(#fuh-wordmark)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            style={{
              fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui)",
              fontWeight: 400,
              fontSize: "150px",
              letterSpacing: "-0.03em",
            }}
          >
            FollowUpHub
          </text>
        </svg>
      </div>

    </footer>
  );
}
