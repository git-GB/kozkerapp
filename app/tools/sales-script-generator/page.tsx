"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Loader2,
  Sparkles,
  Target,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  FileText,
  RefreshCw,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react"

// Types
export interface FormData {
  name: string
  email: string
  productName: string
  targetAudience: string
  keyBenefits: string[]
  callToAction: string
  tone: string
  scriptLength: string
  industry: string
  priceRange: string
}

export interface ScriptResponse {
  script: string
  webhookResponse?: any
}

// FormattedOutput Component
interface FormattedOutputProps {
  content: string
}

function FormattedOutput({ content }: FormattedOutputProps) {
  // Parse the n8n output format
  const parseContent = (text: string) => {
    // Clean the n8n output format more thoroughly
    let cleanText = text
      .replace(/<n8n-output>|<\/n8n-output>/g, "")
      .replace(/^\[|\]$/g, "")
      .trim()

    // Remove JSON wrapper if present
    if (cleanText.startsWith("{") && cleanText.endsWith("}")) {
      cleanText = cleanText.slice(1, -1).trim()
    }

    // Remove "text": prefix if present
    cleanText = cleanText.replace(/^"?text"?\s*:\s*"?/, "").replace(/"$/, "")

    // Clean up escape characters and normalize line breaks
    cleanText = cleanText.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\").replace(/\\'/g, "'")

    // Split into lines and process
    const lines = cleanText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line !== '""')

    return lines
      .map((line, index) => {
        // Handle main headings (surrounded by **)
        if (line.match(/^\*\*[^*:]+\*\*$/)) {
          const heading = line.replace(/\*\*/g, "")
          return (
            <h2 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 first:mt-0">
              {heading}
            </h2>
          )
        }

        // Handle section headings (** with colon)
        if (line.match(/^\*\*[^*]+:\*\*$/)) {
          const heading = line.replace(/\*\*/g, "").replace(":", "")
          return (
            <h3 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2">
              {heading}:
            </h3>
          )
        }

        // Handle italic quotes (surrounded by *" and "*)
        if (line.match(/^\*".*"\*$/)) {
          const text = line.replace(/^\*"|"\*$/g, "")
          return (
            <div
              key={index}
              className="italic text-gray-700 dark:text-gray-300 mb-3 pl-4 border-l-2 border-orange-200 bg-orange-50 dark:bg-orange-900/20 py-2 px-4 rounded"
            >
              "{text}"
            </div>
          )
        }

        // Handle bullet points with checkmarks
        if (line.startsWith("✔")) {
          const text = line.replace("✔", "").trim()
          return (
            <div key={index} className="flex items-start gap-2 mb-2">
              <span className="text-green-500 mt-1 flex-shrink-0">✔</span>
              <div className="text-gray-700 dark:text-gray-300 flex-1" dangerouslySetInnerHTML={{ __html: formatInlineText(text) }} />
            </div>
          )
        }

        // Handle arrow points (objection handling)
        if (line.startsWith("→")) {
          const text = line.replace("→", "").trim()
          return (
            <div key={index} className="flex items-start gap-2 mb-2 ml-4">
              <span className="text-blue-500 mt-1 flex-shrink-0">→</span>
              <div className="text-gray-700 dark:text-gray-300 flex-1" dangerouslySetInnerHTML={{ __html: formatInlineText(text) }} />
            </div>
          )
        }

        // Handle regular paragraphs
        if (line && !line.startsWith("*") && !line.startsWith("✔") && !line.startsWith("→")) {
          return (
            <p
              key={index}
              className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatInlineText(line) }}
            />
          )
        }

        return null
      })
      .filter(Boolean)
  }

  // Helper function to format inline text (bold, italic, etc.)
  const formatInlineText = (text: string) => {
    return (
      text
        // Convert **text** to bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-800 dark:text-gray-200">$1</strong>')
        // Convert *text* to italic (but not if it's already in quotes)
        .replace(/(?<!")(\*)([^*"]+)(\*)(?!")/g, '<em class="italic">$2</em>')
        // Clean up any remaining escape characters
        .replace(/\\(.)/g, "$1")
    )
  }

  return <div className="space-y-2 text-left">{parseContent(content)}</div>
}

// Product Details Step Component
interface ProductDetailsStepProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Partial<FormData>
}

function ProductDetailsStep({ formData, onChange, errors }: ProductDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Product Information</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Tell us about your product or service</p>
      </div>

      <div className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-white">
              Your Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g., John Smith"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
            />
            {errors.name && <p className="text-red-600 dark:text-red-400 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-white">
              Your Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., john@company.com"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
            />
            {errors.email && <p className="text-red-600 dark:text-red-400 text-sm">{errors.email}</p>}
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="productName" className="text-sm font-medium text-gray-700 dark:text-white">
            Product Name *
          </Label>
          <Input
            id="productName"
            placeholder="e.g., Mr Food's fries"
            value={formData.productName}
            onChange={(e) => onChange("productName", e.target.value)}
            className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.productName ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
          />
          {errors.productName && <p className="text-red-600 dark:text-red-400 text-sm">{errors.productName}</p>}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium text-gray-700 dark:text-white">
            Industry (Optional)
          </Label>
          <Input
            id="industry"
            placeholder="e.g., Technology, Healthcare, Food & Beverage"
            value={formData.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className="bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-700 focus:border-orange-500"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Specify the industry your product belongs to
          </p>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label htmlFor="priceRange" className="text-sm font-medium text-gray-700 dark:text-white">
            Price Range (Optional)
          </Label>
          <Input
            id="priceRange"
            placeholder="e.g., $99-$299, Under $50, Premium pricing"
            value={formData.priceRange}
            onChange={(e) => onChange("priceRange", e.target.value)}
            className="bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-700 focus:border-orange-500"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Help us tailor the script to your pricing strategy
          </p>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">💡 Product Tips</h4>
        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
          <li>• Use a clear, memorable product name</li>
          <li>• Industry helps us use relevant terminology</li>
          <li>• Price range affects the sales approach we recommend</li>
        </ul>
      </div>
    </div>
  )
}

// Target Audience Step Component
interface TargetAudienceStepProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Partial<FormData>
}

const tones = [
  { value: "persuasive", label: "Persuasive", description: "Compelling and convincing" },
  { value: "professional", label: "Professional", description: "Formal and business-focused" },
  { value: "casual", label: "Casual", description: "Friendly and conversational" },
  { value: "urgent", label: "Urgent", description: "Time-sensitive and action-driven" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable" },
  { value: "enthusiastic", label: "Enthusiastic", description: "Energetic and exciting" },
  { value: "consultative", label: "Consultative", description: "Advisory and helpful" },
  { value: "authoritative", label: "Authoritative", description: "Expert and confident" },
]

function TargetAudienceStep({ formData, onChange, errors }: TargetAudienceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Target Audience & Tone</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Define who you're selling to and how you want to sound</p>
      </div>

      <div className="space-y-6">
        {/* Target Audience */}
        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="text-sm font-medium text-gray-700 dark:text-white">
            Target Audience *
          </Label>
          <Textarea
            id="targetAudience"
            placeholder="e.g., children, busy parents, small business owners, enterprise decision makers"
            value={formData.targetAudience}
            onChange={(e) => onChange("targetAudience", e.target.value)}
            className={`min-h-[100px] bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.targetAudience ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
            rows={3}
          />
          {errors.targetAudience && <p className="text-red-600 dark:text-red-400 text-sm">{errors.targetAudience}</p>}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Describe your ideal customer - their demographics, role, or characteristics
          </p>
        </div>

        {/* Tone */}
        <div className="space-y-2">
          <Label htmlFor="tone" className="text-sm font-medium text-gray-700 dark:text-white">
            Script Tone *
          </Label>
          <Select value={formData.tone} onValueChange={(value) => onChange("tone", value)}>
            <SelectTrigger className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.tone ? "border-red-500" : "border-gray-300 dark:border-zinc-700"}`}>
              <SelectValue placeholder="Select the tone for your script" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                  <div>
                    <div className="font-medium">{tone.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{tone.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.tone && <p className="text-red-600 dark:text-red-400 text-sm">{errors.tone}</p>}
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">🎯 Audience Tips</h4>
        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
          <li>• Be specific about your target audience</li>
          <li>• Consider their pain points and motivations</li>
          <li>• Choose a tone that resonates with your audience</li>
          <li>• Match the tone to your brand personality</li>
        </ul>
      </div>
    </div>
  )
}

// Script Configuration Step Component
interface ScriptConfigStepProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string | string[]) => void
  errors: Partial<FormData>
}

function ScriptConfigStep({ formData, onChange, errors }: ScriptConfigStepProps) {
  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.keyBenefits]
    newBenefits[index] = value
    onChange("keyBenefits", newBenefits)
  }

  const addBenefit = () => {
    onChange("keyBenefits", [...formData.keyBenefits, ""])
  }

  const removeBenefit = (index: number) => {
    if (formData.keyBenefits.length > 1) {
      const newBenefits = formData.keyBenefits.filter((_, i) => i !== index)
      onChange("keyBenefits", newBenefits)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-900 dark:text-white">Script Configuration</Label>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configure the key elements of your sales script</p>
      </div>

      <div className="space-y-6">
        {/* Key Benefits */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-white">Key Benefits *</Label>
          <div className="space-y-3">
            {formData.keyBenefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  placeholder="Enter a key benefit"
                  className="flex-1 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-700 focus:border-orange-500"
                />
                {formData.keyBenefits.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeBenefit(index)}
                    className="shrink-0 border-gray-300 dark:border-zinc-700 hover:border-red-400 hover:text-red-600 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={addBenefit}
              className="w-full border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Benefit
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            List the main advantages or benefits of your product
          </p>
        </div>

        {/* Call to Action */}
        <div className="space-y-2">
          <Label htmlFor="callToAction" className="text-sm font-medium text-gray-700 dark:text-white">
            Call to Action *
          </Label>
          <Input
            id="callToAction"
            placeholder="e.g., Hurry! Grab your first pack now, Sign up for a free trial today"
            value={formData.callToAction}
            onChange={(e) => onChange("callToAction", e.target.value)}
            className={`bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white ${errors.callToAction ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-zinc-700 focus:border-orange-500"}`}
          />
          {errors.callToAction && <p className="text-red-600 dark:text-red-400 text-sm">{errors.callToAction}</p>}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            What action do you want your audience to take?
          </p>
        </div>

        {/* Script Length */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-white">Script Length *</Label>
          <div className="flex gap-6">
            {["short", "medium", "long"].map((length) => (
              <div key={length} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={length}
                  name="scriptLength"
                  value={length}
                  checked={formData.scriptLength === length}
                  onChange={(e) => onChange("scriptLength", e.target.value)}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 dark:border-zinc-700"
                />
                <Label htmlFor={length} className="text-gray-700 dark:text-gray-300 capitalize cursor-pointer">
                  {length}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose the desired length for your sales script
          </p>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">⚙️ Configuration Tips</h4>
        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
          <li>• Focus on benefits, not just features</li>
          <li>• Make your call-to-action clear and compelling</li>
          <li>• Short scripts work well for social media</li>
          <li>• Long scripts are great for presentations</li>
        </ul>
      </div>
    </div>
  )
}

// Script Results Component
interface ScriptResultsProps {
  response: ScriptResponse
  formData: FormData
  onReset: () => void
}

function ScriptResults({ response, formData, onReset }: ScriptResultsProps) {
  const [copied, setCopied] = useState(false)
  const [isGeneratingFile, setIsGeneratingFile] = useState(false)

  // Scroll to top when results component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const copyToClipboard = async () => {
    try {
      // Extract plain text from the formatted content for copying
      const plainText = response.script.replace(/<[^>]*>/g, "").replace(/\\n/g, "\n")
      await navigator.clipboard.writeText(plainText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadJSON = () => {
    const exportData = {
      script: response.script,
      formData: formData,
      generatedAt: new Date().toISOString()
    }
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${formData.productName.replace(/\s+/g, "_")}_sales_script.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const downloadText = async () => {
    setIsGeneratingFile(true)

    try {
      // Create a formatted text version
      let textContent = `Sales Script Report\n${"=".repeat(25)}\n\n`
      
      textContent += `Product: ${formData.productName}\n`
      if (formData.industry) textContent += `Industry: ${formData.industry}\n`
      if (formData.priceRange) textContent += `Price Range: ${formData.priceRange}\n`
      textContent += `Target Audience: ${formData.targetAudience}\n`
      textContent += `Tone: ${formData.tone}\n`
      textContent += `Length: ${formData.scriptLength}\n\n`
      
      textContent += `Generated Script:\n${"-".repeat(17)}\n`
      
      // Clean script content for text file
      const cleanScript = response.script
        .replace(/<[^>]*>/g, "")
        .replace(/\\n/g, "\n")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")

      textContent += cleanScript

      // Create download
      const dataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", `${formData.productName.replace(/\s+/g, "_")}_sales_script.txt`)
      linkElement.click()
    } catch (error) {
      console.error("Error generating text file:", error)
    } finally {
      setIsGeneratingFile(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Sales Script</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Generated for {formData.productName}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={copyToClipboard}
            className="bg-orange-600 hover:bg-orange-700 dark:hover:bg-orange-600 text-white"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Script
              </>
            )}
          </Button>
          <Button
            onClick={downloadText}
            disabled={isGeneratingFile}
            variant="outline"
            className="border-orange-200 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
          >
            {isGeneratingFile ? (
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
            Create New Script
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Script Card */}
          <div className="lg:col-span-2">
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Sales Script</CardTitle>
                    <CardDescription className="text-orange-100">
                      {formData.tone} • {formData.scriptLength} length
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <FormattedOutput content={response.script} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Script Details */}
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-300">
                  <Target className="w-5 h-5" />
                  Script Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Product</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.productName}</p>
                </div>
                {formData.industry && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Industry</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.industry}</p>
                  </div>
                )}
                {formData.priceRange && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price Range</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.priceRange}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Target Audience</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.targetAudience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tone</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.tone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Length</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.scriptLength}</p>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-300">Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {formData.keyBenefits.filter(benefit => benefit.trim()).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-300">Call to Action</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border-l-4 border-orange-400">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{formData.callToAction}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// API Functions
async function generateScript(formData: FormData): Promise<ScriptResponse> {
  try {
    const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/sales-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    // Handle the response - it might be an array or object
    let scriptContent = ""
    if (Array.isArray(result) && result.length > 0) {
      scriptContent = typeof result[0] === "string" ? result[0] : JSON.stringify(result[0])
    } else if (result.script) {
      scriptContent = result.script
    } else if (result.generatedScript) {
      scriptContent = result.generatedScript
    } else {
      scriptContent = JSON.stringify(result, null, 2)
    }

    return {
      script: scriptContent,
      webhookResponse: result
    }
  } catch (error) {
    console.error("Error generating sales script:", error)
    throw new Error(`Failed to generate sales script: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Main Component
const STEPS = [
  { id: 1, title: "Product Details", description: "Basic product information", icon: ShoppingCart },
  { id: 2, title: "Target Audience", description: "Who you're selling to", icon: Users },
  { id: 3, title: "Script Config", description: "Benefits and call-to-action", icon: Settings },
]

export default function SalesScriptGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    productName: "",
    targetAudience: "",
    keyBenefits: [""],
    callToAction: "",
    tone: "",
    scriptLength: "short",
    industry: "",
    priceRange: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scriptResponse, setScriptResponse] = useState<ScriptResponse | null>(null)
  const [submitError, setSubmitError] = useState<string>("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Load saved progress from localStorage and scroll to top
  useEffect(() => {
    const savedData = localStorage.getItem("sales-script-generator-data")
    const savedStep = localStorage.getItem("sales-script-generator-step")

    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    if (savedStep) {
      setCurrentStep(Number.parseInt(savedStep))
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("sales-script-generator-data", JSON.stringify(formData))
    localStorage.setItem("sales-script-generator-step", currentStep.toString())
  }, [formData, currentStep])

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.productName.trim()) newErrors.productName = "Product name is required"
        break
      case 2:
        if (!formData.targetAudience.trim()) newErrors.targetAudience = "Target audience is required"
        if (!formData.tone) newErrors.tone = "Tone is required"
        break
      case 3:
        if (!formData.keyBenefits.some((benefit) => benefit.trim())) {
          newErrors.keyBenefits = "At least one key benefit is required"
        }
        if (!formData.callToAction.trim()) newErrors.callToAction = "Call to action is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
      // Scroll to top when going to next step
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    // Scroll to top when going to previous step
    window.scrollTo(0, 0)
  }

  const submitForm = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const result = await generateScript(formData)
      setScriptResponse(result)
      setSubmitSuccess(true)

      // Clear saved progress after successful submission
      localStorage.removeItem("sales-script-generator-data")
      localStorage.removeItem("sales-script-generator-step")
      
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
      name: "",
      email: "",
      productName: "",
      targetAudience: "",
      keyBenefits: [""],
      callToAction: "",
      tone: "",
      scriptLength: "short",
      industry: "",
      priceRange: "",
    })
    setCurrentStep(1)
    setScriptResponse(null)
    setSubmitSuccess(false)
    setSubmitError("")
    setErrors({})
    localStorage.removeItem("sales-script-generator-data")
    localStorage.removeItem("sales-script-generator-step")
    
    // Scroll to top when form is reset
    window.scrollTo(0, 0)
  }

  const progress = (currentStep / STEPS.length) * 100

  if (scriptResponse && submitSuccess) {
    return <ScriptResults response={scriptResponse} formData={formData} onReset={resetForm} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Sales Script Generator</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Create compelling sales scripts in 3 simple steps</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
                Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
              </CardTitle>
              <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
        </Card>

        {/* Form Steps */}
        <Card className="border-orange-200 dark:border-orange-600 bg-white dark:bg-[#111111]">
          <CardContent className="p-6">
            {currentStep === 1 && (
              <ProductDetailsStep
                formData={formData}
                onChange={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <TargetAudienceStep
                formData={formData}
                onChange={updateFormData}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <ScriptConfigStep
                formData={formData}
                onChange={updateFormData}
                errors={errors}
              />
            )}

            {/* Error Alert */}
            {submitError && (
              <Alert className="mt-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <AlertDescription className="text-red-800 dark:text-red-100">{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-orange-200 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
              >
                Previous
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                >
                  Reset
                </Button>

                {currentStep < STEPS.length ? (
                  <Button onClick={nextStep} className="bg-orange-600 hover:bg-orange-700 dark:hover:bg-orange-600 text-white">
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={submitForm}
                    disabled={isSubmitting}
                    className="bg-orange-600 hover:bg-orange-700 dark:hover:bg-orange-600 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Script...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Sales Script
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
