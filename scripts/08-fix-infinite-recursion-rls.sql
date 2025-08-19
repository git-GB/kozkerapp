-- Drop all existing policies to prevent conflicts
DROP POLICY IF EXISTS "Users can view own tool usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can insert own tool usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can update own tool usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view own analytics" ON user_analytics;
DROP POLICY IF EXISTS "Users can insert own analytics" ON user_analytics;
DROP POLICY IF EXISTS "Users can update own analytics" ON user_analytics;

-- Disable RLS temporarily to clear any cached policies
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS with fresh state
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Create non-recursive RLS policies for users table
CREATE POLICY "users_select_policy" ON users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "users_insert_policy" ON users
    FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "users_update_policy" ON users
    FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Create simple policies for tool_usage table
CREATE POLICY "tool_usage_select_policy" ON tool_usage
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "tool_usage_insert_policy" ON tool_usage
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "tool_usage_update_policy" ON tool_usage
    FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Create simple policies for user_analytics table
CREATE POLICY "user_analytics_select_policy" ON user_analytics
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "user_analytics_insert_policy" ON user_analytics
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_analytics_update_policy" ON user_analytics
    FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON tool_usage TO authenticated;
GRANT SELECT, INSERT, UPDATE ON user_analytics TO authenticated;
