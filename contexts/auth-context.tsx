"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { authRateLimiter } from "@/lib/security/rate-limiter"
import { sessionManager, startActivityTracking, stopActivityTracking } from "@/lib/security/session-manager"
import { errorHandler, getSafeErrorMessage } from "@/lib/security/error-handler"
import { performanceMonitor } from "@/lib/security/performance-monitor"
import { validateAndSanitize, signInSchema, signUpSchema } from "@/lib/security/input-validation"

// Types for our auth context
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) {
          errorHandler.logError(error, "get_initial_session")
        } else {
          setSession(session)
          setUser(session?.user ?? null)

          if (session?.user) {
            sessionManager.createSession(session.user.id, session.user.email || "")
            startActivityTracking()
          }
        }
      } catch (error) {
        errorHandler.logError(error as Error, "get_initial_session")
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
        // Track user session in our custom table
        if (session?.user) {
          await trackUserSession(session.user)
          sessionManager.createSession(session.user.id, session.user.email || "")
          startActivityTracking()
        }
      } else if (event === "SIGNED_OUT") {
        // Clear any local state
        setUser(null)
        setSession(null)
        sessionManager.clearSession()
        stopActivityTracking()
      }
    })

    return () => {
      subscription.unsubscribe()
      stopActivityTracking()
    }
  }, [])

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
        ip_address: null, // Will be set by server
        user_agent: navigator.userAgent,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        is_active: true,
      })
    } catch (error) {
      errorHandler.logError(error as Error, "track_user_session", user.id)
    }
  }

  // Sign up with email and password
  const signUp = useCallback(async (email: string, password: string, metadata?: any) => {
    if (!isSupabaseConfigured) {
      return { error: new Error("Supabase not configured") as AuthError }
    }

    // Validate input
    const validation = validateAndSanitize(signUpSchema, { email, password, fullName: metadata?.full_name })
    if (!validation.success) {
      return { error: new Error(validation.errors[0]) as AuthError }
    }

    // Check rate limit
    const rateLimitResult = authRateLimiter.attempt(email, "signup")
    if (!rateLimitResult.allowed) {
      const error = new Error("Too many signup attempts. Please try again later.") as AuthError
      errorHandler.logError(error, "signup_rate_limit", undefined)
      return { error }
    }

    try {
      const startTime = performance.now()

      const { data, error } = await supabase.auth.signUp({
        email: validation.data.email,
        password: validation.data.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: metadata || {},
        },
      })

      performanceMonitor.recordMetric("auth_signup", performance.now() - startTime)

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

        // Reset rate limit on success
        authRateLimiter.reset(email, "signup")
      } else if (error) {
        errorHandler.logError(error, "signup_error", undefined)
      }

      return { error }
    } catch (error) {
      errorHandler.logError(error as Error, "signup_exception", undefined)
      return { error: new Error(getSafeErrorMessage(error)) as AuthError }
    }
  }, [])

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error("Supabase not configured") as AuthError }
    }

    // Validate input
    const validation = validateAndSanitize(signInSchema, { email, password })
    if (!validation.success) {
      return { error: new Error(validation.errors[0]) as AuthError }
    }

    // Check rate limit
    const rateLimitResult = authRateLimiter.attempt(email, "signin")
    if (!rateLimitResult.allowed) {
      const error = new Error("Too many login attempts. Please try again later.") as AuthError
      errorHandler.logError(error, "signin_rate_limit", undefined)
      return { error }
    }

    try {
      const startTime = performance.now()

      const { error } = await supabase.auth.signInWithPassword({
        email: validation.data.email,
        password: validation.data.password,
      })

      performanceMonitor.recordMetric("auth_signin", performance.now() - startTime)

      if (!error) {
        // Reset rate limit on success
        authRateLimiter.reset(email, "signin")
      } else {
        errorHandler.logError(error, "signin_error", undefined)
      }

      return { error }
    } catch (error) {
      errorHandler.logError(error as Error, "signin_exception", undefined)
      return { error: new Error(getSafeErrorMessage(error)) as AuthError }
    }
  }, [])

  // Sign in with Google OAuth
  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) {
      return { error: new Error("Supabase not configured") as AuthError }
    }

    try {
      const startTime = performance.now()

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      performanceMonitor.recordMetric("auth_google_signin", performance.now() - startTime)

      if (error) {
        errorHandler.logError(error, "google_signin_error", undefined)
      }

      return { error }
    } catch (error) {
      errorHandler.logError(error as Error, "google_signin_exception", undefined)
      return { error: new Error(getSafeErrorMessage(error)) as AuthError }
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
      sessionManager.clearSession()
      stopActivityTracking()
      router.push("/")
    } catch (error) {
      errorHandler.logError(error as Error, "signout_error", session?.user.id)
    }
  }, [session, router])

  // Update user profile
  const updateProfile = useCallback(
    async (updates: any) => {
      if (!isSupabaseConfigured || !user) {
        return { error: new Error("Not authenticated") as AuthError }
      }

      try {
        const startTime = performance.now()

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

        performanceMonitor.recordMetric("profile_update", performance.now() - startTime, user.id)

        if (profileError) {
          errorHandler.logError(profileError, "profile_update_error", user.id)
        }

        return { error: profileError }
      } catch (error) {
        errorHandler.logError(error as Error, "profile_update_exception", user.id)
        return { error: new Error(getSafeErrorMessage(error)) as AuthError }
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
