"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"
import { Loader2, Upload, Save, Lock, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface ProfileFormProps {
  user: SupabaseUser
  profile: any
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)

  // <CHANGE> Fixed username display to match dashboard analytics summary logic
  const [readOnlyData] = useState({
    full_name: profile?.full_name || profile?.email || "User",
  })

  const [editableData, setEditableData] = useState({
    phone: "",
    bio: "",
    location: "",
    website_url: "",
    avatar_url: "",
  })

  const { updateProfile } = useAuth()

  // <CHANGE> Load profile data from separate user_profiles table
  useEffect(() => {
    loadUserProfile()
  }, [user.id])

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setUserProfile(data)
        setEditableData({
          phone: data.phone || "",
          bio: data.bio || "",
          location: data.location || "",
          website_url: data.website_url || "",
          avatar_url: data.avatar_url || "",
        })
      }
    } catch (error) {
      console.log('No existing profile found, will create new one')
    }
  }

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (editableData.phone || editableData.bio || editableData.location || editableData.website_url) {
        handleAutoSave()
      }
    }, 2000) // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer)
  }, [editableData.phone, editableData.bio, editableData.location, editableData.website_url])

  const handleEditableChange = (field: string, value: string) => {
    setEditableData((prev) => ({ ...prev, [field]: value }))
    if (message) setMessage(null)
  }

  // <CHANGE> Updated auto-save to use separate user_profiles table
  const handleAutoSave = async () => {
    try {
      const { error } = await supabase.from("user_profiles").upsert(
        {
          user_id: user.id,
          phone: editableData.phone,
          bio: editableData.bio,
          location: editableData.location,
          website_url: editableData.website_url,
          avatar_url: editableData.avatar_url,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )

      if (!error) {
        // Show subtle success indicator without disrupting user
        setMessage({ type: "success", text: "Changes saved automatically" })
        setTimeout(() => setMessage(null), 2000)
      }
    } catch (error: any) {
      console.error("Auto-save error:", error)
    }
  }

  // <CHANGE> Temporarily disabled avatar upload functionality
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Temporarily disabled due to storage bucket issues
    setMessage({ type: "error", text: "Photo upload is temporarily disabled. Using default avatar." })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // <CHANGE> Updated to use separate user_profiles table
      const { error: profileError } = await supabase.from("user_profiles").upsert(
        {
          user_id: user.id,
          phone: editableData.phone,
          bio: editableData.bio,
          location: editableData.location,
          website_url: editableData.website_url,
          avatar_url: editableData.avatar_url,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )

      if (profileError) throw profileError

      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (error: any) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success/Error Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Avatar Upload */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Profile Picture</Label>
        <div className="flex items-center gap-6">
          {/* <CHANGE> Using default avatar with user icon, disabled upload temporarily */}
          <Avatar className="h-20 w-20 border-2 border-gray-200">
            <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            {/* <CHANGE> Temporarily disabled upload button */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed opacity-50">
              <Upload className="h-4 w-4" />
              <span>Upload Temporarily Disabled</span>
            </div>
            <p className="text-xs text-muted-foreground">Using default profile avatar for now.</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm font-medium flex items-center gap-2">
            Full Name
            <Lock className="h-3 w-3 text-muted-foreground" />
          </Label>
          <Input
            id="full_name"
            type="text"
            value={readOnlyData.full_name}
            readOnly
            disabled
            className="h-11 bg-gray-50 text-gray-600 cursor-not-allowed font-medium"
          />
          <p className="text-xs text-muted-foreground">
            This information is from your registration and cannot be changed.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={editableData.phone}
            onChange={(e) => handleEditableChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            value={editableData.location}
            onChange={(e) => handleEditableChange("location", e.target.value)}
            placeholder="City, Country"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website_url" className="text-sm font-medium">
            Website
          </Label>
          <Input
            id="website_url"
            type="url"
            value={editableData.website_url}
            onChange={(e) => handleEditableChange("website_url", e.target.value)}
            placeholder="https://yourwebsite.com"
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={editableData.bio}
          onChange={(e) => handleEditableChange("bio", e.target.value)}
          placeholder="Tell us about yourself..."
          className="min-h-[100px] resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">{editableData.bio.length}/500 characters</p>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="px-8 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Changes to phone, location, website, and bio are automatically saved as you type.
        </p>
      </div>
    </form>
  )
}
