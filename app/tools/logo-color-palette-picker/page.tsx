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
import { Loader2, Palette, CheckCircle, XCircle, Copy, Check } from "lucide-react"

interface FormData {
  name: string
  email: string
  industry: string
  brandDescription: string
  stylePreferences: string
}

interface ColorInfo {
  name: string
  role: string
  hexCode: string
  description: string
}

interface WebhookResponse {
  success?: boolean
  message?: string
  output?: string
  [key: string]: any
}

export default function LogoPaletteGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    industry: "",
    brandDescription: "",
    stylePreferences: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const styleOptions = ["Modern", "Classic", "Minimalist", "Bold", "Elegant", "Playful", "Professional", "Creative"]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const parseColorOutput = (output: string): ColorInfo[] => {
    const colors: ColorInfo[] = []
    const colorBlocks = output.split(/\n\n+/).filter((block) => block.trim())

    colorBlocks.forEach((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line)
      if (lines.length >= 4) {
        const name = lines[0].replace(/^\d+\)\s*/, "").trim()
        const role = lines[1].replace(/^Role:\s*/i, "").trim()
        const hexCode = lines[2].replace(/^Hex Code:\s*/i, "").trim()
        const description = lines[3].replace(/^Description:\s*/i, "").trim()

        colors.push({ name, role, hexCode, description })
      }
    })

    return colors
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHex(text)
      setTimeout(() => setCopiedHex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setResponse(null)

    try {
      const webhookResponse = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/logo-palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const responseData = await webhookResponse.json()

      if (webhookResponse.ok) {
        setSuccess(true)
        setResponse(responseData)
      } else {
        setError(responseData.message || "Failed to generate palette")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      console.error("Webhook error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    formData.name && formData.email && formData.industry && formData.brandDescription && formData.stylePreferences

  // Parse colors from response
  let parsedColors: ColorInfo[] = []
  if (response && Array.isArray(response) && response[0]?.output) {
    parsedColors = parseColorOutput(response[0].output)
  } else if (response?.output) {
    parsedColors = parseColorOutput(response.output)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-body">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-12 w-12 text-orange-500 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-heading">
                Logo Colour Palette Generator
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">Generate the perfect colour palette for your brand</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-white dark:bg-[#111111] shadow-lg border-0 border border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white font-heading">Tell us about your brand</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                We'll create a custom colour palette based on your preferences
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 dark:text-white font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-white font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-900 dark:text-white font-medium">
                    Industry *
                  </Label>
                  <Input
                    id="industry"
                    type="text"
                    value={formData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Technology, Healthcare, Fashion"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandDescription" className="text-gray-900 dark:text-white font-medium">
                    Brand Description *
                  </Label>
                  <Textarea
                    id="brandDescription"
                    value={formData.brandDescription}
                    onChange={(e) => handleInputChange("brandDescription", e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 min-h-[100px]"
                    placeholder="Describe your brand, values, and target audience..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stylePreferences" className="text-gray-900 dark:text-white font-medium">
                    Style Preferences *
                  </Label>
                  <Select
                    value={formData.stylePreferences}
                    onValueChange={(value) => handleInputChange("stylePreferences", value)}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Choose your preferred style" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                      {styleOptions.map((style) => (
                        <SelectItem key={style} value={style.toLowerCase()} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Palette...
                    </>
                  ) : (
                    <>
                      <Palette className="mr-2 h-5 w-5" />
                      Generate Colour Palette
                    </>
                  )}
                </Button>
              </form>

              {/* Status Messages */}
              {error && (
                <Alert className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 animate-in slide-in-from-top-2 duration-300">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 dark:text-red-100">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 animate-in slide-in-from-top-2 duration-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-100">Colour palette generated successfully!</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {parsedColors.length > 0 && (
              <Card className="bg-white dark:bg-[#111111] shadow-lg border-0 border border-gray-200 dark:border-gray-800 animate-in slide-in-from-right-4 duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white font-heading flex items-center">
                    <Palette className="mr-2 h-6 w-6 text-orange-500" />
                    Your Brand Colour Palette
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Here are the perfect colours for your brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {parsedColors.map((color, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-zinc-800">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-heading">{color.name}</h3>
                        <div
                          className="w-12 h-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
                          style={{ backgroundColor: color.hexCode }}
                        />
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white">Role:</span>{" "}
                          <span className="text-gray-600 dark:text-gray-400">{color.role}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white">Hex Code:</span>{" "}
                            <span className="text-gray-600 dark:text-gray-400 font-mono">{color.hexCode}</span>
                          </div>
                          <Button
                            onClick={() => copyToClipboard(color.hexCode)}
                            variant="outline"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-500"
                          >
                            {copiedHex === color.hexCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>

                        <div>
                          <span className="font-bold text-gray-900 dark:text-white">Description:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{color.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Powered by advanced colour theory and brand psychology</p>
        </div>
      </div>
    </div>
  )
}
