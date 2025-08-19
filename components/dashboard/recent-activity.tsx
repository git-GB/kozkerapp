"use client"

import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, XCircle, Clock, Zap } from "lucide-react"

interface RecentActivityProps {
  data: any[]
}

export function RecentActivity({ data }: RecentActivityProps) {
  const getActionIcon = (success: boolean) => {
    return success ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
  }

  const getToolBadgeColor = (toolName: string) => {
    const colors = [
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-green-100 text-green-700 border-green-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-orange-100 text-orange-700 border-orange-200",
      "bg-pink-100 text-pink-700 border-pink-200",
    ]
    const hash = toolName.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No recent activity to show</p>
        <p className="text-sm">Start using our tools to see your activity here!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((activity, index) => (
        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex-shrink-0">{getActionIcon(activity.success)}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={getToolBadgeColor(activity.tool_name)}>{activity.tool_name}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm font-medium">{activity.action_type}</span>
            </div>

            {activity.error_message && <p className="text-sm text-red-600 mb-1">{activity.error_message}</p>}

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}</span>
              {activity.duration_ms && (
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {activity.duration_ms}ms
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
