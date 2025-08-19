import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")
  const email = searchParams.get("email")
  const business = searchParams.get("business")

  if (!name || !email || !business) {
    return NextResponse.json({ error: "Missing required query parameters: name, email, business" }, { status: 400 })
  }

  const n8nWebhookUrl = "https://n8n.srv832341.hstgr.cloud/webhook-test/6f7b288e-1efe-4504-a6fd-660931327269"
  const externalApiParams = new URLSearchParams({
    name,
    email,
    business,
  })
  const fullExternalUrl = `${n8nWebhookUrl}?${externalApiParams.toString()}`

  try {
    // It's good practice to set a timeout for server-side requests as well.
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000) // 25-second timeout for n8n

    const response = await fetch(fullExternalUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // Add any other headers required by the n8n webhook
      },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    const responseText = await response.text()

    if (!response.ok) {
      console.error(
        `n8n webhook error: ${response.status} ${response.statusText}. Response: ${responseText.substring(0, 500)}`,
      )
      // Try to pass through a more specific error from n8n if possible
      let errorDetail = `n8n webhook request failed with status ${response.status}.`
      try {
        const n8nError = JSON.parse(responseText)
        if (n8nError && n8nError.message) {
          errorDetail = n8nError.message
        } else if (typeof n8nError === "string") {
          errorDetail = n8nError
        }
      } catch (e) {
        // If n8n error response is not JSON, use the substring
        if (responseText.length > 0) errorDetail += ` Response: ${responseText.substring(0, 100)}...`
      }
      return NextResponse.json({ error: errorDetail }, { status: response.status })
    }

    // Attempt to parse the JSON. If it's not JSON, return as text.
    // This helps if n8n sometimes returns non-JSON or malformed JSON.
    try {
      const jsonData = JSON.parse(responseText)
      return NextResponse.json(jsonData)
    } catch (e) {
      console.warn("n8n response was not valid JSON. Returning as text. Response:", responseText.substring(0, 500))
      // If n8n returns non-JSON (e.g. plain text or malformed JSON),
      // we might want to return it as is, but the client expects JSON.
      // For now, let's return an error if it's not parseable, as the client expects a specific structure.
      // Or, if the client's fallback parsing is robust, we could return text/plain.
      // Given the client's complex parsing, let's try to return it as JSON if it looks like an array or object.
      if (responseText.trim().startsWith("[") || responseText.trim().startsWith("{")) {
        // It might be malformed JSON that the client's fallback can handle.
        // Send it as application/json so client attempts to parse.
        return new NextResponse(responseText, { headers: { "Content-Type": "application/json" } })
      }
      // If it's truly not JSON-like, this is an issue.
      return NextResponse.json(
        { error: "Received non-JSON response from n8n webhook.", rawResponse: responseText.substring(0, 500) },
        { status: 502 },
      )
    }
  } catch (error: any) {
    console.error("Error fetching from n8n webhook:", error)
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Request to n8n webhook timed out" }, { status: 504 })
    }
    return NextResponse.json(
      { error: "Failed to fetch data from n8n webhook", details: error.message },
      { status: 500 },
    )
  }
}

// Optional: Add a POST handler if your n8n webhook might use POST in the future
// export async function POST(request: Request) {
//   // ... implementation for POST
//   return NextResponse.json({ message: "POST not implemented" }, { status: 405 });
// }
