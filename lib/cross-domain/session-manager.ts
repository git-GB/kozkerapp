import { env } from "@/lib/env"

export class CrossDomainSessionManager {
  private static instance: CrossDomainSessionManager
  private sessionCheckInterval: NodeJS.Timeout | null = null

  static getInstance(): CrossDomainSessionManager {
    if (!CrossDomainSessionManager.instance) {
      CrossDomainSessionManager.instance = new CrossDomainSessionManager()
    }
    return CrossDomainSessionManager.instance
  }

  initialize() {
    if (typeof window === "undefined" || !env.ENABLE_CROSS_DOMAIN_AUTH) return

    // Listen for session updates from main domain
    window.addEventListener("message", this.handleSessionMessage.bind(this))

    // Periodically check for session updates
    this.startSessionSync()

    // Send initialization message to main domain
    this.notifyMainDomain({
      type: "KOZKER_SUBDOMAIN_READY",
      subdomain: "ai",
      url: window.location.href,
    })
  }

  private handleSessionMessage(event: MessageEvent) {
    if (event.origin !== `https://${env.PARENT_DOMAIN}`) return

    const { type, session, user } = event.data

    switch (type) {
      case "KOZKER_SESSION_UPDATE":
        this.handleSessionUpdate(session, user)
        break
      case "KOZKER_SESSION_EXPIRED":
        this.handleSessionExpired()
        break
      case "KOZKER_USER_LOGOUT":
        this.handleUserLogout()
        break
    }
  }

  private handleSessionUpdate(session: any, user: any) {
    if (session && user) {
      // Store session data locally
      localStorage.setItem(
        "kozker-cross-domain-session",
        JSON.stringify({
          session,
          user,
          timestamp: Date.now(),
        }),
      )

      // Trigger a custom event for components to listen to
      window.dispatchEvent(
        new CustomEvent("kozker-session-updated", {
          detail: { session, user },
        }),
      )
    }
  }

  private handleSessionExpired() {
    localStorage.removeItem("kozker-cross-domain-session")
    window.dispatchEvent(new CustomEvent("kozker-session-expired"))
  }

  private handleUserLogout() {
    localStorage.removeItem("kozker-cross-domain-session")
    window.dispatchEvent(new CustomEvent("kozker-user-logout"))
  }

  private startSessionSync() {
    // Check for session updates every 30 seconds
    this.sessionCheckInterval = setInterval(() => {
      this.requestSessionSync()
    }, 30000)
  }

  private requestSessionSync() {
    this.notifyMainDomain({
      type: "KOZKER_REQUEST_SESSION_SYNC",
      subdomain: "ai",
    })
  }

  private notifyMainDomain(data: any) {
    if (typeof window === "undefined") return

    try {
      window.parent.postMessage(data, `https://${env.PARENT_DOMAIN}`)
    } catch (error) {
      console.error("Failed to notify main domain:", error)
    }
  }

  getStoredSession() {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem("kozker-cross-domain-session")
      if (stored) {
        const data = JSON.parse(stored)
        // Check if session is not too old (24 hours)
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
          return data
        }
      }
    } catch (error) {
      console.error("Failed to get stored session:", error)
    }

    return null
  }

  clearStoredSession() {
    if (typeof window === "undefined") return
    localStorage.removeItem("kozker-cross-domain-session")
  }

  destroy() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval)
      this.sessionCheckInterval = null
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("message", this.handleSessionMessage.bind(this))
    }
  }
}

export const crossDomainSessionManager = CrossDomainSessionManager.getInstance()
