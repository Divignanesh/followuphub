import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { isPending, OPEN_ITEMS, SUBPROCESSORS, type Pending } from "../lib/legal";

/** One link style for the whole of both documents. */
export const legalLink =
  "font-semibold text-teal underline decoration-teal/35 underline-offset-4 hover:decoration-teal";

type ClauseProps = { id: string; heading: string; children: ReactNode };

/**
 * Shared shell for the terms and the privacy policy.
 *
 * Legal pages are read, not scanned, so this is a single measure of about
 * 68 characters with generous leading and no decoration competing with the
 * text.
 *
 * The contents index is built by reading the Clause children rather than
 * taking a list alongside them. These documents get linked to clause by
 * clause, so the index has to be right, and a hand-maintained copy of the
 * headings is the thing that goes stale the first time a clause is renumbered.
 */
export function LegalPage({
  title,
  updated,
  intro,
  notice,
  related,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  /** Rendered above the contents index, so a warning is read before the text. */
  notice?: ReactNode;
  related: ReactNode;
  children: ReactNode;
}) {
  const clauses = Children.toArray(children).filter(
    (c): c is ReactElement<ClauseProps> => isValidElement(c) && c.type === Clause,
  );

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
        <div className="mx-auto max-w-[46rem]">
          {notice && <div className="mb-8">{notice}</div>}
          <Toc clauses={clauses} />
          {children}
          <div className="border-t border-line pt-9">{related}</div>
        </div>
      </div>
    </article>
  );
}

function Toc({ clauses }: { clauses: ReactElement<ClauseProps>[] }) {
  if (clauses.length === 0) return null;
  return (
    <nav
      aria-label="Contents"
      className="mb-4 rounded-[1.25rem] border border-line bg-card p-6 sm:p-7"
    >
      <h2 className="t-meta text-ink-faint">Contents</h2>
      <ol className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {clauses.map((c) => (
          <li key={c.props.id}>
            <a
              href={`#${c.props.id}`}
              className="text-[14.5px] leading-[1.5] text-ink-soft underline decoration-line underline-offset-4 hover:text-teal hover:decoration-teal/40"
            >
              {c.props.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Clause({ id, heading, children }: ClauseProps) {
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
export function Defs({ items }: { items: [string, ReactNode][] }) {
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
 * Renders a value from LEGAL, or a visible gap where we do not have one.
 *
 * The chip is deliberately loud. A registered company name or a named privacy
 * officer is a statement of fact in a binding document; inventing something
 * plausible would read as finished and survive review, which is the failure
 * mode worth designing against.
 */
export function Fill({ value }: { value: string | Pending }) {
  if (!isPending(value)) return <>{value}</>;
  return (
    <mark className="rounded-[0.3rem] border border-clay/40 bg-clay/[0.08] px-1.5 py-px text-[0.94em] font-semibold text-clay">
      {value.pending} to be added
    </mark>
  );
}

/** Cross-links between the two documents, at the foot of each. */
export function Related({ items }: { items: { href: string; label: string; note: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <li key={it.href}>
          <a
            href={it.href}
            className="block h-full rounded-[1rem] border border-line bg-card p-5 transition-colors hover:border-teal/35"
          >
            <span className="block text-[14.5px] font-semibold text-teal">{it.label}</span>
            <span className="mt-1 block text-[13.5px] leading-[1.6] text-ink-soft">{it.note}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The named sub-processor list, which Law 25 favours over categories. */
export function SubprocessorTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[14px] leading-[1.6]">
        <caption className="sr-only">
          Sub-processors FollowUpHub uses, what each one does and where it processes information
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">Provider</th>
            <th scope="col" className="py-2.5 pr-4 font-semibold text-ink">What it does</th>
            <th scope="col" className="py-2.5 font-semibold text-ink">Processed in</th>
          </tr>
        </thead>
        <tbody>
          {SUBPROCESSORS.map((s) => (
            <tr key={s.name} className="border-b border-line-soft align-top">
              <td className="py-3 pr-4">
                <span className="font-semibold text-ink">{s.name}</span>
                <span className="mt-0.5 block text-[13px] text-ink-faint">{s.category}</span>
              </td>
              <td className="py-3 pr-4 text-ink-soft">{s.purpose}</td>
              <td className="py-3 text-ink-soft">{s.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The banner the client removes once a lawyer has signed the document off.
 *
 * The checklist is generated from the same data the pages render, so it
 * cannot claim the document is complete while a gap is still on the page, and
 * it empties itself as each value is filled in.
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
      {OPEN_ITEMS.length > 0 && (
        <>
          <p className="mt-3.5 text-[13.5px] font-semibold text-ink">Still to confirm</p>
          <ul className="mt-1.5 space-y-1">
            {OPEN_ITEMS.map((item) => (
              <li key={item} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-ink-soft">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 shrink-0 bg-clay/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
