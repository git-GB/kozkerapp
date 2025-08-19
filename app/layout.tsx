import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { AnalyticsProvider } from "@/contexts/analytics-context"
import { CrossDomainProvider } from "@/components/cross-domain/CrossDomainProvider"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "AI Tools - Kozker | AI-Powered Business Solutions",
    template: "%s | AI Tools - Kozker",
  },
  description:
    "Access powerful AI tools for business automation, content generation, data analysis, and more. Complete suite of AI-powered solutions for modern businesses.",
  keywords: [
    "ai tools",
    "business automation",
    "ai content generation",
    "data analysis",
    "business intelligence",
    "ai solutions",
    "productivity tools",
    "automation tools",
    "ai platform",
    "business tools",
  ],
  authors: [{ name: "Kozker Team" }],
  creator: "Kozker Tech",
  publisher: "Kozker Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ai.kozker.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI Tools - Kozker | AI-Powered Business Solutions",
    description: "Access powerful AI tools for business automation, content generation, and data analysis.",
    siteName: "AI Tools - Kozker",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools - Kozker",
    description: "Access powerful AI tools for business automation, content generation, and data analysis.",
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
          <CrossDomainProvider>
            <AuthProvider>
              <AnalyticsProvider>
                <Suspense fallback={null}>
                  <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                  <Toaster />
                </Suspense>
              </AnalyticsProvider>
            </AuthProvider>
          </CrossDomainProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
