"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "./auth-modal"
import { env } from "@/lib/env"

interface AuthPopupManagerProps {
  autoPopupDelay?: number
  enableAutoPopup?: boolean
}

export function AuthPopupManager({
  autoPopupDelay = 5000,
  enableAutoPopup = env.ENABLE_AUTH_POPUP,
}: AuthPopupManagerProps) {
  const [showModal, setShowModal] = useState(false)
  const [hasAutoPopped, setHasAutoPopped] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading || user || !enableAutoPopup || hasAutoPopped) {
      return
    }

    // Check if user has dismissed the popup recently (within 24 hours)
    const lastDismissed = localStorage.getItem("auth-popup-dismissed")
    if (lastDismissed) {
      const dismissedTime = new Date(lastDismissed).getTime()
      const now = new Date().getTime()
      const hoursSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60)

      if (hoursSinceDismissed < 24) {
        return
      }
    }

    // Set up auto-popup timer
    const timer = setTimeout(() => {
      setShowModal(true)
      setHasAutoPopped(true)
    }, autoPopupDelay)

    return () => clearTimeout(timer)
  }, [user, loading, enableAutoPopup, autoPopupDelay, hasAutoPopped])

  const handleClose = () => {
    setShowModal(false)
    localStorage.setItem("auth-popup-dismissed", new Date().toISOString())
  }

  if (user) {
    return null
  }

  return <AuthModal isOpen={showModal} onClose={handleClose} defaultMode="signup" trigger="auto" />
}
