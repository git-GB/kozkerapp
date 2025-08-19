"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, XCircle, Calendar, Users, Briefcase, Copy, Clock, Target, Zap } from "lucide-react"

interface FormData {
  name: string
  email: string
  projectName: string
  description: string
  startDate: string
  endDate: string
  teamSize: string
  projectType: string
}

interface Task {
  id: number
  name: string
  duration: number
  start: string
  end: string
  resource: string
  dependencies: number[]
}

interface Phase {
  phase: string
  start: string
  end: string
  duration: number
  tasks: number[]
}

interface Milestone {
  name: string
  date: string
  type: string
}

interface TimelineData {
  tasks: Task[]
  timeline: Phase[]
  milestones: Milestone[]
  gantt_data?: any
  critical_path?: number[]
}

interface WebhookResponse {
  success?: boolean
  message?: string
  timeline?: any
  output?: string
  [key: string]: any
}

export default function ProjectTimelineBuilder() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    teamSize: "",
    projectType: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<WebhookResponse | null>(null)
  const [parsedTimeline, setParsedTimeline] = useState<TimelineData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const parseTimelineOutput = (output: string): TimelineData | null => {
    try {
      // Extract JSON from markdown code block
      const jsonMatch = output.match(/```json\n([\s\S]*?)\n```/)
      let parsedData

      if (jsonMatch && jsonMatch[1]) {
        parsedData = JSON.parse(jsonMatch[1])
      } else {
        // Try parsing directly if no code block
        parsedData = JSON.parse(output)
      }

      // Validate and normalize the data structure
      if (parsedData && typeof parsedData === "object") {
        return {
          tasks: Array.isArray(parsedData.tasks) ? parsedData.tasks : [],
          timeline: Array.isArray(parsedData.timeline) ? parsedData.timeline : [],
          milestones: Array.isArray(parsedData.milestones) ? parsedData.milestones : [],
          gantt_data: parsedData.gantt_data || null,
          critical_path: Array.isArray(parsedData.critical_path) ? parsedData.critical_path : [],
        }
      }

      return null
    } catch (error) {
      console.error("Failed to parse timeline output:", error)
      return null
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResponse(null)
    setParsedTimeline(null)

    try {
      const webhookUrl = "https://n8n.srv832341.hstgr.cloud/webhook/project timeline builder"

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data)

      // Parse the timeline data
      if (data) {
        let timelineOutput = null

        // Handle different response structures
        if (Array.isArray(data) && data[0]?.output) {
          timelineOutput = data[0].output
        } else if (data.output) {
          timelineOutput = data.output
        } else if (typeof data === "string") {
          timelineOutput = data
        }

        if (timelineOutput) {
          const parsed = parseTimelineOutput(timelineOutput)
          if (parsed) {
            setParsedTimeline(parsed)
          }
        }
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while submitting the form")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      teamSize: "",
      projectType: "",
    })
    setResponse(null)
    setParsedTimeline(null)
    setError(null)
    setIsSubmitted(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 p-8 rounded-2xl mb-6 border border-gray-200 dark:border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">Project Timeline Builder</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-inter">
              Create intelligent project timelines based on your requirements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-gray-50 dark:bg-[#111111] border-gray-200 dark:border-gray-800 shadow-lg animate-slide-up">
            <CardHeader className="text-center bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 rounded-t-lg border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2 font-poppins">
                <Calendar className="h-6 w-6 text-orange-500" />
                Project Details
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-inter">
                Fill in your project information to generate a timeline
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 dark:text-white font-semibold font-inter">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-white font-semibold font-inter">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-gray-900 dark:text-white font-semibold font-inter">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter"
                    placeholder="Enter your project name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-900 dark:text-white font-semibold font-inter">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 min-h-[100px] text-gray-900 dark:text-white font-inter"
                    placeholder="Describe your project goals and requirements..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-gray-900 dark:text-white font-semibold font-inter">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-gray-900 dark:text-white font-semibold font-inter">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="teamSize"
                      className="text-gray-900 dark:text-white font-semibold font-inter flex items-center gap-2"
                    >
                      <Users className="h-4 w-4 text-orange-500" />
                      Team Size
                    </Label>
                    <Input
                      id="teamSize"
                      type="text"
                      value={formData.teamSize}
                      onChange={(e) => handleInputChange("teamSize", e.target.value)}
                      className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter"
                      placeholder="e.g., 5 members"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="projectType"
                      className="text-gray-900 dark:text-white font-semibold font-inter flex items-center gap-2"
                    >
                      <Briefcase className="h-4 w-4 text-orange-500" />
                      Project Type
                    </Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                    >
                      <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white font-inter">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                        <SelectItem value="Development" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">Development</SelectItem>
                        <SelectItem value="Marketing" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">Marketing</SelectItem>
                        <SelectItem value="Design" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">Design</SelectItem>
                        <SelectItem value="Research" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">Research</SelectItem>
                        <SelectItem value="Consulting" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">Consulting</SelectItem>
                        <SelectItem value="Other" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-inter"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Timeline...
                    </>
                  ) : (
                    "Generate Project Timeline"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response Section */}
          <Card className="bg-gray-50 dark:bg-[#111111] border-gray-200 dark:border-gray-800 shadow-lg animate-slide-up-delay">
            <CardHeader className="text-center bg-gradient-to-r from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-900 rounded-t-lg border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-2xl text-gray-900 dark:text-white font-poppins">Timeline Response</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-inter">
                Your generated project timeline will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] p-6">
              {isLoading && (
                <div className="text-center flex items-center justify-center h-full">
                  <div>
                    <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-inter">Processing your request...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center flex items-center justify-center h-full">
                  <div>
                    <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 dark:text-red-400 mb-4 font-inter">Error: {error}</p>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-inter font-semibold bg-transparent dark:bg-transparent"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {parsedTimeline && !error && (
                <div className="w-full space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-green-600 dark:text-green-400 font-semibold font-inter">Timeline Generated Successfully!</p>
                  </div>

                  {/* Project Phases */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        Project Phases
                      </h3>
                      <Button
                        onClick={() => copyToClipboard(JSON.stringify(parsedTimeline, null, 2))}
                        variant="outline"
                        size="sm"
                        className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-inter bg-transparent dark:bg-transparent"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      {parsedTimeline.timeline && parsedTimeline.timeline.length > 0 ? (
                        parsedTimeline.timeline.map((phase, index) => (
                          <div key={index} className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900 dark:text-white font-poppins">{phase.phase}</h4>
                              <span className="text-sm text-gray-600 dark:text-gray-400 font-inter">{phase.duration} days</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-inter">
                              {formatDate(phase.start)} - {formatDate(phase.end)}
                            </p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs font-inter mt-1">
                              Tasks: {Array.isArray(phase.tasks) ? phase.tasks.join(", ") : "N/A"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                          <p className="text-gray-500 dark:text-gray-400 font-inter">No timeline phases available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-500" />
                      Key Milestones
                    </h3>
                    <div className="grid gap-3">
                      {parsedTimeline.milestones && parsedTimeline.milestones.length > 0 ? (
                        parsedTimeline.milestones.map((milestone, index) => (
                          <div key={index} className="bg-white dark:bg-zinc-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900 dark:text-white font-inter">{milestone.name}</h4>
                              <span className="text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded font-inter">
                                {milestone.type}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-inter mt-1">{formatDate(milestone.date)}</p>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                          <p className="text-gray-500 dark:text-gray-400 font-inter">No milestones available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tasks Summary */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      Tasks Overview ({parsedTimeline.tasks ? parsedTimeline.tasks.length : 0} total)
                    </h3>
                    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm max-h-96 overflow-y-auto">
                      {parsedTimeline.tasks && parsedTimeline.tasks.length > 0 ? (
                        parsedTimeline.tasks.map((task, index) => (
                          <div
                            key={task.id}
                            className={`p-3 ${index !== parsedTimeline.tasks.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white font-inter text-sm">
                                {task.id}. {task.name}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                                {task.duration} day{task.duration !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-inter">
                              <span>
                                {formatDate(task.start)} - {formatDate(task.end)}
                              </span>
                              <span className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">{task.resource}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="text-gray-500 dark:text-gray-400 font-inter">No tasks available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Raw Response Fallback */}
                  {!parsedTimeline && response && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">Raw Response</h3>
                      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <pre className="text-gray-600 dark:text-gray-300 text-sm overflow-auto max-h-64 whitespace-pre-wrap">
                          {JSON.stringify(response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-inter font-semibold bg-transparent dark:bg-transparent"
                    >
                      Create New Timeline
                    </Button>
                  </div>
                </div>
              )}

              {!isLoading && !error && !parsedTimeline && (
                <div className="text-center flex items-center justify-center h-full">
                  <div>
                    <Calendar className="h-16 w-16 text-orange-300 dark:text-orange-600 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-600 dark:text-gray-400 font-inter">Fill out the form to generate your project timeline</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
