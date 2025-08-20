import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CurrencyProvider } from "@/contexts/currency-context"
import { AuthProvider } from "@/contexts/auth-context"
import { AnalyticsProvider } from "@/contexts/analytics-context"
import { SecurityProvider } from "@/components/security/security-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Analytics from "@/components/analytics"
import ChatWidget from "@/components/ChatWidget"

import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Kozker Tech - AI Automation & Business Intelligence Solutions",
    template: "%s | Kozker",
  },
  description:
    "Transform your business with AI-powered web design, WhatsApp automation, Power BI analytics, and comprehensive digital solutions. Get started with our LaunchPad, GrowthSuite, and Intelligence packages.",
  keywords: [
    "business solutions",
    "business intelligence",
    "power bi",
    "whatsapp automation",
    "web design",
    "ai solutions",
    "data analytics",
    "business automation",
    "web development",
    "cloud solutions",
  ],
  authors: [{ name: "Kozker Team" }],
  creator: "Kozker Tech",
  publisher: "Kozker Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Kozker Tech - AI Automation & Business Intelligence Solutions",
    description: "Transform your business with AI-powered solutions, automation, and analytics.",
    siteName: "Kozker Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kozker Tech - AI Solutions",
    description: "Transform your business with AI-powered solutions, automation, and analytics.",
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CurrencyProvider>
            <SecurityProvider>
              <AuthProvider>
                <AnalyticsProvider>
                  <Suspense fallback={null}>
                    <div className="flex min-h-screen flex-col">
                      <Header />
                      <main className="flex-1">{children}</main>
                      <Footer />
                    </div>
                    <Analytics />
                    <ChatWidget />
                  </Suspense>
                </AnalyticsProvider>
              </AuthProvider>
            </SecurityProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
