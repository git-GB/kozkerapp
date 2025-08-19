import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageSquare, Bell, ShoppingCart, BarChart3, Users } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "WhatsApp Automation Services for Business Growth | KozkerTech",
  description:
    "Accelerate sales through automated WhatsApp workflows. Streamline customer communication with personalized messaging for notifications, support, and engagement.",
  keywords: [
    "WhatsApp automation",
    "WhatsApp business",
    "automated messaging",
    "customer engagement",
    "WhatsApp marketing",
    "Kochi",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/whatsapp-automation`,
  },
  openGraph: {
    title: "WhatsApp Automation Services for Business Growth | KozkerTech",
    description:
      "Accelerate sales through automated WhatsApp workflows. Streamline customer communication with personalized messaging for notifications, support, and engagement.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/whatsapp-automation`,
    type: "website",
  },
}

export default function WhatsAppAutomationPage() {
  const features = [
    {
      icon: MessageSquare,
      title: "Intelligent Automated Responses",
      description:
        "AI-powered chatbots that understand natural language and provide instant, accurate responses to common customer queries 24/7.",
    },
    {
      icon: Bell,
      title: "Personalized Notifications",
      description:
        "Automated, timely updates on orders, appointments, deliveries, and other important events tailored to each customer's journey.",
    },
    {
      icon: ShoppingCart,
      title: "Conversational Commerce",
      description:
        "Enable customers to browse products, make purchases, and complete transactions entirely within WhatsApp conversations.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive insights into message performance, customer engagement patterns, and conversion metrics to optimize your strategy.",
    },
    {
      icon: Users,
      title: "Audience Segmentation",
      description:
        "Target specific customer segments with relevant messages based on their behavior, preferences, and purchase history.",
    },
  ]

  const benefits = [
    "Increase customer engagement rates by up to 80% compared to email",
    "Reduce response time from hours to seconds",
    "Boost conversion rates with personalized, timely messaging",
    "Scale customer communication without increasing staff",
    "Build stronger customer relationships through conversational interactions",
    "Capture valuable customer data and insights",
  ]

  const useCases = [
    {
      title: "E-commerce & Retail",
      description:
        "Automate order confirmations, shipping updates, abandoned cart reminders, and personalized product recommendations to drive sales and improve customer experience.",
      examples: [
        "Order status notifications",
        "Abandoned cart recovery",
        "Product recommendations",
        "Flash sale alerts",
      ],
    },
    {
      title: "Service Businesses",
      description:
        "Streamline appointment scheduling, send reminders, collect feedback, and provide instant support to enhance client satisfaction and operational efficiency.",
      examples: ["Appointment reminders", "Service confirmations", "Feedback collection", "Quick support responses"],
    },
    {
      title: "Hospitality & Travel",
      description:
        "Deliver booking confirmations, check-in instructions, travel updates, and personalized recommendations to create seamless guest experiences.",
      examples: ["Booking confirmations", "Check-in/out reminders", "Local recommendations", "Special offers"],
    },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WhatsApp Automation",
    provider: {
      "@type": "Organization",
      name: "KozkerTech",
    },
    description:
      "Accelerate sales through automated WhatsApp workflows. Streamline customer communication with personalized messaging for notifications, support, and engagement.",
    serviceType: "Business Communication",
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">WhatsApp Automation</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Accelerate sales through automated WhatsApp workflows that engage customers, streamline support, and drive
              conversions through personalized messaging.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-ZhRe7DXfJKi9NUueisUKGBW6xSvEFp.png"
              alt="WhatsApp automation interface showing order updates, customer service features, and automated messaging capabilities"
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
          <h2 className="text-3xl font-bold mb-6">Why Choose WhatsApp for Business Communication?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">Unmatched Reach</h3>
                <p className="text-muted-foreground">
                  With over 2 billion users worldwide and 98% open rates, WhatsApp offers unparalleled reach and
                  engagement compared to other channels.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">Rich Media Support</h3>
                <p className="text-muted-foreground">
                  Share images, videos, documents, location, and interactive buttons for a more engaging and informative
                  customer experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">Conversational Interface</h3>
                <p className="text-muted-foreground">
                  Natural, chat-based interactions create a more personal connection with customers compared to formal
                  emails or website forms.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">End-to-End Encryption</h3>
                <p className="text-muted-foreground">
                  Secure communication channel for sharing sensitive information, building trust with privacy-conscious
                  customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-6">Business Benefits</h2>
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
          <h2 className="text-3xl font-bold mb-8 text-center">How Our WhatsApp Automation Works</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">WhatsApp Business API Integration</h3>
                <p className="text-muted-foreground">
                  We set up and configure the WhatsApp Business API for your company, ensuring compliance with
                  WhatsApp's policies and guidelines. This provides you with an official business presence on WhatsApp.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Workflow Design & Automation</h3>
                <p className="text-muted-foreground">
                  We design automated messaging workflows based on your business processes, customer journey, and
                  communication goals. This includes creating message templates, conversation flows, and automation
                  rules.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">System Integration</h3>
                <p className="text-muted-foreground">
                  We integrate WhatsApp automation with your existing systems (CRM, e-commerce platform, booking system,
                  etc.) for seamless data flow and to ensure that your WhatsApp communications are synchronized with
                  other business processes.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">AI Chatbot Implementation</h3>
                <p className="text-muted-foreground">
                  We develop and train AI-powered chatbots that can understand natural language, answer common
                  questions, and guide customers through various processes, from product inquiries to completing
                  purchases.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div className="flex-1 md:border-l-2 md:border-primary/20 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Launch, Monitor & Optimize</h3>
                <p className="text-muted-foreground">
                  We launch your WhatsApp automation solution and provide ongoing monitoring, analytics, and
                  optimization to ensure optimal performance and continuous improvement based on customer interactions
                  and business results.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Industry Use Cases</h2>
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {useCase.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{example}</span>
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
              <h3 className="text-xl font-semibold mb-2">Is WhatsApp automation compliant with WhatsApp's policies?</h3>
              <p className="text-muted-foreground">
                Yes, our WhatsApp automation solutions are fully compliant with WhatsApp's Business Policy and Terms of
                Service. We implement the official WhatsApp Business API through authorized partners and follow all
                guidelines regarding messaging types, opt-in requirements, and content restrictions.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How quickly can you implement WhatsApp automation?</h3>
              <p className="text-muted-foreground">
                Basic WhatsApp automation can be implemented in 2-3 weeks, while more complex integrations with multiple
                systems and custom workflows typically take 4-6 weeks. The timeline depends on the complexity of your
                business processes, the level of customization required, and the systems that need to be integrated.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How do customers opt in to receive WhatsApp messages?</h3>
              <p className="text-muted-foreground">
                Customers can opt in through various channels, including your website, mobile app, SMS, or by sending a
                message to your WhatsApp business number. We implement compliant opt-in mechanisms that clearly inform
                customers about the types of messages they'll receive and provide easy opt-out options.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">
                Can WhatsApp automation integrate with our existing systems?
              </h3>
              <p className="text-muted-foreground">
                Yes, our WhatsApp automation solutions can integrate with a wide range of business systems, including
                CRM platforms (Salesforce, HubSpot, etc.), e-commerce platforms (Shopify, WooCommerce, etc.), booking
                systems, ERP systems, and custom databases. This ensures seamless data flow and synchronized
                communications across all channels.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Customer Communication?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Harness the power of WhatsApp automation to engage customers, streamline communication, and drive business
            growth.
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
