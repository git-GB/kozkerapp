"use client"

import type React from "react"

import { useState } from "react"
import SmartFilterIntegration from "@/components/SmartFilterIntegration"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAnalytics } from "@/contexts/analytics-context"
import { getToolById } from "@/lib/tools/tool-registry"
import { Sparkles, X } from "lucide-react"
import { tools } from "@/lib/tools/tools-data"

interface Tool {
  id: string
  name: string
  description: string
  icon: any
  href: string
  status: string
  category: string
  solution: string
  features: string[]
  keywords: string[]
  useCases: string[]
  userPersonas: string[]
  businessStages: string[]
  complexityLevel: "beginner" | "intermediate" | "advanced"
  timeToValue: "immediate" | "short" | "medium" | "long"
}

const categories = ["All", "Branding", "Content", "Marketing", "Automation", "Analytics", "Productivity", "Business"]
const solutions = ["All", "GrowthSuite", "LaunchPad", "Intelligence"]

export default function ToolsPageClient() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSolution, setActiveSolution] = useState("All")

  const [intelligentFilter, setIntelligentFilter] = useState<{
    active: boolean
    toolIds: string[]
    searchTerm: string
  }>({
    active: false,
    toolIds: [],
    searchTerm: "",
  })

  const { trackToolUsage, trackEvent } = useAnalytics()

  const handleSmartFilter = (category: string, solution: string, searchTerm: string, specificToolIds?: string[]) => {
    setActiveCategory(category)
    setActiveSolution(solution)

    if (specificToolIds && specificToolIds.length > 0) {
      setIntelligentFilter({
        active: true,
        toolIds: specificToolIds,
        searchTerm: searchTerm,
      })
    } else {
      setIntelligentFilter({
        active: false,
        toolIds: [],
        searchTerm: "",
      })
    }

    setTimeout(() => {
      const filterSection = document.getElementById("filter-section")
      if (filterSection) {
        filterSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 800)
  }

  const handleToolAccess = async (e: React.MouseEvent, toolId: string, toolName: string, href: string) => {
    e.preventDefault()
    console.log("Tool access clicked:", { toolId, toolName, href })

    const toolInfo = getToolById(toolId)
    console.log("Tool info from registry:", toolInfo)

    try {
      await trackToolUsage({
        toolName: toolName,
        toolId: toolId,
        toolCategory: toolInfo?.category || "unknown",
        inputData: {
          toolId: toolId,
          source: "tools_page",
        },
        outputData: {},
        metadata: {
          toolId: toolId,
          category: toolInfo?.category || "unknown",
          solution: toolInfo?.solution || "unknown",
          source: "tools_page",
          timestamp: new Date().toISOString(),
        },
        success: true,
      })

      // Also track as an event
      await trackEvent(`${toolName}_accessed`, {
        toolId,
        toolName,
        category: toolInfo?.category,
        solution: toolInfo?.solution,
        source: "tools_page",
      })

      console.log("Tracking completed, navigating to:", href)

      // Navigate after tracking is complete
      window.location.href = href
    } catch (error) {
      console.error("Error tracking tool usage:", error)
      // Navigate anyway if tracking fails
      window.location.href = href
    }
  }

  const filteredTools = tools.filter((tool) => {
    if (intelligentFilter.active && intelligentFilter.toolIds.length > 0) {
      return intelligentFilter.toolIds.includes(tool.id)
    }

    const categoryMatch = activeCategory === "All" || tool.category === activeCategory
    const solutionMatch = activeSolution === "All" || tool.solution === activeSolution
    return categoryMatch && solutionMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl mx-4"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Business Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Accelerate Your Business with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our collection of AI-powered tools designed to streamline your workflow, enhance creativity, and
            drive business growth.
          </p>
        </div>
      </section>

      <SmartFilterIntegration
        tools={tools}
        onFilterApply={handleSmartFilter}
        currentCategory={activeCategory}
        currentSolution={activeSolution}
      />

      <section id="filter-section" className="py-8 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          {intelligentFilter.active && intelligentFilter.toolIds.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-l-4 border-primary rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">AI Intelligent Filter Active</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {filteredTools.length} perfectly matched tools
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveCategory("All")
                    setActiveSolution("All")
                    setIntelligentFilter({ active: false, toolIds: [], searchTerm: "" })
                  }}
                  className="hover:bg-primary/10"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear AI Filter
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 ml-7">
                Showing tools specifically matched to:{" "}
                <span className="font-medium">"{intelligentFilter.searchTerm}"</span>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
