"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileForm } from "./profile-form"
import { SecuritySettings } from "./security-settings"
import { PrivacySettings } from "./privacy-settings"
import { SubscriptionSettings } from "./subscription-settings"
import { User, Settings, Shield, CreditCard, Crown, Calendar, Mail, Phone, MapPin, Globe } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface ProfileContentProps {
  user: SupabaseUser
  profile: any
}

export function ProfileContent({ user, profile }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState("profile")

  const getSubscriptionBadge = (tier: string) => {
    switch (tier) {
      case "premium":
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )
      case "pro":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        )
      default:
        return <Badge variant="secondary">Free</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="border-2 bg-gradient-to-br from-primary/5 to-orange-50 dark:from-orange-900/10 dark:to-zinc-900">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src={profile?.avatar_url || user.user_metadata?.avatar_url}
                  alt={profile?.full_name || user.email || ""}
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-orange-500 text-white">
                  {(profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "U")
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {profile?.email_verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                </h1>
                {getSubscriptionBadge(profile?.subscription_tier || "free")}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile?.website_url && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>

              {profile?.bio && <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{profile.bio}</p>}

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Member since {formatDate(profile?.created_at || user.created_at)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm user={user} profile={profile} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SecuritySettings user={user} profile={profile} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PrivacySettings user={user} profile={profile} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription & Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriptionSettings user={user} profile={profile} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
