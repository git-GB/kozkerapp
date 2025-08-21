import { createServerClient } from '@supabase/ssr'
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { ConnectionTest } from "@/components/dashboard/connection-test"

export default async function DashboardPage() {
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

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  console.log("🔍 Dashboard Debug - User:", user?.id, user?.email)
  console.log("🔍 Dashboard Debug - User Error:", userError)

  if (!user) {
    redirect("/auth/login")
  }

  try {
    const serviceRoleClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    console.log("🔍 Dashboard Debug - Using service role client")

    const [profileResult, toolUsageResult] = await Promise.all([
      serviceRoleClient.from("users").select("*").eq("id", user.id).single(),
      serviceRoleClient.from("tool_usage").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ])

    console.log("🔍 Dashboard Debug - Profile Query:", profileResult)
    console.log("🔍 Dashboard Debug - Tool Usage Query:", toolUsageResult)
    console.log("🔍 Dashboard Debug - Tool Usage Count:", toolUsageResult.data?.length || 0)

    const profile = profileResult.data
    const toolUsage = toolUsageResult.data || []

    // If no profile exists, create one
    if (!profile && !profileResult.error) {
      console.log("🔍 Dashboard Debug - Creating user profile")
      const { data: newProfile } = await serviceRoleClient
        .from("users")
        .insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          subscription_tier: "free",
        })
        .select()
        .single()

      console.log("🔍 Dashboard Debug - New Profile Created:", newProfile)
    }

    return (
      <div className="container mx-auto py-8 space-y-6">
        <ConnectionTest userId={user.id} userEmail={user.email || ""} />

        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">Debug Info:</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            User ID: {user.id} | Email: {user.email} | Tool Usage Records: {toolUsage.length}
          </p>
          <div className="mt-2 text-xs text-blue-500 dark:text-blue-400">
            <p>Profile Error: {profileResult.error?.message || "None"}</p>
            <p>Tool Usage Error: {toolUsageResult.error?.message || "None"}</p>
            <p>Service Role Key Available: {process.env.SUPABASE_SERVICE_ROLE_KEY ? "Yes" : "No"}</p>
          </div>
        </div>

        <DashboardContent
          user={user}
          profile={
            profile || {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
              subscription_tier: "free",
            }
          }
          toolUsage={toolUsage}
        />
      </div>
    )
  } catch (error) {
    console.error("🚨 Dashboard Error:", error)
    return (
      <div className="container mx-auto py-8">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h3 className="font-semibold text-red-800 dark:text-red-200">Error Loading Dashboard</h3>
          <p className="text-sm text-red-600 dark:text-red-300">
            Please check the console for details. Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    )
  }
}
