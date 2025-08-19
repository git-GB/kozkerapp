import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, Zap, BarChart, Palette, Users } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "AI-Powered Web Design Services in Kochi | KozkerTech",
  description:
    "Launch a polished, mobile-first website in days with our AI-powered web design services. Streamline design, personalize experiences, and optimize performance.",
  keywords: ["AI web design", "mobile-first websites", "web design Kochi", "AI design", "responsive design"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/ai-powered-web-design`,
  },
  openGraph: {
    title: "AI-Powered Web Design Services in Kochi | KozkerTech",
    description:
      "Launch a polished, mobile-first website in days with our AI-powered web design services. Streamline design, personalize experiences, and optimize performance.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/ai-powered-web-design`,
    type: "website",
  },
}

export default function AIWebDesignPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Driven Design Generation",
      description:
        "Our AI analyzes thousands of successful websites to generate design elements, layouts, and color schemes that resonate with your target audience.",
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description:
        "Create and iterate through multiple design concepts in hours instead of weeks, allowing for faster feedback and refinement cycles.",
    },
    {
      icon: BarChart,
      title: "Data-Informed Optimization",
      description:
        "AI continuously analyzes user behavior to optimize navigation paths, call-to-action placement, and overall user experience for maximum engagement.",
    },
    {
      icon: Palette,
      title: "Personalized Aesthetics",
      description:
        "Generate custom color palettes, typography combinations, and visual elements that align perfectly with your brand identity and industry standards.",
    },
    {
      icon: Users,
      title: "Adaptive User Experiences",
      description:
        "Create websites that adapt to individual user preferences and behaviors, delivering personalized experiences that drive conversion.",
    },
  ]

  const benefits = [
    "Launch a polished website in days instead of months",
    "Reduce design costs by up to 60% compared to traditional methods",
    "Increase conversion rates with data-driven design decisions",
    "Ensure perfect responsiveness across all devices automatically",
    "Continuously improve design based on real user interactions",
    "Stay ahead of design trends with AI-powered recommendations",
  ]

  const caseStudies = [
    {
      title: "E-commerce Redesign",
      description:
        "Increased conversion rates by 37% through AI-optimized product layouts and personalized user journeys.",
      metrics: ["37% higher conversion", "42% longer session duration", "28% lower bounce rate"],
    },
    {
      title: "Service Business Website",
      description:
        "Reduced lead generation cost by 45% with AI-designed landing pages optimized for specific customer segments.",
      metrics: ["45% lower cost per lead", "3x more form submissions", "52% increase in organic traffic"],
    },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-Powered Web Design",
    provider: {
      "@type": "Organization",
      name: "KozkerTech",
    },
    description:
      "Launch a polished, mobile-first website in days with our AI-powered web design services. Streamline design, personalize experiences, and optimize performance.",
    serviceType: "Web Design",
    offers: {
      "@type": "Offer",
      price: "Custom",
      priceCurrency: "INR",
    },
  }

  return (
    <>
      <SchemaMarkup schema={schema} />
      <div className="container px-4 md:px-6 py-8 max-w-5xl mx-auto">
        <Breadcrumbs homeLabel="Home" className="mb-6" />

        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">AI-Powered Web Design</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Launch a polished, mobile-first website in days—not months—with our AI-powered design process that adapts
              to your brand and audience.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2843c334-9a4a-4a2d-9237-c6f1ecb1e76b-8Sgtksy64pamtLDsSfFItMMvsr3uLM.png"
              alt="AI Web Design interface showing creative solutions, UI/UX design elements, color palettes, and design analytics"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How AI Transforms Web Design</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16 bg-primary/5 p-8 md:p-10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our AI Web Design Process</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Discovery & Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your business goals, target audience, and industry benchmarks to establish a
                  foundation for your web design project. We combine this with your brand guidelines and preferences to
                  create a comprehensive design brief.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">AI-Generated Design Concepts</h3>
                <p className="text-muted-foreground">
                  Based on the analysis, our AI generates multiple design concepts that align with your brand identity
                  and business objectives. Each concept includes layout suggestions, color schemes, typography
                  recommendations, and visual element placements.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Collaborative Refinement</h3>
                <p className="text-muted-foreground">
                  Work with our team to refine the AI-generated concepts, incorporating your feedback and preferences to
                  create the perfect design. Our AI learns from your feedback to generate increasingly accurate
                  iterations.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Development & Implementation</h3>
                <p className="text-muted-foreground">
                  Our developers bring the design to life, implementing AI-assisted coding for faster development and
                  fewer bugs. We ensure perfect responsiveness across all devices and optimize for performance and SEO.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Continuous Optimization</h3>
                <p className="text-muted-foreground">
                  After launch, our AI continues to analyze user behavior and suggest improvements to enhance
                  performance and user experience. This ensures your website evolves with your business and user needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <div className="space-y-2">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How does AI improve the web design process?</h3>
              <p className="text-muted-foreground">
                AI accelerates the design process by generating multiple design concepts based on data analysis of
                successful websites in your industry. It also optimizes layouts for user engagement, personalizes
                experiences based on user behavior, and continuously improves the design through ongoing analysis.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">Will my website look unique or template-based?</h3>
              <p className="text-muted-foreground">
                Your website will be completely unique. Our AI doesn't use templates but instead generates custom
                designs based on your brand guidelines, industry best practices, and user behavior data. The
                collaborative refinement process ensures the final design perfectly represents your brand and business
                goals.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How long does it take to launch a website with AI design?</h3>
              <p className="text-muted-foreground">
                With our AI-powered design process, we can launch a fully functional, professionally designed website in
                as little as 7-14 days, depending on the complexity and scope of the project. This is significantly
                faster than the traditional web design process, which typically takes 2-3 months.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How does AI help with mobile responsiveness?</h3>
              <p className="text-muted-foreground">
                Our AI automatically generates responsive designs that adapt perfectly to all screen sizes and devices.
                It analyzes user behavior on different devices to optimize the mobile experience, ensuring that your
                website performs flawlessly on smartphones, tablets, and desktops.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Web Presence?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Launch a polished, mobile-first website in days with our AI-powered web design services. Get started today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/services">Explore Other Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
