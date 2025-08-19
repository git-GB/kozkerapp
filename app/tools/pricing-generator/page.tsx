"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2, Sparkles, Check, X } from "lucide-react"

interface FormData {
  name: string
  email: string
  productService: string
  planDifferentiation: string
  numberOfPlans: string
}

interface WebhookResponse {
  output?: string
  [key: string]: any
}

export default function PricingGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    productService: "",
    planDifferentiation: "",
    numberOfPlans: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setResponse(null)

    try {
      const res = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/pricing-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`)
      }

      // Handle array response format
      if (Array.isArray(data) && data.length > 0 && data[0].output) {
        setResponse({ output: data[0].output })
      } else if (data.output) {
        setResponse(data)
      } else {
        setResponse(data)
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating pricing tiers")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.productService && formData.numberOfPlans

  // Function to parse and render markdown content
  const renderMarkdownContent = (content: string) => {
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []
    let currentTable: string[][] = []
    let inTable = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (!line) {
        if (inTable && currentTable.length > 0) {
          elements.push(renderTable(currentTable, elements.length))
          currentTable = []
          inTable = false
        }
        elements.push(<div key={elements.length} className="h-4" />)
        continue
      }

      // Handle table rows
      if (line.startsWith("|") && line.endsWith("|")) {
        if (!inTable) {
          inTable = true
          currentTable = []
        }
        const cells = line
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim())
        // Skip separator rows
        if (!cells.every((cell) => cell.match(/^-+$/))) {
          currentTable.push(cells)
        }
        continue
      } else if (inTable) {
        // End of table
        if (currentTable.length > 0) {
          elements.push(renderTable(currentTable, elements.length))
          currentTable = []
        }
        inTable = false
      }

      // Handle headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={elements.length} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
            {parseInlineFormatting(line.substring(2))}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={elements.length} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4 mt-8">
            {parseInlineFormatting(line.substring(3))}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={elements.length} className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-3 mt-6">
            {parseInlineFormatting(line.substring(4))}
          </h3>,
        )
      }
      // Handle horizontal rules
      else if (line === "---") {
        elements.push(<hr key={elements.length} className="border-gray-300 dark:border-gray-600 my-8" />)
      }
      // Handle list items
      else if (line.startsWith("- ")) {
        elements.push(
          <div key={elements.length} className="flex items-start mb-2">
            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 font-inter">{parseInlineFormatting(line.substring(2))}</span>
          </div>,
        )
      }
      // Handle call-to-action buttons
      else if (line.startsWith("👉 ")) {
        elements.push(
          <Button
            key={elements.length}
            className="bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold py-3 px-6 rounded-lg mt-4 mb-6 font-inter"
          >
            {parseInlineFormatting(line.substring(3))}
          </Button>,
        )
      }
      // Handle regular paragraphs
      else {
        elements.push(
          <p key={elements.length} className="text-gray-700 dark:text-gray-300 font-inter mb-4 leading-relaxed">
            {parseInlineFormatting(line)}
          </p>,
        )
      }
    }

    // Handle any remaining table
    if (inTable && currentTable.length > 0) {
      elements.push(renderTable(currentTable, elements.length))
    }

    return elements
  }

  // Function to parse inline formatting (bold, etc.)
  const parseInlineFormatting = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-gray-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        )
      }
      // Handle checkmarks and X marks
      if (part === "✅") return <Check key={index} className="w-4 h-4 text-green-500 inline" />
      if (part === "❌") return <X key={index} className="w-4 h-4 text-red-500 inline" />
      return part
    })
  }

  // Function to render tables
  const renderTable = (tableData: string[][], key: number) => {
    if (tableData.length === 0) return null

    const headers = tableData[0]
    const rows = tableData.slice(1)

    return (
      <div key={key} className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-zinc-700">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-bold text-gray-900 dark:text-white font-poppins"
                >
                  {parseInlineFormatting(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-inter">
                    {parseInlineFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-poppins animate-fade-in">
              Pricing Page Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-inter animate-fade-in-delay">
              Generate perfect pricing tiers for your product with this easy to use tool
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Form Card */}
        <Card className="bg-gray-50 dark:bg-[#111111] border-gray-200 dark:border-gray-800 shadow-lg animate-slide-up mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white text-2xl font-poppins">Generate Your Pricing Page</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 font-inter">
              Fill out the form below and let AI create optimized pricing tiers for your product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 dark:text-white font-inter font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500 font-inter"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-white font-inter font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500 font-inter"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productService" className="text-gray-900 dark:text-white font-inter font-medium">
                  What is your product/service?
                </Label>
                <Textarea
                  id="productService"
                  value={formData.productService}
                  onChange={(e) => handleInputChange("productService", e.target.value)}
                  placeholder="Please describe its main features and benefits"
                  className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 font-inter min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planDifferentiation" className="text-gray-900 dark:text-white font-inter font-medium">
                  How will the plans be differentiated? <span className="text-gray-500 dark:text-gray-400">(optional)</span>
                </Label>
                <Textarea
                  id="planDifferentiation"
                  value={formData.planDifferentiation}
                  onChange={(e) => handleInputChange("planDifferentiation", e.target.value)}
                  placeholder="Explain the features you have that differentiate the plan"
                  className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfPlans" className="text-gray-900 dark:text-white font-inter font-medium">
                  How many plans do you want to offer?
                </Label>
                <Select
                  value={formData.numberOfPlans}
                  onValueChange={(value) => handleInputChange("numberOfPlans", value)}
                >
                  <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500 font-inter">
                    <SelectValue placeholder="Select number of plans" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-gray-900 dark:text-white font-inter hover:bg-orange-50 dark:hover:bg-zinc-700">
                        {num} {num === 1 ? "Plan" : "Plans"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-inter"
                style={{ padding: "16px" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Pricing Tiers...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Pricing Page
                  </>
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg flex items-center animate-fade-in">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 dark:text-red-100 font-inter">{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg flex items-center animate-fade-in">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 dark:text-green-100 font-inter">Pricing page generated successfully!</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Content Display */}
        {response && response.output && (
          <Card className="bg-white dark:bg-[#111111] border-gray-200 dark:border-gray-800 shadow-lg animate-fade-in">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">{renderMarkdownContent(response.output)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
