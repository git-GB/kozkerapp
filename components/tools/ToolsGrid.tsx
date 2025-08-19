"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnalytics } from "@/contexts/analytics-context"
import { tools } from "@/lib/tools/tools-data"
import { ArrowRight, Filter, X, Sparkles } from "lucide-react"

const categories = ["All", "Branding", "Content", "Marketing", "Automation", "Analytics", "Productivity", "Business"]
const solutions = ["All", "GrowthSuite", "LaunchPad", "Intelligence"]

export function ToolsGrid() {
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

  const handleToolAccess = async (e: React.MouseEvent, toolId: string, toolName: string, href: string) => {
    e.preventDefault()
    console.log("Tool access clicked:", { toolId, toolName, href })

    const toolInfo = tools.find((tool) => tool.id === toolId)
    console.log("Tool info from registry:", toolInfo)

    try {
      await trackToolUsage({
        toolName: toolName,
        actionType: "tool_access",
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
    <>
      {/* Filter Section */}
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Browse Tools by Category</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} available
              {intelligentFilter.active && (
                <Badge variant="outline" className="text-xs ml-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Filtered
                </Badge>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="category-filter" className="text-sm font-medium text-muted-foreground">
                Filter by Category:
              </label>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="solution-filter" className="text-sm font-medium text-muted-foreground">
                Filter by Solution:
              </label>
              <Select value={activeSolution} onValueChange={setActiveSolution}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select solution" />
                </SelectTrigger>
                <SelectContent>
                  {solutions.map((solution) => (
                    <SelectItem key={solution} value={solution}>
                      {solution}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-grid" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Filter className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No Tools Found</h3>
                <p className="text-muted-foreground mb-6">
                  {intelligentFilter.active
                    ? `No tools match your search for "${intelligentFilter.searchTerm}". Try a different search term or clear the AI filter.`
                    : "No tools match your current filter selection. Try adjusting your category or solution filters to see more results."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveCategory("All")
                      setActiveSolution("All")
                      setIntelligentFilter({ active: false, toolIds: [], searchTerm: "" })
                    }}
                  >
                    Clear All Filters
                  </Button>
                  <Button variant="outline" onClick={() => setActiveCategory("All")}>
                    Reset Category
                  </Button>
                  <Button variant="outline" onClick={() => setActiveSolution("All")}>
                    Reset Solution
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const IconComponent = tool.icon
                const isAvailable = tool.status === "Available"

                return (
                  <Card
                    key={tool.id}
                    className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 flex flex-col h-full"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge
                              variant={isAvailable ? "default" : "secondary"}
                              className="text-xs whitespace-nowrap"
                            >
                              {tool.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs whitespace-nowrap">
                              {tool.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs whitespace-nowrap">
                              {tool.solution}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                      <CardDescription className="text-base">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <div className="space-y-4 flex-grow">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {tool.features.map((feature, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        {isAvailable ? (
                          <Button
                            className="w-full group"
                            onClick={(e) => handleToolAccess(e, tool.id, tool.name, tool.href)}
                          >
                            Try Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        ) : (
                          <Button disabled className="w-full">
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
