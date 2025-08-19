"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2, FileText, Download, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { ContentLoadingScreen } from "@/components/loading-screen"

interface FormData {
  name: string
  cost: string
  email: string
  scope: string
  problem: string
  website: string
  solution: string
  howSoon: string
  companyName: string
}

interface WebhookResponse {
  [key: string]: any
}

export default function ProposalGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cost: "",
    email: "",
    scope: "",
    problem: "",
    website: "",
    solution: "",
    howSoon: "",
    companyName: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [webhookResponse, setWebhookResponse] = useState<WebhookResponse | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const extractMarkdownContent = (response: any): string | null => {
    if (Array.isArray(response) && response.length > 0 && response[0].markdown) return response[0].markdown
    if (response?.markdown) return response.markdown
    for (const key in response) {
      if (typeof response[key] === "string" && response[key].includes("# Business Proposal")) {
        return response[key]
      }
    }
    return null
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadAsMarkdown = (content: string) => {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `proposal-${formData.companyName || "client"}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus("idle")
    setErrorMessage("")
    setWebhookResponse(null)

    try {
      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/fdf6b12c-513e-4fd8-a13c-b3049fc958f7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const responseData = await response.json()
        setWebhookResponse(responseData)
        setSubmitStatus("success")
        setFormData({
          name: "",
          cost: "",
          email: "",
          scope: "",
          problem: "",
          website: "",
          solution: "",
          howSoon: "",
          companyName: "",
        })
      } else {
        const errorData = await response.text()
        throw new Error(`Failed to submit proposal: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <ContentLoadingScreen />

  const markdownContent = webhookResponse ? extractMarkdownContent(webhookResponse) : null

  const preprocessMarkdown = (content: string): string => {
    return content.replace(/\*\*(.*?)\*\*/g, "**$1**").replace(/\*(.*?)\*/g, "*$1*").trim()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 py-8 px-6 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-gray-800 dark:to-gray-700 backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins mb-4">Client Proposal Generator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-inter max-w-2xl mx-auto">
            Fill out the form below to generate your professional client proposal instantly
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900 font-poppins">Proposal Details</CardTitle>
              <CardDescription className="text-gray-600 font-inter">
                Enter your project information below
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                      Cost *
                    </Label>
                    <Input
                      id="cost"
                      name="cost"
                      type="text"
                      value={formData.cost}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                      placeholder="Enter project cost"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                      Website *
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                      placeholder="Enter website URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howSoon" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                      How Soon? *
                    </Label>
                    <Input
                      id="howSoon"
                      name="howSoon"
                      type="text"
                      value={formData.howSoon}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 font-inter"
                      placeholder="Project timeline"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                    Scope *
                  </Label>
                  <Textarea
                    id="scope"
                    name="scope"
                    value={formData.scope}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 resize-none font-inter"
                    placeholder="Describe the project scope"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                    Problem *
                  </Label>
                  <Textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 resize-none font-inter"
                    placeholder="Describe the problem to be solved"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution" className="text-gray-900 dark:text-gray-100 font-medium font-inter">
                    Solution *
                  </Label>
                  <Textarea
                    id="solution"
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 resize-none font-inter"
                    placeholder="Describe your proposed solution"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-inter"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Proposal...
                    </>
                  ) : (
                    "Generate Proposal"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response Section */}
          <div className="space-y-6">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <Card className="bg-green-50 border-green-200 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800 font-poppins">
                      Proposal Generated Successfully!
                    </h3>
                  </div>
                  <p className="text-green-700 font-inter">
                    Your professional proposal has been generated and is ready for review.
                  </p>
                </CardContent>
              </Card>
            )}

            {submitStatus === "error" && (
              <Card className="bg-red-50 border-red-200 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800 font-poppins">Generation Failed</h3>
                  </div>
                  <p className="text-red-700 font-inter">
                    {errorMessage || "Failed to generate proposal. Please try again."}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Generated Proposal Display */}
            {markdownContent && (
              <Card className="bg-white border-gray-200 shadow-lg animate-in fade-in-0 slide-in-from-right-4 duration-700">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-orange-500" />
                      <CardTitle className="text-xl font-bold text-gray-900 font-poppins">Generated Proposal</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(markdownContent)}
                        className="text-gray-600 hover:text-gray-900 border-gray-300 hover:border-orange-300 hover:bg-orange-50"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadAsMarkdown(markdownContent)}
                        className="text-gray-600 hover:text-gray-900 border-gray-300 hover:border-orange-300 hover:bg-orange-50"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 font-inter">
                    Your professional business proposal is ready for presentation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-orange-25 to-orange-50/30 max-h-[800px] overflow-y-auto">
                    <div className="p-8 prose prose-gray max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-8 pb-4 border-b-2 border-orange-200 text-center">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-bold text-gray-900 font-poppins mt-10 mb-6 pb-2 border-b border-gray-300 bg-gradient-to-r from-orange-50 to-transparent px-4 py-3 rounded-lg">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-gray-900 font-poppins mt-8 mb-4 text-orange-700">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="text-lg font-semibold text-gray-800 font-poppins mt-6 mb-3">{children}</h4>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-700 font-inter mb-5 leading-relaxed text-base">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-none text-gray-700 font-inter mb-6 space-y-3 pl-0">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside text-gray-700 font-inter mb-6 space-y-3 pl-4">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-700 font-inter flex items-start">
                              <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>{children}</span>
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-gray-900 font-poppins bg-orange-50/30 px-1 rounded">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-gray-800 font-medium bg-gray-50/50 px-1 rounded">{children}</em>
                          ),
                          table: ({ children }) => (
                            <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 shadow-sm">
                              <table className="min-w-full bg-white">{children}</table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-gradient-to-r from-orange-100 to-orange-50">{children}</thead>
                          ),
                          th: ({ children }) => (
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 font-poppins border-b border-gray-300">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="px-6 py-4 text-sm text-gray-700 font-inter border-b border-gray-100">
                              {children}
                            </td>
                          ),
                          hr: () => (
                            <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-orange-400 bg-orange-50/50 pl-6 pr-4 py-4 italic text-gray-700 my-6 rounded-r-lg">
                              {children}
                            </blockquote>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-100 px-3 py-1 rounded-md text-sm font-mono text-gray-800 border border-gray-200">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto mb-6">
                              {children}
                            </pre>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              className="text-orange-600 hover:text-orange-700 underline decoration-orange-300 hover:decoration-orange-500 transition-colors font-medium"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {preprocessMarkdown(markdownContent)}
                      </ReactMarkdown>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Placeholder when no response */}
            {!webhookResponse && submitStatus === "idle" && (
              <Card className="bg-gray-50 border-gray-200 border-dashed">
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 font-poppins mb-2">Ready to Generate</h3>
                  <p className="text-gray-500 font-inter">
                    Fill out the form and submit to generate your professional proposal
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
