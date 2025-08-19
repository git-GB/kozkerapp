-- Create tool_usage table for tracking tool interactions with tool IDs
CREATE TABLE IF NOT EXISTS tool_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tool_id TEXT NOT NULL, -- Unique identifier for each tool
  tool_name TEXT NOT NULL, -- Human readable tool name
  tool_category TEXT DEFAULT 'general', -- Category for grouping tools
  session_id TEXT, -- Track usage sessions
  metadata JSONB DEFAULT '{}', -- Store additional tool-specific data
  usage_duration INTEGER DEFAULT 0, -- Duration in seconds
  success BOOLEAN DEFAULT true, -- Whether the tool usage was successful
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own tool usage" ON tool_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tool usage" ON tool_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_id ON tool_usage(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_category ON tool_usage(tool_category);
