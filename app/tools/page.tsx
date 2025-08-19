import type { Metadata } from "next"
import ToolsPageClient from "./ToolsPageClient"

export const metadata: Metadata = {
  title: "AI-Powered Business Tools | KozkerTech - Accelerate Your Growth",
  description:
    "Discover 20+ AI-powered business tools designed to streamline workflows, enhance creativity, and drive growth. From domain generators to content creation, analytics, and automation tools.",
  keywords: [
    "AI tools",
    "business automation",
    "domain generator",
    "content creation",
    "digital marketing tools",
    "business intelligence",
    "productivity tools",
    "startup tools",
    "growth tools",
    "AI business solutions",
  ].join(", "),
  authors: [{ name: "KozkerTech" }],
  creator: "KozkerTech",
  publisher: "KozkerTech",
  category: "Business Tools",
  openGraph: {
    title: "AI-Powered Business Tools | KozkerTech",
    description:
      "Discover 20+ AI-powered business tools designed to streamline workflows, enhance creativity, and drive growth.",
    type: "website",
    locale: "en_US",
    siteName: "KozkerTech",
  },
  twitter: {
    card: "summary",
    title: "AI-Powered Business Tools | KozkerTech",
    description:
      "Discover 20+ AI-powered business tools designed to streamline workflows, enhance creativity, and drive growth.",
    creator: "@kozkertech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/tools",
  },
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
