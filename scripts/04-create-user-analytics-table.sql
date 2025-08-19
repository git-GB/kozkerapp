-- Create user_analytics table for comprehensive user insights
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_sessions INTEGER DEFAULT 0,
  total_time_spent_minutes INTEGER DEFAULT 0,
  tools_used JSONB DEFAULT '[]',
  actions_performed INTEGER DEFAULT 0,
  successful_actions INTEGER DEFAULT 0,
  failed_actions INTEGER DEFAULT 0,
  unique_tools_count INTEGER DEFAULT 0,
  peak_activity_hour INTEGER,
  device_types JSONB DEFAULT '[]',
  locations JSONB DEFAULT '[]',
  referral_sources JSONB DEFAULT '[]',
  conversion_events JSONB DEFAULT '[]',
  engagement_score DECIMAL(5,2) DEFAULT 0.0,
  retention_score DECIMAL(5,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_date ON user_analytics(date);
CREATE INDEX IF NOT EXISTS idx_user_analytics_engagement_score ON user_analytics(engagement_score);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_date ON user_analytics(user_id, date);

-- Create trigger for updated_at
CREATE TRIGGER update_user_analytics_updated_at BEFORE UPDATE ON user_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
