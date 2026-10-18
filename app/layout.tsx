import type { ReactNode } from "react"

// The html and body elements live in app/[lang]/layout.tsx so the lang attribute is correct.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
