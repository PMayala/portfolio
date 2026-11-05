import type { ReactNode } from "react"

/** Section opener: index and label on the left, the statement on the right. */
export default function Head({ index, label, title, id, aside }: { index: string; label: string; title?: ReactNode; id?: string; aside?: ReactNode }) {
  return (
    <div className="grid-12 gap-y-4 rule-strong pt-4">
      <p id={title ? undefined : id} className="col-span-12 flex items-baseline gap-3 md:col-span-3">
        <span className="text-[13px] font-semibold text-accent num">{index}</span>
        <span className="text-[15px] font-medium">{label}</span>
      </p>
      {title && (
        <h2 id={id} className="t-lg reveal col-span-12 md:col-span-9 lg:col-span-7">
          {title}
        </h2>
      )}
      {aside && <div className="col-span-12 text-[13px] text-muted md:col-span-9 md:col-start-4 lg:col-span-2 lg:col-start-11 lg:text-right">{aside}</div>}
    </div>
  )
}
