import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Cloud, Database, Lock, Zap, RefreshCw } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Cloud & Data Integration | Kozker Tech",
  description:
    "Seamlessly integrate your data across platforms and migrate to cloud solutions for improved efficiency and scalability.",
}

export default function CloudDataIntegrationPage() {
  const features = [
    {
      icon: Cloud,
      title: "Cloud Migration",
      description: "Seamless migration of your applications, databases, and infrastructure to leading cloud platforms.",
    },
    {
      icon: Database,
      title: "Data Integration",
      description: "Connect and synchronize data across multiple systems, applications, and databases.",
    },
    {
      icon: Lock,
      title: "Secure Data Transfer",
      description: "Encrypted data transfer protocols ensuring your sensitive information remains protected.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Fine-tuning of cloud resources and data flows for optimal performance and cost efficiency.",
    },
    {
      icon: RefreshCw,
      title: "Real-time Synchronization",
      description: "Ensure data consistency across all systems with real-time synchronization capabilities.",
    },
  ]

  const benefits = [
    "Improved data accessibility and availability across your organization",
    "Enhanced scalability to accommodate growing data volumes and user bases",
    "Reduced IT infrastructure costs through cloud-based solutions",
    "Increased operational efficiency through streamlined data processes",
    "Better disaster recovery and business continuity capabilities",
    "Faster time-to-market for new applications and services",
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cloud & Data Integration",
    provider: {
      "@type": "Organization",
      name: "Kozker Tech",
    },
    description:
      "Seamlessly integrate your data across platforms and migrate to cloud solutions for improved efficiency and scalability.",
    serviceType: "Cloud Computing",
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Cloud & Data Integration</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Seamlessly connect your systems, applications, and data sources while leveraging the power of cloud
              computing.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/cloud-data-integration.png"
              alt="Cloud & Data Integration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Our Cloud & Data Integration Process</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Assessment & Planning</h3>
                <p className="text-muted-foreground">
                  We assess your current infrastructure, data sources, and integration needs to develop a comprehensive
                  migration and integration plan.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Architecture Design</h3>
                <p className="text-muted-foreground">
                  We design a scalable, secure cloud architecture and data integration framework tailored to your
                  specific business requirements.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Migration & Integration</h3>
                <p className="text-muted-foreground">
                  We execute the migration of your applications and data to the cloud while implementing the necessary
                  integration points between systems.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Testing & Validation</h3>
                <p className="text-muted-foreground">
                  We thoroughly test all integrations and cloud deployments to ensure data integrity, performance, and
                  security.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Optimization & Support</h3>
                <p className="text-muted-foreground">
                  We provide ongoing optimization, monitoring, and support to ensure your cloud and data integration
                  solutions continue to meet your evolving needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 grid md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Cloud Migration Services</h3>
            <p className="text-muted-foreground mb-4">Our comprehensive cloud migration services include:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Migration to AWS, Azure, Google Cloud, and other platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Infrastructure as Code (IaC) implementation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Database migration and optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Application refactoring for cloud-native architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Cloud security implementation and compliance</span>
              </li>
            </ul>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Data Integration Solutions</h3>
            <p className="text-muted-foreground mb-4">Our data integration expertise covers:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>API development and management</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>ETL (Extract, Transform, Load) processes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Real-time data streaming and processing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Master data management (MDM)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Data governance and quality assurance</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your IT Infrastructure?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Leverage the power of cloud computing and seamless data integration to drive efficiency, scalability, and
            innovation in your business.
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
