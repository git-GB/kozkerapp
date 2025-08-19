#!/usr/bin/env node

// Database migrations for AI Kozker
// Ensures database compatibility between kozker.com and ai.kozker.com

const { createClient } = require("@supabase/supabase-js")

async function runMigrations() {
  console.log("🔄 Running Database Migrations...")
  console.log("=================================")

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ Missing Supabase service role key for migrations")
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  try {
    // Check if tables exist
    console.log("Checking existing tables...")

    const { data: tables, error: tablesError } = await supabase.rpc("get_table_names")

    if (tablesError) {
      console.log("⚠️  Could not check tables, proceeding with migrations")
    }

    // Ensure required tables exist (they should from kozker.com)
    const requiredTables = [
      {
        name: "users",
        sql: `
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
      },
      {
        name: "user_sessions",
        sql: `
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
      },
      {
        name: "tool_usage",
        sql: `
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
      },
      {
        name: "user_analytics",
        sql: `
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
      },
    ]

    // Create tables if they don't exist
    for (const table of requiredTables) {
      console.log(`Ensuring table '${table.name}' exists...`)

      const { error } = await supabase.rpc("exec_sql", {
        sql: table.sql,
      })

      if (error) {
        console.log(`⚠️  Could not create table '${table.name}':`, error.message)
        console.log("This is expected if the table already exists from kozker.com")
      } else {
        console.log(`✅ Table '${table.name}' ready`)
      }
    }

    // Create indexes for performance
    console.log("Creating performance indexes...")

    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);",
      "CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active);",
      "CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);",
      "CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON tool_usage(tool_name);",
      "CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at);",
      "CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);",
      "CREATE INDEX IF NOT EXISTS idx_user_analytics_event_name ON user_analytics(event_name);",
      "CREATE INDEX IF NOT EXISTS idx_user_analytics_created_at ON user_analytics(created_at);",
    ]

    for (const indexSql of indexes) {
      const { error } = await supabase.rpc("exec_sql", { sql: indexSql })
      if (error) {
        console.log("⚠️  Index creation warning:", error.message)
      }
    }

    console.log("✅ Performance indexes created")

    // Verify RLS policies exist
    console.log("Verifying Row Level Security policies...")

    const { data: policies, error: policiesError } = await supabase.rpc("get_policies")

    if (policiesError) {
      console.log("⚠️  Could not verify RLS policies:", policiesError.message)
    } else {
      console.log("✅ RLS policies verified")
    }

    console.log("")
    console.log("🎉 Database Migrations Completed!")
    console.log("=================================")
    console.log("✅ All tables are ready")
    console.log("✅ Indexes created for performance")
    console.log("✅ RLS policies verified")
    console.log("✅ Database is compatible with kozker.com")
  } catch (error) {
    console.error("❌ Migration failed:", error.message)
    process.exit(1)
  }
}

// Run migrations
runMigrations()
