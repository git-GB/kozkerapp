import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon, ArrowLeft } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

// Mock data for fallback
const mockCaseStudies: Record<string, any> = {
  "restaurant-chain-300-percent-increase": {
    id: "1",
    title: "Local Restaurant Chain Increases Online Orders by 300%",
    slug: "restaurant-chain-300-percent-increase",
    excerpt:
      "How we helped Spice Garden Restaurants transform their business during the pandemic with our LaunchPad solution.",
    feature_image: "/case-study-restaurant.png",
    published_at: "2024-01-15T10:00:00.000Z",
    updated_at: "2024-01-15T10:00:00.000Z",
    primary_author: { name: "KozkerTech Team" },
    tags: [
      { name: "Case Study", slug: "case-study" },
      { name: "LaunchPad", slug: "launchpad" },
      { name: "Food & Beverage", slug: "food-beverage" },
    ],
    html: `
      <h2>The Challenge</h2>
      <p>When COVID-19 hit, Spice Garden Restaurants faced an unprecedented crisis. With dine-in services restricted, their three locations were struggling to survive without any digital ordering system in place.</p>
      
      <h2>Our Solution</h2>
      <p>We implemented our LaunchPad solution, creating a comprehensive digital ordering ecosystem that included:</p>
      <ul>
        <li>WhatsApp-based ordering system</li>
        <li>Mobile-optimized website with online ordering</li>
        <li>Automated order management system</li>
        <li>Customer communication automation</li>
      </ul>
      
      <h2>Implementation Process</h2>
      <p>The implementation was completed in just 6 weeks, working closely with the restaurant team to ensure smooth operations during the transition.</p>
      
      <h2>Results Achieved</h2>
      <ul>
        <li><strong>300% increase in online orders</strong> within the first month</li>
        <li><strong>50% reduction in phone order errors</strong> through automated system</li>
        <li><strong>25% increase in average order value</strong> with upselling features</li>
        <li><strong>Expansion to 3 new locations</strong> based on improved efficiency</li>
      </ul>
      
      <blockquote>
        <p>"KozkerTech's LaunchPad solution saved our business during the pandemic. The WhatsApp ordering system was a game-changer that our customers loved."</p>
        <footer>— Rajesh Kumar, Owner, Spice Garden Restaurants</footer>
      </blockquote>
      
      <h2>Long-term Impact</h2>
      <p>The success of the digital transformation allowed Spice Garden Restaurants not only to survive the pandemic but to thrive and expand their operations to new locations.</p>
    `,
  },
  "ecommerce-conversion-rate-boost": {
    id: "2",
    title: "E-commerce Store Boosts Conversion Rate by 45%",
    slug: "ecommerce-conversion-rate-boost",
    excerpt:
      "TechGadgets Pro transformed their customer experience with our GrowthSuite solution, achieving remarkable results.",
    feature_image: "/case-study-ecommerce.png",
    published_at: "2024-02-10T10:00:00.000Z",
    updated_at: "2024-02-10T10:00:00.000Z",
    primary_author: { name: "KozkerTech Team" },
    tags: [
      { name: "Case Study", slug: "case-study" },
      { name: "GrowthSuite", slug: "growthsuite" },
      { name: "E-commerce", slug: "ecommerce" },
    ],
    html: `
      <h2>The Challenge</h2>
      <p>TechGadgets Pro was experiencing low conversion rates and poor customer engagement on their existing e-commerce platform, despite having quality products and competitive pricing.</p>
      
      <h2>Our Solution</h2>
      <p>We implemented our GrowthSuite solution, which included:</p>
      <ul>
        <li>AI-powered chatbot for customer support</li>
        <li>WhatsApp automation for order updates</li>
        <li>Personalized product recommendations</li>
        <li>Abandoned cart recovery system</li>
      </ul>
      
      <h2>Key Results</h2>
      <ul>
        <li><strong>45% increase in conversion rate</strong></li>
        <li><strong>60% reduction in cart abandonment</strong></li>
        <li><strong>40% increase in customer lifetime value</strong></li>
        <li><strong>2x improvement in customer support efficiency</strong></li>
      </ul>
      
      <blockquote>
        <p>"The AI chatbot and WhatsApp automation transformed our customer experience. Sales have never been better."</p>
        <footer>— Priya Sharma, Founder, TechGadgets Pro</footer>
      </blockquote>
    `,
  },
  "manufacturing-roi-increase": {
    id: "3",
    title: "Manufacturing Company Achieves 40% ROI Increase",
    slug: "manufacturing-roi-increase",
    excerpt:
      "Precision Engineering Ltd gained real-time visibility across all operations with our Intelligence solution.",
    feature_image: "/case-study-manufacturing.png",
    published_at: "2024-03-05T10:00:00.000Z",
    updated_at: "2024-03-05T10:00:00.000Z",
    primary_author: { name: "KozkerTech Team" },
    tags: [
      { name: "Case Study", slug: "case-study" },
      { name: "Intelligence", slug: "intelligence" },
      { name: "Manufacturing", slug: "manufacturing" },
    ],
    html: `
      <h2>The Challenge</h2>
      <p>Precision Engineering Ltd lacked data visibility across their operations and struggled to make data-driven decisions, impacting their overall efficiency and profitability.</p>
      
      <h2>Our Solution</h2>
      <p>We implemented our Intelligence solution with comprehensive Power BI dashboards:</p>
      <ul>
        <li>Real-time production monitoring</li>
        <li>Inventory optimization dashboards</li>
        <li>Quality control analytics</li>
        <li>Predictive maintenance insights</li>
      </ul>
      
      <h2>Results Achieved</h2>
      <ul>
        <li><strong>40% increase in ROI</strong></li>
        <li><strong>30% reduction in production waste</strong></li>
        <li><strong>50% faster decision-making process</strong></li>
        <li><strong>Real-time visibility across all operations</strong></li>
      </ul>
      
      <blockquote>
        <p>"The Power BI dashboards gave us insights we never had before. We can now optimize our operations in real-time."</p>
        <footer>— Amit Patel, Operations Director, Precision Engineering Ltd</footer>
      </blockquote>
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(mockCaseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = mockCaseStudies[params.slug]

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The case study you are looking for does not exist",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"
  const caseStudyUrl = `${baseUrl}/case-studies/${caseStudy.slug}`

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
    authors: [{ name: caseStudy.primary_author.name }],
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      url: caseStudyUrl,
      siteName: "KozkerTech",
      images: caseStudy.feature_image ? [{ url: caseStudy.feature_image }] : [],
      locale: "en_US",
      type: "article",
      publishedTime: caseStudy.published_at,
      modifiedTime: caseStudy.updated_at,
      authors: [caseStudy.primary_author.name],
      tags: caseStudy.tags?.map((tag: any) => tag.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.excerpt,
      images: caseStudy.feature_image ? [caseStudy.feature_image] : [],
    },
    alternates: {
      canonical: caseStudyUrl,
    },
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = mockCaseStudies[params.slug]

  if (!caseStudy) {
    notFound()
  }

  // Extract metadata from tags
  const solutionTag = caseStudy.tags?.find((tag: any) =>
    ["launchpad", "growthsuite", "intelligence"].includes(tag.slug),
  )
  const industryTag = caseStudy.tags?.find((tag: any) => tag.slug !== "case-study" && tag.slug !== solutionTag?.slug)

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    image: caseStudy.feature_image ? [caseStudy.feature_image] : [],
    datePublished: caseStudy.published_at,
    dateModified: caseStudy.updated_at || caseStudy.published_at,
    author: {
      "@type": "Person",
      name: caseStudy.primary_author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "KozkerTech",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"}/case-studies/${caseStudy.slug}`,
    },
  }

  return (
    <article className="container py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Back Navigation */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/case-studies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Link>
        </Button>
        <Breadcrumbs />
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-700">Case Study</Badge>
            {solutionTag && (
              <Badge
                className={
                  solutionTag.slug === "intelligence"
                    ? "bg-purple-100 text-purple-700"
                    : solutionTag.slug === "growthsuite"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                }
              >
                {solutionTag.name}
              </Badge>
            )}
            {industryTag && <Badge variant="secondary">{industryTag.name}</Badge>}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{caseStudy.title}</h1>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <UserIcon className="mr-1 h-4 w-4" />
              <span>{caseStudy.primary_author.name}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <time dateTime={caseStudy.published_at}>{formatDate(caseStudy.published_at)}</time>
            </div>
          </div>

          {/* Excerpt */}
          {caseStudy.excerpt && <p className="text-xl text-muted-foreground leading-relaxed">{caseStudy.excerpt}</p>}
        </div>

        {/* Featured Image */}
        {caseStudy.feature_image && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={caseStudy.feature_image || "/placeholder.svg"}
              alt={`Featured image for ${caseStudy.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="ghost-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: caseStudy.html }} />

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-muted/50 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-muted-foreground mb-6">
            See how our solutions can deliver similar results for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">View More Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
