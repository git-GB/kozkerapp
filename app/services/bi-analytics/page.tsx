import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, BarChart3, LineChart, PieChart, TrendingUp, Database } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "BI & Analytics Solutions | Kozker Tech",
  description:
    "Transform your data into actionable insights with comprehensive business intelligence and analytics solutions.",
}

export default function BIAnalyticsPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Interactive Dashboards",
      description: "Custom-built, interactive dashboards that visualize your key metrics and KPIs in real-time.",
    },
    {
      icon: LineChart,
      title: "Predictive Analytics",
      description: "Advanced algorithms that analyze historical data to forecast trends and future outcomes.",
    },
    {
      icon: PieChart,
      title: "Data Visualization",
      description:
        "Compelling visual representations of complex data sets that make insights accessible to all stakeholders.",
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Comprehensive tracking of business performance metrics across all departments and functions.",
    },
    {
      icon: Database,
      title: "Data Integration",
      description: "Seamless integration of data from multiple sources into a unified analytics platform.",
    },
  ]

  const benefits = [
    "Data-driven decision making across all levels of your organization",
    "Identification of new business opportunities and market trends",
    "Early detection of potential issues and operational inefficiencies",
    "Improved customer insights and personalization capabilities",
    "Enhanced operational efficiency and cost reduction",
    "Competitive advantage through superior business intelligence",
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "BI & Analytics Solutions",
    provider: {
      "@type": "Organization",
      name: "Kozker Tech",
    },
    description:
      "Transform your data into actionable insights with comprehensive business intelligence and analytics solutions.",
    serviceType: "Business Intelligence",
    offers: {
      "@type": "Offer",
      price: "Custom",
      priceCurrency: "USD",
    },
  }

  return (
    <>
      <SchemaMarkup schema={schema} />
      <div className="container px-4 md:px-6 py-8 max-w-5xl mx-auto">
        <Breadcrumbs homeLabel="Home" className="mb-6" />

        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">BI & Analytics Solutions</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Transform raw data into actionable insights that drive strategic decision-making and business growth.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/data-analytics-dashboard.png"
              alt="BI & Analytics Solutions"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive BI & Analytics Features</h2>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Our BI & Analytics Process</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Discovery & Requirements Analysis</h3>
                <p className="text-muted-foreground">
                  We work closely with your team to understand your business objectives, data sources, and analytics
                  requirements.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Data Assessment & Strategy</h3>
                <p className="text-muted-foreground">
                  We assess your current data landscape and develop a comprehensive strategy for data integration,
                  cleansing, and analysis.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Solution Design & Development</h3>
                <p className="text-muted-foreground">
                  We design and develop custom BI dashboards, reports, and analytics solutions tailored to your specific
                  needs.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Implementation & Integration</h3>
                <p className="text-muted-foreground">
                  We implement the BI solution and integrate it with your existing systems, ensuring seamless data flow
                  and accessibility.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Training & Ongoing Support</h3>
                <p className="text-muted-foreground">
                  We provide comprehensive training for your team and ongoing support to ensure you maximize the value
                  of your BI investment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 grid md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Executive Dashboards</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive dashboards that provide executives with a high-level view of business performance,
              including:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Key performance indicators (KPIs) at a glance</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Financial metrics and trends</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Sales and revenue performance</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Customer acquisition and retention metrics</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Market share and competitive analysis</span>
              </li>
            </ul>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Operational Analytics</h3>
            <p className="text-muted-foreground mb-4">
              Detailed analytics that help operational teams optimize processes and efficiency, including:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Process performance and bottleneck identification</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Resource utilization and capacity planning</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Quality control and defect analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Supply chain and inventory optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Predictive maintenance and downtime reduction</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Transform Your Data into Strategic Advantage</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock the full potential of your business data with our comprehensive BI and analytics solutions.
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
