"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, BarChart3, Target, TrendingUp } from "lucide-react"

interface UserAnalyticsSummaryProps {
  userAnalytics: any[]
  profile: any
  allTimeUsage: any[]
}

export function UserAnalyticsSummary({ userAnalytics, profile, allTimeUsage }: UserAnalyticsSummaryProps) {
  // Get the latest analytics record
  const latestAnalytics = userAnalytics?.[0]

  // Calculate user-specific statistics
  const totalToolsUsed = new Set(allTimeUsage.map((usage) => usage.tool_id || usage.tool_name)).size
  const totalActions = allTimeUsage.length
  const userName = profile?.full_name || profile?.email || "User"

  // Get most used tools
  const toolUsageCount = allTimeUsage.reduce(
    (acc, usage) => {
      const toolName = usage.tool_name || usage.tool_id
      acc[toolName] = (acc[toolName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topTools = Object.entries(toolUsageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          User Analytics Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{userName}</h3>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {profile?.subscription_tier || "Free"} Plan
          </Badge>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{totalActions}</p>
            <p className="text-xs text-muted-foreground">Total Actions</p>
          </div>

          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{totalToolsUsed}</p>
            <p className="text-xs text-muted-foreground">Tools Used</p>
          </div>

          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {latestAnalytics?.success_rate ? Math.round(latestAnalytics.success_rate * 100) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
        </div>

        {/* Top Tools */}
        <div>
          <h4 className="font-medium mb-3">Most Used Tools</h4>
          <div className="space-y-2">
            {topTools.map(([toolName, count], index) => (
              <div key={toolName} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">#{index + 1}</span>
                  <span className="text-sm">{toolName}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {count} uses
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
