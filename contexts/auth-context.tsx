"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured, crossDomainAuth } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { env } from "@/lib/env"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<{ error: AuthError | null }>
  isConfigured: boolean
  syncWithMainDomain: () => Promise<void>
  checkCrossDomainAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkCrossDomainAuth = useCallback(async (): Promise<boolean> => {
    if (!env.ENABLE_CROSS_DOMAIN_AUTH) return false

    try {
      // Check for stored auth state from main domain
      const storedAuth = crossDomainAuth.getStoredAuthState()
      if (storedAuth && storedAuth.access_token) {
        // Verify the stored session is still valid
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(storedAuth.access_token)
        if (user && !error) {
          setUser(user)
          setSession(storedAuth)
          return true
        }
      }
    } catch (error) {
      console.error("Cross-domain auth check failed:", error)
    }
    return false
  }, [])

  const syncWithMainDomain = useCallback(async () => {
    if (!env.ENABLE_CROSS_DOMAIN_AUTH || !session) return

    try {
      crossDomainAuth.storeAuthState(session)
      crossDomainAuth.syncAuthState(session)
    } catch (error) {
      console.error("Failed to sync with main domain:", error)
    }
  }, [session])

  // Initialize auth state
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        // First check for cross-domain auth
        const hasCrossDomainAuth = await checkCrossDomainAuth()

        if (!hasCrossDomainAuth) {
          // Fall back to regular session check
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession()
          if (error) {
            console.error("Error getting session:", error)
          } else {
            setSession(session)
            setUser(session?.user ?? null)

            if (session) {
              crossDomainAuth.storeAuthState(session)
            }
          }
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Handle different auth events
      if (event === "SIGNED_IN") {
        if (session?.user) {
          await trackUserSession(session.user)
          crossDomainAuth.storeAuthState(session)
          crossDomainAuth.syncAuthState(session)
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setSession(null)
        crossDomainAuth.clearStoredAuthState()
      }
    })

    const handleCrossDomainMessage = (event: MessageEvent) => {
      if (event.origin !== `https://${env.PARENT_DOMAIN}`) return

      if (event.data.type === "KOZKER_AUTH_UPDATE") {
        const { session: newSession } = event.data
        if (newSession) {
          setSession(newSession)
          setUser(newSession.user)
          crossDomainAuth.storeAuthState(newSession)
        } else {
          setSession(null)
          setUser(null)
          crossDomainAuth.clearStoredAuthState()
        }
      }
    }

    if (env.ENABLE_CROSS_DOMAIN_AUTH) {
      window.addEventListener("message", handleCrossDomainMessage)
    }

    return () => {
      subscription.unsubscribe()
      if (env.ENABLE_CROSS_DOMAIN_AUTH) {
        window.removeEventListener("message", handleCrossDomainMessage)
      }
    }
  }, [checkCrossDomainAuth])

  // Track user session in our custom table
  const trackUserSession = async (user: User) => {
    try {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      await supabase.from("user_sessions").insert({
        user_id: user.id,
        session_token: Math.random().toString(36).substring(2, 15),
        device_info: deviceInfo,
        ip_address: null,
        user_agent: navigator.userAgent,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        is_active: true,
      })
    } catch (error) {
      console.error("Error tracking user session:", error)
    }
  }

  // Sign up with email and password
  const signUp = useCallback(async (email: string, password: string, metadata?: any) => {
    if (!isSupabaseConfigured) {
      return { error: new Error("Supabase not configured") as AuthError }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: env.AUTH_REDIRECT_URL,
          data: metadata || {},
        },
      })

      if (!error && data.user) {
        // Create user profile in our custom table
        await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email,
          full_name: metadata?.full_name || "",
          avatar_url: data.user.user_metadata?.avatar_url || "",
          onboarding_completed: false,
          subscription_tier: "free",
          subscription_status: "active",
        })
      }

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }, [])

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error("Supabase not configured") as AuthError }
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }, [])

  // Sign in with Google OAuth
  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) {
      return { error: new Error("Supabase not configured") as AuthError }
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: env.AUTH_REDIRECT_URL,
        },
      })

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return

    try {
      // Update session as inactive before signing out
      if (session) {
        await supabase
          .from("user_sessions")
          .update({ is_active: false })
          .eq("user_id", session.user.id)
          .eq("is_active", true)
      }

      await supabase.auth.signOut()
      crossDomainAuth.clearStoredAuthState()

      if (env.ENABLE_CROSS_DOMAIN_AUTH) {
        crossDomainAuth.syncAuthState(null)
      }

      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }, [session, router])

  // Update user profile
  const updateProfile = useCallback(
    async (updates: any) => {
      if (!isSupabaseConfigured || !user) {
        return { error: new Error("Not authenticated") as AuthError }
      }

      try {
        // Update auth user metadata
        const { error: authError } = await supabase.auth.updateUser({
          data: updates,
        })

        if (authError) return { error: authError }

        // Update our custom users table
        const { error: profileError } = await supabase
          .from("users")
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

        return { error: profileError }
      } catch (error) {
        return { error: error as AuthError }
      }
    },
    [user],
  )

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    isConfigured: isSupabaseConfigured,
    syncWithMainDomain,
    checkCrossDomainAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push("/auth/login")
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    return <Component {...props} />
  }
}
