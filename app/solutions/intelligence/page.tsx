import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Brain,
  BarChart3,
  Database,
  Users,
  TrendingUp,
  Zap,
  ArrowRight,
  Sparkles,
  Filter,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Intelligence - Power BI & Data Analytics Solutions | KozkerTech",
  description:
    "Expert Power BI consulting and advanced data analytics for enterprises. Custom dashboards, data integration, and strategic insights.",
}

export default function IntelligencePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="px-4 py-2 text-sm bg-purple-100 text-purple-700 border-purple-200">
                <Brain className="h-4 w-4 mr-2" />
                Intelligence Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Unlock Strategic Insights with <span className="text-purple-600">Advanced Analytics</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Expert Power BI consulting and data analytics for enterprises and data-driven organizations. Transform
                your data into actionable insights that drive measurable business results.
              </p>

              <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-purple-700 dark:text-purple-300 font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Average 40% ROI Increase Through Data-Driven Decision Making
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/contact?solution=intelligence">Request Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#free-tool">Try Our Free Tool</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Portfolio%20Update-amico-OhL64K0etmJPJS3dEZtqcPssksdkvh.png"
                alt="Data analytics professional interacting with purple dashboard displaying charts, graphs, and performance metrics"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Data-Driven Organizations</h2>
            <p className="text-xl text-muted-foreground">
              Intelligence solutions for enterprises and organizations that rely on data for strategic decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Enterprises</h3>
              <p className="text-muted-foreground">
                Large organizations needing comprehensive BI solutions and data strategy consulting
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">E-commerce & D2C</h3>
              <p className="text-muted-foreground">
                Online businesses requiring advanced analytics for customer insights and performance tracking
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Data-Rich SMBs</h3>
              <p className="text-muted-foreground">
                Growing businesses with complex data needs requiring custom analytics solutions
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Delivery Process */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our 5-Step Delivery Process</h2>
            <p className="text-xl text-muted-foreground">Proven methodology for successful BI implementations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Assess your current data landscape and business requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Integrate</h3>
              <p className="text-sm text-muted-foreground">Connect and consolidate data from multiple sources</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Develop</h3>
              <p className="text-sm text-muted-foreground">Build custom dashboards and analytics solutions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Implement</h3>
              <p className="text-sm text-muted-foreground">Deploy solutions and train your team</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">5</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">Ongoing maintenance and optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Expert BI & Analytics Services</h2>
            <p className="text-xl text-muted-foreground">Comprehensive solutions for your data and analytics needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Power BI Consulting */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Power BI Consulting</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Strategic consulting and implementation of Microsoft Power BI solutions
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">BI strategy development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Architecture design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Performance optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Best practices implementation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Custom Dashboard Development */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Custom Dashboard Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Tailored dashboards that provide actionable insights for your business
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Interactive visualizations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Real-time data updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Mobile-responsive design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Role-based access control</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Integration Services */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Database className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Data Integration Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Seamlessly connect and consolidate data from multiple sources
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">ETL pipeline development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">API integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Data warehouse setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Data quality assurance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Corporate Training */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Corporate Power BI Training</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">Comprehensive training programs for your team</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Beginner to advanced courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Hands-on workshops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Certification preparation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Ongoing support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Microsoft Technology Focus</h2>
            <p className="text-xl text-muted-foreground">Certified experts in the Microsoft ecosystem</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-background rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold">Power BI</h3>
            </div>

            <div className="text-center p-6 bg-background rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold">Azure</h3>
            </div>

            <div className="text-center p-6 bg-background rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold">SQL Server</h3>
            </div>

            <div className="text-center p-6 bg-background rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold">Power Platform</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground">Specialized expertise across key industry verticals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">E-commerce & Retail</h3>
              <p className="text-muted-foreground">
                Customer analytics, inventory optimization, sales performance tracking
              </p>
            </Card>

            <Card className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Manufacturing</h3>
              <p className="text-muted-foreground">Production analytics, quality control, supply chain optimization</p>
            </Card>

            <Card className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Financial Services</h3>
              <p className="text-muted-foreground">Risk analytics, compliance reporting, performance dashboards</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tool Section - Data Cleanse & Schema Map Helper */}
      <section
        id="free-tool"
        className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Tool for Data Professionals
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Clean and Structure Your Data</h2>
            <p className="text-xl text-muted-foreground">
              Prepare your data for analytics with our AI-powered data cleansing and schema mapping tool
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Filter className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Data Cleanse & Schema Map Helper</h3>
                      <Badge className="mt-1 bg-purple-600 hover:bg-purple-700">Essential for BI Projects</Badge>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground">
                    Upload your CSV files and get intelligent data cleaning suggestions, column type inference, and
                    star-schema recommendations for your Power BI projects.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Automatic column type detection</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Data quality anomaly flagging</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Star-schema design recommendations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>Power BI optimization tips</span>
                    </li>
                  </ul>

                  <Button asChild size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/tools/data-cleanse">
                      Try Data Cleanse Tool Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="relative">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Analysis Results
                      </div>
                      <div className="space-y-3">
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border-l-4 border-green-500">
                          <div className="font-medium text-green-700 dark:text-green-300">customer_id</div>
                          <div className="text-sm text-green-600 dark:text-green-400">Integer • Primary Key ✓</div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded border-l-4 border-yellow-500">
                          <div className="font-medium text-yellow-700 dark:text-yellow-300">email</div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">
                            Text • 3 duplicates found ⚠️
                          </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border-l-4 border-blue-500">
                          <div className="font-medium text-blue-700 dark:text-blue-300">order_date</div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">DateTime • Format consistent ✓</div>
                        </div>
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 mt-4">
                        💡 Recommended: Create dimension table for customer data
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
      <section className="py-20 bg-purple-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Unlock Your Data's Potential?</h2>
            <p className="text-xl opacity-90 mb-8">
              Start with our free Data Cleanse tool, then let our experts build your complete BI solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-purple-600">
                <Link href="/contact?solution=intelligence">Speak to a BI Expert</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white hover:bg-white hover:text-purple-600 text-white bg-transparent"
              >
                <Link href="/tools">Explore All Free Tools</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">Free consultation • Custom solutions • Enterprise-grade security</p>
          </div>
        </div>
      </section>
    </>
  )
}
