"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Sparkles, CheckCircle, XCircle, Copy, User, AtSign } from "lucide-react"

interface FormData {
  name: string
  email: string
  originalEmailContent: string
  emailType: string
  otherEmailType: string
  followUpGoal: string
  tone: string
  recipientName: string
  recipientRelationship: string
  followUpNumber: string
}

interface ParsedEmail {
  subject: string
  body: string
}

interface WebhookResponse {
  success?: boolean
  message?: string
  generatedEmail?: string
  output?: string
  [key: string]: any
}

export default function EmailGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    originalEmailContent: "",
    emailType: "",
    otherEmailType: "",
    followUpGoal: "",
    tone: "",
    recipientName: "",
    recipientRelationship: "",
    followUpNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const emailTypes = [
    "Sales inquiry",
    "Meeting confirmation", 
    "Demo scheduling",
    "Partnership discussion",
    "Cold outreach",
    "Customer support",
    "Others",
  ]

  const tones = ["Professional", "Casual", "Urgent", "Friendly", "Formal", "Persuasive"]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const parseEmailContent = (content: string): ParsedEmail => {
    const lines = content.split("\n")
    let subject = ""
    let body = ""
    
    // Find subject line
    const subjectLine = lines.find((line) => line.startsWith("Subject:"))
    if (subjectLine) {
      subject = subjectLine.replace("Subject:", "").trim()
    }

    // Find body (everything after the first empty line after subject)
    const subjectIndex = lines.findIndex((line) => line.startsWith("Subject:"))
    if (subjectIndex !== -1) {
      // Find the first non-empty line after subject
      let bodyStartIndex = subjectIndex + 1
      while (bodyStartIndex < lines.length && lines[bodyStartIndex].trim() === "") {
        bodyStartIndex++
      }
      if (bodyStartIndex < lines.length) {
        body = lines.slice(bodyStartIndex).join("\n").trim()
      }
    } else {
      // If no subject found, treat entire content as body
      body = content.trim()
    }

    return { subject, body }
  }

  const getEmailContent = (response: WebhookResponse): string => {
    // Handle n8n response format
    if (Array.isArray(response) && response.length > 0 && response[0].output) {
      return response[0].output
    }

    // Handle direct output
    if (response.output) {
      return response.output
    }

    // Handle generatedEmail field
    if (response.generatedEmail) {
      return response.generatedEmail
    }

    return ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const submitData = {
        ...formData,
        emailType: formData.emailType === "Others" ? formData.otherEmailType : formData.emailType,
      }

      const res = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating the email")
    } finally {
      setIsLoading(false)
    }
  }

  const emailContent = response ? getEmailContent(response) : ""
  const parsedEmail = emailContent ? parseEmailContent(emailContent) : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#FF7435] rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-poppins">Follow-up Email Generator</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-inter text-lg max-w-2xl mx-auto">
            Generate personalized follow-up emails with the power of AI. Create compelling messages that get responses.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-180px)]">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-[#0a0a0a] p-8 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <Card className="bg-white dark:bg-[#111111] border-gray-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-poppins text-gray-900 dark:text-white">
                  Email Details
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400 font-inter">
                  Fill in the details below to generate your perfect follow-up email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium font-inter text-gray-900 dark:text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium font-inter text-gray-900 dark:text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalEmailContent" className="font-medium font-inter text-gray-900 dark:text-white">
                      Original Email Content
                    </Label>
                    <Textarea
                      id="originalEmailContent"
                      value={formData.originalEmailContent}
                      onChange={(e) => handleInputChange("originalEmailContent", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter min-h-[120px] resize-none rounded-lg text-gray-900 dark:text-white"
                      placeholder="Paste the content of your original email here..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium font-inter text-gray-900 dark:text-white">Email Type</Label>
                    <Select value={formData.emailType} onValueChange={(value) => handleInputChange("emailType", value)}>
                      <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select email type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                        {emailTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-gray-900 dark:text-white font-inter">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.emailType === "Others" && (
                    <div className="space-y-2">
                      <Label htmlFor="otherEmailType" className="font-medium font-inter text-gray-900 dark:text-white">
                        Please Specify
                      </Label>
                      <Input
                        id="otherEmailType"
                        value={formData.otherEmailType}
                        onChange={(e) => handleInputChange("otherEmailType", e.target.value)}
                        className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                        placeholder="Specify email type"
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="font-medium font-inter text-gray-900 dark:text-white">Tone of Follow-up</Label>
                    <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                      <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone} className="text-gray-900 dark:text-white font-inter">
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="followUpGoal" className="font-medium font-inter text-gray-900 dark:text-white">
                      Follow-up Goal
                    </Label>
                    <Input
                      id="followUpGoal"
                      value={formData.followUpGoal}
                      onChange={(e) => handleInputChange("followUpGoal", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                      placeholder="Close sale, get reply, reschedule meeting etc"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientName" className="font-medium font-inter text-gray-900 dark:text-white">
                      Recipient Name
                    </Label>
                    <Input
                      id="recipientName"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange("recipientName", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                      placeholder="Recipient's name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientRelationship" className="font-medium font-inter text-gray-900 dark:text-white">
                      Recipient Relationship
                    </Label>
                    <Input
                      id="recipientRelationship"
                      value={formData.recipientRelationship}
                      onChange={(e) => handleInputChange("recipientRelationship", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                      placeholder="client, prospect, partner etc"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="followUpNumber" className="font-medium font-inter text-gray-900 dark:text-white">
                      Follow-up Mail Number
                    </Label>
                    <Input
                      id="followUpNumber"
                      value={formData.followUpNumber}
                      onChange={(e) => handleInputChange("followUpNumber", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-[#FF7435] focus:ring-[#FF7435] font-inter rounded-lg text-gray-900 dark:text-white"
                      placeholder="1st, 2nd, 3rd..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FF7435] hover:bg-[#E6681F] dark:hover:bg-[#d45616] text-white font-semibold rounded-lg transition-colors duration-200 font-inter"
                    style={{ padding: "16px", fontWeight: 600 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Email...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Follow-up Email
                      </>
                    )}
                  </Button>
                </form>

                {error && (
                  <Alert className="mt-4 bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100">
                    <XCircle className="w-4 h-4" />
                    <AlertDescription className="font-inter">
                      <strong>Error:</strong> {error}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Email Preview Section */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-[#111111] p-8 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800">
          <div className="max-w-2xl mx-auto">
            {parsedEmail ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">Generated Email</h2>
                  <Button
                    onClick={() => copyToClipboard(emailContent)}
                    variant="outline"
                    size="sm"
                    className="border-[#FF7435] text-[#FF7435] hover:bg-[#FF7435] hover:text-white font-inter border-gray-200 dark:border-gray-700 bg-transparent dark:text-[#FF7435]"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? "Copied!" : "Copy Email"}
                  </Button>
                </div>

                {/* Email Preview Card */}
                <Card className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    {/* Email Header */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white font-inter">
                          {formData.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                          &lt;{formData.email}&gt;
                        </span>
                      </div>
                      
                      {parsedEmail.subject && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white font-inter">Subject: </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-inter">
                            {parsedEmail.subject}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <AtSign className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white font-inter">To: </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-inter">
                          {formData.recipientName}
                        </span>
                      </div>
                    </div>

                    {/* Email Body */}
                    <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 font-inter leading-relaxed whitespace-pre-wrap">
                      {parsedEmail.body}
                    </div>
                  </CardContent>
                </Card>

                {/* Debug Information */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-gray-500 dark:text-gray-400 font-inter text-sm">
                    View Raw Response
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-48 border border-gray-200 dark:border-gray-700">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                      Your follow-up email will appear here
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-inter">
                      Fill out the form and click generate to get started
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
