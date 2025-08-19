// lib/parseGhostContent.ts
// Enhanced parser to extract structured data from Ghost post content

interface ParsedCaseStudy {
  client?: string
  industry?: string
  solution?: string
  timeline?: string
  challenge?: string
  results?: string[]
  testimonial?: {
    quote: string
    author: string
    title: string
  }
}

export function parseGhostCaseStudy(html: string): ParsedCaseStudy {
  // Remove HTML tags for easier parsing
  const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  
  const parsed: ParsedCaseStudy = {}
  
  // Extract client information (looks for patterns like "Client: Name" or "**Client:** Name")
  const clientMatch = textContent.match(/(?:Client|Company):\s*([^\n\r\.]+)/i)
  if (clientMatch) {
    parsed.client = clientMatch[1].trim()
  }
  
  // Extract industry
  const industryMatch = textContent.match(/Industry:\s*([^\n\r\.]+)/i)
  if (industryMatch) {
    parsed.industry = industryMatch[1].trim()
  }
  
  // Extract solution
  const solutionMatch = textContent.match(/Solution:\s*([^\n\r\.]+)/i)
  if (solutionMatch) {
    parsed.solution = solutionMatch[1].trim()
  }
  
  // Extract timeline
  const timelineMatch = textContent.match(/Timeline:\s*([^\n\r\.]+)/i)
  if (timelineMatch) {
    parsed.timeline = timelineMatch[1].trim()
  }
  
  // Extract challenge (from "The Challenge" section)
  const challengeMatch = html.match(/<h[1-6][^>]*>(?:The\s+)?Challenge<\/h[1-6]>\s*<p[^>]*>(.*?)<\/p>/is)
  if (challengeMatch) {
    parsed.challenge = challengeMatch[1].replace(/<[^>]*>/g, '').trim()
  }
  
  // Extract results (looks for checkmarks, bullet points, or "Results" section)
  const results: string[] = []
  
  // Method 1: Look for checkmark patterns
  const checkmarkMatches = html.match(/✅\s*\*\*([^*]+)\*\*/g)
  if (checkmarkMatches) {
    checkmarkMatches.forEach(match => {
      const result = match.replace(/✅\s*\*\*([^*]+)\*\*/, '$1').trim()
      results.push(result)
    })
  }
  
  // Method 2: Look for percentage/number patterns
  if (results.length === 0) {
    const percentageMatches = textContent.match(/\d+%[^\.]+/g)
    if (percentageMatches) {
      percentageMatches.slice(0, 4).forEach(match => {
        results.push(match.trim())
      })
    }
  }
  
  // Method 3: Extract from "Key Results" section
  if (results.length === 0) {
    const resultsSection = html.match(/<h[1-6][^>]*>Key Results<\/h[1-6]>(.*?)(?=<h[1-6]|$)/is)
    if (resultsSection) {
      const listItems = resultsSection[1].match(/<li[^>]*>(.*?)<\/li>/g)
      if (listItems) {
        listItems.forEach(item => {
          const cleanItem = item.replace(/<[^>]*>/g, '').trim()
          if (cleanItem) results.push(cleanItem)
        })
      }
    }
  }
  
  parsed.results = results.length > 0 ? results : undefined
  
  // Extract testimonial
  const testimonialMatch = html.match(/<blockquote[^>]*>(.*?)<\/blockquote>/is)
  if (testimonialMatch) {
    const blockquoteContent = testimonialMatch[1]
    const quoteMatch = blockquoteContent.match(/<p[^>]*>"([^"]+)"/s)
    const authorMatch = blockquoteContent.match(/—\s*\*\*([^*]+)\*\*,?\s*([^\n<]+)/s)
    
    if (quoteMatch) {
      parsed.testimonial = {
        quote: quoteMatch[1].trim(),
        author: authorMatch ? authorMatch[1].trim() : '',
        title: authorMatch ? authorMatch[2].replace(/<[^>]*>/g, '').trim() : ''
      }
    }
  }
  
  return parsed
}

// Enhanced Ghost case study with parsed data
export interface EnhancedCaseStudy {
  id: string
  title: string
  slug: string
  excerpt: string
  feature_image?: string
  published_at: string
  updated_at?: string
  primary_author: { name: string }
  tags?: Array<{ name: string; slug: string }>
  html: string
  parsed?: ParsedCaseStudy
}

// Function to enhance case studies with parsed data
export function enhanceCaseStudies(caseStudies: any[]): EnhancedCaseStudy[] {
  return caseStudies.map(study => ({
    ...study,
    parsed: parseGhostCaseStudy(study.html)
  }))
}
