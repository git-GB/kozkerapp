#!/usr/bin/env node

// Test database connection for AI Kozker migration
// Verifies that ai.kozker.com can connect to the same database as kozker.com

const { createClient } = require("@supabase/supabase-js")

async function testDatabaseConnection() {
  console.log("🔍 Testing Database Connection...")
  console.log("================================")

  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase environment variables")
    process.exit(1)
  }

  try {
    // Test with anon key
    console.log("Testing with anonymous key...")
    const supabaseAnon = createClient(supabaseUrl, supabaseKey)

    const { data: anonTest, error: anonError } = await supabaseAnon.from("users").select("count").limit(1)

    if (anonError && anonError.code !== "PGRST116") {
      console.error("❌ Anonymous connection failed:", anonError.message)
      process.exit(1)
    }

    console.log("✅ Anonymous connection successful")

    // Test with service role key (if available)
    if (serviceRoleKey) {
      console.log("Testing with service role key...")
      const supabaseService = createClient(supabaseUrl, serviceRoleKey)

      const { data: serviceTest, error: serviceError } = await supabaseService.from("users").select("count").limit(1)

      if (serviceError) {
        console.error("❌ Service role connection failed:", serviceError.message)
        process.exit(1)
      }

      console.log("✅ Service role connection successful")
    }

    // Test table existence
    console.log("Verifying required tables...")
    const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseKey)

    const requiredTables = ["users", "user_sessions", "tool_usage", "user_analytics"]

    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select("*").limit(1)

        if (error && error.code !== "PGRST116") {
          console.error(`❌ Table '${table}' not accessible:`, error.message)
          process.exit(1)
        }

        console.log(`✅ Table '${table}' accessible`)
      } catch (err) {
        console.error(`❌ Error checking table '${table}':`, err.message)
        process.exit(1)
      }
    }

    console.log("")
    console.log("🎉 Database Connection Test Passed!")
    console.log("==================================")
    console.log("✅ All required tables are accessible")
    console.log("✅ Authentication is working")
    console.log("✅ Ready for ai.kozker.com deployment")
  } catch (error) {
    console.error("❌ Database connection test failed:", error.message)
    process.exit(1)
  }
}

// Run the test
testDatabaseConnection()
