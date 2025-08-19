"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface ConnectionTestProps {
  userId: string
  userEmail: string
}

export function ConnectionTest({ userId, userEmail }: ConnectionTestProps) {
  const [testResults, setTestResults] = useState<{
    auth: "loading" | "success" | "error"
    database: "loading" | "success" | "error"
    toolUsage: "loading" | "success" | "error"
    count: number
  }>({
    auth: "loading",
    database: "loading",
    toolUsage: "loading",
    count: 0,
  })

  useEffect(() => {
    async function runTests() {
      // Test 1: Auth is working (we have user data)
      setTestResults((prev) => ({ ...prev, auth: userId ? "success" : "error" }))

      // Test 2: Database connection
      try {
        const response = await fetch("/api/test-connection")
        const result = await response.json()
        setTestResults((prev) => ({
          ...prev,
          database: result.success ? "success" : "error",
          count: result.count || 0,
          toolUsage: result.count > 0 ? "success" : "error",
        }))
      } catch (error) {
        console.error("Connection test failed:", error)
        setTestResults((prev) => ({
          ...prev,
          database: "error",
          toolUsage: "error",
        }))
      }
    }

    runTests()
  }, [userId])

  const getStatusIcon = (status: "loading" | "success" | "error") => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: "loading" | "success" | "error") => {
    switch (status) {
      case "loading":
        return <Badge variant="secondary">Testing...</Badge>
      case "success":
        return <Badge className="bg-green-500">Connected</Badge>
      case "error":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  return (
    <Card className="border-2 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
      <CardHeader>
        <CardTitle className="text-yellow-800 dark:text-yellow-200">Connection Diagnostics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.auth)}
              <span className="font-medium">Authentication</span>
            </div>
            {getStatusBadge(testResults.auth)}
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.database)}
              <span className="font-medium">Database</span>
            </div>
            {getStatusBadge(testResults.database)}
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.toolUsage)}
              <span className="font-medium">Tool Usage Data</span>
            </div>
            {getStatusBadge(testResults.toolUsage)}
          </div>
        </div>

        <div className="text-sm text-yellow-700 dark:text-yellow-300">
          <p>
            <strong>User:</strong> {userEmail} ({userId})
          </p>
          <p>
            <strong>Tool Usage Records:</strong> {testResults.count}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
