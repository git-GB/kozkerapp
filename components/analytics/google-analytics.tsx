"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { env } from "@/lib/env"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!env.GA_MEASUREMENT_ID) return

    const url = pathname + searchParams.toString()

    window.gtag("config", env.GA_MEASUREMENT_ID, {
      page_path: url,
      custom_map: {
        custom_parameter_1: "subdomain",
      },
    })

    // Send custom event for subdomain tracking
    window.gtag("event", "page_view", {
      subdomain: "ai",
      domain: "kozker.com",
      full_url: window.location.href,
    })
  }, [pathname, searchParams])

  if (!env.GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${env.GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            custom_map: {
              'custom_parameter_1': 'subdomain'
            }
          });
        `}
      </Script>
    </>
  )
}
