import { PillCta } from "../components/ui";
import { SITE } from "../lib/seo";

const links = [
  { label: "How the platform works", href: "/#platform" },
  { label: "Hear a real AI call", href: "/#ai" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Best CRM for realtors", href: "/best-crm-for-realtors" },
];

/**
 * The 404, prerendered to dist/404.html.
 *
 * It carries real links rather than a lone "go home" button: a reader who
 * lands here followed something that no longer exists, and the four
 * destinations below are the ones they were most likely heading for. Crawlers
 * benefit from the same thing, since a dead end with outbound links keeps
 * whatever authority pointed at the broken URL moving into the live pages.
 *
 * The route is marked `noindex, follow` and is deliberately absent from
 * sitemap.xml. Listing a 404 in a sitemap is a crawl-budget error, and
 * indexing one produces the "Soft 404" warning in Search Console.
 */
export function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="wash-teal pointer-events-none absolute inset-x-0 bottom-0 h-[52%]"
      />
      <div
        aria-hidden="true"
        className="bg-rule pointer-events-none absolute inset-x-0 top-0 h-[55%] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="container-x relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <p className="font-mono text-[13px] font-semibold tracking-[0.18em] text-teal">404</p>

        <h1 className="t-display mt-5 max-w-[18ch] text-ink">This page has moved on.</h1>

        <p className="t-lede mt-5 max-w-[42ch] text-ink-soft">
          The link is broken or the page was retired. Everything below is still here.
        </p>

        <nav aria-label="Popular pages" className="mt-9">
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center rounded-full border border-ink/12 bg-card px-4 py-2.5 text-[13.5px] font-semibold tracking-[-0.01em] text-ink transition-colors hover:border-ink/30"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PillCta href="/">Back to the home page</PillCta>
          <PillCta href={`mailto:${SITE.email}`} tone="outline">
            Report a broken link
          </PillCta>
        </div>
      </div>
    </section>
  );
}
