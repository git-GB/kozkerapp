"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Sparkles, Copy, Check } from "lucide-react"

interface FormData {
  name: string
  email: string
  businessType: string
  productService: string
}

interface WebhookResponse {
  success?: boolean
  message?: string
  faqs?: Array<{
    question: string
    answer: string
  }>
  [key: string]: any
}

interface CopyButtonProps {
  text: string
  className?: string
}

function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Button onClick={handleCopy} variant="outline" size="sm" className={`${className} transition-all duration-200`}>
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-1 text-green-600" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </>
      )}
    </Button>
  )
}

interface FormattedFAQDisplayProps {
  response: WebhookResponse
}

function FormattedFAQDisplay({ response }: FormattedFAQDisplayProps) {
  // Extract FAQ content from the response
  const getFAQContent = () => {
    if (response.faqs && Array.isArray(response.faqs)) {
      return response.faqs
    }

    // Check if there's an output field with FAQ content
    if (Array.isArray(response) && response[0]?.output) {
      return parseMarkdownFAQs(response[0].output)
    }

    if (response.output) {
      return parseMarkdownFAQs(response.output)
    }

    return null
  }

  const parseMarkdownFAQs = (content: string) => {
    const sections: Array<{
      title: string
      faqs: Array<{ question: string; answer: string }>
    }> = []

    // Split content by sections (#### headings)
    const sectionRegex = /####\s*\*\*(.*?)\*\*/g
    const parts = content.split(sectionRegex)

    for (let i = 1; i < parts.length; i += 2) {
      const sectionTitle = parts[i].trim()
      const sectionContent = parts[i + 1] || ""

      // Extract Q&A pairs from section content
      const qaPairs = extractQAPairs(sectionContent)

      if (qaPairs.length > 0) {
        sections.push({
          title: sectionTitle,
          faqs: qaPairs,
        })
      }
    }

    return sections
  }

  const extractQAPairs = (content: string) => {
    const pairs: Array<{ question: string; answer: string }> = []

    // Match Q: ... A: ... patterns
    const qaRegex = /\*\*Q:\s*(.*?)\*\*\s*\n\s*A:\s*(.*?)(?=\n\s*\*\*Q:|$)/gs
    let match

    while ((match = qaRegex.exec(content)) !== null) {
      pairs.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      })
    }

    return pairs
  }

  const faqContent = getFAQContent()

  if (!faqContent) {
    return (
      <Card className="bg-white shadow-lg border border-gray-200 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-2xl font-poppins text-heading">Generated FAQs</CardTitle>
          <CardDescription className="text-body font-inter">No FAQ content found in the response</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // If it's structured FAQ sections
  if (Array.isArray(faqContent) && faqContent[0]?.title) {
    const allFAQsText = faqContent
      .map(
        (section) =>
          `${section.title}\n\n${section.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}`,
      )
      .join("\n\n---\n\n")

    return (
      <Card className="bg-white shadow-lg border border-gray-200 animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-poppins text-heading">Generated FAQs</CardTitle>
            <CardDescription className="text-body font-inter">
              Your customized FAQ content organized by categories
            </CardDescription>
          </div>
          <CopyButton text={allFAQsText} />
        </CardHeader>
        <CardContent className="space-y-8">
          {faqContent.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-poppins text-heading border-b-2 border-primary pb-2">
                  {section.title}
                </h3>
                <CopyButton
                  text={`${section.title}\n\n${section.faqs
                    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
                    .join("\n\n")}`}
                  className="text-xs"
                />
              </div>
              <div className="space-y-4">
                {section.faqs.map((faq, faqIndex) => (
                  <div key={faqIndex} className="bg-section rounded-lg p-4 border border-gray-200 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={`Q: ${faq.question}\nA: ${faq.answer}`} className="text-xs" />
                    </div>
                    <h4 className="font-bold font-poppins text-heading mb-2 pr-16">Q: {faq.question}</h4>
                    <p className="text-body font-inter leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  // If it's simple FAQ array
  if (Array.isArray(faqContent)) {
    const allFAQsText = faqContent.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")

    return (
      <Card className="bg-white shadow-lg border border-gray-200 animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-poppins text-heading">Generated FAQs</CardTitle>
            <CardDescription className="text-body font-inter">Your customized FAQ content</CardDescription>
          </div>
          <CopyButton text={allFAQsText} />
        </CardHeader>
        <CardContent className="space-y-4">
          {faqContent.map((faq, index) => (
            <div key={index} className="bg-section rounded-lg p-4 border border-gray-200 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={`Q: ${faq.question}\nA: ${faq.answer}`} className="text-xs" />
              </div>
              <h4 className="font-bold font-poppins text-heading mb-2 pr-16">
                Q{index + 1}: {faq.question}
              </h4>
              <p className="text-body font-inter leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return null
}

function FAQGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessType: "",
    productService: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setResponse(null)

    try {
      const webhookResponse = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/faq-builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!webhookResponse.ok) {
        throw new Error(`HTTP error! status: ${webhookResponse.status}`)
      }

      const data = await webhookResponse.json()
      setResponse(data)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating FAQs")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.businessType && formData.productService

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Form Card */}
      <Card className="bg-white shadow-lg border border-gray-200 animate-slide-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-poppins text-heading flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Generate Your FAQs
          </CardTitle>
          <CardDescription className="text-body font-inter">
            Fill in your business details to create customized FAQs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-heading font-medium font-inter">
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 text-heading placeholder:text-body focus:border-primary focus:ring-primary/20 transition-all duration-300 font-inter"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-heading font-medium font-inter">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 text-heading placeholder:text-body focus:border-primary focus:ring-primary/20 transition-all duration-300 font-inter"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-heading font-medium font-inter">
                  Business type *
                </Label>
                <Input
                  id="businessType"
                  name="businessType"
                  type="text"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 text-heading placeholder:text-body focus:border-primary focus:ring-primary/20 transition-all duration-300 font-inter"
                  placeholder="e.g., E-commerce, SaaS, Restaurant"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productService" className="text-heading font-medium font-inter">
                  Product/service *
                </Label>
                <Input
                  id="productService"
                  name="productService"
                  type="text"
                  value={formData.productService}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 text-heading placeholder:text-body focus:border-primary focus:ring-primary/20 transition-all duration-300 font-inter"
                  placeholder="Describe your main offering"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold font-inter py-4 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ fontWeight: 600 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating FAQs...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate FAQs
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {error && (
        <Alert className="bg-red-50 border-red-200 animate-slide-up">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">{error}</AlertDescription>
        </Alert>
      )}

      {success && !error && (
        <Alert className="bg-green-50 border-green-200 animate-slide-up">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 font-inter">FAQs generated successfully!</AlertDescription>
        </Alert>
      )}

      {/* Response Display */}
      {response && (
        <div className="space-y-6">
          {/* Formatted FAQ Display */}
          <FormattedFAQDisplay response={response} />
        </div>
      )}
    </div>
  )
}

export default function FAQBuilderClient() {
  return (
    <main className="min-h-screen bg-section">
      {/* Header Section with Gradient */}
      <div className="bg-header-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins text-heading mb-4 animate-fade-in">
              AI FAQ Generator
            </h1>
            <p className="text-xl text-body max-w-2xl mx-auto animate-fade-in-delay font-inter">
              Create professional FAQs for your business in seconds. Our AI analyzes your business type and services to
              generate relevant questions and answers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <FAQGenerator />
      </div>
    </main>
  )
}
