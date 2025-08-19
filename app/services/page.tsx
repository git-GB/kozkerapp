import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "24/7 Support & Web Development Services | Kozker Tech",
  description:
    "Explore our comprehensive range of digital services including 24/7 live chat support, WhatsApp automation, and mobile-first web design to help your business grow and succeed.",
  keywords: ["24/7 support", "live chat", "whatsapp automation", "web development", "kochi", "mobile-first websites"],
  openGraph: {
    title: "24/7 Support & Web Development Services | Kozker Tech",
    description:
      "Explore our comprehensive range of digital services including 24/7 live chat support, WhatsApp automation, and mobile-first web design to help your business grow and succeed.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"}/services`,
    type: "website",
  },
}

export default function ServicesPage() {
  const services = [
    {
      title: "Mobile-First Web Design",
      description:
        "Launch polished, mobile-first websites in days, not weeks. Our AI-powered design process ensures your business looks professional on any device while saving you valuable time.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2843c334-9a4a-4a2d-9237-c6f1ecb1e76b-8Sgtksy64pamtLDsSfFItMMvsr3uLM.png",
      link: "/services/ai-powered-web-design",
    },
    {
      title: "24×7 AI-Powered Customer Support",
      description:
        "Capture every opportunity with round-the-clock live chat and smart email routing. Never miss a lead with our professional customer service team available 24/7.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automated%20email-1lLPFPmUNHcBG1ncDv1JakdtzfKbeC.png",
      link: "/services/24x7-ai-powered-customer-support",
    },
    {
      title: "WhatsApp Automation",
      description:
        "Accelerate sales through automated WhatsApp workflows. Streamline customer communication with personalized messaging for notifications, support, and engagement.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-ZhRe7DXfJKi9NUueisUKGBW6xSvEFp.png",
      link: "/services/whatsapp-automation",
    },
    {
      title: "BI & Analytics Solutions",
      description:
        "Make data-driven decisions with our Power BI solutions that transform your business data into actionable insights for improved performance and growth.",
      image: "/data-analytics-dashboard.png",
      link: "/services/bi-analytics",
    },
    {
      title: "Cloud & Data Integration",
      description:
        "Seamlessly integrate your data across platforms and migrate to cloud solutions for improved efficiency, scalability, and business continuity.",
      image: "/cloud-data-integration.png",
      link: "/services/cloud-data-integration",
    },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "Kozker Tech",
        },
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"}${service.link}`,
      },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={schema} />
      <div className="container px-4 md:px-6 py-8 max-w-5xl mx-auto">
        <Breadcrumbs homeLabel="Home" className="mb-6" />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions designed to help your business grow, innovate, and succeed in today's
            competitive landscape.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                <Button asChild className="group">
                  <Link href={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div
                className={`relative h-[250px] md:h-[300px] rounded-xl overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                {service.title === "Mobile-First Web Design" && (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2843c334-9a4a-4a2d-9237-c6f1ecb1e76b-8Sgtksy64pamtLDsSfFItMMvsr3uLM.png"
                    alt="AI-powered web design interface showing creative solutions and design tools"
                    fill
                    className="object-cover"
                  />
                )}
                {service.title === "24×7 AI-Powered Customer Support" && (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automated%20email-1lLPFPmUNHcBG1ncDv1JakdtzfKbeC.png"
                    alt="Customer support team providing round-the-clock assistance"
                    fill
                    className="object-cover"
                  />
                )}
                {service.title === "WhatsApp Automation" && (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-ZhRe7DXfJKi9NUueisUKGBW6xSvEFp.png"
                    alt="WhatsApp automation showing automated customer communication and order management"
                    fill
                    className="object-cover"
                  />
                )}
                {service.title !== "Mobile-First Web Design" &&
                  service.title !== "24×7 AI-Powered Customer Support" &&
                  service.title !== "WhatsApp Automation" && (
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-primary/5 p-8 md:p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our services can help your business achieve its goals.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
