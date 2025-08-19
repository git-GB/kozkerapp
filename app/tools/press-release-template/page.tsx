"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, CheckCircle, XCircle, FileText, Copy, Download } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormData {
  eventNews: string
  companyName: string
  industry: string
  dateOfRelease: string
  location: string
  boilerplate: string
  mediaContactName: string
  mediaContactEmail: string
}

interface ApiResponse {
  success: boolean
  message?: string
  pressRelease?: string
  webhookResponse?: any
  error?: string
}

export default function PressReleaseGenerator() {
  const [formData, setFormData] = useState<FormData>({
    eventNews: "",
    companyName: "",
    industry: "",
    dateOfRelease: "",
    location: "",
    boilerplate: "",
    mediaContactName: "",
    mediaContactEmail: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [showResponse, setShowResponse] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResponse(null)
    setShowResponse(false)

    try {
      const res = await fetch("/api/generate-press-release", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      setResponse(data)
      setShowResponse(true)
    } catch (error) {
      setResponse({
        success: false,
        error: "Failed to generate press release. Please try again.",
      })
      setShowResponse(true)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      eventNews: "",
      companyName: "",
      industry: "",
      dateOfRelease: "",
      location: "",
      boilerplate: "",
      mediaContactName: "",
      mediaContactEmail: "",
    })
    setResponse(null)
    setShowResponse(false)
  }

  const parseN8nResponse = (webhookResponse: any): string => {
    try {
      // Handle string response that might contain n8n-output tags
      if (typeof webhookResponse === "string") {
        // Check if it contains n8n-output tags
        const n8nMatch = webhookResponse.match(/<n8n-output>\s*(.*?)\s*<\/n8n-output>/s)
        if (n8nMatch) {
          try {
            const jsonContent = JSON.parse(n8nMatch[1])
            if (Array.isArray(jsonContent) && jsonContent[0]?.output) {
              return extractMarkdownContent(jsonContent[0].output)
            }
          } catch {
            // If parsing fails, return the original content
          }
        }
        return webhookResponse
      }

      // Handle array response (direct n8n format)
      if (Array.isArray(webhookResponse) && webhookResponse[0]?.output) {
        return extractMarkdownContent(webhookResponse[0].output)
      }

      // Handle object response
      if (typeof webhookResponse === "object" && webhookResponse !== null) {
        if (webhookResponse.output) {
          return extractMarkdownContent(webhookResponse.output)
        }
        if (webhookResponse.pressRelease) {
          return extractMarkdownContent(webhookResponse.pressRelease)
        }
        if (webhookResponse.content) {
          return extractMarkdownContent(webhookResponse.content)
        }
        if (webhookResponse.result) {
          return extractMarkdownContent(webhookResponse.result)
        }
        if (webhookResponse.message) {
          return extractMarkdownContent(webhookResponse.message)
        }
      }

      return JSON.stringify(webhookResponse, null, 2)
    } catch (error) {
      console.error("Error parsing n8n response:", error)
      return String(webhookResponse)
    }
  }

  const extractMarkdownContent = (content: string): string => {
    // Remove markdown code block wrapper if present
    const markdownMatch = content.match(/```markdown\s*([\s\S]*?)\s*```/)
    if (markdownMatch) {
      return markdownMatch[1].trim()
    }
    return content
  }

  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let currentParagraph: string[] = []

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim()
        if (paragraphText) {
          elements.push(
            <p key={elements.length} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-inter">
              {renderInlineFormatting(paragraphText)}
            </p>
          )
        }
        currentParagraph = []
      }
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      if (!trimmedLine) {
        flushParagraph()
        return
      }

      // Handle headings
      if (trimmedLine.startsWith('# ')) {
        flushParagraph()
        const headingText = trimmedLine.substring(2).trim()
        elements.push(
          <h1 key={elements.length} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-poppins">
            {renderInlineFormatting(headingText)}
          </h1>
        )
      } else if (trimmedLine.startsWith('## ')) {
        flushParagraph()
        const headingText = trimmedLine.substring(3).trim()
        elements.push(
          <h2 key={elements.length} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 font-poppins">
            {renderInlineFormatting(headingText)}
          </h2>
        )
      } else if (trimmedLine.startsWith('### ')) {
        flushParagraph()
        const headingText = trimmedLine.substring(4).trim()
        elements.push(
          <h3 key={elements.length} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5 font-poppins">
            {renderInlineFormatting(headingText)}
          </h3>
        )
      } else {
        // Regular content - add to current paragraph
        currentParagraph.push(trimmedLine)
      }
    })

    // Flush any remaining paragraph
    flushParagraph()

    return elements
  }

  const renderInlineFormatting = (text: string) => {
    // Handle bold text (**text** or __text__)
    const parts = text.split(/(\*\*.*?\*\*|__.*?__)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-gray-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        )
      } else if (part.startsWith('__') && part.endsWith('__')) {
        return (
          <strong key={index} className="font-semibold text-gray-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadAsText = (content: string, filename: string = "press-release.txt") => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getParsedContent = () => {
    if (!response?.webhookResponse) return ""
    return parseN8nResponse(response.webhookResponse)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-25 dark:from-zinc-900 dark:to-zinc-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-orange-500 shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins">Press Release Generator</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-inter">
              Transform your news and events into professional press releases with AI assistance
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <Card className="bg-white dark:bg-[#111111] shadow-lg border border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-800">
              <CardTitle className="text-gray-900 dark:text-white text-2xl font-poppins font-semibold">Event Details</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-inter">
                Fill in the details to generate your press release
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventNews" className="text-gray-900 dark:text-white font-medium font-inter">
                    Event/News *
                  </Label>
                  <Textarea
                    id="eventNews"
                    name="eventNews"
                    value={formData.eventNews}
                    onChange={handleInputChange}
                    placeholder="Describe your news or event..."
                    required
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 min-h-[100px] resize-none font-inter"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-900 dark:text-white font-medium font-inter">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      required
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-gray-900 dark:text-white font-medium font-inter">
                      Industry *
                    </Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g., Technology, Healthcare"
                      required
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfRelease" className="text-gray-900 dark:text-white font-medium font-inter">
                      Date of Release *
                    </Label>
                    <Input
                      id="dateOfRelease"
                      name="dateOfRelease"
                      type="date"
                      value={formData.dateOfRelease}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-900 dark:text-white font-medium font-inter">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State/Country"
                      required
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="boilerplate" className="text-gray-900 dark:text-white font-medium font-inter">
                    Company Description/Boilerplate *
                  </Label>
                  <Textarea
                    id="boilerplate"
                    name="boilerplate"
                    value={formData.boilerplate}
                    onChange={handleInputChange}
                    placeholder="Brief description of your company..."
                    required
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 min-h-[80px] resize-none font-inter"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mediaContactName" className="text-gray-900 dark:text-white font-medium font-inter">
                      Media Contact Name & Designation *
                    </Label>
                    <Input
                      id="mediaContactName"
                      name="mediaContactName"
                      value={formData.mediaContactName}
                      onChange={handleInputChange}
                      placeholder="John Doe, PR Manager"
                      required
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mediaContactEmail" className="text-gray-900 dark:text-white font-medium font-inter">
                      Media Contact Email *
                    </Label>
                    <Input
                      id="mediaContactEmail"
                      name="mediaContactEmail"
                      type="email"
                      value={formData.mediaContactEmail}
                      onChange={handleInputChange}
                      placeholder="contact@company.com"
                      required
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-inter"
                    style={{ fontWeight: 600 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Generate Press Release
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 py-4 px-4 rounded-lg font-inter bg-transparent dark:bg-transparent"
                    style={{ fontWeight: 600 }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Response Section */}
          <div className="space-y-6">
            {showResponse && response && (
              <Card className="bg-white dark:bg-[#111111] shadow-lg border border-gray-200 dark:border-gray-800 animate-in slide-in-from-right duration-700">
                <CardHeader
                  className={`${response.success ? "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800"} border-b`}
                >
                  <CardTitle className="text-gray-900 dark:text-white text-2xl font-poppins font-semibold flex items-center gap-2">
                    {response.success ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        Press Release Generated
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-red-500" />
                        Generation Failed
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {response.success ? (
                    <div className="space-y-6">
                      {response.message && (
                        <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertDescription className="text-green-800 dark:text-green-100 font-inter">{response.message}</AlertDescription>
                        </Alert>
                      )}

                      {/* Display formatted press release */}
                      {response.webhookResponse && (
                        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-gray-900 dark:text-white font-semibold font-poppins text-lg">
                              Generated Press Release:
                            </h3>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => copyToClipboard(getParsedContent())}
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-inter"
                              >
                                {copied ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => downloadAsText(getParsedContent(), `press-release-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}.txt`)}
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-inter"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                          
                          {/* Formatted content display */}
                          <div className="bg-white dark:bg-zinc-900 rounded-md p-6 border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                            <div className="prose prose-gray max-w-none">
                              {renderMarkdownContent(getParsedContent())}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Alert className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-800 dark:text-red-100 font-inter">
                        {response.error || "An error occurred while generating the press release."}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Instructions Card */}
            <Card className="bg-white dark:bg-[#111111] shadow-lg border border-gray-200 dark:border-gray-800">
              <CardHeader className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-gray-900 dark:text-white text-xl font-poppins font-semibold">How it works</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-gray-600 dark:text-gray-400 space-y-3 font-inter">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                      1
                    </div>
                    <p>Fill in all the required fields with your event details</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                      2
                    </div>
                    <p>Our AI will generate a professional press release</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                      3
                    </div>
                    <p>Review and use the generated content for your media outreach</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                      4
                    </div>
                    <p>Copy or download the formatted press release</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
