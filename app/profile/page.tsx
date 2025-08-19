import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function ProfilePage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile data
  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return (
    <div className="container mx-auto py-8">
      <ProfileContent user={user} profile={profile} />
    </div>
  )
}
