"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Loader2,
  Building2,
  ShoppingCart,
  Laptop,
  Users,
  Briefcase,
  Heart,
  Download,
  FileText,
  BarChart3,
  RefreshCw,
  User,
} from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

// Types
export interface FormData {
  businessType: string
  industry: string
  companySize: string
  segment: string
  ageRange: string
  incomeLevel: string
  location: string
  personaName: string
  challenges: string
  goals: string
}

export interface PersonaResponse {
  persona: {
    name: string
    summary: string
    demographics: {
      age: string
      income: string
      location: string
    }
    psychographics: {
      challenges: string[]
      goals: string[]
      motivations: string[]
    }
    businessContext: {
      type: string
      industry: string
      size: string
      segment: string
    }
  }
  insights: {
    keyFindings: string[]
    recommendations: string[]
  }
  webhookResponse?: any
}

// Business Type Step Component
interface BusinessTypeStepProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const businessTypes = [
  { id: "b2b-saas", label: "B2B SaaS", icon: Laptop, description: "Software as a Service for businesses" },
  { id: "e-commerce", label: "E-commerce", icon: ShoppingCart, description: "Online retail and marketplace" },
  { id: "consulting", label: "Consulting", icon: Users, description: "Professional services and consulting" },
  { id: "manufacturing", label: "Manufacturing", icon: Building2, description: "Physical product manufacturing" },
  { id: "financial", label: "Financial Services", icon: Briefcase, description: "Banking, insurance, fintech" },
  { id: "healthcare", label: "Healthcare", icon: Heart, description: "Medical and wellness services" },
]

function BusinessTypeStep({ value, onChange, error }: BusinessTypeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Select Your Business Type</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Choose the category that best describes your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businessTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                value === type.id
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md"
                  : "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 bg-white dark:bg-zinc-800"
              }`}
              onClick={() => onChange(type.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`w-8 h-8 mx-auto mb-3 ${value === type.id ? "text-orange-600" : "text-gray-500 dark:text-gray-400"}`} />
                <h3 className={`font-semibold mb-1 ${value === type.id ? "text-orange-800 dark:text-orange-300" : "text-gray-900 dark:text-white"}`}>
                  {type.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}
    </div>
  )
}

// Target Market Step Component
interface TargetMarketStepProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Partial<FormData>
}

const companySizes = [
  { value: "startup", label: "Startup (1-10 employees)" },
  { value: "small", label: "Small Business (11-50 employees)" },
  { value: "medium", label: "Medium Business (51-200 employees)" },
  { value: "large", label: "Large Business (201-1000 employees)" },
  { value: "enterprise", label: "Enterprise (1000+ employees)" },
]

function TargetMarketStep({ formData, onChange, errors }: TargetMarketStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Define Your Target Market</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Specify the market characteristics you're targeting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium text-gray-700 dark:text-white">
            Industry *
          </Label>
          <Input
            id="industry"
            placeholder="e.g., Technology, Healthcare, Finance"
            value={formData.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.industry ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
          />
          {errors.industry && <p className="text-red-600 dark:text-red-400 text-sm">{errors.industry}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize" className="text-sm font-medium text-gray-700 dark:text-white">
            Company Size *
          </Label>
          <Select value={formData.companySize} onValueChange={(value) => onChange("companySize", value)}>
            <SelectTrigger className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.companySize ? "border-red-500" : "border-gray-300 dark:border-zinc-700"}`}>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
              {companySizes.map((size) => (
                <SelectItem key={size.value} value={size.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.companySize && <p className="text-red-600 dark:text-red-400 text-sm">{errors.companySize}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="segment" className="text-sm font-medium text-gray-700 dark:text-white">
          Market Segment *
        </Label>
        <Input
          id="segment"
          placeholder="e.g., Small business owners, Enterprise decision makers, Individual consumers"
          value={formData.segment}
          onChange={(e) => onChange("segment", e.target.value)}
          className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.segment ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
        />
        {errors.segment && <p className="text-red-600 dark:text-red-400 text-sm">{errors.segment}</p>}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Describe the specific segment within your industry that you're targeting
        </p>
      </div>
    </div>
  )
}

// Demographics Step Component
const ageRanges = [
  { value: "18-24", label: "18-24 years" },
  { value: "25-34", label: "25-34 years" },
  { value: "35-44", label: "35-44 years" },
  { value: "45-54", label: "45-54 years" },
  { value: "55-64", label: "55-64 years" },
  { value: "65+", label: "65+ years" },
]

const incomeLevels = [
  { value: "under-30k", label: "Under $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-75k", label: "$50,000 - $75,000" },
  { value: "75k-100k", label: "$75,000 - $100,000" },
  { value: "100k-150k", label: "$100,000 - $150,000" },
  { value: "150k+", label: "$150,000+" },
]

function DemographicsStep({ formData, onChange, errors }: TargetMarketStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Customer Demographics</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Define the demographic characteristics of your target customers</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="personaName" className="text-sm font-medium text-gray-700 dark:text-white">
          Persona Name *
        </Label>
        <Input
          id="personaName"
          placeholder="e.g., Sarah Johnson, Marketing Director Mike"
          value={formData.personaName}
          onChange={(e) => onChange("personaName", e.target.value)}
          className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.personaName ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
        />
        {errors.personaName && <p className="text-red-600 dark:text-red-400 text-sm">{errors.personaName}</p>}
        <p className="text-sm text-gray-500 dark:text-gray-400">Give your persona a realistic name to make it more relatable</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ageRange" className="text-sm font-medium text-gray-700 dark:text-white">
            Age Range *
          </Label>
          <Select value={formData.ageRange} onValueChange={(value) => onChange("ageRange", value)}>
            <SelectTrigger className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.ageRange ? "border-red-500" : "border-gray-300 dark:border-zinc-700"}`}>
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
              {ageRanges.map((range) => (
                <SelectItem key={range.value} value={range.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.ageRange && <p className="text-red-600 dark:text-red-400 text-sm">{errors.ageRange}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="incomeLevel" className="text-sm font-medium text-gray-700 dark:text-white">
            Income Level *
          </Label>
          <Select value={formData.incomeLevel} onValueChange={(value) => onChange("incomeLevel", value)}>
            <SelectTrigger className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.incomeLevel ? "border-red-500" : "border-gray-300 dark:border-zinc-700"}`}>
              <SelectValue placeholder="Select income level" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
              {incomeLevels.map((level) => (
                <SelectItem key={level.value} value={level.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.incomeLevel && <p className="text-red-600 dark:text-red-400 text-sm">{errors.incomeLevel}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-white">
          Primary Location *
        </Label>
        <Input
          id="location"
          placeholder="e.g., United States, Europe, Global, San Francisco Bay Area"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.location ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
        />
        {errors.location && <p className="text-red-600 dark:text-red-400 text-sm">{errors.location}</p>}
        <p className="text-sm text-gray-500 dark:text-gray-400">Specify the geographic region where most of your customers are located</p>
      </div>
    </div>
  )
}

// Pain Points Step Component
interface PainPointsStepProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Partial<FormData>
}

function PainPointsStep({ formData, onChange, errors }: PainPointsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Pain Points & Motivations</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Describe the challenges your customers face and what motivates them</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="challenges" className="text-sm font-medium text-gray-700 dark:text-white">
            Key Challenges & Pain Points *
          </Label>
          <Textarea
            id="challenges"
            placeholder="Describe the main problems, frustrations, or challenges your target customers face. What keeps them up at night? What obstacles prevent them from achieving their goals?"
            value={formData.challenges}
            onChange={(e) => onChange("challenges", e.target.value)}
            className={`min-h-[120px] bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${errors.challenges ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
          />
          {errors.challenges && <p className="text-red-600 dark:text-red-400 text-sm">{errors.challenges}</p>}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Be specific about the problems they encounter in their daily work or life
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals" className="text-sm font-medium text-gray-700 dark:text-white">
            Goals & Motivations *
          </Label>
          <Textarea
            id="goals"
            placeholder="What are your customers trying to achieve? What success looks like for them? What motivates their decisions and drives their behavior?"
            value={formData.goals}
            onChange={(e) => onChange("goals", e.target.value)}
            className={`min-h-[120px] bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${errors.goals ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
          />
          {errors.goals && <p className="text-red-600 dark:text-red-400 text-sm">{errors.goals}</p>}
          <p className="text-sm text-gray-500 dark:text-gray-400">Focus on both professional objectives and personal motivations</p>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">💡 Tips for Better Results</h4>
        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
          <li>• Be specific about real problems, not generic statements</li>
          <li>• Include both emotional and practical motivations</li>
          <li>• Think about what triggers their need for a solution</li>
          <li>• Consider their decision-making process and criteria</li>
        </ul>
      </div>
    </div>
  )
}

// Demographics Chart Component
interface DemographicsChartProps {
  persona: PersonaResponse["persona"]
}

const COLORS = ["#ea580c", "#fb923c", "#fed7aa", "#ffedd5"]

function DemographicsChart({ persona }: DemographicsChartProps) {
  const businessData = [
    { category: "Type", value: persona.businessContext.type },
    { category: "Industry", value: persona.businessContext.industry },
    { category: "Size", value: persona.businessContext.size },
  ]

  return (
    <div className="space-y-6">
      {/* Demographics Overview */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Target Demographics</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Age Range</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-600"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{persona.demographics.age}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Income Level</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{persona.demographics.income}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-300"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{persona.demographics.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Context Chart */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Business Profile</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={businessData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} stroke="#6b7280" />
              <YAxis hide />
              <Tooltip
                formatter={(value) => [value, "Value"]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="category" fill="#ea580c" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Persona Strength Indicator */}
      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Persona Confidence</span>
          <span className="text-sm text-orange-600 dark:text-orange-400">High</span>
        </div>
        <div className="w-full bg-orange-200 dark:bg-orange-700 rounded-full h-2">
          <div className="bg-orange-600 h-2 rounded-full" style={{ width: "85%" }}></div>
        </div>
        <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Based on comprehensive input data</p>
      </div>
    </div>
  )
}

// Persona Results Component
interface PersonaResultsProps {
  response: PersonaResponse
  onReset: () => void
}

function PersonaResults({ response, onReset }: PersonaResultsProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Helper function to extract meaningful content from malformed webhook response
  const extractWebhookContent = (webhookData: any): string | null => {
    if (!webhookData) return null

    try {
      // Try to find the text content in the nested structure
      const findTextContent = (obj: any): string | null => {
        if (typeof obj === "string") return obj
        if (Array.isArray(obj)) {
          for (const item of obj) {
            if (item?.text && typeof item.text === "string") {
              return item.text
            }
            const found = findTextContent(item)
            if (found) return found
          }
        }
        if (typeof obj === "object" && obj !== null) {
          for (const value of Object.values(obj)) {
            const found = findTextContent(value)
            if (found) return found
          }
        }
        return null
      }

      return findTextContent(webhookData)
    } catch (error) {
      console.error("Error extracting webhook content:", error)
      return null
    }
  }

  // Helper function to convert basic markdown to HTML
  const parseMarkdown = (text: string): string => {
    if (!text) return ""

    return (
      text
        // Convert **bold** to <strong>bold</strong>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Convert *italic* to <em>italic</em>
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Convert line breaks to <br>
        .replace(/\n/g, "<br>")
    )
  }

  const downloadJSON = () => {
    const dataStr = JSON.stringify(response, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${response.persona.name.replace(/\s+/g, "_")}_persona.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const downloadText = () => {
    setIsGeneratingPDF(true)

    try {
      // Create a formatted text version instead of PDF
      let textContent = `Customer Persona Report\n${"=".repeat(25)}\n\n`
      
      textContent += `Persona Name: ${response.persona.name}\n\n`
      textContent += `Summary:\n${response.persona.summary}\n\n`
      
      textContent += `Demographics:\n`
      textContent += `- Age: ${response.persona.demographics.age}\n`
      textContent += `- Income: ${response.persona.demographics.income}\n`
      textContent += `- Location: ${response.persona.demographics.location}\n\n`
      
      textContent += `Business Context:\n`
      textContent += `- Business Type: ${response.persona.businessContext.type}\n`
      textContent += `- Industry: ${response.persona.businessContext.industry}\n`
      textContent += `- Company Size: ${response.persona.businessContext.size}\n`
      textContent += `- Market Segment: ${response.persona.businessContext.segment}\n\n`
      
      textContent += `Key Challenges:\n`
      response.persona.psychographics.challenges.forEach((challenge, index) => {
        textContent += `${index + 1}. ${challenge}\n`
      })
      textContent += `\n`
      
      textContent += `Goals & Motivations:\n`
      response.persona.psychographics.goals.forEach((goal, index) => {
        textContent += `${index + 1}. ${goal}\n`
      })
      textContent += `\n`
      
      textContent += `Core Motivations:\n`
      response.persona.psychographics.motivations.forEach((motivation, index) => {
        textContent += `${index + 1}. ${motivation}\n`
      })
      textContent += `\n`
      
      textContent += `Key Findings:\n`
      response.insights.keyFindings.forEach((finding, index) => {
        textContent += `${index + 1}. ${finding}\n`
      })
      textContent += `\n`
      
      textContent += `Recommendations:\n`
      response.insights.recommendations.forEach((recommendation, index) => {
        textContent += `${index + 1}. ${recommendation}\n`
      })

      // Add webhook response section (only if there's meaningful content)
      const webhookContent = extractWebhookContent(response.webhookResponse)
      if (webhookContent) {
        // Strip markdown for text file
        const plainTextContent = webhookContent
          .replace(/\*\*(.*?)\*\*/g, "$1") // Remove **bold**
          .replace(/\*(.*?)\*/g, "$1") // Remove *italic*
          .replace(/<[^>]*>/g, "") // Remove any HTML tags

        textContent += `\nAdditional Insights:\n${plainTextContent}\n`
      }

      // Create download
      const dataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", `${response.persona.name.replace(/\s+/g, "_")}_persona.txt`)
      linkElement.click()
    } catch (error) {
      console.error("Error generating text file:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const webhookContent = extractWebhookContent(response.webhookResponse)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Your Customer Persona</h1>
          <p className="text-gray-600 dark:text-gray-400">Generated persona based on your inputs</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={downloadText}
            disabled={isGeneratingPDF}
            className="bg-orange-600 hover:bg-orange-700 dark:hover:bg-[#d45616] text-white"
          >
            {isGeneratingPDF ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating File...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </>
            )}
          </Button>
          <Button
            onClick={downloadJSON}
            variant="outline"
            className="border-orange-200 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download JSON
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Create New Persona
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Persona Card */}
          <div className="lg:col-span-2">
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{response.persona.name}</CardTitle>
                    <CardDescription className="text-orange-100">
                      {response.persona.businessContext.type} • {response.persona.businessContext.industry}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Persona Summary</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{response.persona.summary}</p>
                  </div>

                  <Separator className="border-gray-200 dark:border-gray-700" />

                  {/* Demographics */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Demographics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                        <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">Age</p>
                        <p className="text-gray-900 dark:text-white">{response.persona.demographics.age}</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                        <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">Income</p>
                        <p className="text-gray-900 dark:text-white">{response.persona.demographics.income}</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                        <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">Location</p>
                        <p className="text-gray-900 dark:text-white">{response.persona.demographics.location}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="border-gray-200 dark:border-gray-700" />

                  {/* Business Context */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Business Context</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Company Size</p>
                        <p className="text-gray-900 dark:text-white font-medium">{response.persona.businessContext.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Market Segment</p>
                        <p className="text-gray-900 dark:text-white font-medium">{response.persona.businessContext.segment}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="border-gray-200 dark:border-gray-700" />

                  {/* Challenges */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Key Challenges</h3>
                    <ul className="space-y-2">
                      {response.persona.psychographics.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="border-gray-200 dark:border-gray-700" />

                  {/* Goals */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Goals & Objectives</h3>
                    <ul className="space-y-2">
                      {response.persona.psychographics.goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="border-gray-200 dark:border-gray-700" />

                  {/* Motivations */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Core Motivations</h3>
                    <div className="flex flex-wrap gap-2">
                      {response.persona.psychographics.motivations.map((motivation, index) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                          {motivation}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Additional Insights from Webhook */}
                  {webhookContent && (
                    <>
                      <Separator className="border-gray-200 dark:border-gray-700" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Additional Insights</h3>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
                          <div
                            className="text-gray-700 dark:text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(webhookContent) }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demographics Chart */}
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-300">
                  <BarChart3 className="w-5 h-5" />
                  Demographics Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DemographicsChart persona={response.persona} />
              </CardContent>
            </Card>

            {/* Key Findings */}
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-300">Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {response.insights.keyFindings.map((finding, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 border-l-2 border-orange-300 dark:border-orange-600 pl-3">
                      {finding}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-300">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {response.insights.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 border-l-2 border-green-300 dark:border-green-600 pl-3">
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// API Functions
async function generatePersona(formData: FormData): Promise<PersonaResponse> {
  try {
    // Send data to your webhook
    const webhookResponse = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/CLI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!webhookResponse.ok) {
      throw new Error(`Webhook request failed: ${webhookResponse.status} ${webhookResponse.statusText}`)
    }

    const webhookData = await webhookResponse.json()

    // If the webhook returns the expected persona format, use it directly
    if (webhookData.persona) {
      return webhookData
    }

    // Otherwise, transform the webhook response or generate a fallback persona
    const persona = {
      persona: {
        name: formData.personaName || webhookData.name || generatePersonaName(formData),
        summary: webhookData.summary || generatePersonaSummary(formData),
        demographics: {
          age: formData.ageRange,
          income: formData.incomeLevel,
          location: formData.location,
        },
        psychographics: {
          challenges: webhookData.challenges || generateChallenges(formData.challenges),
          goals: webhookData.goals || generateGoals(formData.goals),
          motivations: webhookData.motivations || generateMotivations(formData),
        },
        businessContext: {
          type: formData.businessType,
          industry: formData.industry,
          size: formData.companySize,
          segment: formData.segment,
        },
      },
      insights: {
        keyFindings: webhookData.keyFindings || generateKeyFindings(formData),
        recommendations: webhookData.recommendations || generateRecommendations(formData),
      },
      // Include the raw webhook response for debugging
      webhookResponse: webhookData,
    }

    return persona
  } catch (error) {
    console.error("Error calling webhook:", error)
    throw new Error(`Failed to generate persona: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Fallback functions in case webhook doesn't return expected format
function generatePersonaName(formData: FormData): string {
  const firstNames = ["Alex", "Sarah", "Michael", "Jennifer", "David", "Lisa", "Robert", "Emily", "James", "Maria"]
  const lastNames = [
    "Johnson",
    "Williams",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
  ]

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  return `${firstName} ${lastName}`
}

function generatePersonaSummary(formData: FormData): string {
  const ageGroup = formData.ageRange.includes("25-34")
    ? "young professional"
    : formData.ageRange.includes("35-44")
      ? "experienced professional"
      : formData.ageRange.includes("45-54")
        ? "senior professional"
        : "professional"

  return `A ${ageGroup} working in the ${formData.industry} industry, focused on ${formData.segment.toLowerCase()}. They are motivated by efficiency and growth, seeking solutions that can help them overcome daily challenges while achieving their strategic objectives. Based in ${formData.location}, they represent the typical decision-maker in ${formData.companySize} organizations.`
}

function generateChallenges(challengesText: string): string[] {
  const challenges = challengesText.split(/[.!?]+/).filter((c) => c.trim().length > 10)

  if (challenges.length === 0) {
    return [
      "Limited time to evaluate new solutions",
      "Budget constraints affecting decision-making",
      "Difficulty measuring ROI on investments",
    ]
  }

  return challenges.slice(0, 4).map((c) => c.trim())
}

function generateGoals(goalsText: string): string[] {
  const goals = goalsText.split(/[.!?]+/).filter((g) => g.trim().length > 10)

  if (goals.length === 0) {
    return [
      "Increase operational efficiency",
      "Reduce costs while maintaining quality",
      "Improve team productivity and satisfaction",
    ]
  }

  return goals.slice(0, 4).map((g) => g.trim())
}

function generateMotivations(formData: FormData): string[] {
  const motivations = [
    "Professional growth",
    "Team success",
    "Operational excellence",
    "Innovation adoption",
    "Cost optimization",
    "Time efficiency",
    "Quality improvement",
    "Competitive advantage",
  ]

  return motivations.slice(0, Math.floor(Math.random() * 3) + 3)
}

function generateKeyFindings(formData: FormData): string[] {
  return [
    `Primary focus on ${formData.industry} sector with ${formData.companySize} company preference`,
    `Strong emphasis on solving challenges related to ${formData.challenges.split(" ").slice(0, 5).join(" ")}...`,
    `Geographic concentration in ${formData.location} market`,
    `Income level of ${formData.incomeLevel} indicates strong purchasing power`,
  ]
}

function generateRecommendations(formData: FormData): string[] {
  return [
    `Target marketing campaigns specifically to ${formData.segment} in ${formData.industry}`,
    `Develop messaging that addresses their key challenges around efficiency and growth`,
    `Focus on ROI and measurable outcomes in sales presentations`,
    `Consider regional marketing strategies for ${formData.location} market`,
    `Create case studies featuring similar ${formData.companySize} companies`,
  ]
}

// Main Component
export default function PersonaGenerator() {
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    industry: "",
    companySize: "",
    segment: "",
    ageRange: "",
    incomeLevel: "",
    location: "",
    personaName: "",
    challenges: "",
    goals: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [personaResponse, setPersonaResponse] = useState<PersonaResponse | null>(null)
  const [submitError, setSubmitError] = useState<string>("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Load saved progress from localStorage and scroll to top
  useEffect(() => {
    const savedData = localStorage.getItem("persona-generator-data")

    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("persona-generator-data", JSON.stringify(formData))
  }, [formData])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Business Type validation
    if (!formData.businessType) newErrors.businessType = "Business type is required"

    // Target Market validation
    if (!formData.industry) newErrors.industry = "Industry is required"
    if (!formData.companySize) newErrors.companySize = "Company size is required"
    if (!formData.segment) newErrors.segment = "Market segment is required"

    // Demographics validation
    if (!formData.ageRange) newErrors.ageRange = "Age range is required"
    if (!formData.incomeLevel) newErrors.incomeLevel = "Income level is required"
    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.personaName.trim()) newErrors.personaName = "Persona name is required"

    // Pain Points validation
    if (!formData.challenges.trim()) newErrors.challenges = "Challenges are required"
    if (!formData.goals.trim()) newErrors.goals = "Goals are required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitForm = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const result = await generatePersona(formData)
      setPersonaResponse(result)
      setSubmitSuccess(true)

      // Clear saved progress after successful submission
      localStorage.removeItem("persona-generator-data")
      
      // Scroll to top when results are displayed
      window.scrollTo(0, 0)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      businessType: "",
      industry: "",
      companySize: "",
      segment: "",
      ageRange: "",
      incomeLevel: "",
      location: "",
      personaName: "",
      challenges: "",
      goals: "",
    })
    setPersonaResponse(null)
    setSubmitSuccess(false)
    setSubmitError("")
    setErrors({})
    localStorage.removeItem("persona-generator-data")
    
    // Scroll to top when form is reset
    window.scrollTo(0, 0)
  }

  if (personaResponse && submitSuccess) {
    return <PersonaResults response={personaResponse} onReset={resetForm} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Customer Persona Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Create detailed customer personas by filling out all sections below</p>
        </div>

        {/* Form Sections */}
        <div className="space-y-8">
          {/* Business Type Section */}
          <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300">1. Business Type</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Select your business category</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <BusinessTypeStep
                value={formData.businessType}
                onChange={(value) => updateFormData("businessType", value)}
                error={errors.businessType}
              />
            </CardContent>
          </Card>

          {/* Target Market Section */}
          <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300">2. Target Market</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Define your market focus</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <TargetMarketStep formData={formData} onChange={updateFormData} errors={errors} />
            </CardContent>
          </Card>

          {/* Demographics Section */}
          <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300">3. Demographics</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Customer characteristics</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <DemographicsStep formData={formData} onChange={updateFormData} errors={errors} />
            </CardContent>
          </Card>

          {/* Pain Points Section */}
          <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300">4. Pain Points & Motivations</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Challenges and motivations</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <PainPointsStep formData={formData} onChange={updateFormData} errors={errors} />
            </CardContent>
          </Card>

          {/* Error Alert */}
          {submitError && (
            <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <AlertDescription className="text-red-800 dark:text-red-100">{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Submit Section */}
          <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
            <CardContent className="p-6">
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Form
                </Button>

                <Button
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700 dark:hover:bg-[#d45616] text-white px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Persona...
                    </>
                  ) : (
                    "Generate Persona"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
