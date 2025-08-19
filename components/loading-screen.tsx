"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, BarChart3, Search, Target, TrendingUp, Zap, Brain, Globe } from "lucide-react"

interface LoadingScreenProps {
  title?: string
  subtitle?: string
  messages?: string[]
  icon?: React.ReactNode
  progress?: number
  showProgress?: boolean
}

const defaultMessages = [
  "Analyzing your website content...",
  "Scanning for SEO opportunities...",
  "Checking competitor strategies...",
  "Identifying content gaps...",
  "Processing keyword data...",
  "Generating insights...",
  "Preparing your report...",
  "Almost ready!",
]

export function LoadingScreen({
  title = "Analyzing Your Website",
  subtitle = "This may take 30-60 seconds. Please don't close this window.",
  messages = defaultMessages,
  icon,
  progress,
  showProgress = false,
}: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [dots, setDots] = useState("")

  // Cycle through messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 3000)

    return () => clearInterval(messageInterval)
  }, [messages.length])

  // Animate dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(dotInterval)
  }, [])

  const defaultIcon = (
    <div className="relative">
      <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
        <BarChart3 className="w-10 h-10 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
        <Loader2 className="w-4 h-4 text-white animate-spin" />
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">{icon || defaultIcon}</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-heading mb-2">{title}</h2>
        {/* Subtitle */}
        <p className="text-body mb-8">{subtitle}</p>

        {/* Progress Bar */}
        {showProgress && typeof progress === "number" && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-body mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Message */}
        <div className="bg-section rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-primary font-medium">Processing</span>
          </div>
          <p className="text-heading font-medium">
            {messages[currentMessageIndex]}
            <span className="text-primary">{dots}</span>
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center gap-6 opacity-60">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-body">Keywords</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-body">Content</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs text-body">Insights</span>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">⚠️ Please keep this window open while we analyze your website</p>
        </div>
      </div>
    </div>
  )
}

// Specialized loading screens for different tools
export function SEOLoadingScreen() {
  return (
    <LoadingScreen
      title="SEO Analysis in Progress"
      subtitle="We're analyzing your website's SEO performance and competitors"
      messages={[
        "Crawling your website content...",
        "Analyzing keyword density...",
        "Checking competitor rankings...",
        "Identifying content gaps...",
        "Scanning for technical SEO issues...",
        "Generating keyword opportunities...",
        "Preparing actionable insights...",
        "Finalizing your SEO report...",
      ]}
      icon={
        <div className="relative">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
            <Search className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
        </div>
      }
    />
  )
}

export function ContentLoadingScreen() {
  return (
    <LoadingScreen
      title="Generating Content"
      subtitle="Our AI is crafting high-quality content for you"
      messages={[
        "Understanding your requirements...",
        "Researching your topic...",
        "Generating creative ideas...",
        "Writing compelling content...",
        "Optimizing for SEO...",
        "Adding final touches...",
        "Quality checking...",
        "Almost ready!",
      ]}
      icon={
        <div className="relative">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>
      }
    />
  )
}

export function WebsiteLoadingScreen() {
  return (
    <LoadingScreen
      title="Analyzing Website"
      subtitle="We're scanning your website for insights and opportunities"
      messages={[
        "Connecting to your website...",
        "Scanning page structure...",
        "Analyzing user experience...",
        "Checking mobile responsiveness...",
        "Testing page speed...",
        "Reviewing content quality...",
        "Generating recommendations...",
        "Preparing your report...",
      ]}
      icon={
        <div className="relative">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
            <Loader2 className="w-4 h-4 text-white" />
          </div>
        </div>
      }
    />
  )
}
