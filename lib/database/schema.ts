// Database schema definitions - SAME AS KOZKER.COM
// This ensures we're using identical table structures

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  onboarding_completed: boolean
  subscription_tier: "free" | "pro" | "enterprise"
  subscription_status: "active" | "inactive" | "cancelled"
  created_at: string
  updated_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  device_info: any
  ip_address?: string
  user_agent: string
  expires_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ToolUsage {
  id: string
  user_id: string
  tool_name: string
  action_type: string
  input_data: any
  output_data: any
  metadata: any
  success: boolean
  created_at: string
}

export interface UserAnalytics {
  id: string
  user_id: string
  event_name: string
  event_data: any
  page_url: string
  user_agent: string
  created_at: string
}

// Database table names - SAME AS KOZKER.COM
export const DB_TABLES = {
  USERS: "users",
  USER_SESSIONS: "user_sessions",
  TOOL_USAGE: "tool_usage",
  USER_ANALYTICS: "user_analytics",
} as const

// Database policies and RLS settings
export const DB_POLICIES = {
  // Users can only access their own data
  USER_ACCESS: "Users can only access their own records",

  // Tool usage tracking
  TOOL_USAGE_INSERT: "Users can insert their own tool usage",
  TOOL_USAGE_SELECT: "Users can select their own tool usage",

  // Analytics tracking
  ANALYTICS_INSERT: "Users can insert their own analytics",
  ANALYTICS_SELECT: "Users can select their own analytics",

  // Session management
  SESSION_MANAGEMENT: "Users can manage their own sessions",
} as const
