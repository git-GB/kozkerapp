"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Target, Zap, Award } from "lucide-react"

interface EngagementMetricsProps {
  data: any[]
  profile: any
}

export function EngagementMetrics({ data, profile }: EngagementMetricsProps) {
  // Calculate metrics
  const recentData = data.slice(0, 7) // Last 7 days
  const previousData = data.slice(7, 14) // Previous 7 days

  const currentAvgEngagement = recentData.length
    ? recentData.reduce((sum, day) => sum + (day.engagement_score || 0), 0) / recentData.length
    : 0

  const previousAvgEngagement = previousData.length
    ? previousData.reduce((sum, day) => sum + (day.engagement_score || 0), 0) / previousData.length
    : 0

  const engagementTrend = currentAvgEngagement - previousAvgEngagement

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600"
    if (trend < 0) return "text-red-600"
    return "text-gray-600"
  }

  // Calculate streaks and achievements
  const consecutiveDays = data.reduce((streak, day, index) => {
    if (day.actions_performed > 0) {
      return index === 0 || data[index - 1]?.actions_performed > 0 ? streak + 1 : 1
    }
    return 0
  }, 0)

  const totalUniqueTools = new Set(data.flatMap((day) => day.tools_used || [])).size

  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Engagement</p>
              <p className="text-2xl font-bold">{Math.round(currentAvgEngagement)}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Target className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {getTrendIcon(engagementTrend)}
            <span className={`text-sm ${getTrendColor(engagementTrend)}`}>
              {Math.abs(engagementTrend).toFixed(1)} vs last week
            </span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Streak</p>
              <p className="text-2xl font-bold">{consecutiveDays}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-full">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">consecutive days</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tools Mastered</p>
              <p className="text-2xl font-bold">{totalUniqueTools}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">unique tools used</p>
        </Card>
      </div>

      {/* Engagement Level */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Engagement Level</h3>
            <Badge
              className={
                currentAvgEngagement >= 80
                  ? "bg-green-100 text-green-700 border-green-200"
                  : currentAvgEngagement >= 60
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : currentAvgEngagement >= 40
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
              }
            >
              {currentAvgEngagement >= 80
                ? "Highly Engaged"
                : currentAvgEngagement >= 60
                  ? "Well Engaged"
                  : currentAvgEngagement >= 40
                    ? "Moderately Engaged"
                    : "Getting Started"}
            </Badge>
          </div>
          <Progress value={Math.min(currentAvgEngagement, 100)} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Insights & Recommendations</h3>
        <div className="space-y-3">
          {currentAvgEngagement < 50 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                Try exploring more tools to increase your engagement score. Each new tool you use adds to your variety
                bonus!
              </p>
            </div>
          )}
          {consecutiveDays >= 7 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                Great job! You've maintained a {consecutiveDays}-day streak. Consistency is key to mastering our tools.
              </p>
            </div>
          )}
          {totalUniqueTools >= 10 && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-700">
                Impressive! You've used {totalUniqueTools} different tools. You're becoming a power user!
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
