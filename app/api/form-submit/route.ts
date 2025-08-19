import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Log the form data (for debugging)
    console.log("Form submission:", { name, email, phone, subject, message })

    // Prepare the data for Netlify
    const netlifyData = new FormData()
    netlifyData.append("form-name", "contact")
    netlifyData.append("name", name as string)
    netlifyData.append("email", email as string)
    if (phone) netlifyData.append("phone", phone as string)
    netlifyData.append("subject", subject as string)
    netlifyData.append("message", message as string)

    // Submit to Netlify's form handling endpoint
    const netlifyResponse = await fetch("/.netlify/functions/submission-created", {
      method: "POST",
      body: JSON.stringify({
        payload: {
          form_name: "contact",
          form_values: {
            name,
            email,
            phone,
            subject,
            message,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!netlifyResponse.ok) {
      throw new Error("Failed to submit form to Netlify")
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ success: false, message: "Form submission failed" }, { status: 500 })
  }
}
