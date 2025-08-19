import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Bot,
  BarChart3,
  Target,
  Zap,
  ArrowRight,
  Sparkles,
  Share2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "GrowthSuite - Digital Solutions for Growing SMBs | KozkerTech",
  description:
    "Scale your operations with GrowthSuite. WhatsApp CRM, AI chatbots, conversion optimization, and more for growing small and medium businesses.",
}

export default function GrowthSuitePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
                <TrendingUp className="h-4 w-4 mr-2" />
                GrowthSuite Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Scale Your Business with <span className="text-blue-600">Smart Automation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Perfect for growing SMBs ready to optimize engagement and automate workflows. Advanced web design,
                WhatsApp CRM, AI chatbots, and conversion optimization tools.
              </p>

              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-blue-700 dark:text-blue-300 font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Boost Lead Conversion by up to 40% with Our Automation Suite
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact?solution=growthsuite">Request Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#free-tool">Try Our Free Tool</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Webinar-rafiki-ZpKQZr2G6pGwpmVXCqSHEHG3XFggOk.png"
                alt="Professional woman conducting webinar and online business communication for GrowthSuite solutions"
                width={600}
                height={600}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect For Growing Businesses</h2>
            <p className="text-xl text-muted-foreground">
              GrowthSuite is designed for SMBs ready to scale their operations and optimize customer engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Growing SMBs</h3>
              <p className="text-muted-foreground">
                Businesses with 10-50 employees looking to streamline operations and increase efficiency
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">E-commerce Stores</h3>
              <p className="text-muted-foreground">
                Online retailers needing advanced customer communication and sales automation
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Service Businesses</h3>
              <p className="text-muted-foreground">
                Agencies, consultancies, and service providers wanting to optimize lead conversion
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Advanced Features for Growth</h2>
            <p className="text-xl text-muted-foreground">Everything you need to scale your business operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Advanced Web Design & CRO */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Advanced Web Design & CRO</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  High-converting websites optimized for lead generation and sales
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Conversion rate optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">A/B testing implementation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Advanced analytics tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Multi-page website architecture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* WhatsApp CRM & Automation */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>WhatsApp CRM & Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">Complete customer relationship management through WhatsApp</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Automated follow-up sequences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Lead scoring and qualification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Order tracking and updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Customer segmentation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Chatbots */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Customized AI Chatbots</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Intelligent chatbots for website and WhatsApp customer support
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Natural language processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Product recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Appointment scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Live agent handover</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Customer Support Suite */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>24/7 Support Suite</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">Comprehensive customer support across all channels</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Live chat integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Ticket management system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Knowledge base creation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Performance analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose GrowthSuite?</h2>
            <p className="text-xl text-muted-foreground">Proven results for growing businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">40% More Leads</h3>
              <p className="text-muted-foreground">Average increase in qualified leads within 3 months</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">60% Time Saved</h3>
              <p className="text-muted-foreground">Automation reduces manual customer service tasks</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">25% Higher ROI</h3>
              <p className="text-muted-foreground">Better conversion rates through optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tool Section - Social Media Caption & Hashtag Suggester */}
      <section
        id="free-tool"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Tool for Growing Businesses
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Boost Your Social Media Engagement</h2>
            <p className="text-xl text-muted-foreground">
              Create compelling social media content that drives engagement with our AI-powered caption and hashtag
              generator
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Share2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Social Media Caption & Hashtag Suggester</h3>
                      <Badge className="mt-1 bg-blue-600 hover:bg-blue-700">Perfect for Growing Brands</Badge>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground">
                    Generate platform-specific captions and trending hashtags that maximize your social media reach and
                    engagement. Perfect for businesses scaling their digital presence.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Platform-tailored captions (Instagram, Facebook, LinkedIn)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Trending hashtag suggestions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Engagement optimization tips</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Industry-specific content ideas</span>
                    </li>
                  </ul>

                  <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/tools/social-media-suggester">
                      Try Social Media Tool Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="relative">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Sample Output
                      </div>
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                          <div className="font-medium text-blue-700 dark:text-blue-300 mb-2">Instagram Caption:</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            "🚀 Ready to scale your business? Our automation tools help SMBs save 60% of their time on
                            customer service. What would you do with those extra hours?"
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            #BusinessAutomation #SMBGrowth #Productivity #DigitalTransformation #BusinessTips
                          </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                          <div className="font-medium text-green-700 dark:text-green-300 mb-2">LinkedIn Version:</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            "Growing businesses need smart solutions. Our latest case study shows how automation can
                            reduce customer service workload by 60%..."
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Scale Your Business?</h2>
            <p className="text-xl opacity-90 mb-8">
              Start with our free Social Media tool, then let us build your complete growth automation suite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-blue-600">
                <Link href="/contact?solution=growthsuite">Request Your Demo</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white hover:bg-white hover:text-blue-600 text-white bg-transparent"
              >
                <Link href="/tools">Explore All Free Tools</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">Free demo available • No long-term contracts • Results in 30 days</p>
          </div>
        </div>
      </section>
    </>
  )
}
