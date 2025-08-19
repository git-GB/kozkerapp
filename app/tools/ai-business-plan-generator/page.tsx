"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Sparkles, CheckCircle, XCircle, Download } from "lucide-react"
import { ContentLoadingScreen } from "@/components/loading-screen"

interface FormData {
  name: string
  email: string
  businessIdea: string
  targetMarketSize: string
  industrySector: string
  businessModel: string
  geographicFocus: string
}

interface WebhookResponse {
  output?: string
  success?: boolean
  message?: string
  [key: string]: any
}

// Markdown renderer
const SimpleMarkdownRenderer = ({ content }: { content: string }) => {
  const parseMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let currentParagraph: string[] = []
    let listItems: string[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300 font-inter">
            {parseInlineMarkdown(currentParagraph.join(" "))}
          </p>
        )
        currentParagraph = []
      }
    }

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="mb-4 list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 font-inter">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        )
        listItems = []
      }
    }

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre key={elements.length} className="mb-4 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-100">{codeBlockContent.join("\n")}</code>
          </pre>
        )
        codeBlockContent = []
      }
    }

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith("```")) {
        inCodeBlock ? flushCodeBlock() : (flushParagraph(), flushList())
        inCodeBlock = !inCodeBlock
        return
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        return
      }

      if (trimmed.startsWith("# ")) {
        flushParagraph()
        flushList()
        elements.push(<h1 key={elements.length} className="text-3xl font-bold mb-4 text-gray-900 dark:text-white font-poppins">{trimmed.slice(2)}</h1>)
      } else if (trimmed.startsWith("## ")) {
        flushParagraph()
        flushList()
        elements.push(<h2 key={elements.length} className="text-2xl font-bold mb-3 text-gray-900 dark:text-white font-poppins">{trimmed.slice(3)}</h2>)
      } else if (trimmed.startsWith("### ")) {
        flushParagraph()
        flushList()
        elements.push(<h3 key={elements.length} className="text-xl font-bold mb-2 text-gray-900 dark:text-white font-poppins">{trimmed.slice(4)}</h3>)
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph()
        listItems.push(trimmed.slice(2))
      } else if (trimmed === "") {
        flushParagraph()
        flushList()
      } else {
        flushList()
        currentParagraph.push(trimmed)
      }
    })

    flushParagraph()
    flushList()
    flushCodeBlock()

    return elements
  }

  const parseInlineMarkdown = (text: string) => {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-zinc-800 px-1 rounded text-sm">$1</code>')
        }}
      />
    )
  }

  return <div className="prose prose-gray dark:prose-invert max-w-none">{parseMarkdown(content)}</div>
}
export default function BusinessPlanGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessIdea: "",
    targetMarketSize: "",
    industrySector: "",
    businessModel: "",
    geographicFocus: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return <ContentLoadingScreen />
  }

  const extractBusinessPlanContent = (data: any): string | null => {
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0]
      return firstItem.output || firstItem.message || null
    }

    if (data && typeof data === "object") {
      return data.output || data.message || null
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setResponse(null)

    try {
      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/biz-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business_idea: formData.businessIdea,
          target_market_size: formData.targetMarketSize,
          industry_sector: formData.industrySector,
          business_model: formData.businessModel,
          geographic_focus: formData.geographicFocus,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const businessPlanContent = extractBusinessPlanContent(data)

      if (businessPlanContent) {
        setResponse({ output: businessPlanContent })
        setSuccess(true)
      } else {
        setError("No business plan content found in the response")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating your business plan")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  const downloadBusinessPlan = () => {
    if (response?.output) {
      const element = document.createElement("a")
      const file = new Blob([response.output], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `${formData.name.replace(/\s+/g, "_")}_business_plan.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0c] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-zinc-700 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 animate-pulse text-orange-500" />
              <h1 className="text-4xl md:text-5xl font-bold font-poppins">AI Business Plan Generator</h1>
              <Sparkles className="h-8 w-8 animate-pulse text-orange-500" />
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400 font-inter">
              Transform your business idea into a comprehensive plan with the power of AI
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">
                Tell Us About Your Business
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-inter">
                Fill out the form below to generate your personalized business plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessIdea" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                    Business Idea (Short Description)
                  </Label>
                  <Textarea
                    id="businessIdea"
                    value={formData.businessIdea}
                    onChange={(e) => handleInputChange("businessIdea", e.target.value)}
                    placeholder="Describe your business idea in a few sentences..."
                    className="min-h-[100px] bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetMarketSize" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                      Target Market Size
                    </Label>
                    <Input
                      id="targetMarketSize"
                      type="text"
                      value={formData.targetMarketSize}
                      onChange={(e) => handleInputChange("targetMarketSize", e.target.value)}
                      placeholder="e.g., 10M users, $5B market"
                      className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industrySector" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                      Industry/Sector
                    </Label>
                    <Input
                      id="industrySector"
                      type="text"
                      value={formData.industrySector}
                      onChange={(e) => handleInputChange("industrySector", e.target.value)}
                      placeholder="e.g., Technology, Healthcare"
                      className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessModel" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                      Business Model
                    </Label>
                    <Input
                      id="businessModel"
                      type="text"
                      value={formData.businessModel}
                      onChange={(e) => handleInputChange("businessModel", e.target.value)}
                      placeholder="Freemium, Subscription, One-time"
                      className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="geographicFocus" className="font-medium text-gray-800 dark:text-gray-200 font-inter">
                      Geographic Focus
                    </Label>
                    <Input
                      id="geographicFocus"
                      type="text"
                      value={formData.geographicFocus}
                      onChange={(e) => handleInputChange("geographicFocus", e.target.value)}
                      placeholder="Global, US, Europe, etc."
                      className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isLoading}
                  className="w-full text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    backgroundColor: '#FF7435',
                    padding: '16px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>Generating Your Business Plan...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>Generate Business Plan</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <div className="space-y-6">
            {error && (
              <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-in slide-in-from-right duration-500">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-700 dark:text-red-300 font-inter">{error}</AlertDescription>
              </Alert>
            )}

            {success && !error && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 animate-in slide-in-from-right duration-500">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-700 dark:text-green-300 font-inter">
                  Business plan generated successfully!
                </AlertDescription>
              </Alert>
            )}

            {response?.output && (
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg animate-in slide-in-from-right duration-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-orange-500" />
                      <CardTitle className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">
                        Your AI-Generated Business Plan
                      </CardTitle>
                    </div>
                    <Button
                      onClick={downloadBusinessPlan}
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-orange-500 text-orange-500 dark:text-orange-400 dark:border-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 font-inter">
                    Here's your personalized business plan based on your inputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg p-6 border border-gray-200 dark:border-zinc-700 max-h-[600px] overflow-y-auto bg-gray-50 dark:bg-zinc-800">
                    <SimpleMarkdownRenderer content={response.output} />
                  </div>
                </CardContent>
              </Card>
            )}

            {!response && !isLoading && (
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkles className="h-16 w-16 mb-4 animate-pulse text-orange-500" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-poppins">
                    Ready to Generate
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-inter">
                    Fill out the form and click generate to see your AI-powered business plan appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
