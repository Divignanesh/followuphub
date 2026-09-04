# FollowUpHub

Marketing site for [FollowUpHub](https://www.followuphub.ai), an AI-powered real
estate operating system for agents, teams and brokerages.

Built with React 19, Vite, Tailwind CSS v4 and Framer Motion.

## Why it prerenders

Every route is rendered to complete static HTML at build time. Search crawlers
and AI answer engines get the full page without executing JavaScript, and the
browser hydrates that same markup for the animations. A client-only SPA would
have been a step backwards for a site whose traffic depends on organic search.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Building

```bash
npm run build      # client bundle, SSR bundle, then prerender
npm run preview    # serve dist/ exactly as a static host would
```

`npm run build` writes to `dist/`, which is what you deploy. It contains one
HTML file per route plus `robots.txt`, `sitemap.xml` and `llms.txt`. The
sitemap is generated from the same route table that renders the pages, so it
cannot fall out of sync.

Any static host works: Netlify, Vercel, Cloudflare Pages, S3 with CloudFront.
The only requirement is that `/some-route` resolves to
`/some-route/index.html`, which all of the above do by default.

## Layout

| Path | What lives there |
| --- | --- |
| `src/sections/` | One file per page section, named after what you see |
| `src/pages/` | Route compositions: the homepage and the buyer's guide |
| `src/lib/seo.ts` | Prices, FAQ copy and every JSON-LD builder |
| `src/lib/assets.ts` | Image URLs and the people quoted in testimonials |
| `src/index.css` | Brand tokens: colour, type and spacing |
| `scripts/prerender.mjs` | Renders each route to HTML and writes the sitemap |

## Editing content

Prices and FAQ answers come from `src/lib/seo.ts` alone. Changing a price there
updates the pricing cards, the `Offer` structured data and `llms.txt` together.
This is deliberate: the previous build had a page showing one price while its
schema advertised another.

Statistics are plain server-rendered text. They are never produced by an
animation, so a paused or interrupted animation can never display a wrong
number.

## Accessibility

Colour pairs are checked to WCAG AA. Auto-advancing content (the customer
carousel and the testimonial rows) pauses on hover and on keyboard focus,
offers explicit controls, and stops entirely under `prefers-reduced-motion`.
