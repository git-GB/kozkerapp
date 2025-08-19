import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, MessageSquare, Bot, BarChart, Users } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "24/7 AI-Powered Customer Support Services | KozkerTech",
  description:
    "Capture every opportunity with 24/7 live-chat and smart email routing. Never miss a lead with our round-the-clock AI-powered customer support services.",
  keywords: [
    "24/7 customer support",
    "AI customer service",
    "live chat support",
    "smart email routing",
    "customer support Kochi",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/24x7-ai-powered-customer-support`,
  },
  openGraph: {
    title: "24/7 AI-Powered Customer Support Services | KozkerTech",
    description:
      "Capture every opportunity with 24/7 live-chat and smart email routing. Never miss a lead with our round-the-clock AI-powered customer support services.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/24x7-ai-powered-customer-support`,
    type: "website",
  },
}

export default function AICustomerSupportPage() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "AI-powered support available around the clock, ensuring your customers get help whenever they need it, even outside business hours.",
    },
    {
      icon: MessageSquare,
      title: "Intelligent Live Chat",
      description:
        "Advanced chatbots that understand natural language and can resolve common issues instantly while seamlessly escalating complex queries to human agents.",
    },
    {
      icon: Bot,
      title: "AI-Powered Responses",
      description:
        "Machine learning algorithms that continuously improve response accuracy and personalization based on customer interactions and feedback.",
    },
    {
      icon: BarChart,
      title: "Smart Analytics",
      description:
        "Comprehensive dashboards that provide insights into customer queries, satisfaction levels, and support team performance.",
    },
    {
      icon: Users,
      title: "Human-AI Collaboration",
      description:
        "Seamless handoff between AI and human agents, with AI handling routine queries and humans focusing on complex issues requiring empathy and judgment.",
    },
  ]

  const benefits = [
    "Never miss a lead with 24/7 availability",
    "Reduce support costs by up to 70% with AI automation",
    "Improve response times from hours to seconds",
    "Increase customer satisfaction with instant resolutions",
    "Scale support operations without proportionally increasing costs",
    "Gain valuable insights from customer interactions",
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "24/7 AI-Powered Customer Support",
    provider: {
      "@type": "Organization",
      name: "KozkerTech",
    },
    description:
      "Capture every opportunity with 24/7 live-chat and smart email routing. Never miss a lead with our round-the-clock AI-powered customer support services.",
    serviceType: "Customer Support",
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">24/7 AI-Powered Customer Support</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Capture every opportunity with 24/7 live-chat and smart email routing. Never miss a lead or customer
              inquiry, day or night.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automated%20email-1lLPFPmUNHcBG1ncDv1JakdtzfKbeC.png"
              alt="Professional customer support team providing 24/7 assistance through chat and email channels"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Support Features</h2>
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
          <h2 className="text-3xl font-bold mb-8 text-center">How Our AI Support Works</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block"></div>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 md:text-right md:pr-8">
                  <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4 md:ml-auto">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Initial Contact</h3>
                  <p className="text-muted-foreground">
                    Customers reach out through your website chat, email, or other integrated channels. Our AI
                    immediately engages, acknowledging their inquiry and collecting initial information.
                  </p>
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Resolution</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes the query using natural language processing and attempts to resolve common
                    issues instantly using its knowledge base and your business rules.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 md:text-right md:pr-8">
                  <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4 md:ml-auto">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Escalation</h3>
                  <p className="text-muted-foreground">
                    For complex issues requiring human expertise, the AI seamlessly escalates to the appropriate human
                    agent, providing them with the full context of the conversation and customer information.
                  </p>
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                  <p className="text-muted-foreground">
                    The AI system learns from every interaction, improving its responses over time and adapting to your
                    specific business needs and customer preferences.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 md:text-right md:pr-8">
                  <div className="bg-primary/10 text-primary text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4 md:ml-auto">
                    5
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analytics & Optimization</h3>
                  <p className="text-muted-foreground">
                    Comprehensive analytics provide insights into customer inquiries, satisfaction levels, and support
                    performance, enabling continuous optimization of your customer support strategy.
                  </p>
                </div>
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-card p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">AI-Powered Live Chat</h3>
            <p className="text-muted-foreground mb-4">
              Our intelligent chatbots provide immediate assistance to your customers, with features including:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Natural language understanding for human-like conversations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Instant responses to common questions and issues</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Personalized interactions based on user history and preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Proactive engagement based on user behavior</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Seamless handoff to human agents when needed</span>
              </li>
            </ul>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Smart Email Routing</h3>
            <p className="text-muted-foreground mb-4">
              Our intelligent email management system ensures efficient handling of all email communications:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>AI-powered categorization and prioritization of incoming emails</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Automated responses for common inquiries</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Intelligent routing to the most appropriate department or agent</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Response suggestions for human agents to increase efficiency</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Follow-up reminders and satisfaction surveys</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How does AI improve customer support?</h3>
              <p className="text-muted-foreground">
                AI enhances customer support by providing 24/7 availability, instant responses to common queries,
                consistent service quality, and the ability to handle multiple conversations simultaneously. It also
                learns from each interaction to continuously improve its responses and can analyze large volumes of
                customer data to identify trends and opportunities for improvement.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">Will customers know they're talking to an AI?</h3>
              <p className="text-muted-foreground">
                We believe in transparency, so our AI assistants identify themselves as AI. However, they're designed to
                provide natural, conversational interactions that feel helpful and personalized. For many routine
                inquiries, customers appreciate the immediate, accurate responses that AI provides, while complex issues
                are seamlessly escalated to human agents.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How quickly can you implement AI support for my business?</h3>
              <p className="text-muted-foreground">
                We can typically implement a basic AI support system within 1-2 weeks, with more comprehensive solutions
                taking 3-4 weeks depending on the complexity of your business and the level of customization required.
                The implementation includes training the AI on your products, services, and common customer inquiries to
                ensure accurate and helpful responses from day one.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-2">How do you measure the success of AI support?</h3>
              <p className="text-muted-foreground">
                We track multiple metrics to measure success, including resolution rate (percentage of inquiries
                resolved by AI without human intervention), customer satisfaction scores, response time, cost per
                interaction, and conversion rates for sales-related inquiries. We provide regular reports on these
                metrics and continuously optimize the system to improve performance.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss Another Lead or Customer Inquiry</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Provide exceptional 24/7 support that builds customer loyalty and captures every opportunity with our
            AI-powered customer support solutions.
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
