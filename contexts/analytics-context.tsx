"use client"

import React from "react"
import type { ReactNode } from "react"
import { createContext, useContext, useCallback } from "react"
import { useAuth } from "./auth-context"
import { supabase } from "@/lib/supabase/client"
import { env } from "@/lib/env"

interface ToolUsageData {
  toolName: string
  toolId?: string
  toolCategory?: string
  inputData?: any
  outputData?: any
  metadata?: any
  duration?: number
  success?: boolean
  errorMessage?: string
}

interface AnalyticsContextType {
  trackToolUsage: (data: ToolUsageData) => Promise<void>
  trackPageView: (page: string, metadata?: any) => Promise<void>
  trackEvent: (eventName: string, properties?: any) => Promise<void>
  trackConversion: (conversionType: string, value?: number, metadata?: any) => Promise<void>
  syncAnalyticsWithMainDomain: (data: any) => Promise<void>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const { user, session } = useAuth()

  // Get device and session info
  const getDeviceInfo = useCallback(() => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      url: window.location.href,
      domain: window.location.hostname,
      subdomain: "ai", // Added subdomain identifier for cross-domain tracking
    }
  }, [])

  const syncAnalyticsWithMainDomain = useCallback(async (data: any) => {
    if (!env.ENABLE_CROSS_DOMAIN_AUTH || typeof window === "undefined") return

    try {
      // Send analytics data to main domain via postMessage
      window.parent.postMessage(
        {
          type: "KOZKER_ANALYTICS_SYNC",
          data: {
            ...data,
            source: "ai.kozker.com",
            timestamp: new Date().toISOString(),
          },
        },
        `https://${env.PARENT_DOMAIN}`,
      )

      // Also store in localStorage for persistence
      const existingData = localStorage.getItem("kozker-analytics-queue") || "[]"
      const queue = JSON.parse(existingData)
      queue.push({
        ...data,
        source: "ai.kozker.com",
        timestamp: new Date().toISOString(),
      })

      // Keep only last 100 entries to prevent storage bloat
      if (queue.length > 100) {
        queue.splice(0, queue.length - 100)
      }

      localStorage.setItem("kozker-analytics-queue", JSON.stringify(queue))
    } catch (error) {
      console.error("Failed to sync analytics with main domain:", error)
    }
  }, [])

  const trackToolUsage = useCallback(
    async (data: ToolUsageData) => {
      console.log("🔥 trackToolUsage called with:", data)
      console.log("🔥 User authenticated:", !!user)
      console.log("🔥 User ID:", user?.id)

      if (!user) {
        console.log("❌ No user found, skipping tracking")
        return
      }

      // Filter out system events
      if (
        !data.toolName ||
        data.toolName === "system" ||
        data.toolId === "system-event" ||
        data.toolId === "system-avant"
      ) {
        console.log("❌ Skipping system/unwanted entry:", data.toolName, data.toolId)
        return
      }

      try {
        const deviceInfo = getDeviceInfo()

        // Insert tool usage record
        const insertData = {
          user_id: user.id,
          session_id: session?.access_token ? session.access_token.substring(0, 20) : null,
          tool_id: data.toolId || data.toolName.toLowerCase().replace(/\s+/g, "-"),
          tool_name: data.toolName,
          tool_category: data.toolCategory || "general",
          usage_duration: data.duration || 0,
          success: data.success ?? true,
          metadata: {
            userName: user.user_metadata?.full_name || user.user_metadata?.name || "Unknown",
            userEmail: user.email || "Unknown",
            inputData: data.inputData || {},
            outputData: data.outputData || {},
            errorMessage: data.errorMessage,
            deviceInfo,
            source: "ai.kozker.com", // Added source tracking for cross-domain analytics
            ...data.metadata,
          },
        }

        console.log("🔥 Inserting tool usage data:", insertData)

        const { data: result, error } = await supabase.from("tool_usage").insert(insertData)

        if (error) {
          console.error("❌ Supabase tool_usage insert error:", error)
          return
        }

        console.log("✅ Successfully inserted tool usage:", result)

        await syncAnalyticsWithMainDomain({
          type: "tool_usage",
          toolName: data.toolName,
          toolId: data.toolId,
          toolCategory: data.toolCategory,
          success: data.success,
          userId: user.id,
          userEmail: user.email,
        })

        await updateUserAnalytics()
      } catch (error) {
        console.error("❌ Error tracking tool usage:", error)
      }
    },
    [user, session, getDeviceInfo, syncAnalyticsWithMainDomain],
  )

  const updateUserAnalytics = useCallback(async () => {
    if (!user) {
      console.log("❌ No user for analytics update")
      return
    }

    try {
      console.log("🔥 Updating user analytics for:", user.id)

      // Get all-time statistics from tool_usage
      const { data: allUsage, error: fetchError } = await supabase
        .from("tool_usage")
        .select("tool_id, tool_name, tool_category, success, created_at")
        .eq("user_id", user.id)

      if (fetchError) {
        console.error("❌ Error fetching usage data:", fetchError)
        return
      }

      if (!allUsage || allUsage.length === 0) {
        console.log("❌ No usage data found")
        return
      }

      // Calculate overall statistics
      const totalActions = allUsage.length
      const uniqueTools = new Set(allUsage.map((usage) => usage.tool_id)).size
      const successfulActions = allUsage.filter((usage) => usage.success).length
      const successRate = totalActions > 0 ? successfulActions / totalActions : 0
      const engagementScore = calculateEngagementScore(totalActions, uniqueTools, successRate)

      const today = new Date().toISOString().split("T")[0]

      const analyticsData = {
        user_id: user.id,
        date: today,
        total_actions: totalActions,
        tools_used: uniqueTools,
        success_rate: Math.round(successRate * 100) / 100,
        engagement_score: engagementScore,
      }

      console.log("🔥 Upserting analytics data:", analyticsData)

      // Use upsert to handle existing records
      const { error: upsertError } = await supabase.from("user_analytics").upsert(analyticsData, {
        onConflict: "user_id,date",
        ignoreDuplicates: false,
      })

      if (upsertError) {
        console.error("❌ Error upserting user_analytics:", upsertError)
      } else {
        console.log("✅ Successfully updated user analytics")

        await syncAnalyticsWithMainDomain({
          type: "user_analytics_update",
          userId: user.id,
          totalActions,
          uniqueTools,
          successRate,
          engagementScore,
        })
      }
    } catch (error) {
      console.error("❌ Error in updateUserAnalytics:", error)
    }
  }, [user, syncAnalyticsWithMainDomain])

  const calculateEngagementScore = (actions: number, uniqueTools: number, successRate: number) => {
    // Base score from actions (0-40 points)
    const actionScore = Math.min(actions * 2, 40)

    // Tool variety bonus (0-30 points)
    const varietyScore = Math.min(uniqueTools * 5, 30)

    // Success rate bonus (0-30 points)
    const successScore = Math.round(successRate * 30)

    const totalScore = actionScore + varietyScore + successScore

    // Cap at 100 and ensure minimum of 1 if any activity
    return Math.min(Math.max(actions > 0 ? 1 : 0, totalScore), 100)
  }

  // Track page views
  const trackPageView = useCallback(
    async (page: string, metadata?: any) => {
      if (!user || !env.ENABLE_ANALYTICS) return

      console.log("📄 Page view tracked:", page, metadata)

      try {
        const deviceInfo = getDeviceInfo()

        const pageViewData = {
          user_id: user.id,
          page,
          metadata: {
            ...metadata,
            deviceInfo,
            source: "ai.kozker.com",
          },
        }

        // Track in database if we have a page_views table
        // await supabase.from("page_views").insert(pageViewData)

        // Sync with main domain
        await syncAnalyticsWithMainDomain({
          type: "page_view",
          page,
          userId: user.id,
          ...metadata,
        })
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    },
    [user, getDeviceInfo, syncAnalyticsWithMainDomain],
  )

  // Track general events
  const trackEvent = useCallback(
    async (eventName: string, properties?: any) => {
      if (!user || !env.ENABLE_ANALYTICS) return

      console.log("📊 Event tracked:", eventName, properties)

      try {
        await syncAnalyticsWithMainDomain({
          type: "event",
          eventName,
          properties,
          userId: user.id,
        })
      } catch (error) {
        console.error("Error tracking event:", error)
      }
    },
    [user, syncAnalyticsWithMainDomain],
  )

  // Track conversions
  const trackConversion = useCallback(
    async (conversionType: string, value?: number, metadata?: any) => {
      if (!user || !env.ENABLE_ANALYTICS) return

      console.log("💰 Conversion tracked:", conversionType, value, metadata)

      try {
        await syncAnalyticsWithMainDomain({
          type: "conversion",
          conversionType,
          value,
          metadata,
          userId: user.id,
        })
      } catch (error) {
        console.error("Error tracking conversion:", error)
      }
    },
    [user, syncAnalyticsWithMainDomain],
  )

  const value: AnalyticsContextType = {
    trackToolUsage,
    trackPageView,
    trackEvent,
    trackConversion,
    syncAnalyticsWithMainDomain,
  }

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

// Custom hook to use analytics context
export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}

// Higher-order component for automatic page tracking
export function withPageTracking<P extends object>(Component: React.ComponentType<P>, pageName: string) {
  return function TrackedComponent(props: P) {
    const { trackPageView } = useAnalytics()

    React.useEffect(() => {
      trackPageView(pageName)
    }, [trackPageView])

    return <Component {...props} />
  }
}
