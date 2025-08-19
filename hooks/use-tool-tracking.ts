"use client"

import { useCallback } from "react"
import { useAnalytics } from "@/contexts/analytics-context"
import { getToolById } from "@/lib/tools/tool-registry"

interface UseToolTrackingOptions {
  toolId: string
  toolName?: string // Made optional, will be derived from registry
}

export function useToolTracking({ toolId, toolName }: UseToolTrackingOptions) {
  const { trackToolUsage, trackEvent } = useAnalytics()

  const toolInfo = getToolById(toolId)
  const finalToolName = toolName || toolInfo?.name || toolId

  const trackStart = useCallback(
    async (actionType: string, inputData?: any) => {
      await trackToolUsage({
        toolId, // Added toolId tracking
        toolName: finalToolName,
        actionType: `${actionType}_start`,
        inputData,
        metadata: {
          timestamp: new Date().toISOString(),
          category: toolInfo?.category,
          solution: toolInfo?.solution,
        },
      })
    },
    [toolId, finalToolName, toolInfo, trackToolUsage],
  )

  const trackComplete = useCallback(
    async (actionType: string, inputData?: any, outputData?: any, duration?: number, success = true) => {
      await trackToolUsage({
        toolId, // Added toolId tracking
        toolName: finalToolName,
        actionType: `${actionType}_complete`,
        inputData,
        outputData,
        duration,
        success,
        metadata: {
          timestamp: new Date().toISOString(),
          category: toolInfo?.category,
          solution: toolInfo?.solution,
        },
      })
    },
    [toolId, finalToolName, toolInfo, trackToolUsage],
  )

  const trackError = useCallback(
    async (actionType: string, error: string, inputData?: any) => {
      await trackToolUsage({
        toolId, // Added toolId tracking
        toolName: finalToolName,
        actionType: `${actionType}_error`,
        inputData,
        success: false,
        errorMessage: error,
        metadata: {
          timestamp: new Date().toISOString(),
          category: toolInfo?.category,
          solution: toolInfo?.solution,
        },
      })
    },
    [toolId, finalToolName, toolInfo, trackToolUsage],
  )

  const trackInteraction = useCallback(
    async (interactionType: string, properties?: any) => {
      await trackEvent(`${finalToolName}_${interactionType}`, {
        toolId, // Added toolId tracking
        toolName: finalToolName,
        category: toolInfo?.category,
        solution: toolInfo?.solution,
        ...properties,
      })
    },
    [toolId, finalToolName, toolInfo, trackEvent],
  )

  const trackToolAccess = useCallback(async () => {
    await trackToolUsage({
      toolId,
      toolName: finalToolName,
      actionType: "tool_access",
      success: true,
      metadata: {
        timestamp: new Date().toISOString(),
        category: toolInfo?.category,
        solution: toolInfo?.solution,
      },
    })
  }, [toolId, finalToolName, toolInfo, trackToolUsage])

  return {
    trackStart,
    trackComplete,
    trackError,
    trackInteraction,
    trackToolAccess, // Added new method for simple access tracking
  }
}
