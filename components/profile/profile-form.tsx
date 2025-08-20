"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"
import { Loader2, Upload, Save } from "lucide-react"
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
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    website_url: profile?.website_url || "",
    avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || "",
  })

  const { updateProfile } = useAuth()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (message) setMessage(null)
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setMessage(null)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `avatars/${user.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

      setFormData((prev) => ({ ...prev, avatar_url: data.publicUrl }))
      setMessage({ type: "success", text: "Avatar uploaded successfully!" })
    } catch (error: any) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
        },
      })

      if (authError) throw authError

      // Update profile in our custom table
      const { error: profileError } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          phone: formData.phone,
          location: formData.location,
          website_url: formData.website_url,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      setMessage({ type: "success", text: "Profile updated successfully!" })

      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.reload()
      }, 1500)
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
          <Avatar className="h-20 w-20 border-2 border-gray-200">
            <AvatarImage src={formData.avatar_url || "/placeholder.svg"} alt={formData.full_name} />
            <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary to-orange-500 text-white">
              {(formData.full_name || user.email || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
              </div>
            </Label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={(e) => handleInputChange("full_name", e.target.value)}
            placeholder="Enter your full name"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
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
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
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
            value={formData.website_url}
            onChange={(e) => handleInputChange("website_url", e.target.value)}
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
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Tell us about yourself..."
          className="min-h-[100px] resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">{formData.bio.length}/500 characters</p>
      </div>

      {/* Submit Button */}
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
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
