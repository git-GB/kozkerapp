"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SolutionModal } from "@/components/solution-modal"
import Image from "next/image"

// Define the solution data
const industrySolutions = [
  {
    id: "healthcare",
    title: "Healthcare Solutions",
    shortDescription: "Digital solutions for hospitals, clinics, and healthcare providers.",
    description:
      "Comprehensive digital solutions designed specifically for healthcare providers. From patient management systems to appointment scheduling and telemedicine integration, our healthcare solutions help medical professionals deliver better care.",
    image: "/modern-digital-hospital.png",
    features: [
      "Patient management system",
      "Appointment scheduling and reminders",
      "Telemedicine integration",
      "Medical records management",
      "Prescription management",
    ],
    benefits: [
      "Reduce administrative workload by up to 40%",
      "Improve patient satisfaction with streamlined processes",
      "Ensure HIPAA compliance and data security",
      "Enhance communication between patients and providers",
      "Optimize resource allocation and scheduling",
    ],
    caseStudy: {
      name: "City General Hospital",
      description:
        "Implemented a comprehensive digital solution that streamlined patient management and appointment scheduling.",
      result: "30% Reduction in Wait Times",
    },
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    shortDescription: "Omnichannel solutions for retail businesses of all sizes.",
    description:
      "Powerful digital solutions for retail and e-commerce businesses. From online stores to inventory management and customer loyalty programs, our retail solutions help businesses sell more effectively across all channels.",
    image: "/modern-retail-store-digital.png",
    features: [
      "E-commerce website development",
      "Inventory management system",
      "Point of sale (POS) integration",
      "Customer loyalty programs",
      "Omnichannel marketing automation",
    ],
    benefits: [
      "Increase online sales by up to 35%",
      "Streamline inventory management across channels",
      "Enhance customer experience and loyalty",
      "Gain valuable insights through data analytics",
      "Reduce operational costs with automation",
    ],
    caseStudy: {
      name: "Fashion Bazaar",
      description: "Developed an omnichannel retail solution that integrated online and offline sales channels.",
      result: "45% Increase in Sales",
    },
  },
  {
    id: "education",
    title: "Education Technology",
    shortDescription: "Digital learning solutions for schools, colleges, and training centers.",
    description:
      "Innovative digital solutions for educational institutions. From learning management systems to virtual classrooms and student assessment tools, our education technology solutions help institutions deliver better learning experiences.",
    image: "/modern-digital-classroom.png",
    features: [
      "Learning management system (LMS)",
      "Virtual classroom platform",
      "Student assessment and progress tracking",
      "Course content management",
      "Parent-teacher communication portal",
    ],
    benefits: [
      "Enhance student engagement and participation",
      "Simplify administrative tasks for educators",
      "Provide personalized learning experiences",
      "Improve communication between stakeholders",
      "Track and analyze student performance",
    ],
    caseStudy: {
      name: "Global Learning Academy",
      description: "Implemented a comprehensive learning management system with virtual classroom capabilities.",
      result: "25% Improvement in Student Performance",
    },
  },
  {
    id: "hospitality",
    title: "Hospitality & Tourism",
    shortDescription: "Digital solutions for hotels, restaurants, and tourism businesses.",
    description:
      "Tailored digital solutions for the hospitality and tourism industry. From booking systems to customer experience management and operational efficiency tools, our solutions help hospitality businesses deliver exceptional service.",
    image: "/placeholder-fiiwu.png",
    features: [
      "Online booking and reservation system",
      "Property management system",
      "Guest experience management",
      "Restaurant point of sale (POS)",
      "Housekeeping and maintenance management",
    ],
    benefits: [
      "Streamline booking and check-in processes",
      "Enhance guest satisfaction and loyalty",
      "Optimize resource allocation and staffing",
      "Increase direct bookings and reduce commission costs",
      "Improve operational efficiency and service quality",
    ],
    caseStudy: {
      name: "Seaside Resort & Spa",
      description:
        "Implemented a comprehensive digital solution that streamlined operations and enhanced guest experience.",
      result: "40% Increase in Direct Bookings",
    },
  },
  {
    id: "finance",
    title: "Financial Services",
    shortDescription: "Digital solutions for banks, insurance companies, and financial institutions.",
    description:
      "Secure and efficient digital solutions for the financial services industry. From online banking platforms to insurance management systems and financial analytics tools, our solutions help financial institutions serve their customers better.",
    image: "/digital-banking.png",
    features: [
      "Online banking platform",
      "Insurance management system",
      "Financial analytics and reporting",
      "Loan processing automation",
      "Secure payment processing",
    ],
    benefits: [
      "Enhance security and compliance",
      "Improve customer satisfaction with digital services",
      "Streamline operations and reduce costs",
      "Gain insights through advanced analytics",
      "Accelerate loan processing and approvals",
    ],
    caseStudy: {
      name: "City Trust Bank",
      description: "Developed a comprehensive digital banking platform with advanced security features.",
      result: "50% Reduction in Processing Time",
    },
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Industry",
    shortDescription: "Digital solutions for manufacturing businesses and industrial operations.",
    description:
      "Powerful digital solutions for the manufacturing industry. From production management to supply chain optimization and quality control, our solutions help manufacturing businesses improve efficiency and product quality.",
    image: "/modern-automated-factory.png",
    features: [
      "Production management system",
      "Supply chain optimization",
      "Quality control and assurance",
      "Equipment maintenance management",
      "Inventory and warehouse management",
    ],
    benefits: [
      "Increase production efficiency by up to 30%",
      "Reduce waste and operational costs",
      "Improve product quality and consistency",
      "Optimize supply chain and logistics",
      "Enhance workplace safety and compliance",
    ],
    caseStudy: {
      name: "Precision Engineering Ltd",
      description:
        "Implemented a comprehensive digital solution that optimized production processes and quality control.",
      result: "35% Increase in Production Efficiency",
    },
  },
]

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState<(typeof industrySolutions)[0] | null>(null)

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 hero-pattern">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">Industry Solutions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Tailored digital solutions designed specifically for your industry's unique challenges and opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrySolutions.map((solution) => (
              <Card key={solution.id} className="border-2 hover:border-primary transition-all h-full flex flex-col">
                <CardHeader>
                  <div className="relative h-[200px] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={solution.image || "/placeholder.svg"}
                      alt={solution.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>{solution.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {solution.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setSelectedSolution(solution)}>
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Don't See Your Industry?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We specialize in creating custom digital solutions for a wide range of industries. Our team of experts
                will work with you to understand your unique challenges and develop a tailored solution that meets your
                specific needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Badge className="bg-primary text-white mt-1">01</Badge>
                  <div>
                    <h3 className="font-medium dark:text-white">Consultation</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We start with a thorough consultation to understand your business and industry-specific
                      challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="bg-primary text-white mt-1">02</Badge>
                  <div>
                    <h3 className="font-medium dark:text-white">Custom Solution Design</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Our experts design a tailored solution that addresses your specific needs and challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="bg-primary text-white mt-1">03</Badge>
                  <div>
                    <h3 className="font-medium dark:text-white">Implementation & Support</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We implement your solution and provide ongoing support to ensure its success.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="mt-8" asChild>
                <a href="/contact">Request a Custom Solution</a>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0279b843-69a8-421c-8903-3c830c1c15ca-bSx53H1Gt2kx3omvwfrZtcIiDZKLoA.png"
                alt="Business automation and integration tools showing comprehensive digital solutions for growing businesses"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with our industry-specific solutions today and watch your business grow.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-primary">
            <a href="/contact">Contact Us Now</a>
          </Button>
        </div>
      </section>

      {/* Solution Modal */}
      {selectedSolution && (
        <SolutionModal
          isOpen={!!selectedSolution}
          onClose={() => setSelectedSolution(null)}
          solution={selectedSolution}
        />
      )}
    </>
  )
}
