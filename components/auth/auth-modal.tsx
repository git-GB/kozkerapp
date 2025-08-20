"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Mail, Lock, User, Chrome, X, Sparkles, Zap, Shield } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "signin" | "signup"
  trigger?: "auto" | "manual"
}

export function AuthModal({ isOpen, onClose, defaultMode = "signin", trigger = "manual" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  })

  const { signIn, signUp, signInWithGoogle, isConfigured } = useAuth()

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setError(null)
      setSuccess(null)
      setFormData({ email: "", password: "", fullName: "" })
    }
  }, [isOpen, mode])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConfigured) {
      setError("Authentication is not configured")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === "signin") {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setError(error.message)
        } else {
          setSuccess("Successfully signed in!")
          setTimeout(() => onClose(), 1500)
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
        })
        if (error) {
          setError(error.message)
        } else {
          setSuccess("Account created! Please check your email to verify your account.")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    if (!isConfigured) {
      setError("Authentication is not configured")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null) // Clear error when user starts typing
  }

  if (!isConfigured) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Authentication Unavailable</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-muted-foreground">Authentication is not configured. Please contact support.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-orange-500 p-6 text-white">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Welcome to Kozker</h2>
            </div>

            {trigger === "auto" && (
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Zap className="h-3 w-3 mr-1" />
                Special Offer Inside
              </Badge>
            )}

            <p className="text-white/90 text-sm">
              {mode === "signin"
                ? "Sign in to access your dashboard and tools"
                : "Join thousands of businesses transforming with AI"}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Success/Error Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 bg-transparent"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Chrome className="h-5 w-5 mr-2 text-blue-500" />
            )}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="pl-10 h-12"
                    required={mode === "signup"}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 h-12"
                  required
                  minLength={mode === "signup" ? 6 : undefined}
                />
              </div>
              {mode === "signup" && (
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  {mode === "signin" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <Shield className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Mode Toggle */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-medium text-primary hover:text-primary/80"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>Fast Setup</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Free Tools</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
