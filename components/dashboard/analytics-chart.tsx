"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsChartProps {
  data: any[]
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  // Prepare chart data
  const chartData = data
    .slice(-14) // Last 14 days
    .map((day) => ({
      date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      actions: day.actions_performed || 0,
      engagement: day.engagement_score || 0,
      tools: day.unique_tools_count || 0,
    }))
    .reverse()

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="actions"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            name="Actions"
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            name="Engagement"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
