import { tr, type Locale } from "@/i18n"
import { href } from "@/lib/nav"
import { ui } from "@/lib/site"
import { disciplines, projects, type Project } from "@/lib/work"
import type { CardData, Tab } from "@/components/work-grid"

export function toCard(p: Project, lang: Locale): CardData {
  const hasPage = p.kind !== "archive"
  return {
    slug: p.slug,
    name: p.name,
    sector: tr(p.sector, lang),
    summary: tr(p.summary, lang),
    year: p.year === "Concept" ? "Concept" : p.year.replace(" to ", "/").replace(/(\d{4})\/(\d{2})(\d{2})/, "$1/$3"),
    to: hasPage ? href(lang, `/work/${p.slug}`) : p.links[0]?.href ?? "",
    external: !hasPage,
    disciplines: p.disciplines,
    disciplineLabels: p.disciplines.map((d) => tr(disciplines.find((x) => x.key === d)!.label, lang)),
    cover: p.cover ? { src: p.cover.src, alt: tr(p.cover.alt, lang), frame: p.cover.frame } : undefined,
    special: p.slug === "thegame" ? "game" : p.diagram ? "ops" : undefined,
  }
}

export function tabsFor(list: Project[], lang: Locale): Tab[] {
  return [
    { key: "all", label: tr(ui.all, lang), count: list.length },
    ...disciplines.map((d) => {
      const count = list.filter((p) => p.disciplines.includes(d.key)).length
      return { key: d.key, label: tr(d.label, lang), count, soon: d.key === "multimedia" }
    }),
  ]
}

export const allProjects = projects
