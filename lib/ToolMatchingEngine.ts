// lib/ToolMatchingEngine.ts

interface Tool {
  id: string
  name: string
  description: string
  category: string
  solution: string
  features: string[]
  keywords: string[]
  useCases: string[]
  userPersonas: string[]
  businessStages: string[]
  complexityLevel: 'beginner' | 'intermediate' | 'advanced'
  timeToValue: 'immediate' | 'short' | 'medium' | 'long'
  href: string
  icon: any
}

interface MatchResult {
  tool: Tool
  score: number
  reasons: string[]
}

interface SearchResults {
  primary: MatchResult[]
  secondary: MatchResult[]
  totalFound: number
  confidence: number
  explanation: string
  intent?: string
  businessStage?: string
}

export class ToolMatchingEngine {
  private tools: Tool[]
  private synonyms: Record<string, string[]> = {
    'website': ['site', 'web', 'online', 'digital presence', 'internet'],
    'marketing': ['promotion', 'advertising', 'outreach', 'campaigns', 'promotion'],
    'branding': ['brand', 'identity', 'image', 'reputation', 'logo'],
    'content': ['copy', 'text', 'writing', 'material', 'articles'],
    'email': ['newsletter', 'mailing', 'electronic mail', 'e-mail'],
    'social media': ['social', 'facebook', 'twitter', 'instagram', 'linkedin', 'tiktok'],
    'seo': ['search engine', 'google ranking', 'search optimization', 'organic search'],
    'analytics': ['data', 'metrics', 'tracking', 'measurement', 'insights'],
    'automation': ['automatic', 'streamline', 'efficiency', 'automate'],
    'proposal': ['quote', 'estimate', 'bid', 'pitch', 'contract'],
    'domain': ['url', 'web address', 'website name', 'site name'],
    'pricing': ['cost', 'price', 'revenue', 'profit', 'money'],
    'startup': ['new business', 'entrepreneurship', 'business idea', 'launch'],
    'sales': ['selling', 'revenue', 'deals', 'leads', 'customers']
  }

  private businessStageKeywords: Record<string, string[]> = {
    'idea': ['starting', 'new', 'beginning', 'launch', 'startup', 'idea', 'planning'],
    'launch': ['launching', 'going live', 'start', 'begin', 'initial', 'first'],
    'growth': ['growing', 'scaling', 'expanding', 'increase', 'improve', 'optimize'],
    'scale': ['scaling up', 'enterprise', 'large', 'established', 'mature']
  }

  private intentKeywords: Record<string, string[]> = {
    'create': ['create', 'make', 'build', 'generate', 'design', 'craft', 'develop'],
    'improve': ['better', 'improve', 'optimize', 'enhance', 'boost', 'increase'],
    'analyze': ['analyze', 'measure', 'track', 'understand', 'insights', 'data'],
    'automate': ['automate', 'streamline', 'efficient', 'save time', 'automatic'],
    'learn': ['learn', 'understand', 'know', 'help', 'guide', 'how to']
  }

  constructor(tools: Tool[]) {
    this.tools = tools
  }

  findBestMatches(userInput: string, context: any = {}): SearchResults {
    const normalizedInput = this.normalizeInput(userInput)
    const intent = this.extractIntent(normalizedInput)
    const businessStage = this.detectBusinessStage(normalizedInput)

    // Score all tools
    const scoredTools: MatchResult[] = this.tools.map(tool => ({
      tool,
      score: this.calculateToolScore(tool, normalizedInput, intent, businessStage, context),
      reasons: this.generateReasons(tool, normalizedInput, intent, businessStage)
    }))

    // Filter and sort
    const relevantTools = scoredTools
      .filter(result => result.score > 0.1)
      .sort((a, b) => b.score - a.score)

    const primary = relevantTools.slice(0, 3)
    const secondary = relevantTools.slice(3, 6)
    const confidence = primary.length > 0 ? primary[0].score : 0

    return {
      primary,
      secondary,
      totalFound: relevantTools.length,
      confidence,
      explanation: this.generateExplanation(primary, intent, businessStage, confidence),
      intent,
      businessStage
    }
  }

  private normalizeInput(input: string): string {
    let normalized = input.toLowerCase().trim()
    
    // Expand synonyms
    Object.entries(this.synonyms).forEach(([key, synonyms]) => {
      synonyms.forEach(synonym => {
        if (normalized.includes(synonym)) {
          normalized += ` ${key}`
        }
      })
    })
    
    return normalized
  }

  private extractIntent(input: string): string {
    for (const [intent, keywords] of Object.entries(this.intentKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return intent
      }
    }
    return 'general'
  }

  private detectBusinessStage(input: string): string {
    for (const [stage, keywords] of Object.entries(this.businessStageKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return stage
      }
    }
    return 'general'
  }

  private calculateToolScore(
    tool: Tool, 
    input: string, 
    intent: string, 
    businessStage: string, 
    context: any
  ): number {
    let score = 0
    const inputWords = input.split(' ').filter(word => word.length > 2)

    // 1. Keyword matching (40% of score)
    const keywordScore = this.calculateKeywordScore(tool, inputWords)
    score += keywordScore * 0.4

    // 2. Intent alignment (25% of score)  
    const intentScore = this.calculateIntentScore(tool, intent)
    score += intentScore * 0.25

    // 3. Business stage fit (20% of score)
    const stageScore = this.calculateStageScore(tool, businessStage)
    score += stageScore * 0.2

    // 4. Use case alignment (10% of score)
    const useCaseScore = this.calculateUseCaseScore(tool, inputWords)
    score += useCaseScore * 0.1

    // 5. Context bonus (5% of score)
    const contextScore = this.calculateContextScore(tool, context)
    score += contextScore * 0.05

    return Math.round(score * 100) / 100
  }

  private calculateKeywordScore(tool: Tool, inputWords: string[]): number {
    let matches = 0
    let totalPossible = inputWords.length

    tool.keywords.forEach(keyword => {
      inputWords.forEach(word => {
        if (keyword.includes(word) || word.includes(keyword)) {
          matches += 2 // Higher weight for keyword matches
        }
      })
    })

    // Check tool name and description
    const toolText = `${tool.name} ${tool.description}`.toLowerCase()
    inputWords.forEach(word => {
      if (word.length > 2 && toolText.includes(word)) {
        matches += 1
      }
    })

    return Math.min(matches / (totalPossible * 2), 1.0)
  }

  private calculateIntentScore(tool: Tool, intent: string): number {
    const intentMapping: Record<string, Record<string, number>> = {
      'create': {
        'domain-name-genie': 0.9,
        'tagline-creator': 0.9,
        'ai-business-plan-generator': 0.8,
        'logo-color-picker': 0.9,
        'invoice-template-builder': 0.8,
        'faq-builder': 0.8,
        'hero-copy-generator': 0.9,
        'social-media-suggester': 0.8
      },
      'improve': {
        'seo-analyzer': 0.9,
        'email-subject-generator': 0.8,
        'hero-copy-generator': 0.8,
        'pricing-calculator': 0.7,
        'customer-persona-generator': 0.7
      },
      'analyze': {
        'powerbi-generator': 0.9,
        'data-cleanse-helper': 0.9,
        'seo-analyzer': 0.8,
        'customer-persona-generator': 0.7,
        'meeting-extractor': 0.6
      },
      'automate': {
        'follow-up-email-sequencer': 0.9,
        'meeting-extractor': 0.8,
        'invoice-template-builder': 0.7,
        'ai-business-plan-generator': 0.6
      }
    }

    return intentMapping[intent]?.[tool.id] || 0.3
  }

  private calculateStageScore(tool: Tool, businessStage: string): number {
    if (tool.businessStages.includes(businessStage)) {
      return 1.0
    }
    if (businessStage === 'general') {
      return 0.6
    }
    // Partial matches for adjacent stages
    const stageOrder = ['idea', 'launch', 'growth', 'scale']
    const userStageIndex = stageOrder.indexOf(businessStage)
    const hasAdjacentStage = tool.businessStages.some(stage => {
      const toolStageIndex = stageOrder.indexOf(stage)
      return Math.abs(toolStageIndex - userStageIndex) <= 1
    })
    return hasAdjacentStage ? 0.4 : 0.1
  }

  private calculateUseCaseScore(tool: Tool, inputWords: string[]): number {
    let score = 0
    tool.useCases.forEach(useCase => {
      inputWords.forEach(word => {
        if (word.length > 2 && useCase.includes(word)) {
          score += 0.3
        }
      })
    })
    return Math.min(score, 1.0)
  }

  private calculateContextScore(tool: Tool, context: any): number {
    let score = 0
    
    if (context.preferredCategory === tool.category) {
      score += 0.5
    }
    
    if (context.currentSolution === tool.solution) {
      score += 0.3
    }
    
    if (context.previousTools?.includes(tool.id)) {
      score += 0.2
    }

    return Math.min(score, 1.0)
  }

  private generateReasons(tool: Tool, input: string, intent: string, businessStage: string): string[] {
    const reasons: string[] = []
    
    if (tool.businessStages.includes(businessStage)) {
      reasons.push(`Perfect for ${businessStage} stage businesses`)
    }
    
    if (tool.timeToValue === 'immediate') {
      reasons.push('Quick to implement')
    }
    
    if (tool.complexityLevel === 'beginner') {
      reasons.push('Easy to use')
    }
    
    return reasons
  }

  private generateExplanation(
    primary: MatchResult[], 
    intent: string, 
    businessStage: string, 
    confidence: number
  ): string {
    if (confidence > 0.7) {
      return "I found some great matches for your needs!"
    } else if (confidence > 0.4) {
      return "Here are some tools that should help with what you're looking for:"
    } else if (primary.length === 0) {
      return "I couldn't find exact matches, but these popular tools might be helpful:"
    } else {
      return "These tools might be helpful based on your request:"
    }
  }

  // Get complementary tools for workflow suggestions
  getComplementaryTools(toolId: string, limit: number = 2): Tool[] {
    const tool = this.tools.find(t => t.id === toolId)
    if (!tool) return []

    return this.tools
      .filter(t => t.id !== toolId)
      .filter(t => {
        // Same solution suite
        if (t.solution === tool.solution) return true
        // Related categories
        const categoryRelations: Record<string, string[]> = {
          'Branding': ['Marketing', 'Content'],
          'Marketing': ['Branding', 'Content', 'Analytics'],
          'Content': ['Marketing', 'Branding'],
          'Analytics': ['Marketing', 'Business'],
          'Business': ['Analytics', 'Productivity']
        }
        return categoryRelations[tool.category]?.includes(t.category)
      })
      .slice(0, limit)
  }
}

export default ToolMatchingEngine
