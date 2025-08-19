import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Clock, Target, CalendarIcon, UserIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies - Real Results from Real Clients | KozkerTech",
  description:
    "Discover how businesses have transformed their operations and achieved remarkable growth with KozkerTech's digital solutions.",
}

// Mock data for demonstration
const mockCaseStudies = [
  {
    id: "1",
    title: "Local Restaurant Chain Increases Online Orders by 300%",
    slug: "restaurant-chain-300-percent-increase",
    excerpt:
      "How we helped Spice Garden Restaurants transform their business during the pandemic with our LaunchPad solution.",
    feature_image: "/case-study-restaurant.png",
    published_at: "2024-01-15T10:00:00.000Z",
    primary_author: { name: "KozkerTech Team" },
    tags: [
      { name: "Case Study", slug: "case-study" },
      { name: "LaunchPad", slug: "launchpad" },
      { name: "Food & Beverage", slug: "food-beverage" },
    ],
    mockData: {
      client: "Spice Garden Restaurants",
      industry: "Food & Beverage",
      solution: "LaunchPad",
      challenge: "Limited online presence and no digital ordering system during COVID-19 pandemic",
      results: [
        "300% increase in online orders",
        "50% reduction in phone order errors",
        "25% increase in average order value",
        "Expanded to 3 new locations",
      ],
      timeline: "6 weeks",
      testimonial: {
        quote:
          "KozkerTech's LaunchPad solution saved our business during the pandemic. The WhatsApp ordering system was a game-changer.",
        author: "Rajesh Kumar",
        title: "Owner, Spice Garden Restaurants",
      },
    },
  },
  {
    id: "2",
    title: "E-commerce Store Boosts Conversion Rate by 45%",
    slug: "ecommerce-conversion-rate-boost",
    excerpt:
      "TechGadgets Pro transformed their customer experience with our GrowthSuite solution, achieving remarkable results.",
    feature_image: "/case-study-ecommerce.png",
    published_at: "2024-02-10T10:00:00.000Z",
    primary_author: { name: "KozkerTech Team" },
    tags: [
      { name: "Case Study", slug: "case-study" },
      { name: "GrowthSuite", slug: "growthsuite" },
      { name: "E-commerce", slug: "ecommerce" },
    ],
    mockData: {
      client: "TechGadgets Pro",
      industry: "E-commerce",
      solution: "GrowthSuite",
      challenge: "Low conversion rates and poor customer engagement despite quality products",
      results: [
        "45% increase in conversion rate",
        "60% reduction in cart abandonment",
        "40% increase in customer lifetime value",
        "2x improvement in customer support efficiency",
      ],
      timeline: "8 weeks",
      testimonial: {
        quote:
          "The AI chatbot and WhatsApp automation transformed our customer experience. Sales have never been better.",
        author: "Priya Sharma",
        title: "Founder, TechGadgets Pro",
      },
    },
  },
  {
    id: "3",
    title: "Manufacturing Company Achieves 40% ROI Increase",
    slug: "manufacturing-roi-increase",
    excerpt:
      "Precision Engineering Ltd gained real-time visibility across all operations with our Intelligence solution.",
    feature_image: "/case-study-manufacturing.png",
    published_at: "2024-03-05T10:00:00.000Z",
    primary_author: { name: "KozkerTech Team" },
    tags: [
      { name: "Case Study", slug: "case-study" },
      { name: "Intelligence", slug: "intelligence" },
      { name: "Manufacturing", slug: "manufacturing" },
    ],
    mockData: {
      client: "Precision Engineering Ltd",
      industry: "Manufacturing",
      solution: "Intelligence",
      challenge: "Lack of data visibility across operations and difficulty making data-driven decisions",
      results: [
        "40% increase in ROI",
        "30% reduction in production waste",
        "50% faster decision-making process",
        "Real-time visibility across all operations",
      ],
      timeline: "12 weeks",
      testimonial: {
        quote:
          "The Power BI dashboards gave us insights we never had before. We can now optimize our operations in real-time.",
        author: "Amit Patel",
        title: "Operations Director, Precision Engineering Ltd",
      },
    },
  },
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function CaseStudiesPage() {
  const caseStudies = mockCaseStudies

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Real Results from <span className="text-primary">Real Clients</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Discover how businesses across industries have transformed their operations and achieved remarkable growth
              with KozkerTech's digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="#case-studies">Explore Success Stories</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Start Your Transformation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">{caseStudies.length}+</div>
              <p className="text-muted-foreground">Success Stories</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">40%</div>
              <p className="text-muted-foreground">Average ROI Increase</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">6+</div>
              <p className="text-muted-foreground">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="case-studies" className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              See how our solutions have delivered measurable results across different industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => {
              const solutionTag = study.tags?.find((tag) =>
                ["launchpad", "growthsuite", "intelligence"].includes(tag.slug),
              )
              const industryTag = study.tags?.find((tag) => tag.slug !== "case-study" && tag.slug !== solutionTag?.slug)

              const mockData = study.mockData
              const client = mockData?.client || "Client"
              const solution = solutionTag?.name || mockData?.solution || "Solution"
              const industry = industryTag?.name || mockData?.industry || "Industry"
              const challenge = mockData?.challenge || study.excerpt || "Case study details..."
              const timeline = mockData?.timeline || "Project Timeline"
              const results = mockData?.results
              const testimonial = mockData?.testimonial

              return (
                <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {study.feature_image && (
                    <div className="relative h-48">
                      <Image
                        src={study.feature_image || "/placeholder.svg"}
                        alt={study.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={
                            solutionTag?.slug === "intelligence" || solution === "Intelligence"
                              ? "bg-purple-100 text-purple-700"
                              : solutionTag?.slug === "growthsuite" || solution === "GrowthSuite"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {solution}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{industry}</Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <UserIcon className="mr-1 h-4 w-4" />
                        <span>{study.primary_author?.name || "Author"}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <time dateTime={study.published_at}>{formatDate(study.published_at)}</time>
                      </div>
                    </div>
                    {client !== "Client" && (
                      <p className="text-sm text-muted-foreground">
                        <strong>{client}</strong> • {industry}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Challenge */}
                    <div>
                      <h4 className="font-semibold mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">{challenge}</p>
                    </div>

                    {/* Results */}
                    {results && results.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Results</h4>
                        <ul className="space-y-1">
                          {results.slice(0, 3).map((result, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Timeline and Solution */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{solution}</span>
                      </div>
                    </div>

                    {/* Testimonial */}
                    {testimonial && (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-sm">
                        "{testimonial.quote}"
                        {testimonial.author && (
                          <footer className="mt-2 text-xs text-muted-foreground">
                            — {testimonial.author}
                            {testimonial.title ? `, ${testimonial.title}` : ""}
                          </footer>
                        )}
                      </blockquote>
                    )}

                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/case-studies/${study.slug}`}>
                        Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industry Filter Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground">Specialized expertise across key industry verticals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Healthcare", "E-commerce", "Manufacturing", "Food & Beverage", "Digital Marketing", "Retail"].map(
              (industry) => (
                <Button
                  key={industry}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <span className="font-medium">{industry}</span>
                </Button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join hundreds of businesses who have transformed their operations with our proven solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-primary">
                <Link href="/contact">Start Your Transformation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white hover:bg-white hover:text-primary text-white bg-transparent"
              >
                <Link href="/solutions">Explore Our Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
