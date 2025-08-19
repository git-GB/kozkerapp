import { env } from "@/lib/env"

export class CrossDomainAnalytics {
  private static instance: CrossDomainAnalytics
  private messageQueue: any[] = []
  private isInitialized = false

  static getInstance(): CrossDomainAnalytics {
    if (!CrossDomainAnalytics.instance) {
      CrossDomainAnalytics.instance = new CrossDomainAnalytics()
    }
    return CrossDomainAnalytics.instance
  }

  initialize() {
    if (this.isInitialized || typeof window === "undefined") return

    // Listen for messages from main domain
    window.addEventListener("message", this.handleMessage.bind(this))

    // Send initialization message to main domain
    this.sendToMainDomain({
      type: "KOZKER_SUBDOMAIN_INIT",
      subdomain: "ai",
      url: window.location.href,
    })

    this.isInitialized = true
  }

  private handleMessage(event: MessageEvent) {
    if (event.origin !== `https://${env.PARENT_DOMAIN}`) return

    const { type, data } = event.data

    switch (type) {
      case "KOZKER_ANALYTICS_REQUEST":
        this.sendQueuedAnalytics()
        break
      case "KOZKER_CONFIG_UPDATE":
        this.handleConfigUpdate(data)
        break
    }
  }

  private sendToMainDomain(data: any) {
    if (typeof window === "undefined" || !env.ENABLE_CROSS_DOMAIN_AUTH) return

    try {
      window.parent.postMessage(data, `https://${env.PARENT_DOMAIN}`)
    } catch (error) {
      console.error("Failed to send message to main domain:", error)
    }
  }

  private sendQueuedAnalytics() {
    const queue = localStorage.getItem("kozker-analytics-queue")
    if (queue) {
      try {
        const data = JSON.parse(queue)
        this.sendToMainDomain({
          type: "KOZKER_ANALYTICS_BATCH",
          data,
        })
        // Clear queue after sending
        localStorage.removeItem("kozker-analytics-queue")
      } catch (error) {
        console.error("Failed to send queued analytics:", error)
      }
    }
  }

  private handleConfigUpdate(config: any) {
    // Handle configuration updates from main domain
    console.log("Received config update:", config)
  }

  trackEvent(eventName: string, properties: any) {
    this.sendToMainDomain({
      type: "KOZKER_ANALYTICS_EVENT",
      eventName,
      properties: {
        ...properties,
        source: "ai.kozker.com",
        timestamp: new Date().toISOString(),
      },
    })
  }

  trackPageView(page: string, properties: any) {
    this.sendToMainDomain({
      type: "KOZKER_ANALYTICS_PAGE_VIEW",
      page,
      properties: {
        ...properties,
        source: "ai.kozker.com",
        timestamp: new Date().toISOString(),
      },
    })
  }
}

export const crossDomainAnalytics = CrossDomainAnalytics.getInstance()
