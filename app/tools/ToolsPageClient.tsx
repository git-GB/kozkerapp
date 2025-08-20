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
  ClipboardList,
  Filter,
  FileSearch,
  Briefcase,
  ArrowRight,
  Sparkles,
  Users,
  Palette,
  Calculator,
  Receipt,
  UserPlus,
  MessageSquare,
  HelpCircle,
  Megaphone,
  Send,
  Clock,
  X,
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
    keywords: ["domain", "website", "url", "web address", "online presence", "site", "domain name", "hosting"],
    useCases: ["starting website", "new business", "rebranding", "online launch", "web presence"],
    userPersonas: ["entrepreneur", "startup founder", "small business owner", "web developer"],
    businessStages: ["idea", "launch"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
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
    keywords: ["tagline", "value proposition", "slogan", "messaging", "brand voice", "marketing copy", "branding"],
    useCases: ["brand messaging", "marketing materials", "website copy", "brand identity", "startup branding"],
    userPersonas: ["marketer", "business owner", "brand manager", "entrepreneur"],
    businessStages: ["launch", "growth"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
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
    keywords: ["landing page", "hero copy", "headlines", "conversion", "website copy", "CTA", "call to action"],
    useCases: ["website launch", "conversion optimization", "landing page creation", "marketing campaigns"],
    userPersonas: ["marketer", "web designer", "business owner", "copywriter"],
    businessStages: ["launch", "growth"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
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
    keywords: [
      "social media",
      "captions",
      "hashtags",
      "posts",
      "content",
      "engagement",
      "facebook",
      "instagram",
      "twitter",
    ],
    useCases: [
      "social media marketing",
      "content creation",
      "audience engagement",
      "brand awareness",
      "social posting",
    ],
    userPersonas: ["content creator", "social media manager", "marketer", "small business owner"],
    businessStages: ["launch", "growth", "scale"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
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
    keywords: ["blog", "content", "SEO", "writing", "articles", "blog posts", "content marketing", "outline"],
    useCases: ["content marketing", "blog writing", "SEO content", "thought leadership", "website content"],
    userPersonas: ["content writer", "marketer", "blogger", "business owner"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "short",
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
    keywords: ["email", "subject lines", "newsletter", "email marketing", "open rates", "email campaigns"],
    useCases: ["email campaigns", "newsletter marketing", "lead nurturing", "customer communication"],
    userPersonas: ["email marketer", "business owner", "marketing manager"],
    businessStages: ["growth", "scale"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
  },
  {
    id: "ai-business-plan-generator",
    name: "AI Business Plan Generator",
    description: "Effortless Business Planning with AI",
    icon: Bot,
    href: "/tools/ai-business-plan-generator",
    status: "Available",
    category: "Automation",
    solution: "LaunchPad",
    features: [
      "AI-powered business summaries",
      "Realistic financial projections",
      "Detailed end-to-end Business strategies",
    ],
    keywords: ["business plan", "startup", "strategy", "financial projections", "business model", "planning"],
    useCases: ["startup planning", "investor pitch", "business strategy", "funding applications"],
    userPersonas: ["entrepreneur", "startup founder", "business owner"],
    businessStages: ["idea", "launch"],
    complexityLevel: "intermediate",
    timeToValue: "medium",
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
    keywords: ["power bi", "analytics", "data visualization", "DAX", "business intelligence", "reporting", "KPI"],
    useCases: ["business reporting", "data analysis", "dashboard creation", "performance tracking"],
    userPersonas: ["data analyst", "business analyst", "manager", "executive"],
    businessStages: ["growth", "scale"],
    complexityLevel: "advanced",
    timeToValue: "medium",
  },
  {
    id: "meeting-extractor",
    name: "Meeting-Summary & Action-Item Extractor",
    description: "Get bullet-point summary + assigned tasks from transcript or notes.",
    icon: ClipboardList,
    href: "/tools/meeting-summary-extractor",
    status: "Available",
    category: "Productivity",
    solution: "GrowthSuite",
    features: ["Meeting summaries", "Action items", "Task assignment"],
    keywords: ["meetings", "productivity", "summaries", "action items", "notes", "tasks", "collaboration"],
    useCases: ["meeting management", "team collaboration", "project tracking", "task management"],
    userPersonas: ["manager", "team lead", "project manager", "executive"],
    businessStages: ["growth", "scale"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
  },
  {
    id: "data-cleanse-helper",
    name: "Data-Cleanse & Schema-Map Helper",
    description: "Infers column types, flags anomalies, and proposes a star-schema from CSV.",
    icon: Filter,
    href: "/tools/data-cleanse",
    status: "Available",
    category: "Analytics",
    solution: "Intelligence",
    features: ["Data cleaning", "Schema mapping", "Anomaly detection"],
    keywords: ["data", "csv", "data cleaning", "analytics", "data processing", "schema", "database"],
    useCases: ["data preparation", "analytics setup", "data migration", "database design"],
    userPersonas: ["data analyst", "developer", "business analyst"],
    businessStages: ["growth", "scale"],
    complexityLevel: "advanced",
    timeToValue: "medium",
  },
  {
    id: "seo-analyzer",
    name: "SEO-Keyword & Content-Gap Analyzer",
    description: "Delivers untapped keyword ideas and content gaps versus competitors.",
    icon: FileSearch,
    href: "/tools/seo-keyword-content-gapanalyzer",
    status: "Available",
    category: "Marketing",
    solution: "GrowthSuite",
    features: ["Keyword research", "Content gaps", "Competitor analysis"],
    keywords: ["SEO", "keywords", "search engine", "google", "content gap", "competitor analysis", "ranking"],
    useCases: ["SEO optimization", "content strategy", "competitor research", "website ranking"],
    userPersonas: ["SEO specialist", "marketer", "content manager"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "medium",
  },
  {
    id: "proposal-generator",
    name: "Proposal-Draft Generator",
    description: "Get a formatted first-draft proposal from prospect details & service package.",
    icon: Briefcase,
    href: "/tools/proposal-draft-generator",
    status: "Available",
    category: "Business",
    solution: "GrowthSuite",
    features: ["Proposal drafts", "Service packages", "Client customization"],
    keywords: ["proposal", "client", "services", "business development", "sales", "contracts", "quotes"],
    useCases: ["client proposals", "service quotes", "project bids", "business development"],
    userPersonas: ["sales person", "business owner", "consultant", "agency owner"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "short",
  },
  {
    id: "follow-up-email-sequencer",
    name: "Follow-Up Email Sequencer",
    description: "Create automated email sequences to nurture leads and close deals effectively.",
    icon: Send,
    href: "/tools/follow-up-email-sequencer",
    status: "Available",
    category: "Marketing",
    solution: "GrowthSuite",
    features: ["Email sequences", "Lead nurturing", "Automated follow-ups"],
    keywords: ["email automation", "follow up", "lead nurturing", "email sequence", "sales funnel", "drip campaign"],
    useCases: ["lead nurturing", "sales automation", "customer onboarding", "email marketing"],
    userPersonas: ["sales person", "marketer", "business owner"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "medium",
  },
  {
    id: "job-description-generator",
    name: "Job Description Generator",
    description: "Generate comprehensive job descriptions with requirements and responsibilities.",
    icon: UserPlus,
    href: "/tools/job-description-generator",
    status: "Available",
    category: "Business",
    solution: "GrowthSuite",
    features: ["Role requirements", "Responsibility mapping", "Skills assessment"],
    keywords: ["hiring", "job description", "recruitment", "HR", "job posting", "talent acquisition"],
    useCases: ["hiring process", "team building", "recruitment", "job postings"],
    userPersonas: ["HR manager", "business owner", "team lead"],
    businessStages: ["launch", "growth"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
  },
  {
    id: "customer-persona-generator",
    name: "Customer Persona & ICP Generator",
    description: "Create detailed customer personas and ideal customer profiles for targeted marketing.",
    icon: Users,
    href: "/tools/customer-persona-generator",
    status: "Available",
    category: "Marketing",
    solution: "GrowthSuite",
    features: ["Detailed personas", "ICP mapping", "Target audience insights"],
    keywords: [
      "customer persona",
      "target audience",
      "ICP",
      "ideal customer",
      "marketing strategy",
      "customer research",
    ],
    useCases: ["marketing strategy", "product development", "sales targeting", "customer research"],
    userPersonas: ["marketer", "product manager", "business owner"],
    businessStages: ["launch", "growth"],
    complexityLevel: "intermediate",
    timeToValue: "short",
  },
  {
    id: "logo-color-picker",
    name: "Logo Color Palette Picker",
    description: "Generate harmonious color palettes for your brand and logo design.",
    icon: Palette,
    href: "/tools/logo-color-palette-picker",
    status: "Available",
    category: "Branding",
    solution: "LaunchPad",
    features: ["Color harmony analysis", "Brand color schemes", "Accessibility compliance"],
    keywords: ["logo", "colors", "branding", "design", "color palette", "brand identity", "visual design"],
    useCases: ["brand design", "logo creation", "visual identity", "design system"],
    userPersonas: ["designer", "business owner", "brand manager"],
    businessStages: ["idea", "launch"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
  },
  {
    id: "pricing-calculator",
    name: "Pricing Calculator",
    description: "Calculate optimal pricing strategies based on costs, market analysis, and profit margins.",
    icon: Calculator,
    href: "/tools/pricing-generator",
    status: "Available",
    category: "Business",
    solution: "LaunchPad",
    features: ["Cost analysis", "Profit margin optimization", "Competitive pricing"],
    keywords: ["pricing", "cost analysis", "profit margins", "pricing strategy", "business model", "revenue"],
    useCases: ["product pricing", "service pricing", "business planning", "profit optimization"],
    userPersonas: ["business owner", "product manager", "entrepreneur"],
    businessStages: ["launch", "growth"],
    complexityLevel: "intermediate",
    timeToValue: "short",
  },
  {
    id: "invoice-template-builder",
    name: "Invoice Template Builder",
    description: "Create professional invoice templates with custom branding and automated calculations.",
    icon: Receipt,
    href: "/tools/invoice-template-builder",
    status: "Available",
    category: "Business",
    solution: "GrowthSuite",
    features: ["Custom templates", "Automated calculations", "Brand integration"],
    keywords: ["invoice", "billing", "accounting", "templates", "business documents", "payment"],
    useCases: ["client billing", "business accounting", "invoice management", "payment processing"],
    userPersonas: ["business owner", "freelancer", "accountant"],
    businessStages: ["launch", "growth", "scale"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
  },
  {
    id: "sales-script-generator",
    name: "Sales Script Generator",
    description: "Generate persuasive sales scripts for calls, emails, and presentations.",
    icon: MessageSquare,
    href: "/tools/sales-script-generator",
    status: "Available",
    category: "Marketing",
    solution: "GrowthSuite",
    features: ["Persuasive scripts", "Objection handling", "Closing techniques"],
    keywords: ["sales", "scripts", "cold calling", "sales pitch", "closing", "objection handling", "sales training"],
    useCases: ["sales calls", "sales training", "lead conversion", "sales presentations"],
    userPersonas: ["sales person", "business owner", "sales manager"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "immediate",
  },
  {
    id: "faq-builder",
    name: "FAQ Builder",
    description: "Build comprehensive FAQ sections to address common customer questions.",
    icon: HelpCircle,
    href: "/tools/faq-builder",
    status: "Available",
    category: "Content",
    solution: "LaunchPad",
    features: ["Question categorization", "Answer optimization", "Search functionality"],
    keywords: ["FAQ", "customer support", "help documentation", "questions", "support content", "customer service"],
    useCases: ["customer support", "website content", "product documentation", "user guidance"],
    userPersonas: ["customer support", "business owner", "product manager"],
    businessStages: ["launch", "growth"],
    complexityLevel: "beginner",
    timeToValue: "immediate",
  },
  {
    id: "press-release-template",
    name: "Press Release Template",
    description: "Create professional press releases for announcements and media outreach.",
    icon: Megaphone,
    href: "/tools/press-release-template",
    status: "Available",
    category: "Marketing",
    solution: "GrowthSuite",
    features: ["Media-ready format", "SEO optimization", "Distribution guidelines"],
    keywords: ["press release", "PR", "media", "announcements", "publicity", "news", "media outreach"],
    useCases: ["product launches", "company announcements", "media relations", "publicity"],
    userPersonas: ["PR manager", "marketer", "business owner"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "short",
  },
  {
    id: "project-timeline-builder",
    name: "Project Timeline Builder",
    description: "Build detailed project timelines with milestones, dependencies, and resource allocation.",
    icon: Clock,
    href: "/tools/project-timeline-builder",
    status: "Available",
    category: "Productivity",
    solution: "GrowthSuite",
    features: ["Milestone tracking", "Dependency mapping", "Resource planning"],
    keywords: ["project management", "timeline", "milestones", "project planning", "scheduling", "resource management"],
    useCases: ["project planning", "team coordination", "deadline management", "resource allocation"],
    userPersonas: ["project manager", "team lead", "business owner"],
    businessStages: ["growth", "scale"],
    complexityLevel: "intermediate",
    timeToValue: "medium",
  },
]

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
                {" "}
                Filter by Category:{" "}
              </label>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {" "}
                      {category}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="solution-filter" className="text-sm font-medium text-muted-foreground">
                {" "}
                Filter by Solution:{" "}
              </label>
              <Select value={activeSolution} onValueChange={setActiveSolution}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select solution" />
                </SelectTrigger>
                <SelectContent>
                  {solutions.map((solution) => (
                    <SelectItem key={solution} value={solution}>
                      {" "}
                      {solution}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

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
                            {tool.solution === "GrowthSuite" ? (
                              <Link
                                href="/solutions/growthsuite"
                                scroll={false}
                                onClick={() => {
                                  setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                  }, 100)
                                }}
                              >
                                <Badge
                                  variant="outline"
                                  className="text-xs whitespace-nowrap border-[#2563EB] text-[#2563EB] bg-[#2563EB]/10 hover:bg-[#2563EB]/20 transition-colors cursor-pointer"
                                >
                                  {tool.solution}
                                </Badge>
                              </Link>
                            ) : tool.solution === "LaunchPad" ? (
                              <Link
                                href="/solutions/launchpad"
                                scroll={false}
                                onClick={() => {
                                  setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                  }, 100)
                                }}
                              >
                                <Badge
                                  variant="outline"
                                  className="text-xs whitespace-nowrap border-[#059669] text-[#059669] bg-[#059669]/10 hover:bg-[#059669]/20 transition-colors cursor-pointer"
                                >
                                  {tool.solution}
                                </Badge>
                              </Link>
                            ) : tool.solution === "Intelligence" ? (
                              <Link
                                href="/solutions/intelligence"
                                scroll={false}
                                onClick={() => {
                                  setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                  }, 100)
                                }}
                              >
                                <Badge
                                  variant="outline"
                                  className="text-xs whitespace-nowrap border-[#7C3AED] text-[#7C3AED] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 transition-colors cursor-pointer"
                                >
                                  {tool.solution}
                                </Badge>
                              </Link>
                            ) : (
                              <Badge variant="outline" className="text-xs whitespace-nowrap">
                                {tool.solution}
                              </Badge>
                            )}
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

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start with our Domain Name Genie and discover the perfect domain for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/tools/digital-readiness">Try Domain Name Genie</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white hover:bg-white hover:text-primary text-slate-600 bg-transparent"
            >
              <Link href="/contact">Request Custom Tool</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
