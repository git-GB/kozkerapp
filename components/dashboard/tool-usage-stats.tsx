"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface ToolUsageStatsProps {
  data: any[]
}

export function ToolUsageStats({ data }: ToolUsageStatsProps) {
  // Calculate tool usage frequency
  const toolUsage = data.reduce(
    (acc, day) => {
      const tools = day.tools_used || []
      tools.forEach((tool: string) => {
        acc[tool] = (acc[tool] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(toolUsage)
    .map(([tool, count]) => ({
      name: tool,
      value: count,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6) // Top 6 tools

  const COLORS = ["#ff6e30", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {chartData.map((tool, index) => (
          <div key={tool.name} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="truncate">{tool.name}</span>
            <span className="text-muted-foreground ml-auto">{tool.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
