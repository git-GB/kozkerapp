import type { Metadata } from "next"
import ToolsPageClient from "./ToolsPageClient"

export const metadata: Metadata = {
  title: "AI-Powered Business Tools | KozkerTech",
  description:
    "Discover our collection of AI-powered tools designed to accelerate your business growth. From domain name generation to content creation and automation.",
  keywords: "AI tools, business automation, domain generator, content creation, digital marketing tools",
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
