import type { MetadataRoute } from "next"
import { person } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${person.url}/sitemap.xml`, host: person.url }
}
