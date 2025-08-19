import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { env } from "@/lib/env"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export const supabase = createClientComponentClient({
  supabaseUrl: env.SUPABASE_URL,
  supabaseKey: env.SUPABASE_ANON_KEY,
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
      cookieOptions: {
        name: "kozker-auth-token",
        domain: env.ENABLE_CROSS_DOMAIN_AUTH ? `.${env.PARENT_DOMAIN}` : undefined,
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: false,
        secure: true,
        sameSite: "lax",
      },
    },
    global: {
      headers: {
        "X-Client-Info": "kozker-ai-tools",
      },
    },
  },
})

export const crossDomainAuth = {
  // Store auth state in localStorage for cross-domain access
  storeAuthState: (session: any) => {
    if (typeof window !== "undefined" && session) {
      localStorage.setItem(
        "kozker-auth-session",
        JSON.stringify({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
          user: session.user,
        }),
      )
    }
  },

  // Retrieve auth state from localStorage
  getStoredAuthState: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kozker-auth-session")
      return stored ? JSON.parse(stored) : null
    }
    return null
  },

  // Clear stored auth state
  clearStoredAuthState: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kozker-auth-session")
    }
  },

  // Sync auth state across domains using postMessage
  syncAuthState: (session: any) => {
    if (typeof window !== "undefined" && env.ENABLE_CROSS_DOMAIN_AUTH) {
      // Send auth state to parent domain
      window.parent.postMessage(
        {
          type: "KOZKER_AUTH_SYNC",
          session: session,
          domain: window.location.hostname,
        },
        `https://${env.PARENT_DOMAIN}`,
      )
    }
  },
}
