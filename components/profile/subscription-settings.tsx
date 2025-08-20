"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, CreditCard, Calendar, Check, ArrowRight } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface SubscriptionSettingsProps {
  user: SupabaseUser
  profile: any
}

export function SubscriptionSettings({ user, profile }: SubscriptionSettingsProps) {
  const currentTier = profile?.subscription_tier || "free"
  const subscriptionStatus = profile?.subscription_status || "active"

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["Access to free tools", "Basic support", "Community access", "Limited usage"],
      color: "gray",
      current: currentTier === "free",
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      features: [
        "All free features",
        "Advanced AI tools",
        "Priority support",
        "Unlimited usage",
        "Custom integrations",
      ],
      color: "blue",
      current: currentTier === "pro",
    },
    {
      name: "Premium",
      price: "$99",
      period: "per month",
      features: [
        "All Pro features",
        "White-label solutions",
        "Dedicated support",
        "Custom development",
        "Enterprise features",
      ],
      color: "gold",
      current: currentTier === "premium",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>
      case "past_due":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Past Due</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card className="border-2 bg-gradient-to-br from-primary/5 to-orange-50 dark:from-orange-900/10 dark:to-zinc-900">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold capitalize">{currentTier} Plan</h3>
              <p className="text-muted-foreground">{currentTier === "free" ? "No billing" : "Billed monthly"}</p>
            </div>
            {getStatusBadge(subscriptionStatus)}
          </div>

          {currentTier !== "free" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Usage this month</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">You've used 750 of 1000 API calls this month</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {currentTier !== "free" && (
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Usage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${
                tier.current
                  ? "border-2 border-primary bg-primary/5"
                  : "border hover:border-primary/40 transition-colors"
              }`}
            >
              {tier.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white">Current Plan</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">{tier.price}</div>
                  <div className="text-sm text-muted-foreground">{tier.period}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={tier.current ? "outline" : "default"} disabled={tier.current}>
                  {tier.current ? (
                    "Current Plan"
                  ) : (
                    <>
                      {tier.name === "Free" ? "Downgrade" : "Upgrade"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      {currentTier !== "free" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Pro Plan - January 2024</p>
                  <p className="text-sm text-muted-foreground">Paid on Jan 1, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$29.00</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Paid</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Pro Plan - December 2023</p>
                  <p className="text-sm text-muted-foreground">Paid on Dec 1, 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$29.00</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Paid</Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Invoices
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
