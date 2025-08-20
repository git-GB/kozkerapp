import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthPopupManager } from "@/components/auth/auth-popup-manager"
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Brain,
  Rocket,
  Target,
  BarChart3,
  Star,
  Globe,
  Sparkles,
  Bot,
  Type,
  LayoutTemplate,
} from "lucide-react"
import { getFeaturedPosts } from "@/lib/ghost"
import { PostCard } from "@/components/post-card"

export default async function Home() {
  // Fetch featured posts with error handling
  let featuredPosts = []
  try {
    if (process.env.GHOST_URL && process.env.GHOST_CONTENT_API_KEY) {
      featuredPosts = await getFeaturedPosts()
    }
  } catch (error) {
    console.error("Error fetching featured posts:", error)
  }

  return (
    <>
      <AuthPopupManager enableAutoPopup={true} autoPopupDelay={5000} />

      {/* Hero Section */}
      <section className="py-20 md:py-28 hero-pattern">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                Digital Solutions from Launch to Scale
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Transform Your Business with <span className="text-primary">Smart Technology</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From rapid website launches to advanced business intelligence, we provide comprehensive digital
                solutions tailored to your business stage and growth ambitions.
              </p>

              {/* Solution Tier Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Link href="/solutions/launchpad" className="group">
                  <Card className="border-2 hover:border-primary transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Rocket className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">LaunchPad</h3>
                          <p className="text-sm text-muted-foreground">Startups & Local SMBs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/solutions/growthsuite" className="group">
                  <Card className="border-2 hover:border-primary transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">GrowthSuite</h3>
                          <p className="text-sm text-muted-foreground">Growing SMBs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/solutions/intelligence" className="group">
                  <Card className="border-2 hover:border-primary transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Intelligence</h3>
                          <p className="text-sm text-muted-foreground">Data-Driven Enterprises</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/contact">Get Started Today</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent hover:bg-primary hover:text-white border-primary text-primary"
                >
                  <Link href="/solutions">Explore Solutions</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Version%20control-cuate-yIM8dgQYh75USr7RBxwMELEfYb0KvG.png"
                alt="Software developer working on code with workflow diagrams and development processes"
                width={600}
                height={600}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">200+</div>
              <p className="text-muted-foreground">Projects Delivered</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">6+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Help</h2>
            <p className="text-xl text-muted-foreground">
              Tailored solutions for businesses at every stage of their digital journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Startups & Local SMBs */}
            <Card className="border-2 hover:border-green-500 transition-all group">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Startups & Local SMBs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Get online fast with our LaunchPad solutions. Perfect for businesses just starting their digital
                  journey.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Free 1-page website</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Local SEO optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic automation setup</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-green-50 bg-transparent hover:bg-green-500 hover:text-white border-green-500 text-green-600"
                >
                  <Link href="/solutions/launchpad">
                    Explore LaunchPad <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Growing SMBs */}
            <Card className="border-2 hover:border-blue-500 transition-all group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Growing SMBs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Scale your operations with our GrowthSuite. Optimize engagement and automate workflows.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">WhatsApp CRM & automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">AI chatbots & support suite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Conversion optimization</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-blue-50 bg-transparent hover:bg-blue-500 hover:text-white border-blue-500 text-blue-600"
                >
                  <Link href="/solutions/growthsuite">
                    Explore GrowthSuite <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Data-Driven Enterprises */}
            <Card className="border-2 hover:border-purple-500 transition-all group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Data-Driven Enterprises</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Unlock strategic insights with our Intelligence solutions. Advanced BI and data analytics.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Power BI consulting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Custom dashboard development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Data integration services</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-purple-50 bg-transparent hover:bg-purple-500 hover:text-white border-purple-500 text-purple-600"
                >
                  <Link href="/solutions/intelligence">
                    Explore Intelligence <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose KozkerTech</h2>
            <p className="text-xl text-muted-foreground">We deliver results that matter for your business growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Speed</h3>
              <p className="text-muted-foreground">Launch your digital presence in days, not months.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automation</h3>
              <p className="text-muted-foreground">Streamline operations with intelligent automation.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Insights</h3>
              <p className="text-muted-foreground">Make data-driven decisions with powerful analytics.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Support</h3>
              <p className="text-muted-foreground">24/7 support to ensure your success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Free AI-Powered Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Journey with Our Free Tools</h2>
            <p className="text-xl text-muted-foreground">
              Get a taste of our AI-powered solutions with our collection of free business tools. Perfect for testing
              the waters before diving deeper.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Featured Tool - Domain Name Genie */}
            <div className="space-y-6">
              <Card className="border-2 border-primary/20 dark:border-orange-500/20 bg-gradient-to-br from-primary/5 to-orange-50 dark:from-orange-900/10 dark:to-zinc-900 hover:border-primary/40 dark:hover:border-orange-500/40 transition-all bg-white dark:bg-[#111111]">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 border-green-200 dark:border-green-800 mb-2">
                        Most Popular
                      </Badge>
                      <CardTitle className="text-2xl text-gray-900 dark:text-white">Domain Name Genie</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Find your perfect domain with AI-powered suggestions based on your business description. Get
                    real-time availability checks and multiple TLD options.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">AI-powered domain suggestions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Real-time availability checking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Multiple TLD options (.com, .net, .org, etc.)
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Direct purchase links</span>
                    </li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="w-full text-lg bg-orange-500 hover:bg-orange-600 dark:hover:bg-[#d45616] text-white"
                  >
                    <Link href="/tools/domain-name-generator">
                      Try Domain Name Genie Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Other Tools Preview */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">More Free Tools Available</h3>

              <div className="grid gap-4">
                <Card className="border hover:border-primary/40 transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Type className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          Tagline & Value-Prop Creator
                        </h4>
                        <p className="text-sm text-muted-foreground">Create punchy taglines and value propositions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border hover:border-primary/40 transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <LayoutTemplate className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          Landing Page Hero Copy Generator
                        </h4>
                        <p className="text-sm text-muted-foreground">Generate compelling headlines and CTAs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border hover:border-primary/40 transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Bot className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          AI Business Plan Generator
                        </h4>
                        <p className="text-sm text-muted-foreground">Create comprehensive business plans with AI</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center pt-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-transparent hover:bg-primary hover:text-white border-primary text-primary"
                >
                  <Link href="/tools">
                    View All 12 Free Tools <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Tools CTA */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Business?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start with our free tools to get a taste of AI-powered business solutions, then explore our comprehensive
              service packages when you're ready to scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tools/domain-name-generator">Start with Domain Name Genie</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-primary hover:text-white border-primary text-primary"
              >
                <Link href="https://cal.com/kozker">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest Insights</h2>
              <p className="text-xl text-muted-foreground">
                Stay updated with our latest articles and industry insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                className="bg-transparent hover:bg-primary hover:text-white border-primary text-primary"
              >
                <Link href="/blog">
                  View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Growing Businesses</h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of satisfied clients who have transformed their digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg mb-4">
                "KozkerTech transformed our online presence completely. The LaunchPad solution was perfect for our
                startup."
              </blockquote>
              <cite className="text-sm text-muted-foreground">- Local Restaurant Owner</cite>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg mb-4">
                "The WhatsApp automation has revolutionized our customer communication. Highly recommended!"
              </blockquote>
              <cite className="text-sm text-muted-foreground">- E-commerce Business</cite>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg mb-4">
                "Their Power BI expertise helped us make data-driven decisions that increased our ROI by 40%."
              </blockquote>
              <cite className="text-sm text-muted-foreground">- Manufacturing Company</cite>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Business?</h2>
              <p className="text-xl opacity-90">
                Choose the solution tier that matches your business stage and start your digital transformation journey
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="text-primary">
                  <Link href="/contact">Get Started Today</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white hover:bg-white hover:text-primary text-white bg-transparent"
                >
                  <Link href="/solutions">Explore All Solutions</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Your Journey Starts Here</h3>
                <ol className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <span>Choose your solution tier</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <span>Schedule a consultation</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <span>Launch and grow your business</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
