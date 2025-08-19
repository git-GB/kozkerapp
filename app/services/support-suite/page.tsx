import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "24/7 Live Chat & Email Support Services in Kochi | KozkerTech",
  description:
    "Never miss a lead with our 24/7 live chat and smart email routing support services. Professional customer service available round-the-clock.",
  keywords: ["24/7 support", "live chat", "email support", "customer service", "kochi", "kerala"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/support-suite`,
  },
  openGraph: {
    title: "24/7 Live Chat & Email Support Services in Kochi | KozkerTech",
    description:
      "Never miss a lead with our 24/7 live chat and smart email routing support services. Professional customer service available round-the-clock.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/support-suite`,
    type: "website",
  },
}

const SupportSuitePage = () => {
  redirect("/services/24x7-ai-powered-customer-support")
}

export default SupportSuitePage
