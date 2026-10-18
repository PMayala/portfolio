"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

/** Hides site navigation on the public request access page, where every link would loop back. */
export default function HideOnAccess({ children }: { children: ReactNode }) {
  return usePathname().endsWith("/access") ? null : <>{children}</>
}
