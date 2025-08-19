import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Brain, Target, BarChart3, Sparkles } from "lucide-react"
import { ToolsGrid } from "@/components/tools/ToolsGrid"
import { SmartFilterIntegration } from "@/components/SmartFilterIntegration"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 hero-pattern">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                AI-Powered Business Tools
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Accelerate Your Business with <span className="text-primary">AI</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover our collection of AI-powered tools designed to streamline your workflow, enhance creativity,
                and drive business growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/tools">Explore All Tools</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent hover:bg-primary hover:text-white border-primary text-primary"
                >
                  <Link href="/auth/login">Sign In to Get Started</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="AI tools dashboard interface showing various business automation tools"
                width={600}
                height={600}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Featured AI Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Tools for Every Business Need</h2>
            <p className="text-xl text-muted-foreground">
              From content creation to data analysis, our AI-powered tools help you work smarter and faster.
            </p>
          </div>

          {/* Smart Filter Integration */}
          <div className="mb-12">
            <SmartFilterIntegration />
          </div>

          {/* Tools Grid */}
          <ToolsGrid />

          {/* CTA */}
          <div className="text-center mt-16">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/tools">
                View All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our AI Tools</h2>
            <p className="text-xl text-muted-foreground">Built for businesses that want to leverage AI effectively</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Get results in seconds, not hours.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Advanced AI models for superior results.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Business-Focused</h3>
              <p className="text-muted-foreground">Tools designed for real business needs.</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-muted-foreground">Track usage and optimize your workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of businesses already using our AI tools to accelerate their growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-primary">
                <Link href="/auth/register">Get Started Free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white hover:bg-white hover:text-primary text-white bg-transparent"
              >
                <Link href="/tools">Explore Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
