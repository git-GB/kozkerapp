import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Sparkles,
  Search,
  Wand2,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowDown,
  Brain,
  Rocket,
  BarChart3,
  X
} from 'lucide-react'
import ToolMatchingEngine from '@/lib/ToolMatchingEngine'

interface SmartFilterIntegrationProps {
  tools: any[]
  onFilterApply: (category: string, solution: string, searchTerm: string) => void
  currentCategory: string
  currentSolution: string
}

interface QuickStartOption {
  id: string
  title: string
  description: string
  icon: any
  category: string
  solution: string
  gradient: string
  count: number
}

export default function SmartFilterIntegration({ 
  tools, 
  onFilterApply, 
  currentCategory, 
  currentSolution 
}: SmartFilterIntegrationProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [appliedFilter, setAppliedFilter] = useState<{
    title: string
    category: string
    solution: string
    count: number
  } | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Quick start options with dynamic tool counts
  const quickStartOptions: QuickStartOption[] = [
    {
      id: 'new-business',
      title: 'Starting a New Business',
      description: 'Domain, branding, and planning essentials',
      icon: Rocket,
      category: 'Branding',
      solution: 'LaunchPad',
      gradient: 'from-blue-500 to-cyan-500',
      count: tools.filter(t => t.category === 'Branding' && t.solution === 'LaunchPad').length
    },
    {
      id: 'marketing-boost',
      title: 'Marketing & Growth',
      description: 'Social media, email, and content tools',
      icon: TrendingUp,
      category: 'Marketing',
      solution: 'GrowthSuite',
      gradient: 'from-purple-500 to-pink-500',
      count: tools.filter(t => t.category === 'Marketing' && t.solution === 'GrowthSuite').length
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      description: 'Blog posts, copy, and creative content',
      icon: Wand2,
      category: 'Content',
      solution: 'All',
      gradient: 'from-green-500 to-emerald-500',
      count: tools.filter(t => t.category === 'Content').length
    },
    {
      id: 'business-analytics',
      title: 'Analytics & Data',
      description: 'Business intelligence and reporting',
      icon: BarChart3,
      category: 'Analytics',
      solution: 'All',
      gradient: 'from-orange-500 to-red-500',
      count: tools.filter(t => t.category === 'Analytics').length
    }
  ]

  const matchingEngine = new ToolMatchingEngine(tools)

  const handleQuickStart = (option: QuickStartOption) => {
    setAppliedFilter({
      title: option.title,
      category: option.category,
      solution: option.solution,
      count: option.count
    })
    
    onFilterApply(option.category, option.solution, option.title)
    showSuccessNotification()
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    setTimeout(() => {
      const results = matchingEngine.findBestMatches(searchQuery)
      
      if (results.primary.length > 0) {
        // Find the most common category and solution from results
        const categories = results.primary.map(r => r.tool.category)
        const solutions = results.primary.map(r => r.tool.solution)
        
        const mostCommonCategory = getMostCommon(categories) || 'All'
        const mostCommonSolution = getMostCommon(solutions) || 'All'
        
        // Count matching tools
        const matchingCount = tools.filter(tool => {
          const categoryMatch = mostCommonCategory === 'All' || tool.category === mostCommonCategory
          const solutionMatch = mostCommonSolution === 'All' || tool.solution === mostCommonSolution
          return categoryMatch && solutionMatch
        }).length

        setAppliedFilter({
          title: searchQuery,
          category: mostCommonCategory,
          solution: mostCommonSolution,
          count: matchingCount
        })
        
        onFilterApply(mostCommonCategory, mostCommonSolution, searchQuery)
      } else {
        // No specific matches, show all tools
        setAppliedFilter({
          title: `${searchQuery} (showing all tools)`,
          category: 'All',
          solution: 'All',
          count: tools.length
        })
        
        onFilterApply('All', 'All', searchQuery)
      }
      
      setIsSearching(false)
      showSuccessNotification()
    }, 1200)
  }

  const showSuccessNotification = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 4000)
    
    // Scroll to filter section after a short delay
    setTimeout(() => {
      const filterSection = document.getElementById('filter-section')
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 1000)
  }

  const getMostCommon = (array: string[]): string | null => {
    if (array.length === 0) return null
    const counts = array.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(counts).reduce((a, b) => 
      counts[a[0]] > counts[b[1]] ? a : b
    )[0] || null
  }

  const clearAppliedFilter = () => {
    setAppliedFilter(null)
    setSearchQuery('')
    onFilterApply('All', 'All', '')
  }

  // Check if current filters match applied filter
  const isFilterActive = appliedFilter && 
    (currentCategory !== 'All' || currentSolution !== 'All')

  return (
    <div className="relative">
      {/* Main Assistant Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-blue-950/50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Smart Tool Discovery
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Tools Instantly
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click a category below or describe your needs. We'll automatically apply the right filters to show exactly what you're looking for.
            </p>
          </div>

          <div className="space-y-8">
            {/* Applied Filter Indicator */}
            {isFilterActive && appliedFilter && (
              <div className="max-w-2xl mx-auto">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-primary">
                            Smart filter applied for "{appliedFilter.title}"
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Showing {appliedFilter.count} tools • {appliedFilter.category} → {appliedFilter.solution}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearAppliedFilter}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quick Start Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">What best describes your current needs?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStartOptions.map((option) => {
                  const IconComponent = option.icon
                  const isActive = currentCategory === option.category && 
                    (option.solution === 'All' || currentSolution === option.solution)
                  
                  return (
                    <Card 
                      key={option.id}
                      className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-105 overflow-hidden relative ${
                        isActive ? 'ring-2 ring-primary shadow-lg' : ''
                      }`}
                      onClick={() => handleQuickStart(option)}
                    >
                      {isActive && (
                        <div className="absolute top-3 right-3 z-10">
                          <CheckCircle className="w-5 h-5 text-primary bg-white rounded-full" />
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                        isActive ? 'opacity-5' : ''
                      }`} />
                      <CardContent className="p-6 text-center relative">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {option.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {option.description}
                        </p>
                        <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-primary" : "bg-primary/10 text-primary"}>
                          {option.count} tools
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-dashed" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-blue-950/50 px-6 text-muted-foreground font-medium">
                  OR SEARCH WITH NATURAL LANGUAGE
                </span>
              </div>
            </div>

            {/* Smart Search */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <Search className="w-5 h-5 text-muted-foreground" />
                      {isSearching && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                        </div>
                      )}
                    </div>
                    <Input
                      placeholder="Try: 'help with email marketing', 'create a business plan', 'design a logo'..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-12 pr-28 h-14 text-base bg-transparent border-2 border-gray-100 dark:border-gray-700 focus:border-primary"
                      disabled={isSearching}
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery.trim() || isSearching}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4"
                    >
                      {isSearching ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Searching...
                        </div>
                      ) : (
                        'Apply Filter'
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    AI analyzes your needs and applies the perfect category + solution filters
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Scroll Indicator */}
          {showSuccess && (
            <div className="flex justify-center mt-8 animate-bounce">
              <div className="flex items-center gap-2 text-primary">
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm font-medium">Filters applied! See results below</span>
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Success Notification */}
      {showSuccess && appliedFilter && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Filters Applied Successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Found {appliedFilter.count} tools for "{appliedFilter.title}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
