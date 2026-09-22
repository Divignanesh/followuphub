import type { ReactNode } from "react";

/**
 * Shared shell for the terms and the privacy policy.
 *
 * Legal pages are read, not scanned, so this is a single measure of about
 * 68 characters with generous leading and no decoration competing with the
 * text. The section index is an anchor list rather than a component with
 * state: these documents get linked to clause by clause, and a plain list of
 * in-page links is what makes that work when someone pastes "/privacy#access"
 * into an email.
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="bg-cream">
      <header className="container-x pb-10 pt-[9rem] sm:pt-[10rem]">
        <div className="mx-auto max-w-[46rem]">
          <h1 className="t-h2 text-ink">{title}</h1>
          <p className="t-meta mt-4 text-ink-faint">Last updated {updated}</p>
          <div className="t-lede mt-6 max-w-[62ch] text-ink-soft">{intro}</div>
        </div>
      </header>

      <div className="container-x pb-24">
        <div className="mx-auto max-w-[46rem]">{children}</div>
      </div>
    </article>
  );
}

export function Clause({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-9">
      <h2 className="t-h3 text-ink">{heading}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.7] tracking-[-0.01em] text-ink-soft">
        {children}
      </div>
    </section>
  );
}

/** Definition-style rows, for the lists these documents are mostly made of. */
export function Defs({ items }: { items: [string, string][] }) {
  return (
    <dl className="space-y-3">
      {items.map(([term, body]) => (
        <div key={term}>
          <dt className="font-semibold text-ink">{term}</dt>
          <dd className="mt-0.5">{body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-faint/50" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The banner the client removes once a lawyer has signed the document off.
 *
 * It is deliberately hard to miss. A privacy policy that has never been
 * reviewed is a liability whether or not anyone admits it, and the honest
 * thing is to say so on the page rather than only in a commit message.
 */
export function ReviewNotice() {
  return (
    <aside className="rounded-[1rem] border border-clay/30 bg-clay/[0.06] p-5">
      <p className="text-[13.5px] font-semibold leading-[1.6] text-ink">
        Draft pending legal review
      </p>
      <p className="mt-1.5 text-[13.5px] leading-[1.65] text-ink-soft">
        This document was prepared as a working draft against PIPEDA, CASL and Quebec&rsquo;s Law 25.
        It is not legal advice and has not been reviewed by counsel. Have a Canadian privacy lawyer
        review it before you rely on it, then delete this notice.
      </p>
    </aside>
  );
}
