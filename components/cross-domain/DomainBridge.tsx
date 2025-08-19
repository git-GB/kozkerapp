"use client"

import { useEffect } from "react"
import { env } from "@/lib/env"

export function DomainBridge() {
  useEffect(() => {
    if (!env.ENABLE_CROSS_DOMAIN_AUTH || typeof window === "undefined") return

    // Create invisible iframe to maintain connection with main domain
    const iframe = document.createElement("iframe")
    iframe.src = `https://${env.PARENT_DOMAIN}/api/cross-domain-bridge`
    iframe.style.display = "none"
    iframe.style.width = "0"
    iframe.style.height = "0"
    iframe.setAttribute("aria-hidden", "true")

    document.body.appendChild(iframe)

    // Listen for messages from the bridge
    const handleBridgeMessage = (event: MessageEvent) => {
      if (event.origin !== `https://${env.PARENT_DOMAIN}`) return

      const { type, data } = event.data

      switch (type) {
        case "KOZKER_BRIDGE_READY":
          console.log("Cross-domain bridge established")
          break
        case "KOZKER_SYNC_REQUEST":
          // Send current state to main domain
          iframe.contentWindow?.postMessage(
            {
              type: "KOZKER_SUBDOMAIN_STATE",
              url: window.location.href,
              userAgent: navigator.userAgent,
              timestamp: Date.now(),
            },
            `https://${env.PARENT_DOMAIN}`,
          )
          break
      }
    }

    window.addEventListener("message", handleBridgeMessage)

    return () => {
      window.removeEventListener("message", handleBridgeMessage)
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe)
      }
    }
  }, [])

  return null
}
