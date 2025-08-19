import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react'
import ToolMatchingEngine from '@/lib/ToolMatchingEngine'

interface Message {
  id: number
  sender: 'user' | 'assistant'
  content: string
  type: 'text' | 'question' | 'tools'
  data?: any
  timestamp: Date
}

interface QuestionFlow {
  type: 'multiple-choice' | 'text-input'
  question: string
  options?: { id: string; text: string; next?: string; intent?: string }[]
  placeholder?: string
}

interface SmartToolAssistantProps {
  tools: any[]
}

const questionFlows: Record<string, QuestionFlow> = {
  initial: {
    type: 'multiple-choice',
    question: "Hi! I'm your AI tool assistant. What brings you here today?",
    options: [
      { id: 'starting-business', text: 'Starting a new business', next: 'business-stage' },
      { id: 'marketing-help', text: 'Need marketing help', next: 'marketing-type' },
      { id: 'content-creation', text: 'Creating content', next: 'content-type' },
      { id: 'business-operations', text: 'Managing business operations', next: 'operations-type' },
      { id: 'specific-tool', text: 'Looking for specific functionality', next: 'describe-need' }
    ]
  },
  'business-stage': {
    type: 'multiple-choice',
    question: "What stage is your business in?",
    options: [
      { id: 'idea-stage', text: 'Just an idea - need to start', intent: 'launch-business' },
      { id: 'launching', text: 'Ready to launch', intent: 'launch-business' },
      { id: 'early-growth', text: 'Early growth phase', intent: 'grow-business' },
      { id: 'scaling', text: 'Scaling up', intent: 'scale-business' }
    ]
  },
  'marketing-type': {
    type: 'multiple-choice',
    question: "What type of marketing help do you need?",
    options: [
      { id: 'social-media', text: 'Social media marketing', intent: 'social-media-help' },
      { id: 'email-marketing', text: 'Email marketing', intent: 'email-marketing-help' },
      { id: 'content-marketing', text: 'Content marketing', intent: 'content-marketing-help' },
      { id: 'seo-help', text: 'SEO and online visibility', intent: 'seo-help' },
      { id: 'general-marketing', text: 'Overall marketing strategy', intent: 'marketing-strategy' }
    ]
  },
  'content-type': {
    type: 'multiple-choice',
    question: "What kind of content do you need help with?",
    options: [
      { id: 'website-content', text: 'Website copy and landing pages', intent: 'website-content' },
      { id: 'blog-content', text: 'Blog posts and articles', intent: 'blog-content' },
      { id: 'social-content', text: 'Social media posts', intent: 'social-content' },
      { id: 'email-content', text: 'Email newsletters', intent: 'email-content' }
    ]
  },
  'operations-type': {
    type: 'multiple-choice',
    question: "Which business operations need help?",
    options: [
      { id: 'project-management', text: 'Project management and planning', intent: 'project-management' },
      { id: 'data-analytics', text: 'Data analysis and reporting', intent: 'analytics-help' },
      { id: 'client-management', text: 'Client proposals and invoicing', intent: 'client-management' },
      { id: 'team-management', text: 'Team coordination and meetings', intent: 'team-management' }
    ]
  },
  'describe-need': {
    type: 'text-input',
    question: "Please describe what you're looking for. I'll find the best tools for you!",
    placeholder: "e.g., I need help writing better email subject lines..."
  }
}

const intentMapping: Record<string, string[]> = {
  'launch-business': ['domain-name-genie', 'tagline-creator', 'ai-business-plan-generator', 'logo-color-picker'],
  'grow-business': ['customer-persona-generator', 'seo-analyzer', 'pricing-calculator'],
  'scale-business': ['powerbi-generator', 'meeting-extractor', 'project-timeline-builder'],
  'social-media-help': ['social-media-suggester', 'customer-persona-generator'],
  'email-marketing-help': ['email-subject-generator', 'follow-up-email-sequencer'],
  'content-marketing-help': ['blog-outline-builder', 'hero-copy-generator', 'faq-builder'],
  'seo-help': ['seo-analyzer', 'blog-outline-builder'],
  'marketing-strategy': ['customer-persona-generator', 'seo-analyzer'],
  'website-content': ['hero-copy-generator', 'faq-builder'],
  'blog-content': ['blog-outline-builder'],
  'social-content': ['social-media-suggester'],
  'email-content': ['email-subject-generator'],
  'project-management': ['project-timeline-builder', 'meeting-extractor'],
  'analytics-help': ['powerbi-generator', 'data-cleanse-helper'],
  'client-management': ['proposal-generator', 'invoice-template-builder'],
  'team-management': ['meeting-extractor', 'job-description-generator']
}

export default function SmartToolAssistant({ tools }: SmartToolAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('initial')
  const [userContext, setUserContext] = useState<any>({})
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const matchingEngine = useRef(new ToolMatchingEngine(tools))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage('assistant', questionFlows.initial.question, 'question', questionFlows.initial)
      }, 500)
    }
  }, [isOpen])

  const addMessage = (sender: 'user' | 'assistant', content: string, type: 'text' | 'question' | 'tools' = 'text', data: any = null) => {
    const message: Message = {
      id: Date.now(),
      sender,
      content,
      type,
      data,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const handleOptionSelect = (option: any) => {
    addMessage('user', option.text)
    
    setUserContext(prev => ({
      ...prev,
      [currentQuestion]: option.id,
      lastChoice: option
    }))

    if (option.intent) {
      setTimeout(() => showRecommendations(option.intent), 1000)
    } else if (option.next) {
      setTimeout(() => {
        const nextFlow = questionFlows[option.next]
        setCurrentQuestion(option.next)
        addMessage('assistant', nextFlow.question, 'question', nextFlow)
      }, 1000)
    }
  }

  const handleTextInput = () => {
    if (!inputValue.trim()) return
    
    addMessage('user', inputValue)
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      
      const results = matchingEngine.current.findBestMatches(inputValue, userContext)
      
      if (results.primary.length > 0) {
        addMessage('assistant', results.explanation, 'text')
        addMessage('assistant', '', 'tools', { tools: results.primary })
        
        if (results.secondary.length > 0) {
          setTimeout(() => {
            addMessage('assistant', "You might also find these helpful:", 'text')
            addMessage('assistant', '', 'tools', { tools: results.secondary })
          }, 2000)
        }
      } else {
        addMessage('assistant', "I couldn't find exact matches, but here are some popular tools that might help:", 'text')
        const popularTools = tools.slice(0, 3).map(tool => ({ tool, score: 0.5, reasons: [] }))
        addMessage('assistant', '', 'tools', { tools: popularTools })
        setTimeout(() => {
          addMessage('assistant', "Would you like to tell me more about what you're looking for?", 'text')
        }, 2000)
      }
    }, 1500)
    
    setInputValue('')
  }

  const showRecommendations = (intent: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      
      const recommendedToolIds = intentMapping[intent] || []
      const recommendedTools = recommendedToolIds
        .map(id => {
          const tool = tools.find(tool => tool.id === id)
          return tool ? { tool, score: 0.9, reasons: ['Matched your requirements'] } : null
        })
        .filter(Boolean)
      
      if (recommendedTools.length > 0) {
        addMessage('assistant', "Perfect! Based on your needs, here are my top recommendations:", 'text')
        addMessage('assistant', '', 'tools', { tools: recommendedTools })
        
        // Add follow-up suggestion
        setTimeout(() => {
          addMessage('assistant', "Would you like me to suggest tools that work well together with these?", 'text')
        }, 3000)
      } else {
        addMessage('assistant', "Let me show you some tools that might help:", 'text')
        const fallbackTools = tools.slice(0, 3).map(tool => ({ tool, score: 0.5, reasons: [] }))
        addMessage('assistant', '', 'tools', { tools: fallbackTools })
      }
    }, 1500)
  }

  const resetChat = () => {
    setMessages([])
    setCurrentQuestion('initial')
    setUserContext({})
    setInputValue('')
    setTimeout(() => {
      addMessage('assistant', questionFlows.initial.question, 'question', questionFlows.initial)
    }, 500)
  }

  const TypingIndicator = () => (
    <div className="flex gap-2">
      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="bg-muted p-3 rounded-lg">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-xl z-50 flex flex-col bg-background border">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg">AI Tool Assistant</CardTitle>
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Smart
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'assistant' && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div className="max-w-[80%]">
                  {message.type === 'text' && (
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}>
                      {message.content}
                    </div>
                  )}
                  
                  {message.type === 'question' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted">
                        {message.content}
                      </div>
                      {message.data?.type === 'multiple-choice' && (
                        <div className="space-y-2">
                          {message.data.options.map((option: any, idx: number) => (
                            <Button
                              key={idx}
                              variant="outline"
                              className="w-full justify-start text-left h-auto p-3 hover:bg-primary/10"
                              onClick={() => handleOptionSelect(option)}
                            >
                              {option.text}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {message.type === 'tools' && (
                    <div className="space-y-3">
                      {message.data.tools.map((result: any) => {
                        const tool = result.tool
                        return (
                          <Card key={tool.id} className="border hover:shadow-md transition-shadow">
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-medium text-sm leading-tight">{tool.name}</h4>
                                <div className="flex gap-1 flex-shrink-0">
                                  <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                                  {result.score > 0.7 && (
                                    <Badge variant="default" className="text-xs bg-green-500">
                                      Great Match
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{tool.description}</p>
                              {result.reasons.length > 0 && (
                                <div className="mb-3">
                                  {result.reasons.map((reason: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                                      {reason}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <Button size="sm" className="w-full" asChild>
                                <a href={tool.href} target="_blank" rel="noopener noreferrer">
                                  Try Now <ArrowRight className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
              className="flex-1"
            />
            <Button size="icon" onClick={handleTextInput} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetChat} className="flex-1">
              <RotateCcw className="w-3 h-3 mr-1" />
              Start Over
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                addMessage('assistant', 'What specific functionality are you looking for?', 'text')
                setCurrentQuestion('describe-need')
              }}
            >
              Ask Question
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
