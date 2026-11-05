import { tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"

/** How a charging session is watched end to end. Drawn instead of screenshots for internal work. */
export default function OpsDiagram({ lang }: { lang: Locale }) {
  const c = copy.ops
  return (
    <figure className="rounded-[10px] border border-line bg-surface p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <span className="label">{tr(c.title, lang)}</span>
        <span className="flex shrink-0 items-center gap-2 text-[12px] text-muted">
          <span className="live-dot" aria-hidden /> 50+ {tr(c.stations, lang)}
        </span>
      </div>
      <ol className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-line sm:grid-cols-5">
        {c.steps.map((st, i) => (
          <li key={i} className="relative bg-surface p-4 md:p-5">
            <span className="text-[12px] font-semibold text-accent num">0{i + 1}</span>
            <div className="mt-6 text-[17px] font-medium leading-tight">{tr(st.k, lang)}</div>
            <div className="mt-1 text-[13px] leading-snug text-muted">{tr(st.s, lang)}</div>
            {i < c.steps.length - 1 && (
              <span aria-hidden className="absolute right-3 top-4 hidden text-muted sm:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 text-[13px] text-muted sm:grid-cols-3">
        <p>
          <span className="text-ink">{tr(c.signal, lang)}</span>: {tr(c.signalBody, lang)}
        </p>
        <p>
          <span className="text-ink">{tr(c.action, lang)}</span>: {tr(c.actionBody, lang)}
        </p>
        <p>
          <span className="text-ink">{tr(c.proof, lang)}</span>: {tr(c.proofBody, lang)}
        </p>
      </div>
    </figure>
  )
}
