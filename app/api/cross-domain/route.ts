import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin")

  // Only allow requests from main domain
  if (origin !== `https://${env.PARENT_DOMAIN}`) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  return NextResponse.json({
    status: "ok",
    subdomain: "ai",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin")

  // Only allow requests from main domain
  if (origin !== `https://${env.PARENT_DOMAIN}`) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  try {
    const data = await request.json()

    // Handle different types of cross-domain requests
    switch (data.type) {
      case "session_sync":
        return NextResponse.json({
          status: "synced",
          timestamp: new Date().toISOString(),
        })

      case "analytics_sync":
        // Process analytics data
        return NextResponse.json({
          status: "analytics_received",
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json({
          status: "unknown_type",
          timestamp: new Date().toISOString(),
        })
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request data",
      },
      { status: 400 },
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin")

  if (origin !== `https://${env.PARENT_DOMAIN}`) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  })
}
