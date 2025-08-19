-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- User sessions policies
CREATE POLICY "Users can view own sessions" ON user_sessions
    FOR SELECT USING (auth.uid() = user_id);

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

CREATE POLICY "Service role can manage all data" ON users
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all sessions" ON user_sessions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all tool usage" ON tool_usage
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all analytics" ON user_analytics
    FOR ALL USING (auth.role() = 'service_role');
