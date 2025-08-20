"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "./auth-modal"

interface AuthPopupManagerProps {
  autoPopupDelay?: number // in milliseconds
  enableAutoPopup?: boolean
}

export function AuthPopupManager({
  autoPopupDelay = 5000, // 5 seconds default
  enableAutoPopup = true,
}: AuthPopupManagerProps) {
  const [showModal, setShowModal] = useState(false)
  const [hasAutoPopped, setHasAutoPopped] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    // Don't show auto-popup if user is already authenticated or loading
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
        return // Don't show popup if dismissed within last 24 hours
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
    // Store dismissal time to prevent showing again for 24 hours
    localStorage.setItem("auth-popup-dismissed", new Date().toISOString())
  }

  // Don't render anything if user is authenticated
  if (user) {
    return null
  }

  return <AuthModal isOpen={showModal} onClose={handleClose} defaultMode="signup" trigger="auto" />
}
