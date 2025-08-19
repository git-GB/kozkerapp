"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Hash, MessageSquare } from "lucide-react"
import { ContentLoadingScreen } from "@/components/loading-screen"

interface FormData {
  name: string
  email: string
  postDetails: string
  targetAudience: string
  tonality: string
}

interface WebhookResponse {
  output?: string
  message?: string
  error?: string
}

export default function CaptionGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    postDetails: "",
    targetAudience: "",
    tonality: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const webhookResponse = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/caption-generator", {
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

      setFormData({
        name: "",
        email: "",
        postDetails: "",
        targetAudience: "",
        tonality: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating your caption")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <ContentLoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-4 text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center py-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-8 w-8 text-orange-500" />
            <Hash className="h-8 w-8 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
            Caption & Hashtag Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Create engaging social media captions and hashtags tailored to your audience and tone
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl animate-slide-up">
            <CardHeader className="bg-gray-100 dark:bg-zinc-800 rounded-t-lg">
              <CardTitle className="text-2xl font-poppins">Generate Your Content</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Fill in the details below to create perfect captions and hashtags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Enter your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
                  { id: "targetAudience", label: "Target Audience", type: "text", placeholder: "e.g., young professionals" },
                  { id: "tonality", label: "Tonality", type: "text", placeholder: "e.g., formal, humorous, persuasive" },
                ].map(({ id, label, type, placeholder }) => (
                  <div className="space-y-2" key={id}>
                    <Label htmlFor={id} className="font-medium font-poppins">{label}</Label>
                    <Input
                      id={id}
                      name={id}
                      type={type}
                      value={(formData as any)[id]}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 transition-all duration-300"
                      placeholder={placeholder}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="postDetails" className="font-medium font-poppins">
                    Post Details
                  </Label>
                  <Textarea
                    id="postDetails"
                    name="postDetails"
                    value={formData.postDetails}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500 transition-all duration-300 resize-none"
                    placeholder="Describe what your post is about..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Caption & Hashtags"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {error && (
              <Alert className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 animate-fade-in">
                <XCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-700 dark:text-red-100">{error}</AlertDescription>
              </Alert>
            )}

            {success && response?.output && (
              <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 animate-fade-in">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-100">
                  Caption and hashtags generated successfully!
                </AlertDescription>
              </Alert>
            )}

            {response?.output && (
              <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      {response.output.split("\n").map((line, index) => (
                        <p key={index} className="leading-relaxed mb-3 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => navigator.clipboard.writeText(response.output || "")}
                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Copy to Clipboard
                  </Button>
                </CardContent>
              </Card>
            )}

            {!response?.output && !isLoading && !error && (
              <Card className="bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex items-center gap-2 mb-4 opacity-50">
                    <MessageSquare className="h-8 w-8 text-gray-400" />
                    <Hash className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Your generated content will appear here</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Fill out the form and click generate to get started
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
