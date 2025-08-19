"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { crossDomainSessionManager } from "@/lib/cross-domain/session-manager"
import { crossDomainAnalytics } from "@/lib/analytics/cross-domain-sync"
import { env } from "@/lib/env"

interface CrossDomainProviderProps {
  children: React.ReactNode
}

export function CrossDomainProvider({ children }: CrossDomainProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!env.ENABLE_CROSS_DOMAIN_AUTH) {
      setIsInitialized(true)
      return
    }

    // Initialize cross-domain managers
    crossDomainSessionManager.initialize()
    crossDomainAnalytics.initialize()

    // Listen for cross-domain events
    const handleSessionUpdate = (event: CustomEvent) => {
      console.log("Cross-domain session updated:", event.detail)
      // Trigger a page refresh to update auth state
      window.location.reload()
    }

    const handleSessionExpired = () => {
      console.log("Cross-domain session expired")
      // Redirect to login
      window.location.href = "/auth/login"
    }

    const handleUserLogout = () => {
      console.log("Cross-domain user logout")
      // Redirect to home
      window.location.href = "/"
    }

    window.addEventListener("kozker-session-updated", handleSessionUpdate as EventListener)
    window.addEventListener("kozker-session-expired", handleSessionExpired)
    window.addEventListener("kozker-user-logout", handleUserLogout)

    setIsInitialized(true)

    return () => {
      window.removeEventListener("kozker-session-updated", handleSessionUpdate as EventListener)
      window.removeEventListener("kozker-session-expired", handleSessionExpired)
      window.removeEventListener("kozker-user-logout", handleUserLogout)
      crossDomainSessionManager.destroy()
    }
  }, [])

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
