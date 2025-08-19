// Database migration utilities for ai.kozker.com
// Ensures database compatibility with existing kozker.com data

export const migrationQueries = {
  // Verify existing tables from kozker.com
  checkExistingTables: `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('users', 'user_sessions', 'tool_usage', 'user_analytics');
  `,

  // Create missing tables if they don't exist (should not be needed)
  createUsersTable: `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      full_name TEXT DEFAULT '',
      avatar_url TEXT,
      onboarding_completed BOOLEAN DEFAULT false,
      subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
      subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled')),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  createUserSessionsTable: `
    CREATE TABLE IF NOT EXISTS user_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      session_token TEXT NOT NULL,
      device_info JSONB DEFAULT '{}',
      ip_address INET,
      user_agent TEXT,
      expires_at TIMESTAMPTZ NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  createToolUsageTable: `
    CREATE TABLE IF NOT EXISTS tool_usage (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      tool_name TEXT NOT NULL,
      action_type TEXT NOT NULL,
      input_data JSONB DEFAULT '{}',
      output_data JSONB DEFAULT '{}',
      metadata JSONB DEFAULT '{}',
      success BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  createUserAnalyticsTable: `
    CREATE TABLE IF NOT EXISTS user_analytics (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      event_name TEXT NOT NULL,
      event_data JSONB DEFAULT '{}',
      page_url TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  // RLS policies - SAME AS KOZKER.COM
  enableRLS: `
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
    ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
    ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
  `,

  createRLSPolicies: `
    -- Users table policies
    CREATE POLICY "Users can view own profile" ON users
      FOR SELECT USING (auth.uid() = id);
    
    CREATE POLICY "Users can update own profile" ON users
      FOR UPDATE USING (auth.uid() = id);

    -- User sessions policies
    CREATE POLICY "Users can view own sessions" ON user_sessions
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert own sessions" ON user_sessions
      FOR INSERT WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update own sessions" ON user_sessions
      FOR UPDATE USING (auth.uid() = user_id);

    -- Tool usage policies
    CREATE POLICY "Users can view own tool usage" ON tool_usage
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert own tool usage" ON tool_usage
      FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- User analytics policies
    CREATE POLICY "Users can view own analytics" ON user_analytics
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert own analytics" ON user_analytics
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  `,

  // Indexes for performance - SAME AS KOZKER.COM
  createIndexes: `
    CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active);
    CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
    CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON tool_usage(tool_name);
    CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at);
    CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_analytics_event_name ON user_analytics(event_name);
    CREATE INDEX IF NOT EXISTS idx_user_analytics_created_at ON user_analytics(created_at);
  `,
}

export const runMigrations = async () => {
  // This function would be called during deployment to ensure database compatibility
  console.log("Database migrations for ai.kozker.com - using same database as kozker.com")
  console.log("All user data, tool usage, and analytics will be preserved")
}
