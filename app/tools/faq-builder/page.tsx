import type { Metadata } from "next"
import FAQBuilderClient from "./faq-builder-client"

export const metadata: Metadata = {
  title: "AI FAQ Generator - Create Professional FAQs for Your Business",
  description:
    "Generate comprehensive FAQs for your business instantly. Our AI-powered tool creates professional frequently asked questions tailored to your industry and services.",
  keywords: "FAQ generator, AI FAQ, business FAQ, frequently asked questions, customer support, business tools",
  openGraph: {
    title: "AI FAQ Generator - Create Professional FAQs for Your Business",
    description: "Generate comprehensive FAQs for your business instantly with our AI-powered tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI FAQ Generator - Create Professional FAQs",
    description: "Generate comprehensive FAQs for your business instantly with our AI-powered tool.",
  },
}

export default function FAQBuilderPage() {
  return <FAQBuilderClient />
}
