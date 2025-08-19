import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SchemaMarkup } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "About KozkerTech | Our Story, Mission & Team",
  description:
    "Learn about KozkerTech's journey, our mission to transform businesses with innovative tech solutions, and meet the team behind our success.",
  openGraph: {
    title: "About KozkerTech | Our Story, Mission & Team",
    description:
      "Learn about KozkerTech's journey, our mission to transform businesses with innovative tech solutions, and meet the team behind our success.",
    url: "https://kozker.com/about",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About KozkerTech",
          description:
            "Learn about KozkerTech's journey, our mission to transform businesses with innovative tech solutions, and meet the team behind our success.",
          url: "https://kozker.com/about",
          mainEntity: {
            "@type": "Organization",
            name: "KozkerTech",
            url: "https://kozker.com",
            logo: "https://kozker.com/logo.png",
            sameAs: [
              "https://twitter.com/kozkertech",
              "https://www.linkedin.com/company/kozkertech",
              "https://www.facebook.com/kozkertech",
            ],
          },
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/20 px-3 py-1 text-sm text-orange-600 dark:text-orange-400 mb-4">
              Our Story
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Transforming Businesses Through Technology
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We're on a mission to help businesses leverage cutting-edge technology to grow, innovate, and succeed in
              the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Journey</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Founded in 2024, KozkerTech is the technology division of Kozker, a brand established in 2022. We began
                with a simple vision: to make advanced technology accessible to businesses of all sizes. As part of the
                Kozker family, we leverage the brand's established reputation while focusing specifically on innovative
                technology solutions.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Though we're a young company, we bring together experienced professionals with decades of combined
                expertise in technology and business transformation. Our team is passionate about helping businesses
                across various industries transform their operations, enhance customer experiences, and achieve
                remarkable growth through our innovative solutions.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Today, we're proud to be at the forefront of technological innovation, specializing in AI-powered
                solutions, business intelligence, and custom software development that drives real business results.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kochi-office-49pNzu4d0efeT9A6GnoF3Ra8jrk7P5.png"
                alt="KozkerTech team collaborating in our modern Kochi office, showcasing our local expertise and professional environment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Our Mission & Values</h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-600 dark:text-orange-400"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Trust & Reliability</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We build lasting relationships based on trust, delivering reliable solutions that our clients can depend
                on.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-600 dark:text-orange-400"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We constantly push the boundaries of what's possible, embracing new technologies and creative approaches
                to solve complex problems.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-600 dark:text-orange-400"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Client Success</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your success is our success. We're committed to delivering solutions that drive measurable results and
                help you achieve your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Meet Our Team</h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The talented individuals behind our success
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">GB</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Govind Bhat</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-3">Founder & CEO</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                With over 6 years of experience in technology and business, Govind leads our vision and strategy.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">JJ</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Joel Joseph</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-3">Product Lead</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Joel oversees our technical direction, bringing expertise in AI, cloud architecture, and software
                development.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">AP</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Alan Alves Palat</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-3">Multi-Utility</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Alan brings versatility and expertise across multiple domains to support our diverse project needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-50 dark:bg-orange-950/20 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Business?</h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Let's discuss how our solutions can help you achieve your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-orange-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus-visible:ring-orange-700"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
