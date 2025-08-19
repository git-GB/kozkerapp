import type { Metadata } from "next"
import ThankYouClientPage from "./ThankYouClientPage"

export const metadata: Metadata = {
  title: "Thank You | Message Received",
  description: "Thank you for contacting Kozker Tech. We've received your message and will get back to you shortly.",
}

export default function ThankYouPage() {
  return <ThankYouClientPage />
}
