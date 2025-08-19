"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/contexts/analytics-context"
import { useAuth } from "@/contexts/auth-context"

interface ToolTrackerProps {
  toolId: string
  action?: "view" | "use" | "complete"
  metadata?: Record<string, any>
}

export function ToolTracker({ toolId, action = "use", metadata = {} }: ToolTrackerProps) {
  const { trackToolUsage } = useAnalytics()
  const { user } = useAuth()

  useEffect(() => {
    if (user && toolId) {
      trackToolUsage({
        toolName: toolId,
        toolId: toolId,
        metadata: {
          action,
          source: "ai.kozker.com",
          ...metadata,
        },
      })
    }
  }, [toolId, action, user, trackToolUsage, metadata])

  return null // This component doesn't render anything
}

export default ToolTracker
