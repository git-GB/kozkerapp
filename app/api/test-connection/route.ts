import { createServerClient } from '@supabase/ssr'
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    // Test user authentication
    const { data: userData, error: userError } = await supabase.auth.getUser()

    console.log("🧪 API Test - User Auth:", {
      hasUser: !!userData.user,
      userId: userData.user?.id,
      userError: userError?.message,
    })

    if (!userData.user) {
      return NextResponse.json({
        success: false,
        error: "No authenticated user",
        count: 0,
        debug: { userError: userError?.message },
      })
    }

    const serviceRoleClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    // Test with regular client first
    const { data: toolUsageRegular, error: toolErrorRegular } = await supabase
      .from("tool_usage")
      .select("id, tool_name, created_at")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    // Test with service role client
    const { data: toolUsageService, error: toolErrorService } = await serviceRoleClient
      .from("tool_usage")
      .select("id, tool_name, created_at")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    console.log("🧪 API Test - Regular Client:", {
      toolError: toolErrorRegular?.message,
      toolErrorDetails: toolErrorRegular?.details,
      toolUsageCount: toolUsageRegular?.length || 0,
    })

    console.log("🧪 API Test - Service Role Client:", {
      toolError: toolErrorService?.message,
      toolErrorDetails: toolErrorService?.details,
      toolUsageCount: toolUsageService?.length || 0,
      sampleData: toolUsageService?.slice(0, 2),
    })

    // Test users table with service role
    const { data: userProfile, error: profileError } = await serviceRoleClient
      .from("users")
      .select("id, email, full_name")
      .eq("id", userData.user.id)
      .single()

    console.log("🧪 API Test - User Profile Query:", {
      profileError: profileError?.message,
      hasProfile: !!userProfile,
    })

    return NextResponse.json({
      success: !toolErrorService,
      error: toolErrorService?.message || null,
      count: toolUsageService?.length || 0,
      userId: userData.user.id,
      debug: {
        regularClientError: toolErrorRegular?.message,
        serviceRoleError: toolErrorService?.message,
        regularCount: toolUsageRegular?.length || 0,
        serviceCount: toolUsageService?.length || 0,
        profileError: profileError?.message,
        hasProfile: !!userProfile,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    })
  } catch (error) {
    console.error("🚨 API Test Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      count: 0,
      debug: { catchError: error instanceof Error ? error.message : "Unknown error" },
    })
  }
}
