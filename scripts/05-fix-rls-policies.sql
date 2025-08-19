-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own tool usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can insert own tool usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view own analytics" ON user_analytics;
DROP POLICY IF EXISTS "Users can insert own analytics" ON user_analytics;
DROP POLICY IF EXISTS "Users can update own analytics" ON user_analytics;

-- Enable RLS on all tables
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for tool_usage table
CREATE POLICY "Users can view own tool usage" ON tool_usage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tool usage" ON tool_usage
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tool usage" ON tool_usage
    FOR UPDATE USING (auth.uid() = user_id);

-- Create proper RLS policies for users table
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Create proper RLS policies for user_analytics table
CREATE POLICY "Users can view own analytics" ON user_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON user_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics" ON user_analytics
    FOR UPDATE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON tool_usage TO authenticated;
GRANT SELECT, INSERT, UPDATE ON users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON user_analytics TO authenticated;
