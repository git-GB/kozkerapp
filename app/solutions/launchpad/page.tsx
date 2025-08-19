import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Rocket, Globe, Calendar, MessageSquare, MapPin, Star, ArrowRight, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "LaunchPad - Digital Solutions for Startups & Local SMBs | KozkerTech",
  description:
    "Get online fast with our LaunchPad solutions. Perfect for startups and local SMBs. Includes free 1-page website, local SEO, and basic automation.",
}

export default function LaunchPadPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="px-4 py-2 text-sm bg-green-100 text-green-700 border-green-200">
                <Rocket className="h-4 w-4 mr-2" />
                LaunchPad Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Launch Your Digital Presence <span className="text-green-600">Fast & Affordable</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Perfect for startups and local SMBs ready to establish their online presence. Get a professional
                website, local visibility, and basic automation to start growing your business.
              </p>

              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-700 dark:text-green-300 font-semibold flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  FREE 1-Page Website Included with Every Package!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/contact?solution=launchpad">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#free-tool">Try Our Free Tool</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Version%20control-bro-Qh89MYaKZ0pQ3bE5Ki22coNF2ls8tw.png"
                alt="Developer working on automated workflows and digital solutions with gears and process diagrams in the background"
                width={600}
                height={600}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect For</h2>
            <p className="text-xl text-muted-foreground">
              LaunchPad is designed for businesses just starting their digital journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Startups</h3>
              <p className="text-muted-foreground">
                New businesses looking to establish their online presence quickly and affordably
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Businesses</h3>
              <p className="text-muted-foreground">
                Restaurants, salons, clinics, and shops wanting to attract local customers
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Service Providers</h3>
              <p className="text-muted-foreground">
                Consultants, tutors, and professionals needing appointment booking and basic automation
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What's Included</h2>
            <p className="text-xl text-muted-foreground">Everything you need to launch your digital presence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Web Design */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>AI Web Design</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      FREE 1-Page Website
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Professional, mobile-first website designed to convert visitors into customers
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Responsive design for all devices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">WhatsApp integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Contact forms and CTAs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Fast loading and SEO optimized</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Local SEO & GMB */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Local SEO & GMB Optimization</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">Dominate local search results and "near me" queries</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Google My Business setup & optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Local keyword optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">NAP consistency across directories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Review management setup</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Appointment Booking */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Automated Appointment Booking</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">Streamline scheduling with automated booking and reminders</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Online booking calendar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Automated confirmation emails</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">SMS/WhatsApp reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">No-show reduction features</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Basic Automation */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Basic WhatsApp Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">Simple automation to handle common customer inquiries</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Auto-responder setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">FAQ responses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Business hours messaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Lead capture forms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose LaunchPad?</h2>
            <p className="text-xl text-muted-foreground">Get online fast without breaking the bank</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Launch in Days</h3>
              <p className="text-muted-foreground">Get your website live in 3-5 business days, not weeks</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Website</h3>
              <p className="text-muted-foreground">Professional 1-page website included at no extra cost</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Focus</h3>
              <p className="text-muted-foreground">Optimized for local search and "near me" queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tool Section - Domain Name Genie */}
      <section
        id="free-tool"
        className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Tool for LaunchPad Users
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start with the Perfect Domain Name</h2>
            <p className="text-xl text-muted-foreground">
              Before launching your business, find the perfect domain name with our AI-powered Domain Name Genie
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <Globe className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Domain Name Genie</h3>
                      <Badge className="mt-1 bg-green-600 hover:bg-green-700">Most Popular for Startups</Badge>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground">
                    Get AI-powered domain name suggestions based on your business description. Perfect for startups and
                    local businesses looking to establish their online presence.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>AI-powered domain suggestions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Real-time availability checking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Multiple TLD options (.com, .in, .org)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Brand-friendly suggestions</span>
                    </li>
                  </ul>

                  <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/tools/domain-name-generator">
                      Try Domain Name Genie Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="relative">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Live Preview
                      </div>
                      <div className="space-y-3">
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border-l-4 border-green-500">
                          <div className="font-medium text-green-700 dark:text-green-300">techstartup.com</div>
                          <div className="text-sm text-green-600 dark:text-green-400">Available ✓</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border-l-4 border-blue-500">
                          <div className="font-medium text-blue-700 dark:text-blue-300">innovatetech.in</div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">Available ✓</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded border-l-4 border-purple-500">
                          <div className="font-medium text-purple-700 dark:text-purple-300">digitallaunch.org</div>
                          <div className="text-sm text-purple-600 dark:text-purple-400">Available ✓</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Digital Presence?</h2>
            <p className="text-xl opacity-90 mb-8">
              Start with our free Domain Name Genie, then let us build your complete digital presence with LaunchPad
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-green-600">
                <Link href="/contact?solution=launchpad">Get Your Free Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white hover:bg-white hover:text-green-600 text-white bg-transparent"
              >
                <Link href="/tools">Explore All Free Tools</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">No commitment required • Free consultation • Launch in 3-5 days</p>
          </div>
        </div>
      </section>
    </>
  )
}
