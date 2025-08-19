"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase/client"
import { Eye, Mail, Bell, Users } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface PrivacySettingsProps {
  user: SupabaseUser
  profile: any
}

export function PrivacySettings({ user, profile }: PrivacySettingsProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [settings, setSettings] = useState({
    profile_visibility: profile?.privacy_settings?.profile_visibility || "public",
    email_notifications: profile?.privacy_settings?.email_notifications ?? true,
    marketing_emails: profile?.privacy_settings?.marketing_emails ?? false,
    analytics_tracking: profile?.privacy_settings?.analytics_tracking ?? true,
    data_sharing: profile?.privacy_settings?.data_sharing ?? false,
  })

  const handleSettingChange = async (key: string, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)

    try {
      const { error } = await supabase
        .from("users")
        .update({
          privacy_settings: newSettings,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      setMessage({ type: "success", text: "Privacy settings updated successfully!" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error: any) {
      setMessage({ type: "error", text: error.message })
    }
  }

  return (
    <div className="space-y-6">
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

      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Visibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Public Profile</p>
              <p className="text-sm text-muted-foreground">Allow others to see your profile information</p>
            </div>
            <Switch
              checked={settings.profile_visibility === "public"}
              onCheckedChange={(checked) => handleSettingChange("profile_visibility", checked ? "public" : "private")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Communication Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive important updates and notifications</p>
            </div>
            <Switch
              checked={settings.email_notifications}
              onCheckedChange={(checked) => handleSettingChange("email_notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Receive promotional content and product updates</p>
            </div>
            <Switch
              checked={settings.marketing_emails}
              onCheckedChange={(checked) => handleSettingChange("marketing_emails", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Data & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Analytics Tracking</p>
              <p className="text-sm text-muted-foreground">Help us improve our services with usage analytics</p>
            </div>
            <Switch
              checked={settings.analytics_tracking}
              onCheckedChange={(checked) => handleSettingChange("analytics_tracking", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Sharing</p>
              <p className="text-sm text-muted-foreground">Share anonymized data with trusted partners</p>
            </div>
            <Switch
              checked={settings.data_sharing}
              onCheckedChange={(checked) => handleSettingChange("data_sharing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Your Data</p>
              <p className="text-sm text-muted-foreground">Download a copy of all your data</p>
            </div>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
