"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"

interface FormattedOutputProps {
  title?: string
  content: string
  type?: "html" | "text" | "markdown"
  showCopyButton?: boolean
  showDownloadButton?: boolean
  className?: string
}

export function FormattedOutput({
  title = "Generated Content",
  content,
  type = "text",
  showCopyButton = true,
  showDownloadButton = false,
  className = "",
}: FormattedOutputProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadContent = () => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const renderContent = () => {
    switch (type) {
      case "html":
        return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      case "markdown":
        return (
          <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg overflow-auto">{content}</pre>
        )
      default:
        return <div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
    }
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex gap-2">
          {showCopyButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-transparent"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          )}
          {showDownloadButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadContent}
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-auto border rounded-lg p-4 bg-white">{renderContent()}</div>
      </CardContent>
    </Card>
  )
}

export default FormattedOutput
