"use client"

import type React from "react"

import { useEffect } from "react"
import { setupGlobalErrorHandling } from "@/lib/security/error-handler"
import { setupWebVitalsMonitoring } from "@/lib/security/performance-monitor"

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize security features
    setupGlobalErrorHandling()
    setupWebVitalsMonitoring()
  }, [])

  return <>{children}</>
}
