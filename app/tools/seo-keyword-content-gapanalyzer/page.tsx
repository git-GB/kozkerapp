"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Search,
  TrendingUp,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Globe,
  Mail,
} from "lucide-react"

import { SEOLoadingScreen } from "@/components/loading-screen" // Import the loading screen


interface KeywordData {
  word: string
  count: number
}

interface SEOReport {
  analysis_date: string
  seo_score: number
  current_keywords: KeywordData[]
  keyword_opportunities: {
    total_found: number
    priority_keywords: string[]
    long_tail_opportunities: string[]
  }
  content_gaps: {
    missing_topics: string[]
    gap_count: number
    coverage_score: number
  }
  competitor_analysis: {
    competitors_found: number
    competitor_domains: string[]
  }
  recommendations: string[]
  next_steps: string[]
}

interface AnalysisResult {
  seo_report: SEOReport
  lead_info: {
    email: string
    analysis_date: string
  }
}

export default function SEOAnalyzer() {
  const [formData, setFormData] = useState({
    email: "",
    website_url: "",
    main_topic: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/seo-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.")
      }

      const data = await response.json()
      setResult(Array.isArray(data) ? data[0] : data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetForm = () => {
    setResult(null)
    setFormData({ email: "", website_url: "", main_topic: "" })
    setError("")
  }

  // Show loading screen when loading 
   if (isLoading) {  
     return < SEOLoadingScreen />  }

  if (result) {
    return (
      <div className="min-h-screen section-bg">
        {/* Header */}
        <div className="header-gradient border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-heading">SEO Analysis Report</h1>
              </div>
              <Button onClick={resetForm} variant="outline" className="font-semibold">
                New Analysis
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-body">SEO Score</p>
                    <p className="text-2xl font-bold text-heading">{result.seo_report.seo_score}/100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-body">Keywords Found</p>
                    <p className="text-2xl font-bold text-heading">{result.seo_report.current_keywords.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-body">Content Coverage</p>
                    <p className="text-2xl font-bold text-heading">{result.seo_report.content_gaps.coverage_score}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-body">Competitors</p>
                    <p className="text-2xl font-bold text-heading">
                      {result.seo_report.competitor_analysis.competitors_found}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Top Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.seo_report.current_keywords.slice(0, 10).map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-section rounded-lg">
                      <span className="font-medium text-heading">{keyword.word}</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {keyword.count} mentions
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitor Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Competitor Domains
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.seo_report.competitor_analysis.competitor_domains.map((domain, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-section rounded-lg">
                      <Globe className="w-4 h-4 text-body" />
                      <span className="text-heading">{domain}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.seo_report.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-section rounded-lg">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-heading">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.seo_report.next_steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-section rounded-lg">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-heading">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEO Score Progress */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>SEO Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-heading font-medium">Overall SEO Score</span>
                    <span className="text-heading font-bold">{result.seo_report.seo_score}/100</span>
                  </div>
                  <Progress value={result.seo_report.seo_score} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-heading font-medium">Content Coverage</span>
                    <span className="text-heading font-bold">{result.seo_report.content_gaps.coverage_score}/100</span>
                  </div>
                  <Progress value={result.seo_report.content_gaps.coverage_score} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen section-bg">
      {/* Header */}
      <div className="header-gradient border-b">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">SEO Keyword & Content Gap Analyzer</h1>
          <p className="text-xl text-body max-w-2xl mx-auto">
            Discover keyword opportunities, analyze content gaps, and get actionable insights to boost your website's
            SEO performance.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-heading">Start Your SEO Analysis</CardTitle>
            <p className="text-body">Enter your details below to get a comprehensive SEO report</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-heading font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url" className="text-heading font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website URL
                </Label>
                <Input
                  id="website_url"
                  name="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  required
                  className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="main_topic" className="text-heading font-medium flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Main Topic/Industry
                </Label>
                <Textarea
                  id="main_topic"
                  name="main_topic"
                  value={formData.main_topic}
                  onChange={handleInputChange}
                  placeholder="e.g., Digital Marketing, E-commerce, SaaS, Healthcare..."
                  required
                  className="min-h-[100px] border-gray-200 focus:border-primary focus:ring-primary resize-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full btn-primary h-14 text-lg">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Your Website...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze My Website
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Keyword Analysis</h3>
            <p className="text-body">Discover high-impact keywords your competitors are ranking for</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Content Gaps</h3>
            <p className="text-body">Identify missing content opportunities in your niche</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Actionable Insights</h3>
            <p className="text-body">Get specific recommendations to improve your SEO performance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
