"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, BarChart3, Database, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { ContentLoadingScreen } from "@/components/loading-screen" // Import the loading screen


interface FormData {
  name: string
  email: string
  files: File[]
}

interface SubmissionState {
  isLoading: boolean
  success: boolean
  error: string | null
  result: string | null
}

export default function DataAnalyzer() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    files: [],
  })

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isLoading: false,
    success: false,
    error: null,
    result: null,
  })

  const [dragActive, setDragActive] = useState(false)

  if (submissionState.isLoading) {    
    return < ContentLoadingScreen />  }     
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const csvFiles = files.filter((file) => file.type === "text/csv" || file.name.endsWith(".csv"))

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...csvFiles],
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const csvFiles = files.filter((file) => file.type === "text/csv" || file.name.endsWith(".csv"))

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...csvFiles],
    }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", files: [] })
    setSubmissionState({ isLoading: false, success: false, error: null, result: null })
  }

  const extractAnalysisOutput = (responseText: string): string => {
    try {
      // Parse the JSON response from n8n
      const jsonResponse = JSON.parse(responseText)

      // Extract the output from the n8n response structure
      if (Array.isArray(jsonResponse) && jsonResponse[0]?.output) {
        return jsonResponse[0].output
      } else if (jsonResponse.output) {
        return jsonResponse.output
      } else {
        return responseText
      }
    } catch (error) {
      console.error("Error parsing response:", error)
      return responseText
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || formData.files.length === 0) {
      setSubmissionState((prev) => ({
        ...prev,
        error: "Please fill in all fields and upload at least one CSV file.",
      }))
      return
    }

    setSubmissionState({
      isLoading: true,
      success: false,
      error: null,
      result: null,
    })

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)

      // Add each file with the expected field name format from n8n
      formData.files.forEach((file, index) => {
        formDataToSend.append(`Please_upload_the_CSV_file_${index}`, file)
      })

      const response = await fetch("https://n8n.srv832341.hstgr.cloud/webhook/data-cleanse", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        const responseText = await response.text()
        const analysisOutput = extractAnalysisOutput(responseText)

        setSubmissionState({
          isLoading: false,
          success: true,
          error: null,
          result: analysisOutput,
        })
      } else {
        throw new Error(`Server responded with status: ${response.status}`)
      }
    } catch (error) {
      setSubmissionState({
        isLoading: false,
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        result: null,
      })
    }
  }


        
  const formatAnalysisOutput = (output: string) => {
    // Split the output into sections and format them
    const sections = output.split(/###\s*\d+\.\s*/)

    return sections
      .map((section, index) => {
        if (index === 0 && section.trim()) {
          // This is the introduction paragraph before the first section
          return (
            <div key={index} className="mb-6">
              <p className="text-body leading-relaxed">{section.trim()}</p>
            </div>
          )
        }

        if (!section.trim()) return null

        // Extract section title and content
        const lines = section.trim().split("\n")
        const title = lines[0]?.replace(/[*:]/g, "").trim()
        const content = lines.slice(1).join("\n").trim()

        // Determine section icon and color based on title
        let icon = <Database className="w-5 h-5 text-primary" />
        let bgColor = "bg-blue-50"
        let borderColor = "border-blue-200"

        if (title?.toLowerCase().includes("anomalies")) {
          icon = <AlertTriangle className="w-5 h-5 text-yellow-500" />
          bgColor = "bg-yellow-50"
          borderColor = "border-yellow-200"
        } else if (title?.toLowerCase().includes("star schema")) {
          icon = <BarChart3 className="w-5 h-5 text-purple-500" />
          bgColor = "bg-purple-50"
          borderColor = "border-purple-200"
        }

        return (
          <Card key={index} className={`border-gray-200 mb-6`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-heading font-heading">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${bgColor} ${borderColor} border rounded-lg p-4`}>
                <div className="space-y-3">
                  {content.split("\n").map((line, lineIndex) => {
                    const trimmedLine = line.trim()

                    if (!trimmedLine) return <div key={lineIndex} className="h-2" />

                    // Handle table headers (bold text with **)
                    if (trimmedLine.includes("**") && trimmedLine.includes("Table:**")) {
                      return (
                        <h4 key={lineIndex} className="font-semibold text-heading font-heading mt-4 mb-2 text-lg">
                          {trimmedLine.replace(/\*\*/g, "").replace(" Table:", " Table")}
                        </h4>
                      )
                    }

                    // Handle other bold text
                    if (trimmedLine.includes("**")) {
                      return (
                        <h5 key={lineIndex} className="font-semibold text-heading font-heading mt-3 mb-1">
                          {trimmedLine.replace(/\*\*/g, "")}
                        </h5>
                      )
                    }

                    // Handle bullet points with code formatting
                    if (trimmedLine.startsWith("- ") && trimmedLine.includes(":")) {
                      const parts = trimmedLine.substring(2).split(":")
                      const fieldName = parts[0].trim()
                      const description = parts.slice(1).join(":").trim()

                      return (
                        <div key={lineIndex} className="flex items-start gap-3 py-1">
                          <span className="text-primary font-bold">•</span>
                          <div className="flex-1">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary mr-2">
                              {fieldName}
                            </code>
                            <span className="text-body">{description}</span>
                          </div>
                        </div>
                      )
                    }

                    // Handle regular bullet points
                    if (trimmedLine.startsWith("- ")) {
                      return (
                        <div key={lineIndex} className="flex items-start gap-3 py-1">
                          <span className="text-primary font-bold">•</span>
                          <span className="text-body flex-1">{trimmedLine.substring(2)}</span>
                        </div>
                      )
                    }

                    // Handle numbered lists
                    if (trimmedLine.match(/^\d+\.\s/)) {
                      const match = trimmedLine.match(/^(\d+)\.\s(.*)/)
                      if (match) {
                        return (
                          <div key={lineIndex} className="flex items-start gap-3 py-1">
                            <span className="text-primary font-semibold text-sm bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                              {match[1]}
                            </span>
                            <span className="text-body flex-1">{match[2]}</span>
                          </div>
                        )
                      }
                    }

                    // Handle regular paragraphs
                    return (
                      <p key={lineIndex} className="text-body leading-relaxed">
                        {trimmedLine}
                      </p>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })
      .filter(Boolean)
  }

  const renderAnalysisResults = () => {
    if (!submissionState.result) return null

    return (
      <div className="space-y-6">
        <div className="text-center space-y-4 py-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-semibold text-heading font-heading">Analysis Complete!</h3>
          <p className="text-body">Your CSV files have been analyzed successfully. Here are the complete results:</p>
        </div>

        {/* Complete Analysis Output */}
        <div className="space-y-6">{formatAnalysisOutput(submissionState.result)}</div>

        <div className="text-center pt-6">
          <Button
            onClick={resetForm}
            className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Analyze Another Dataset
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <div className="bg-header-gradient border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-heading font-heading">Star Schema Data Cleanser</h1>
            <p className="text-lg text-body max-w-2xl mx-auto">
              Upload your CSV files for intelligent data analysis and schema optimization powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg border-gray-200">
          <CardContent className="p-8">
            {submissionState.success && submissionState.result ? (
              renderAnalysisResults()
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submissionState.error && (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{submissionState.error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-heading font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-heading font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-heading font-medium">CSV Files Upload</Label>

                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".csv"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-heading text-lg mb-2 font-medium">Drop your CSV files here or click to browse</p>
                    <p className="text-body text-sm">Supports multiple CSV files for comprehensive analysis</p>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-heading text-sm font-medium">Selected Files ({formData.files.length}):</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {formData.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-section rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-heading text-sm truncate font-medium">{file.name}</span>
                              <span className="text-body text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-body hover:text-heading hover:bg-gray-100 h-8 w-8 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submissionState.isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {submissionState.isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing Data...
                    </>
                  ) : (
                    "Start Data Analysis"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-body text-sm">Powered by AI • Secure data processing • Star schema optimization</p>
        </div>
      </div>
    </div>
  )
}
