"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AnalyticsChart } from "./analytics-chart"
import { RecentActivity } from "./recent-activity"
import { ToolUsageStats } from "./tool-usage-stats"
import { EngagementMetrics } from "./engagement-metrics"
import { BarChart3, TrendingUp, Zap, Clock, Target, Award, Activity, Sparkles, User } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { useEffect } from "react"

interface DashboardContentProps {
  user: SupabaseUser
  profile: any
  toolUsage: any[]
}

export function DashboardContent({ user, profile, toolUsage }: DashboardContentProps) {
  useEffect(() => {
    console.log("🎯 DashboardContent Debug:")
    console.log("- User:", user?.email)
    console.log("- Profile:", profile)
    console.log("- Tool Usage Array:", toolUsage)
    console.log("- Tool Usage Length:", toolUsage?.length || 0)
    console.log("- Sample Tool Usage:", toolUsage?.[0])
  }, [user, profile, toolUsage])

  // Ensure toolUsage is an array
  const safeToolUsage = Array.isArray(toolUsage) ? toolUsage : []

  const totalActions = safeToolUsage.length
  const uniqueTools = new Set(safeToolUsage.map((usage) => usage.tool_id || usage.tool_name))
  const totalTools = uniqueTools.size
  const successfulActions = safeToolUsage.filter((usage) => usage.success === true).length
  const successRate = totalActions ? Math.round((successfulActions / totalActions) * 100) : 0

  // Calculate engagement based on tool diversity and usage frequency
  const avgEngagement = totalTools > 0 ? Math.min(Math.round((totalActions / 7) * (totalTools / 5)), 100) : 0

  // Monthly usage calculation
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthlyUsage = safeToolUsage.filter((usage) => usage.created_at && usage.created_at.startsWith(currentMonth))
  const monthlyActions = monthlyUsage.length

  // Get subscription limits
  const getUsageLimits = (tier: string) => {
    switch (tier) {
      case "premium":
        return { actions: 10000, tools: 50 }
      case "pro":
        return { actions: 1000, tools: 20 }
      default:
        return { actions: 100, tools: 5 }
    }
  }

  const limits = getUsageLimits(profile?.subscription_tier || "free")
  const usagePercentage = Math.min((monthlyActions / limits.actions) * 100, 100)

  const chartData = safeToolUsage.reduce((acc, usage) => {
    const date = usage.created_at?.split("T")[0] || new Date().toISOString().split("T")[0]
    const existing = acc.find((item) => item.date === date)
    if (existing) {
      existing.actions_performed = (existing.actions_performed || 0) + 1
      existing.successful_actions = (existing.successful_actions || 0) + (usage.success ? 1 : 0)
      if (!existing.tools_used.includes(usage.tool_name)) {
        existing.tools_used.push(usage.tool_name)
      }
    } else {
      acc.push({
        date,
        actions_performed: 1,
        successful_actions: usage.success ? 1 : 0,
        engagement_score: 75,
        tools_used: [usage.tool_name],
      })
    }
    return acc
  }, [] as any[])

  const sortedChartData = chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-30)

  const toolStats = Array.from(uniqueTools)
    .map((toolName) => {
      const toolUsages = safeToolUsage.filter((usage) => (usage.tool_id || usage.tool_name) === toolName)
      const successCount = toolUsages.filter((usage) => usage.success).length
      return {
        name: toolUsages[0]?.tool_name || toolName,
        category: toolUsages[0]?.tool_category || "general",
        count: toolUsages.length,
        successRate: toolUsages.length ? Math.round((successCount / toolUsages.length) * 100) : 0,
        lastUsed: toolUsages[0]?.created_at,
      }
    })
    .sort((a, b) => b.count - a.count)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your tool usage and engagement insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-primary to-orange-500 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            {profile?.subscription_tier || "Free"} Plan
          </Badge>
        </div>
      </div>

      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Analytics Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{profile?.full_name || profile?.email || "User"}</p>
              <p className="text-sm text-muted-foreground">User Name</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{totalActions}</p>
              <p className="text-sm text-muted-foreground">Total Actions</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{totalTools}</p>
              <p className="text-sm text-muted-foreground">Unique Tools Used</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:border-primary/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Actions</p>
                <p className="text-3xl font-bold text-primary">{totalActions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-500/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tools Used</p>
                <p className="text-3xl font-bold text-blue-600">{totalTools}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-green-500/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">{successRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-purple-500/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement</p>
                <p className="text-3xl font-bold text-purple-600">{avgEngagement}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Most Used Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          {toolStats.length > 0 ? (
            <div className="space-y-4">
              {toolStats.slice(0, 5).map((tool, index) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{tool.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{tool.count} uses</p>
                    <p className="text-sm text-green-600">{tool.successRate}% success</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tool usage data found. Start using tools to see statistics here!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monthly Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Actions this month</span>
            <span className="text-sm text-muted-foreground">
              {monthlyActions.toLocaleString()} / {limits.actions.toLocaleString()}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-3" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{usagePercentage.toFixed(1)}% used</span>
            <span>{(limits.actions - monthlyActions).toLocaleString()} remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart data={sortedChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Tool Usage Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ToolUsageStats data={sortedChartData} />
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Engagement Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EngagementMetrics data={sortedChartData} profile={profile} />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity data={safeToolUsage.slice(0, 10)} />
        </CardContent>
      </Card>
    </div>
  )
}
