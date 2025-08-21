"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  Zap, 
  Brain, 
  Target, 
  BarChart3, 
  Sparkles, 
  Rocket,
  TrendingUp,
  Globe,
  Bot,
  Users,
  CheckCircle,
  Star,
  PlayCircle,
  Award,
  Shield,
  Lightbulb,
  Cpu,
  Clock
} from "lucide-react"
import { useState, useEffect } from "react"

// Floating Animation Component
function FloatingElement({ children, delay = 0, duration = 6 }) {
  return (
    <div 
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, accentColor, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Card 
      className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl animate-slide-up bg-card border-border" 
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-8 text-center">
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
          style={{ 
            backgroundColor: `${accentColor}20`,
            border: `2px solid ${isHovered ? accentColor : 'transparent'}`
          }}
        >
          <Icon className="h-10 w-10" style={{ color: accentColor }} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:opacity-80 transition-opacity">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

// Testimonial Component
function TestimonialCard({ name, role, company, content, rating, delay = 0 }) {
  return (
    <Card className="h-full animate-slide-up bg-card border-border" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-muted-foreground mb-6 italic">"{content}"</p>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#F9731620' }}
          >
            <span className="font-semibold" style={{ color: '#F97316' }}>
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sm text-card-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{role} at {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slide-up {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .glass-effect {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass-effect {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(51, 65, 85, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-background">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: '#F97316' }}
          ></div>
          <div 
            className="absolute top-40 right-10 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: '#22C55E' }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/2 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: '#3B82F6' }}
          ></div>
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className={`space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <FloatingElement delay={0.2}>
                <Badge 
                  className="px-4 py-2 text-sm animate-pulse-glow border"
                  style={{ 
                    backgroundColor: '#F9731620', 
                    color: '#F97316', 
                    borderColor: '#F9731630' 
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  100% Free AI Tools - No Limits, No Catch
                </Badge>
              </FloatingElement>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
                Unleash the Power of 
                <span 
                  className="animate-gradient bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent"
                > AI</span>
                <br />Without Spending a Penny
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Break free from expensive AI subscriptions and complex enterprise solutions. 
                Our platform democratizes artificial intelligence, giving you access to powerful tools 
                that Fortune 500 companies use - completely free, forever.
              </p>

              <div className="bg-muted/50 border-l-4 p-4 rounded-lg" style={{ borderLeftColor: '#F97316' }}>
                <p className="text-base italic text-muted-foreground leading-relaxed">
                  "The best time to plant a tree was 20 years ago. The second best time is now. 
                  The same applies to adopting AI in your business - and now you can do it for free."
                </p>
                <p className="text-sm text-muted-foreground mt-2">— AI Revolution Mindset</p>
              </div>

              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">What Makes Our AI Tools Special:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
                    <span className="text-sm text-muted-foreground">No hidden costs or billing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
                    <span className="text-sm text-muted-foreground">Enterprise-grade AI models</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
                    <span className="text-sm text-muted-foreground">Start using immediately</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
                    <span className="text-sm text-muted-foreground">Unlimited usage</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                {[
                  { value: 50, suffix: "+", label: "Free AI Tools", color: "#F97316" },
                  { value: 25, suffix: "K+", label: "Active Users", color: "#22C55E" },
                  { value: 1, suffix: "M+", label: "Tasks Completed", color: "#3B82F6" },
                  { value: 99, suffix: "%", label: "Uptime", color: "#8B5CF6" }
                ].map((stat, index) => (
                  <FloatingElement key={index} delay={index * 0.2}>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </FloatingElement>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group relative text-lg px-10 py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden"
                  style={{ 
                    backgroundColor: '#F97316', 
                    color: '#FFFFFF',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#EA580C'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#F97316'}
                  onClick={() => window.location.href = '/tools'}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Rocket className="h-5 w-5" />
                    <span className="font-bold">Access All Free AI Tools</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-5 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ 
                    borderColor: '#F97316', 
                    color: '#F97316',
                    borderWidth: '2px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F97316'
                    e.target.style.color = '#FFFFFF'
                    e.target.style.borderColor = '#F97316'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#F97316'
                    e.target.style.borderColor = '#F97316'
                  }}
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="flex items-center justify-center gap-3">
                    <PlayCircle className="h-5 w-5" />
                    <span className="font-semibold">See How It Works</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="relative mt-4 lg:mt-0">
              <div className="relative">
                <div 
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: '#F97316' }}
                ></div>
                <div className="glass-effect rounded-2xl p-6">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Version%20control-cuate-yIM8dgQYh75USr7RBxwMELEfYb0KvG.png"
                    alt="Software developer working on code with workflow diagrams and development processes"
                    width="600"
                    height="600"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Revolution Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FloatingElement>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8" style={{ backgroundColor: '#3B82F620', border: '1px solid #3B82F6' }}>
                <Lightbulb className="h-5 w-5" style={{ color: '#3B82F6' }} />
                <span className="text-sm font-medium" style={{ color: '#3B82F6' }}>The AI Revolution is Here</span>
              </div>
            </FloatingElement>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
              Why AI Tools Should Be Free for Everyone
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-3">The democratization of AI is not just a trend—it's a necessity.</h3>
                  <p className="text-muted-foreground">
                    Small businesses and entrepreneurs deserve the same AI capabilities that tech giants use. 
                    We believe innovation shouldn't be limited by budget constraints.
                  </p>
                </div>
                
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: '#22C55E' }} />
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Level the Playing Field</h4>
                      <p className="text-muted-foreground text-sm">
                        Every startup should compete with enterprise-level AI capabilities, 
                        not be limited by premium pricing models.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border rounded-lg p-6" style={{ borderColor: '#F9731630' }}>
                  <blockquote className="text-lg italic text-foreground leading-relaxed">
                    "The future belongs to organizations that can harness AI effectively. 
                    By making these tools free, we're accelerating innovation across every industry."
                  </blockquote>
                  <cite className="text-sm text-muted-foreground mt-3 block">— The Future of Work Report 2024</cite>
                </div>
                
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Brain className="h-6 w-6 mt-1 flex-shrink-0" style={{ color: '#8B5CF6' }} />
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">AI for All, Not Just the Few</h4>
                      <p className="text-muted-foreground text-sm">
                        We're building a world where your ideas matter more than your budget, 
                        where innovation is limited only by imagination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <FloatingElement>
              <Badge 
                className="px-4 py-2 text-sm mb-6"
                style={{ 
                  background: 'linear-gradient(to right, #FB923C, #FDE68A)', 
                  color: '#EA580C', 
                  border: '1px solid #FB923C' 
                }}
              >
                <Brain className="w-4 h-4 mr-2" />
                50+ AI-Powered Features
              </Badge>
            </FloatingElement>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Everything You Need to 
              <span style={{ color: '#F97316' }}> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Discover the comprehensive collection of AI-powered tools designed to revolutionize your workflow
            </p>
            
            <div className="bg-card border rounded-lg p-6 max-w-3xl mx-auto">
              <blockquote className="text-lg italic text-foreground">
                "In the age of AI, the question isn't whether you can afford these tools—it's whether you can afford to work without them."
              </blockquote>
              <cite className="text-sm text-muted-foreground mt-2 block">— Digital Transformation Study 2024</cite>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Content Creation"
              description="Generate compelling copy, blogs, and marketing content with advanced AI models - completely free"
              accentColor="#22C55E"
              delay={100}
            />
            <FeatureCard
              icon={BarChart3}
              title="Data Analytics"
              description="Transform raw data into actionable insights with intelligent analysis tools - no cost involved"
              accentColor="#3B82F6"
              delay={200}
            />
            <FeatureCard
              icon={Rocket}
              title="Business Growth"
              description="Scale your business with automation, SEO, and growth optimization tools - forever free"
              accentColor="#8B5CF6"
              delay={300}
            />
            <FeatureCard
              icon={Bot}
              title="AI Assistants"
              description="Deploy intelligent chatbots and virtual assistants for customer support - at zero cost"
              accentColor="#F97316"
              delay={400}
            />
            <FeatureCard
              icon={Globe}
              title="Web Development"
              description="Build stunning websites and applications with AI-powered development tools - completely free"
              accentColor="#22C55E"
              delay={500}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Marketing Automation"
              description="Boost your marketing campaigns with intelligent automation and optimization - no hidden fees"
              accentColor="#3B82F6"
              delay={600}
            />
          </div>

          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Workflow?</h3>
              <p className="text-muted-foreground">
                Join the AI revolution today. No credit card required, no hidden fees, no limitations.
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="group relative text-xl px-16 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden"
              style={{ 
                backgroundColor: '#F97316', 
                color: '#FFFFFF',
                border: 'none',
                minHeight: '80px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#EA580C'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#F97316'}
              onClick={() => window.location.href = '/tools'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-4">
                <Rocket className="h-7 w-7" />
                <span className="font-bold">Start Using Free AI Tools Now</span>
                <ArrowRight className="h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose Our Free AI Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the future of business automation at absolutely no cost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Get results in seconds, not hours. Our AI processes your requests instantly - for free.", color: "#F97316" },
              { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade security with complete data privacy protection - no cost to you.", color: "#22C55E" },
              { icon: Cpu, title: "Advanced AI", desc: "Powered by the latest GPT models and machine learning algorithms - completely free forever.", color: "#3B82F6" },
              { icon: Clock, title: "24/7 Available", desc: "Unlimited usage with no downtime, subscriptions, or premium barriers.", color: "#8B5CF6" }
            ].map((benefit, index) => (
              <FloatingElement key={index} delay={index * 0.2}>
                <Card className="text-center p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group bg-card border-border">
                  <CardContent className="p-0">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${benefit.color}20` }}
                    >
                      <benefit.icon className="h-10 w-10" style={{ color: benefit.color }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:opacity-80 transition-opacity">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge 
              className="px-4 py-2 text-sm mb-6"
              style={{ 
                background: 'linear-gradient(to right, #FB923C, #FDE68A)', 
                color: '#EA580C', 
                border: '1px solid #FB923C' 
              }}
            >
              <Users className="w-4 h-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Loved by <span style={{ color: '#F97316' }}>25,000+</span> Users Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See how businesses are transforming their operations with our completely free AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Chen"
              role="Marketing Director"
              company="TechStart Inc"
              content="I couldn't believe these powerful AI tools are completely free! We're producing 10x more content without any cost."
              rating={5}
              delay={100}
            />
            <TestimonialCard
              name="Michael Rodriguez"
              role="CEO"
              company="GrowthCorp"
              content="The free business intelligence tools provided insights worth thousands. Zero investment, maximum returns!"
              rating={5}
              delay={200}
            />
            <TestimonialCard
              name="Emily Johnson"
              role="Operations Manager"
              company="ScaleUp Ltd"
              content="Amazing that such professional-grade AI tools are available for free. Our productivity skyrocketed overnight."
              rating={5}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="container relative">
          <div className="text-center max-w-4xl mx-auto text-white">
            <FloatingElement>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Access Free AI Tools?
              </h2>
            </FloatingElement>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Join thousands of users already using our completely free AI tools to accelerate their growth. 
              No signup required, no credit card needed - start immediately!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="group relative text-xl px-16 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#F97316',
                  border: '2px solid #FFFFFF',
                  minHeight: '80px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E2E8F0'
                  e.target.style.borderColor = '#E2E8F0'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF'
                  e.target.style.borderColor = '#FFFFFF'
                }}
                onClick={() => window.location.href = '/tools'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-4">
                  <Rocket className="h-7 w-7" />
                  <span className="font-bold">Start Using Free Tools</span>
                  <ArrowRight className="h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-16 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ 
                  borderColor: '#FFFFFF', 
                  color: '#FFFFFF',
                  backgroundColor: 'transparent',
                  borderWidth: '3px',
                  minHeight: '80px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF'
                  e.target.style.color = '#F97316'
                  e.target.style.borderColor = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#FFFFFF'
                  e.target.style.borderColor = '#FFFFFF'
                }}
                onClick={() => window.location.href = '/tools'}
              >
                <div className="flex items-center justify-center gap-4">
                  <Globe className="h-7 w-7" />
                  <span className="font-semibold">Browse All Tools</span>
                </div>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Unlimited Usage</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
