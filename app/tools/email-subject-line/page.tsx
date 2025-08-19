"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Mail, TrendingUp, Star } from "lucide-react"
import { ContentLoadingScreen } from "@/components/loading-screen"

interface GeneratedLine {
  id: number
  subject: string
  preview: string
  predicted_open_rate: number
  category: string
}

interface ApiResponse {
  success: boolean
  timestamp: string
  results: {
    generated_lines: GeneratedLine[]
    total_generated: number
    avg_predicted_rate: number
  }
  metadata: {
    total_options: number
    avg_predicted_open_rate: string
    best_performing: GeneratedLine
  }
}

export default function EmailGenerator() {
  const [formData, setFormData] = useState({
    campaign_type: "",
    target_audience: "",
    product_service: "",
    brand_voice: "",
    industry: "",
    best_subject: "",
    average_open_rate: "",
  })

  const [results, setResults] = useState<GeneratedLine[]>([])
  const [metadata, setMetadata] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (loading) {
    return <ContentLoadingScreen />
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/4410c45f-0d03-423a-8276-3080561d6bb4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          average_open_rate: Number.parseFloat(formData.average_open_rate) || 20.6,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate email lines")
      }

      const data: ApiResponse[] = await response.json()
      if (data[0]?.success) {
        setResults(data[0].results.generated_lines)
        setMetadata(data[0].metadata)
      } else {
        throw new Error("Generation failed")
      }
    } catch (err) {
      setError("Failed to generate email lines. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "urgency":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
      case "offer":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
      case "general":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-25 dark:from-[#0a0a0a] dark:to-[#111111] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 font-poppins">Email Subject-Line Generator</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-inter">
            Generate high-converting email subject lines and preview text with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                Campaign Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Campaign Type</Label>
                  <Select onValueChange={(value) => handleInputChange("campaign_type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="abandoned_cart">Abandoned Cart</SelectItem>
                      <SelectItem value="follow_up">Follow Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Textarea
                    placeholder="e.g., young e-commerce founders..."
                    value={formData.target_audience}
                    onChange={(e) => handleInputChange("target_audience", e.target.value)}
                    className="min-h-[80px] bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Product/Service</Label>
                  <Input
                    placeholder="e.g., AI-powered email automation platform"
                    value={formData.product_service}
                    onChange={(e) => handleInputChange("product_service", e.target.value)}
                    className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Brand Voice</Label>
                    <Select onValueChange={(value) => handleInputChange("brand_voice", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="playful">Playful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Best Performing Subject (Optional)</Label>
                  <Input
                    placeholder="e.g., Unlock smarter outreach with AI..."
                    value={formData.best_subject}
                    onChange={(e) => handleInputChange("best_subject", e.target.value)}
                    className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Current Average Open Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="20.6"
                    value={formData.average_open_rate}
                    onChange={(e) => handleInputChange("average_open_rate", e.target.value)}
                    className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white"
                  />
                </div>

                {error && <div className="text-red-600 dark:text-red-300 text-sm bg-red-50 dark:bg-red-900 p-3 rounded-lg">{error}</div>}

                <Button
                  type="submit"
                  disabled={loading || !formData.campaign_type || !formData.target_audience}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Subject Lines"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {metadata && (
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                      <div className="text-2xl font-bold font-poppins">{metadata.total_options}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Generated Options</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                      <div className="text-2xl font-bold text-orange-500 font-poppins">
                        {metadata.avg_predicted_open_rate}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Open Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {results.length > 0 && (
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500" />
                    Generated Subject Lines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {results
                      .sort((a, b) => b.predicted_open_rate - a.predicted_open_rate)
                      .map((line, index) => (
                        <div
                          key={line.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getCategoryColor(line.category)}>{line.category}</Badge>
                            <div className="flex items-center gap-1 text-orange-500 font-semibold">
                              <TrendingUp className="w-4 h-4" />
                              {line.predicted_open_rate}%
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">SUBJECT LINE</div>
                              <div className="font-semibold text-gray-900 dark:text-white font-inter">{line.subject}</div>
                            </div>

                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">PREVIEW TEXT</div>
                              <div className="text-gray-600 dark:text-gray-300 text-sm font-inter">{line.preview}</div>
                            </div>
                          </div>

                          {index === 0 && (
                            <Badge className="mt-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                              Best Performing
                            </Badge>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {results.length === 0 && !loading && (
              <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg">
                <CardContent className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-inter">
                    Fill out the form and click "Generate Subject Lines" to see your results here.
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
