"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, FileText } from "lucide-react"
import { ContentLoadingScreen } from "@/components/loading-screen"

interface FormData {
  name: string
  email: string
  transcript: string
}

interface WebhookResponse {
  output?: string
  [key: string]: any
}

const parseMarkdown = (text: string): string => {
  return (
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)(\s*<br>\s*<li>.*<\/li>)*/g, (match) => {
        const items = match.replace(/<br>\s*/g, "").split("</li>").filter((item) => item.trim())
        return "<ul>" + items.map((item) => item + "</li>").join("") + "</ul>"
      })
  )
}

export default function MeetingSummaryExtractor() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", transcript: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; data?: WebhookResponse } | null>(null)

  if (isLoading) return <ContentLoadingScreen />

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/meeting-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const responseData: WebhookResponse = await response.json()
        setMessage({ type: "success", text: "Meeting transcript processed successfully!", data: responseData })
        setFormData({ name: "", email: "", transcript: "" })
      } else {
        const errorData = await response.text()
        throw new Error(errorData || "Failed to submit transcript")
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Failed to submit transcript: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-500 dark:bg-orange-600 rounded-full p-3 shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 font-poppins">Meeting Summary Extractor</h1>
          <p className="text-gray-500 dark:text-gray-300 text-lg font-inter">
            Transform your meeting transcripts into actionable summaries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-900 shadow-xl border dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
              <CardTitle className="text-2xl text-gray-900 dark:text-white font-poppins">Submit Your Meeting Transcript</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300 font-inter">
                Fill in your details and paste your meeting transcript below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 dark:text-gray-100 font-medium font-inter">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 font-inter bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-gray-100 font-medium font-inter">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 font-inter bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transcript" className="text-gray-900 dark:text-gray-100 font-medium font-inter">Meeting Transcript</Label>
                  <Textarea
                    id="transcript"
                    name="transcript"
                    value={formData.transcript}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 resize-none font-inter bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Paste your meeting transcript here..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-70 font-inter"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Extract Summary"
                  )}
                </Button>
              </form>

              {message && (
                <div className="mt-6 animate-fade-in">
                  <Alert
                    className={`border-0 ${
                      message.type === "success"
                        ? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <AlertDescription className="ml-2 font-inter">{message.text}</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 shadow-xl border dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 rounded-t-lg">
              <CardTitle className="text-2xl text-gray-900 dark:text-white font-poppins flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-500" />
                Meeting Summary
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300 font-inter">
                Your processed meeting summary will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {message?.type === "success" && message.data?.output ? (
                <div className="animate-fade-in">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div
                      className="prose prose-gray max-w-none font-inter text-gray-600 dark:text-gray-200 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(message.data.output) }}
                      style={{ fontSize: "14px", lineHeight: "1.6" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-300 font-inter">
                    Submit a meeting transcript to see the summary here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 animate-fade-in">
          <p className="text-gray-500 dark:text-gray-300 text-sm font-inter">
            Your transcript will be processed securely and the summary will appear above.
          </p>
        </div>
      </div>
    </div>
  )
}
