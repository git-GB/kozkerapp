import { NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function GET() {
  try {
    // Basic health check
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV,
      domain: env.SITE_URL,
      services: {
        supabase: !!env.SUPABASE_URL && !!env.SUPABASE_ANON_KEY,
        analytics: !!env.GA_MEASUREMENT_ID,
        crossDomain: env.ENABLE_CROSS_DOMAIN_AUTH,
      },
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 500 },
    )
  }
}
