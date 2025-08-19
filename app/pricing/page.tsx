"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Check,
  Rocket,
  TrendingUp,
  BarChart3,
  Globe,
  Bot,
  Type,
  LayoutTemplate,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { PriceDisplay } from "@/components/price-display"

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("launchpad")

  // LaunchPad pricing data
  const launchpadPlans = [
    {
      name: "Starter",
      setupFee: 7999,
      monthlyFee: 799,
      description: "Perfect for solopreneurs and new startups",
      features: ["3-page website", "Basic autoresponder", "GMB Setup + Basic SEO", "Email support (3-5 days)"],
      popular: false,
    },
    {
      name: "Pro",
      setupFee: 14999,
      monthlyFee: 1999,
      description: "Ideal for growing professionals and consultants",
      features: ["5-6 pages + Blog", "FAQ Bot + Lead Capture", "SEO + Email Campaign", "WhatsApp + Email support"],
      popular: true,
    },
    {
      name: "Premium",
      setupFee: 24999,
      monthlyFee: 3499,
      description: "Complete solution for established businesses",
      features: ["8+ pages, Forms, Blog", "Smart Bot + Scheduler", "Full Funnel + Auto Newsletter", "Priority Support"],
      popular: false,
    },
    {
      name: "Agency",
      setupFee: 49999,
      monthlyFee: 6999,
      description: "White-label solution for agencies (up to 10 sites)",
      features: [
        "Unlimited sites w/ AI-gen",
        "White-label Chatbot",
        "Multi-brand Content Gen",
        "Dedicated Manager + Reports",
      ],
      popular: false,
    },
  ]

  // GrowthSuite pricing data
  const growthsuitePlans = [
    {
      name: "Starter",
      setupFee: 14999,
      monthlyFee: 1499,
      description: "Essential automation for growing SMBs",
      features: ["FAQ Bot (Web + Email)", "3 business flows", "Zapier/Sheets only", "Email support (3-day)"],
      popular: false,
    },
    {
      name: "Pro",
      setupFee: 29999,
      monthlyFee: 3999,
      description: "Advanced workflows and integrations",
      features: ["WhatsApp + Email + Web Bot", "6-8 workflows + API", "CRM, Forms, Sheets", "WhatsApp + Email support"],
      popular: true,
    },
    {
      name: "Premium",
      setupFee: 49999,
      monthlyFee: 6999,
      description: "Enterprise-grade automation suite",
      features: ["Agentic Bot + CRM + Docs", "12+ workflows + dashboards", "Full API + Webhooks", "Dedicated Manager"],
      popular: false,
    },
    {
      name: "Agency",
      setupFee: 99999,
      monthlyFee: 14999,
      description: "Multi-client automation platform",
      features: [
        "White-label AI Assistants",
        "Custom flows per client",
        "Cross-client DB + CRM sync",
        "SLA + Onboarding + Reporting",
      ],
      popular: false,
    },
  ]

  // Intelligence pricing data
  const intelligencePlans = [
    {
      name: "Basic BI",
      setupFee: 24999,
      monthlyFee: 3499,
      description: "Essential business intelligence for SMBs",
      features: ["Excel, Forms", "Sales, Leads dashboards", "Power BI Desktop", "5-10 Users, Email Support"],
      popular: false,
    },
    {
      name: "Pro BI",
      setupFee: 59999,
      monthlyFee: 7999,
      description: "Advanced BI with cloud integration",
      features: ["Sheets, CRM, API", "Ops, HR, Finance dashboards", "Power BI Cloud", "10-25 Users, BI Review Calls"],
      popular: true,
    },
    {
      name: "Enterprise BI",
      setupFee: 125000,
      monthlyFee: 14999,
      description: "Full enterprise BI solution",
      features: [
        "ERP, Azure, SQL, APIs",
        "Full Org + Custom KPIs",
        "Power BI Premium + Azure",
        "25+ Users, SLA + Weekly Support",
      ],
      popular: false,
    },
    {
      name: "BI Agency",
      setupFee: 199999,
      monthlyFee: 24999,
      description: "White-label BI for agencies (3 clients)",
      features: [
        "Multi-client DB integrations",
        "White-label Dashboards",
        "Multi-tenant Power BI Stack",
        "10 users/client, SLA + Account Manager",
      ],
      popular: false,
    },
  ]

  const addOns = [
    { name: "Additional Website / Brand", price: 3999 },
    { name: "Custom AI Flow", price: 2499 },
    { name: "WhatsApp API Setup + Chat History", price: 1999 },
    { name: "Dashboard Add-on (New dept/view)", price: 2999 },
    { name: "CRM/ERP Custom Integration", price: 4999 },
    { name: "Training Session (Team)", price: 2999 },
  ]

  const freeTools = {
    launchpad: [
      {
        name: "Domain Name Genie",
        icon: Globe,
        description: "AI-powered domain suggestions",
        link: "/tools/domain-name-generator",
      },
      {
        name: "Tagline Creator",
        icon: Type,
        description: "Create punchy taglines",
        link: "/tools/tagline-value-prop-creator",
      },
      {
        name: "Landing Page Copy",
        icon: LayoutTemplate,
        description: "Generate hero copy",
        link: "/tools/landing-pageherocopygenerator",
      },
    ],
    growthsuite: [
      {
        name: "Social Media Suggester",
        icon: Bot,
        description: "AI social content ideas",
        link: "/tools/social-media-suggester",
      },
      {
        name: "Email Subject Lines",
        icon: Type,
        description: "Compelling email subjects",
        link: "/tools/email-subject-line",
      },
      {
        name: "Meeting Summary",
        icon: LayoutTemplate,
        description: "Extract meeting insights",
        link: "/tools/meeting-summary-extractor",
      },
    ],
    intelligence: [
      { name: "Data Cleanse Tool", icon: BarChart3, description: "Clean and format data", link: "/tools/data-cleanse" },
      { name: "Power BI Measure", icon: Bot, description: "Generate DAX measures", link: "/tools/power-bi-measure" },
      {
        name: "Business Plan Generator",
        icon: Globe,
        description: "AI business plans",
        link: "/tools/ai-business-plan-generator",
      },
    ],
  }

  const renderPricingCards = (plans: any[], bgColor: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={`relative ${plan.popular ? "border-primary border-2" : "border"} hover:shadow-lg transition-all`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
            </div>
          )}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pricing */}
            <div className="text-center space-y-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Setup Fee</p>
                <div className="text-2xl font-bold">
                  <PriceDisplay amount={plan.setupFee} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Monthly Fee</p>
                <div className="text-xl font-semibold text-primary">
                  <PriceDisplay amount={plan.monthlyFee} />
                  /mo
                </div>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {plan.features.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              asChild
              className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-foreground"}`}
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFreeTools = (tools: any[], bgColor: string) => (
    <div className={`mt-12 p-8 rounded-lg ${bgColor}`}>
      <div className="text-center mb-8">
        <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Free Tools for This Tier
        </Badge>
        <h3 className="text-2xl font-bold mb-4">Start with Our Free Tools</h3>
        <p className="text-muted-foreground">Test our AI-powered solutions before committing to a paid plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card key={index} className="border hover:border-primary/40 transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{tool.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                <Link href={tool.link}>
                  Try Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Choose Your <span className="text-primary">Growth Path</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          From rapid launches to enterprise intelligence - find the perfect solution for your business stage
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>All prices in INR</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>International pricing available</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>No hidden fees</span>
          </div>
        </div>
      </div>

      {/* Pricing Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-12">
          <TabsTrigger value="launchpad" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            LaunchPad
          </TabsTrigger>
          <TabsTrigger value="growthsuite" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            GrowthSuite
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Intelligence
          </TabsTrigger>
        </TabsList>

        {/* LaunchPad Tab */}
        <TabsContent value="launchpad" className="space-y-8">
          <div className="text-center mb-8">
            <Badge className="px-4 py-2 text-sm bg-green-100 text-green-700 border-green-200 mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              AI Website + Marketing + WhatsApp Starter Bots
            </Badge>
            <h2 className="text-3xl font-bold mb-4">LaunchPad Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Perfect for solopreneurs, startups, coaches, professionals, consultants, and agencies
            </p>
          </div>

          {renderPricingCards(launchpadPlans, "bg-green-50")}
          {renderFreeTools(freeTools.launchpad, "bg-green-50")}
        </TabsContent>

        {/* GrowthSuite Tab */}
        <TabsContent value="growthsuite" className="space-y-8">
          <div className="text-center mb-8">
            <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200 mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI Workflows + Smart WhatsApp + LLM Chatbots
            </Badge>
            <h2 className="text-3xl font-bold mb-4">GrowthSuite Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Ideal for SMBs, agencies, D2C brands, SaaS companies, and service providers
            </p>
          </div>

          {renderPricingCards(growthsuitePlans, "bg-blue-50")}
          {renderFreeTools(freeTools.growthsuite, "bg-blue-50")}
        </TabsContent>

        {/* Intelligence Tab */}
        <TabsContent value="intelligence" className="space-y-8">
          <div className="text-center mb-8">
            <Badge className="px-4 py-2 text-sm bg-purple-100 text-purple-700 border-purple-200 mb-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              BI / Reporting / Dashboards with Power BI + Azure
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Intelligence Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Built for enterprises, large SMBs, multi-department operations, and BI-focused agencies
            </p>
          </div>

          {renderPricingCards(intelligencePlans, "bg-purple-50")}
          {renderFreeTools(freeTools.intelligence, "bg-purple-50")}
        </TabsContent>
      </Tabs>

      {/* Add-Ons Section */}
      <section className="mt-20 py-16 bg-muted/50 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Add-On Services</h2>
          <p className="text-lg text-muted-foreground">Enhance any plan with these additional services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon, index) => (
            <Card key={index} className="border hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">{addon.name}</h4>
                    <div className="text-lg font-bold text-primary">
                      <PriceDisplay amount={addon.price} />
                      {addon.name.includes("session") && "/session"}
                      {addon.name.includes("site") && "/site"}
                      {addon.name.includes("flow") && "/flow"}
                      {addon.name.includes("report") && "/report"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about our pricing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h3 className="font-semibold">What's the difference between setup fee and monthly fee?</h3>
            <p className="text-muted-foreground">
              The setup fee is a one-time payment for initial development, configuration, and launch. The monthly fee
              covers ongoing maintenance, hosting, support, and feature updates.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Do you offer international pricing?</h3>
            <p className="text-muted-foreground">
              Yes! While our standard pricing is in INR, we offer competitive international pricing in USD, EUR, and
              other currencies. Contact us for a custom quote.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">What's included in the Agency tiers?</h3>
            <p className="text-muted-foreground">
              Agency tiers include white-label solutions, multi-client management, dedicated account managers, and the
              ability to resell our services under your brand.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Can I upgrade or downgrade my plan?</h3>
            <p className="text-muted-foreground">
              You can upgrade anytime by paying the difference. Downgrades are processed at your next billing cycle with
              appropriate adjustments.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Are there any hidden fees?</h3>
            <p className="text-muted-foreground">
              No hidden fees! All costs are transparent. Additional services like custom integrations or extra training
              sessions are clearly listed in our add-ons section.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept bank transfers, UPI, credit/debit cards, and international wire transfers. Payment plans are
              available for larger projects.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 py-16 bg-primary text-white rounded-lg text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl opacity-90 mb-8">
            Choose your solution tier and start your digital transformation journey today. Not sure which plan is right
            for you? Let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-primary">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white hover:bg-white hover:text-primary text-white bg-transparent"
            >
              <Link href="https://cal.com/kozker">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
