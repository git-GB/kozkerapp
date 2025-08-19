"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Plus,
  Minus,
  Briefcase,
  MapPin,
  Building,
  Clock,
  DollarSign,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  ChevronDown,
  Loader2,
  Trash2,
  Eye,
  FileDown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  job_title: string
  department: string
  employment_type: string
  location: string
  salary_range: string
  experience_level: string
  job_summary: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
}

interface DynamicListProps {
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
  label: string
  icon: React.ReactNode
  note: string
}

function DynamicList({ items, onChange, placeholder, label, icon, note }: DynamicListProps) {
  const addItem = () => {
    onChange([...items, ""])
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onChange(newItems)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <Label className="text-sm font-medium">{label}</Label>
      </div>
      <p className="text-xs text-muted-foreground">{note}</p>

      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <Textarea
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] resize-none transition-all duration-200"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeItem(index)}
            className="mt-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700 transition-all duration-200"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:border-orange-700 transition-all duration-200 bg-transparent dark:bg-transparent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  )
}

export default function JobDescriptionWriter() {
  const { toast } = useToast()
  const WEBHOOK_URL = "https://n8n.srv832341.hstgr.cloud/webhook-test/job-description"
  const [formData, setFormData] = useState<FormData>({
    job_title: "",
    department: "",
    employment_type: "",
    location: "",
    salary_range: "",
    experience_level: "",
    job_summary: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [isResponseOpen, setIsResponseOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("job-description-draft")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed.formData || formData)
      } catch (e) {
        console.error("Failed to parse saved data")
      }
    }
  }, [])

  useEffect(() => {
    const dataToSave = { formData }
    localStorage.setItem("job-description-draft", JSON.stringify(dataToSave))
  }, [formData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.job_title.trim()) newErrors.job_title = "Job title is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.employment_type) newErrors.employment_type = "Employment type is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.experience_level) newErrors.experience_level = "Experience level is required"
    if (!formData.job_summary.trim()) newErrors.job_summary = "Job summary is required"
    if (formData.job_summary.length > 500) newErrors.job_summary = "Job summary must be 500 characters or less"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateSampleData = () => {
    setFormData({
      job_title: "Senior Software Engineer",
      department: "Engineering",
      employment_type: "Full-time",
      location: "San Francisco, CA",
      salary_range: "$120,000 - $160,000",
      experience_level: "Senior",
      job_summary:
        "We are seeking a talented Senior Software Engineer to join our growing engineering team. You will be responsible for designing, developing, and maintaining scalable web applications while mentoring junior developers.",
      responsibilities: [
        "Design and develop scalable web applications",
        "Collaborate with cross-functional teams",
        "Mentor junior developers",
        "Participate in code reviews",
      ],
      requirements: [
        "5+ years of software development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/GCP)",
        "Strong problem-solving skills",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
      ],
    })
    toast({
      title: "Sample data generated",
      description: "Form has been filled with sample job description data.",
    })
  }

  const clearForm = () => {
    if (confirm("Are you sure you want to clear all form data?")) {
      setFormData({
        job_title: "",
        department: "",
        employment_type: "",
        location: "",
        salary_range: "",
        experience_level: "",
        job_summary: "",
        responsibilities: [],
        requirements: [],
        benefits: [],
      })
      setResponse(null)
      setErrors({})
      localStorage.removeItem("job-description-draft")
      toast({
        title: "Form cleared",
        description: "All form data has been cleared.",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        job_title: formData.job_title,
        department: formData.department,
        employment_type: formData.employment_type,
        location: formData.location,
        salary_range: formData.salary_range || null,
        experience_level: formData.experience_level,
        job_summary: formData.job_summary,
        responsibilities:
          formData.responsibilities.filter((r) => r.trim()).length > 0
            ? formData.responsibilities.filter((r) => r.trim())
            : null,
        requirements:
          formData.requirements.filter((r) => r.trim()).length > 0
            ? formData.requirements.filter((r) => r.trim())
            : null,
        benefits:
          formData.benefits.filter((b) => b.trim()).length > 0 ? formData.benefits.filter((b) => b.trim()) : null,
      }

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const responseData = await response.text()
      let parsedResponse

      try {
        parsedResponse = JSON.parse(responseData)
      } catch {
        parsedResponse = { raw_response: responseData, status: response.status }
      }

      setResponse({
        status: response.status,
        data: parsedResponse,
        timestamp: new Date().toISOString(),
      })
      setIsResponseOpen(true)

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Job description generated successfully.",
        })
      } else {
        toast({
          title: "Submission Error",
          description: `Server responded with status ${response.status}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      setResponse({
        status: "error",
        data: { error: error instanceof Error ? error.message : "Unknown error occurred" },
        timestamp: new Date().toISOString(),
      })
      setIsResponseOpen(true)
      toast({
        title: "Network Error",
        description: "Failed to submit job description. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Job description copied to clipboard.",
    })
  }

  const downloadAsJson = () => {
    const dataStr = JSON.stringify(response, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `job-description-response-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const downloadAsPdf = async () => {
    const htmlContent = getJobDescriptionText()
    const plainTextContent = getPlainTextContent()

    if (!htmlContent && !plainTextContent && !formData.job_title) {
      toast({
        title: "Error",
        description: "No job description content available for PDF generation.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingPdf(true)

    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import("jspdf")

      // Create new PDF document
      const doc = new jsPDF()

      // Set font
      doc.setFont("helvetica")

      let yPosition = 20

      // Add title
      doc.setFontSize(22)
      doc.setTextColor(44, 62, 80) // Dark blue color
      const title = formData.job_title || "Job Description"
      doc.text(title, 20, yPosition)
      yPosition += 10

      // Add a line under title
      doc.setDrawColor(52, 152, 219) // Blue color
      doc.setLineWidth(0.8)
      doc.line(20, yPosition, 190, yPosition)
      yPosition += 15

      // Add job details in a box
      if (formData.department || formData.employment_type || formData.location || formData.experience_level) {
        doc.setFillColor(248, 249, 250) // Light gray background
        doc.rect(20, yPosition - 5, 170, 20, "F")

        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100) // Gray color

        const details = []
        if (formData.department) details.push(`Department: ${formData.department}`)
        if (formData.employment_type) details.push(`Type: ${formData.employment_type}`)
        if (formData.location) details.push(`Location: ${formData.location}`)
        if (formData.experience_level) details.push(`Experience: ${formData.experience_level}`)

        // Split details into multiple lines if too long
        const detailText = details.join(" | ")
        const detailLines = doc.splitTextToSize(detailText, 160)
        doc.text(detailLines, 25, yPosition + 5)
        yPosition += 25
      }

      // Add salary if available
      if (formData.salary_range) {
        doc.setFontSize(14)
        doc.setTextColor(39, 174, 96) // Green color
        doc.text(`💰 Salary: ${formData.salary_range}`, 20, yPosition)
        yPosition += 15
      }

      // Function to add text with proper word wrapping and spacing
      const addSection = (title: string, content: string, isHtml = false) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }

        // Add section title
        doc.setFontSize(16)
        doc.setTextColor(44, 62, 80) // Dark blue
        doc.text(title, 20, yPosition)
        yPosition += 8

        // Add underline for section
        doc.setDrawColor(52, 152, 219)
        doc.setLineWidth(0.3)
        doc.line(20, yPosition, 20 + doc.getTextWidth(title), yPosition)
        yPosition += 8

        // Process content
        let processedContent = content

        if (isHtml) {
          // Remove HTML tags and clean up content
          processedContent = content
            .replace(/<[^>]*>/g, "") // Remove HTML tags
            .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
            .replace(/&amp;/g, "&") // Replace &amp; with &
            .replace(/&lt;/g, "<") // Replace &lt; with <
            .replace(/&gt;/g, ">") // Replace &gt; with >
            .replace(/&quot;/g, '"') // Replace &quot; with "
            .replace(/&#39;/g, "'") // Replace &#39; with '
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .trim()
        }

        // Split content into paragraphs
        const paragraphs = processedContent.split("\n\n").filter((p) => p.trim())

        doc.setFontSize(11)
        doc.setTextColor(0, 0, 0) // Black

        paragraphs.forEach((paragraph, index) => {
          if (paragraph.trim()) {
            // Check if we need a new page
            if (yPosition > 270) {
              doc.addPage()
              yPosition = 20
            }

            // Handle bullet points
            if (paragraph.includes("•") || paragraph.includes("-")) {
              const lines = paragraph.split("\n").filter((line) => line.trim())
              lines.forEach((line) => {
                if (yPosition > 270) {
                  doc.addPage()
                  yPosition = 20
                }

                const cleanLine = line.trim().replace(/^[•\-*]\s*/, "• ")
                const wrappedLines = doc.splitTextToSize(cleanLine, 165)
                doc.text(wrappedLines, 25, yPosition)
                yPosition += wrappedLines.length * 5 + 2
              })
            } else {
              // Regular paragraph
              const wrappedLines = doc.splitTextToSize(paragraph.trim(), 170)
              doc.text(wrappedLines, 20, yPosition)
              yPosition += wrappedLines.length * 5 + 5
            }
          }
        })

        yPosition += 5 // Extra space after section
      }

      // If we have generated content, prioritize it
      if (plainTextContent && plainTextContent.trim()) {
        // Parse the generated content to extract sections
        const sections = parseGeneratedContent(plainTextContent)

        if (sections.summary) {
          addSection("Job Summary", sections.summary)
        }

        if (sections.responsibilities) {
          addSection("Key Responsibilities", sections.responsibilities)
        }

        if (sections.requirements) {
          addSection("Requirements & Qualifications", sections.requirements)
        }

        if (sections.benefits) {
          addSection("Benefits & Perks", sections.benefits)
        }

        // Add any additional content that wasn't categorized
        if (sections.additional) {
          addSection("Additional Information", sections.additional)
        }
      } else {
        // Fallback to form data if no generated content
        if (formData.job_summary) {
          addSection("Job Summary", formData.job_summary)
        }

        if (formData.responsibilities.filter((r) => r.trim()).length > 0) {
          const responsibilitiesText = formData.responsibilities
            .filter((r) => r.trim())
            .map((r) => `• ${r}`)
            .join("\n")
          addSection("Key Responsibilities", responsibilitiesText)
        }

        if (formData.requirements.filter((r) => r.trim()).length > 0) {
          const requirementsText = formData.requirements
            .filter((r) => r.trim())
            .map((r) => `• ${r}`)
            .join("\n")
          addSection("Requirements & Qualifications", requirementsText)
        }

        if (formData.benefits.filter((b) => b.trim()).length > 0) {
          const benefitsText = formData.benefits
            .filter((b) => b.trim())
            .map((b) => `• ${b}`)
            .join("\n")
          addSection("Benefits & Perks", benefitsText)
        }
      }

      // Add footer to all pages
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${pageCount}`, 20, 285)

        // Add company info if available (you can customize this)
        doc.text("Job Description Writer - Professional HR Tool", 20, 290)
      }

      // Generate filename
      const filename = `job-description-${formData.job_title?.replace(/[^a-z0-9]/gi, "-").toLowerCase() || "untitled"}-${Date.now()}.pdf`

      // Save the PDF
      doc.save(filename)

      toast({
        title: "PDF Downloaded Successfully!",
        description: "Complete job description has been saved as PDF file.",
      })
    } catch (error) {
      console.error("PDF generation error:", error)

      // Enhanced fallback: Create a comprehensive text file
      const textContent = generateTextContent()
      const blob = new Blob([textContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `job-description-${formData.job_title?.replace(/[^a-z0-9]/gi, "-").toLowerCase() || "untitled"}-${Date.now()}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Text File Downloaded",
        description: "Job description saved as text file (PDF generation failed).",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // Helper function to parse generated content into sections
  const parseGeneratedContent = (content: string) => {
    const sections = {
      summary: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      additional: "",
    }

    // Split content into lines for processing
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)

    let currentSection = "additional"
    let currentContent: string[] = []

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase()

      // Detect section headers
      if (lowerLine.includes("job summary") || lowerLine.includes("overview") || lowerLine.includes("description")) {
        if (currentContent.length > 0) {
          sections[currentSection as keyof typeof sections] = currentContent.join("\n")
          currentContent = []
        }
        currentSection = "summary"
      } else if (lowerLine.includes("responsibilities") || lowerLine.includes("duties") || lowerLine.includes("role")) {
        if (currentContent.length > 0) {
          sections[currentSection as keyof typeof sections] = currentContent.join("\n")
          currentContent = []
        }
        currentSection = "responsibilities"
      } else if (
        lowerLine.includes("requirements") ||
        lowerLine.includes("qualifications") ||
        lowerLine.includes("skills")
      ) {
        if (currentContent.length > 0) {
          sections[currentSection as keyof typeof sections] = currentContent.join("\n")
          currentContent = []
        }
        currentSection = "requirements"
      } else if (lowerLine.includes("benefits") || lowerLine.includes("perks") || lowerLine.includes("compensation")) {
        if (currentContent.length > 0) {
          sections[currentSection as keyof typeof sections] = currentContent.join("\n")
          currentContent = []
        }
        currentSection = "benefits"
      } else if (
        !lowerLine.match(
          /^(job summary|overview|description|responsibilities|duties|role|requirements|qualifications|skills|benefits|perks|compensation)$/i,
        )
      ) {
        // Add content to current section (skip section headers)
        currentContent.push(line)
      }
    })

    // Add remaining content
    if (currentContent.length > 0) {
      sections[currentSection as keyof typeof sections] = currentContent.join("\n")
    }

    return sections
  }

  // Helper function to generate comprehensive text content
  const generateTextContent = () => {
    const plainTextContent = getPlainTextContent()

    return `
JOB DESCRIPTION
===============

${formData.job_title || "Job Title"}

POSITION DETAILS
----------------
Department: ${formData.department || "N/A"}
Employment Type: ${formData.employment_type || "N/A"}
Location: ${formData.location || "N/A"}
Experience Level: ${formData.experience_level || "N/A"}
${formData.salary_range ? `Salary Range: ${formData.salary_range}` : ""}

${
  plainTextContent
    ? `
GENERATED JOB DESCRIPTION
========================

${plainTextContent}

`
    : ""
}

${
  formData.job_summary
    ? `
JOB SUMMARY
-----------
${formData.job_summary}

`
    : ""
}

${
  formData.responsibilities.filter((r) => r.trim()).length > 0
    ? `
KEY RESPONSIBILITIES
-------------------
${formData.responsibilities
  .filter((r) => r.trim())
  .map((r) => `• ${r}`)
  .join("\n")}

`
    : ""
}

${
  formData.requirements.filter((r) => r.trim()).length > 0
    ? `
REQUIREMENTS & QUALIFICATIONS
-----------------------------
${formData.requirements
  .filter((r) => r.trim())
  .map((r) => `• ${r}`)
  .join("\n")}

`
    : ""
}

${
  formData.benefits.filter((b) => b.trim()).length > 0
    ? `
BENEFITS & PERKS
----------------
${formData.benefits
  .filter((b) => b.trim())
  .map((b) => `• ${b}`)
  .join("\n")}

`
    : ""
}

Generated on: ${new Date().toLocaleString()}
Generated by: Job Description Writer - Professional HR Tool
  `.trim()
  }

  // Function to extract HTML content from markdown code blocks
  const extractHtmlFromMarkdown = (text: string) => {
    // Look for HTML content between \`\`\`html and \`\`\` markers
    const htmlMatch = text.match(/```html\s*([\s\S]*?)\s*```/)
    if (htmlMatch && htmlMatch[1]) {
      return htmlMatch[1].trim()
    }

    // If no HTML code blocks found, return the original text
    return text
  }

  // Function to get the job description text content
  const getJobDescriptionText = () => {
    // Handle array structure: response.data[0].text
    if (response?.data && Array.isArray(response.data) && response.data[0]?.text) {
      const rawText = response.data[0].text
      return extractHtmlFromMarkdown(rawText)
    }
    // Fallback for direct text structure
    else if (response?.data?.text) {
      const rawText = response.data.text
      return extractHtmlFromMarkdown(rawText)
    }
    return null
  }

  // Function to get plain text version for copying
  const getPlainTextContent = () => {
    const htmlContent = getJobDescriptionText()
    if (!htmlContent) return ""

    // Create a temporary div to parse HTML and extract text
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlContent
    return tempDiv.textContent || tempDiv.innerText || ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Job Description Writer
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create comprehensive, professional job descriptions with our intelligent form builder
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Job Description Details
              </CardTitle>
              <CardDescription className="text-orange-100">
                Fill in the information below to generate a comprehensive job description
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-orange-200 dark:border-orange-800 pb-2">
                    Basic Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job_title" className="flex items-center gap-2 text-sm font-medium">
                        <Briefcase className="h-4 w-4 text-orange-500" />
                        Job Title *
                      </Label>
                      <Input
                        id="job_title"
                        value={formData.job_title}
                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                        placeholder="e.g., Senior Software Engineer"
                        className={`transition-all duration-200 ${errors.job_title ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                      />
                      {errors.job_title && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.job_title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department" className="flex items-center gap-2 text-sm font-medium">
                        <Building className="h-4 w-4 text-orange-500" />
                        Department *
                      </Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g., Engineering, Marketing, Sales"
                        className={`transition-all duration-200 ${errors.department ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                      />
                      {errors.department && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.department}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4 text-orange-500" />
                        Employment Type *
                      </Label>
                      <Select
                        value={formData.employment_type}
                        onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
                      >
                        <SelectTrigger
                          className={`transition-all duration-200 ${errors.employment_type ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                        >
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.employment_type && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.employment_type}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-orange-500" />
                        Location *
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Remote, New York, NY, San Francisco, CA"
                        className={`transition-all duration-200 ${errors.location ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-orange-500" />
                        Experience Level *
                      </Label>
                      <Select
                        value={formData.experience_level}
                        onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
                      >
                        <SelectTrigger
                          className={`transition-all duration-200 ${errors.experience_level ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                        >
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry-level">Entry-level</SelectItem>
                          <SelectItem value="Mid-level">Mid-level</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Lead">Lead</SelectItem>
                          <SelectItem value="Executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.experience_level && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.experience_level}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salary_range" className="flex items-center gap-2 text-sm font-medium">
                        <DollarSign className="h-4 w-4 text-orange-500" />
                        Salary Range
                      </Label>
                      <Input
                        id="salary_range"
                        value={formData.salary_range}
                        onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                        placeholder="e.g., $80,000 - $120,000"
                        className="transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job_summary" className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-orange-500" />
                      Job Summary *
                      <Badge variant="secondary" className="text-xs">
                        {formData.job_summary.length}/500
                      </Badge>
                    </Label>
                    <Textarea
                      id="job_summary"
                      value={formData.job_summary}
                      onChange={(e) => setFormData({ ...formData, job_summary: e.target.value })}
                      placeholder="Brief description of the role and its purpose..."
                      className={`min-h-[100px] resize-none transition-all duration-200 ${errors.job_summary ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                      maxLength={500}
                    />
                    {errors.job_summary && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.job_summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-orange-200 dark:border-orange-800 pb-2">
                    Additional Details
                  </h3>

                  <DynamicList
                    items={formData.responsibilities}
                    onChange={(items) => setFormData({ ...formData, responsibilities: items })}
                    placeholder="Enter job responsibility..."
                    label="Responsibilities"
                    icon={<CheckCircle className="h-4 w-4 text-orange-500" />}
                    note="If empty, system will generate 5-7 responsibilities"
                  />

                  <DynamicList
                    items={formData.requirements}
                    onChange={(items) => setFormData({ ...formData, requirements: items })}
                    placeholder="Enter job requirement..."
                    label="Requirements"
                    icon={<User className="h-4 w-4 text-orange-500" />}
                    note="If empty, system will generate 5-6 requirements"
                  />

                  <DynamicList
                    items={formData.benefits}
                    onChange={(items) => setFormData({ ...formData, benefits: items })}
                    placeholder="Enter benefit..."
                    label="Benefits"
                    icon={<DollarSign className="h-4 w-4 text-orange-500" />}
                    note="If minimal, system will add standard benefits"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Generate Job Description
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSampleData}
                    className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:border-orange-700 transition-all duration-200 bg-transparent dark:bg-transparent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Sample Data
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                    className="transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? "Hide" : "Show"} Preview
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearForm}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700 transition-all duration-200 bg-transparent dark:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Response/Preview Section */}
          <div className="space-y-6">
            {/* Preview Card */}
            {showPreview && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Job Description Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{formData.job_title || "Job Title"}</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.department && <Badge variant="secondary">{formData.department}</Badge>}
                        {formData.employment_type && <Badge variant="secondary">{formData.employment_type}</Badge>}
                        {formData.location && <Badge variant="secondary">{formData.location}</Badge>}
                        {formData.experience_level && <Badge variant="secondary">{formData.experience_level}</Badge>}
                      </div>
                      {formData.salary_range && (
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">
                          {formData.salary_range}
                        </p>
                      )}
                    </div>

                    {formData.job_summary && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Job Summary</h3>
                        <p className="text-muted-foreground">{formData.job_summary}</p>
                      </div>
                    )}

                    {formData.responsibilities.filter((r) => r.trim()).length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Responsibilities</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {formData.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, index) => (
                              <li key={index}>{resp}</li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {formData.requirements.filter((r) => r.trim()).length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Requirements</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {formData.requirements
                            .filter((r) => r.trim())
                            .map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {formData.benefits.filter((b) => b.trim()).length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Benefits</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {formData.benefits
                            .filter((b) => b.trim())
                            .map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Response Card */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Job Description
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Your professional job description will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!response ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-orange-500" />
                    </div>
                    <p className="text-muted-foreground">Fill out the form and submit to see your job description</p>
                  </div>
                ) : (
                  <Collapsible open={isResponseOpen} onOpenChange={setIsResponseOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto mb-4">
                        <div className="flex items-center gap-2">
                          {response.status === "error" ||
                          (typeof response.status === "number" && response.status >= 400) ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          <span className="font-medium">
                            Job Description {typeof response.status === "number" ? `(${response.status})` : ""}
                          </span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isResponseOpen ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-4">
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(getPlainTextContent())}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Text
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={downloadAsPdf}
                            disabled={isGeneratingPdf}
                            className="border-red-200 hover:bg-red-50 text-red-600 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 bg-transparent dark:bg-transparent"
                          >
                            {isGeneratingPdf ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <FileDown className="h-4 w-4 mr-2" />
                                Download PDF
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={downloadAsJson}
                            className="bg-transparent dark:bg-transparent"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download JSON
                          </Button>
                        </div>

                        {/* Job Description Content */}
                        {getJobDescriptionText() ? (
                          <div className="bg-background p-6 rounded-lg border shadow-sm">
                            <div
                              className="prose max-w-none dark:prose-invert"
                              dangerouslySetInnerHTML={{ __html: getJobDescriptionText() }}
                              style={{
                                fontFamily: "Arial, sans-serif",
                                lineHeight: "1.6",
                              }}
                            />
                          </div>
                        ) : (
                          <div className="bg-muted p-4 rounded-lg border">
                            <p className="text-muted-foreground mb-2">Raw Response:</p>
                            <pre className="text-sm overflow-auto max-h-96">{JSON.stringify(response, null, 2)}</pre>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                          Response received at: {new Date(response.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
