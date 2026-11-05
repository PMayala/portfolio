import Link from "next/link"
import { tr, type Locale } from "@/i18n"
import { person, ui } from "@/lib/site"
import { copy } from "@/lib/copy"
import { caseStudies, clientWork } from "@/lib/work"
import { href } from "@/lib/nav"
import HideOnAccess from "@/components/hide-on-access"

export default function Footer({ lang }: { lang: Locale }) {
  const f = copy.footer
  const col = "space-y-1.5"
  return (
    <footer className="mt-10 border-t border-ink text-[13px]">
      <div className="page pb-10 pt-12">
        <HideOnAccess>
        <div className="grid-12 mb-16 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <p className="font-display text-[20px] font-extrabold tracking-normal">PLAMEDI MAYALA</p>
            <p className="mt-1 text-muted">{tr(copy.meta.role, lang)}, Kigali</p>
            <p className="mt-6 flex items-center gap-2">
              <span className="live-dot" aria-hidden /> {tr(ui.available, lang)}
            </p>
          </div>
          <nav aria-label={tr(f.cases, lang)} className="col-span-6 md:col-span-4 lg:col-span-2">
            <p className="label mb-3">{tr(f.cases, lang)}</p>
            <ul className={col}>
              {caseStudies.map((p) => (
                <li key={p.slug}>
                  <Link className="hover:text-accent" href={href(lang, `/work/${p.slug}`)}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={tr(f.clients, lang)} className="col-span-6 md:col-span-4 lg:col-span-2">
            <p className="label mb-3">{tr(f.clients, lang)}</p>
            <ul className={col}>
              {clientWork.map((p) => (
                <li key={p.slug}>
                  <Link className="hover:text-accent" href={href(lang, `/work/${p.slug}`)}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label mb-3 mt-8">{tr(f.pages, lang)}</p>
            <ul className={col}>
              <li>
                <Link className="hover:text-accent" href={href(lang, "/work")}>
                  {tr(copy.common.allWork, lang)}
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" href={href(lang, "/about")}>
                  {tr(ui.nav.about, lang)}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <p className="label mb-3">{tr(f.contact, lang)}</p>
            <ul className={col}>
              <li className="min-w-0">
                <a className="break-all hover:text-accent" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href={person.phoneHref}>
                  {person.phone}
                </a>
              </li>
              {person.links.map((l) => (
                <li key={l.href}>
                  <a className="hover:text-accent" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a className="hover:text-accent" href={tr(person.cv, lang)} download>
                  {tr(ui.cv, lang)} ↓
                </a>
              </li>
            </ul>
          </div>
        </div>
        </HideOnAccess>
        <div className="grid-12 gap-y-4 border-t border-line pt-6 text-muted">
          <p className="col-span-12 md:col-span-4">© 2026 {person.name}</p>
          <p className="col-span-12 md:col-span-6">{tr(f.colophon, lang)}</p>
          <a href="#main" className="col-span-12 hover:text-ink md:col-span-2 md:text-right">
            {tr(ui.top, lang)} ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
