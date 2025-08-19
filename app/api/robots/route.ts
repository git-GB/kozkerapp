import { NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${env.SITE_URL}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /dashboard/admin/
Disallow: /_next/
Disallow: /auth/

# Allow tools
Allow: /tools/`

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
