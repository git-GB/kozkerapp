"use client"

interface SessionData {
  userId: string
  email: string
  lastActivity: number
  deviceFingerprint: string
}

class SessionManager {
  private readonly SESSION_KEY = "auth_session"
  private readonly ACTIVITY_THRESHOLD = 30 * 60 * 1000 // 30 minutes
  private readonly MAX_INACTIVE_TIME = 24 * 60 * 60 * 1000 // 24 hours

  private generateDeviceFingerprint(): string {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.textBaseline = "top"
      ctx.font = "14px Arial"
      ctx.fillText("Device fingerprint", 2, 2)
    }

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join("|")

    return btoa(fingerprint).slice(0, 32)
  }

  createSession(userId: string, email: string): void {
    const sessionData: SessionData = {
      userId,
      email,
      lastActivity: Date.now(),
      deviceFingerprint: this.generateDeviceFingerprint(),
    }

    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData))
    } catch (error) {
      console.error("Failed to create session:", error)
    }
  }

  getSession(): SessionData | null {
    try {
      const sessionStr = localStorage.getItem(this.SESSION_KEY)
      if (!sessionStr) return null

      const session: SessionData = JSON.parse(sessionStr)
      const now = Date.now()

      // Check if session is expired
      if (now - session.lastActivity > this.MAX_INACTIVE_TIME) {
        this.clearSession()
        return null
      }

      // Check device fingerprint
      if (session.deviceFingerprint !== this.generateDeviceFingerprint()) {
        this.clearSession()
        return null
      }

      // Update activity if threshold passed
      if (now - session.lastActivity > this.ACTIVITY_THRESHOLD) {
        session.lastActivity = now
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
      }

      return session
    } catch (error) {
      console.error("Failed to get session:", error)
      this.clearSession()
      return null
    }
  }

  updateActivity(): void {
    const session = this.getSession()
    if (session) {
      session.lastActivity = Date.now()
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    }
  }

  clearSession(): void {
    try {
      localStorage.removeItem(this.SESSION_KEY)
    } catch (error) {
      console.error("Failed to clear session:", error)
    }
  }

  isSessionValid(): boolean {
    return this.getSession() !== null
  }

  getSessionAge(): number {
    const session = this.getSession()
    return session ? Date.now() - session.lastActivity : 0
  }
}

export const sessionManager = new SessionManager()

// Activity tracking
let activityTimer: NodeJS.Timeout | null = null

export function startActivityTracking(): void {
  const trackActivity = () => {
    sessionManager.updateActivity()
  }

  // Track user activity
  const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
  events.forEach((event) => {
    document.addEventListener(event, trackActivity, { passive: true })
  })

  // Periodic activity check
  activityTimer = setInterval(() => {
    if (!sessionManager.isSessionValid()) {
      stopActivityTracking()
      // Trigger logout
      window.location.href = "/auth/login"
    }
  }, 60000) // Check every minute
}

export function stopActivityTracking(): void {
  if (activityTimer) {
    clearInterval(activityTimer)
    activityTimer = null
  }
}
