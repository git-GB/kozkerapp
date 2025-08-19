"use client"

import type React from "react"
import { useState } from "react"
import SmartFilterIntegration from "@/components/SmartFilterIntegration"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAnalytics } from "@/contexts/analytics-context"
import { getToolById } from "@/lib/tools/tool-registry"
import {
  Globe,
  Type,
  LayoutTemplate,
  Share2,
  Rss,
  Mail,
  Bot,
  BarChart2,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const tools = [
  {
    id: "domain-name-genie",
    name: "Domain Name Genie",
    description: "Find your perfect domain with AI-powered suggestions based on your business description.",
    icon: Globe,
    href: "/tools/domain-name-generator",
    status: "Available",
    category: "Branding",
    solution: "LaunchPad",
    features: ["AI-powered suggestions", "Real-time availability check", "Multiple TLD options"],
  },
  {
    id: "tagline-creator",
    name: "Tagline & Value-Prop Creator",
    description: "Crafts a punchy tagline and 1-sentence UVP based on user inputs.",
    icon: Type,
    href: "/tools/tagline-value-prop-creator",
    status: "Available",
    category: "Branding",
    solution: "LaunchPad",
    features: ["Punchy taglines", "Value propositions", "Brand messaging"],
  },
  {
    id: "hero-copy-generator",
    name: "Landing-Page Hero Copy Generator",
    description: "Generates headline, sub-headline, and CTA variations for conversion.",
    icon: LayoutTemplate,
    href: "/tools/landing-pageherocopygenerator",
    status: "Available",
    category: "Content",
    solution: "LaunchPad",
    features: ["Headlines", "Sub-headlines", "CTA variations"],
  },
  {
    id: "social-media-suggester",
    name: "Social-Media Caption & Hashtag Suggester",
    description: "Creates platform-tailored captions plus trending hashtags.",
    icon: Share2,
    href: "/tools/social-media-suggester",
    status: "Available",
    category: "Marketing",
    solution: "LaunchPad",
    features: ["Platform-specific captions", "Trending hashtags", "Engagement optimization"],
  },
  {
    id: "blog-outline-builder",
    name: "Blog-Post Topic & Outline Builder",
    description: "Spins up a SEO-optimized blog structure with headings and key points.",
    icon: Rss,
    href: "/tools/blog-generator",
    status: "Available",
    category: "Content",
    solution: "Intelligence",
    features: ["SEO optimization", "Content structure", "Topic research"],
  },
  {
    id: "email-subject-generator",
    name: "Email Subject-Line & Preview-Text Generator",
    description: "Produces subject lines and preheader options to maximize opens.",
    icon: Mail,
    href: "/tools/email-subject-line",
    status: "Available",
    category: "Marketing",
    solution: "Intelligence",
    features: ["Subject line optimization", "Preview text", "Open rate improvement"],
  },
  {
    id: "ai-business-plan-generator",
    name: "AI Business Plan Generator",
    description: "Effortless Business Planning with AI",
    icon: Bot,
    href: "/tools/ai-business-plan-generator",
    status: "Available",
    category: "Business",
    solution: "LaunchPad",
    features: ["AI-powered business summaries", "Financial projections", "Business strategies"],
  },
  {
    id: "powerbi-generator",
    name: "Power BI Measure & Viz Snippet Generator",
    description: "Outputs DAX measures and a JSON snippet for a chart from KPI description.",
    icon: BarChart2,
    href: "/tools/power-bi-measure",
    status: "Available",
    category: "Analytics",
    solution: "GrowthSuite",
    features: ["DAX measures", "Visualization snippets", "KPI tracking"],
  },
]

const categories = ["All", "Branding", "Content", "Marketing", "Business", "Analytics"]
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
  }

  const handleToolAccess = async (e: React.MouseEvent, toolId: string, toolName: string, href: string) => {
    e.preventDefault()

    const toolInfo = getToolById(toolId)

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

      await trackEvent(`${toolName}_accessed`, {
        toolId,
        toolName,
        category: toolInfo?.category,
        solution: toolInfo?.solution,
        source: "tools_page",
      })

      window.location.href = href
    } catch (error) {
      console.error("Error tracking tool usage:", error)
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
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl mx-4"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            {tools.length}+ AI-Powered Business Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Transform Your Business with AI Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From domain generation to content creation, analytics, and automation - discover the complete toolkit to
            streamline your workflow, enhance creativity, and accelerate business growth.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">Instant Results</h3>
                <p className="text-xs text-muted-foreground">Get professional outputs in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">AI-Powered</h3>
                <p className="text-xs text-muted-foreground">Advanced algorithms for better results</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">Growth Focused</h3>
                <p className="text-xs text-muted-foreground">Tools designed for business success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Filter Integration */}
      <SmartFilterIntegration
        tools={tools}
        onFilterApply={handleSmartFilter}
        currentCategory={activeCategory}
        currentSolution={activeSolution}
      />

      {/* Filter Section */}
      <section className="py-8 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Browse Tools by Category</h2>
            <p className="text-muted-foreground">
              {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-muted-foreground">Filter by Category:</label>
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
              <label className="text-sm font-medium text-muted-foreground">Filter by Solution:</label>
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
                          <Badge variant={isAvailable ? "default" : "secondary"} className="text-xs">
                            {tool.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Building Your Business Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Begin with our most popular tools - Domain Name Generator for your online presence and Business Plan
            Generator for strategic planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/tools/domain-name-generator">Generate Domain Name</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/tools/ai-business-plan-generator">Create Business Plan</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
