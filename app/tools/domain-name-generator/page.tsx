"use client"

import type React from "react"
import { useState, useEffect, type FormEvent } from "react"
import {
  Search,
  Globe,
  Mail,
  User,
  Loader2,
  Copy,
  Heart,
  History,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Grid,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

import { ContentLoadingScreen } from "@/components/loading-screen" // Import the loading screen

interface FormDataState {
  name: string
  email: string
  keywords: string
}

interface DomainAPIResult {
  Domain: string
  Availability: "Available" | "Unavailable"
  registrarUrl?: string
}

type ViewMode = "grid" | "list"
type FilterMode = "all" | "available" | "unavailable"

// Theme-aware color system
const getThemeColors = (isDark: boolean) => ({
  background: isDark ? '#0F172A' : '#F9FAFB',
  cardBackground: isDark ? '#1E293B' : '#FFFFFF',
  headerBackground: isDark ? 'linear-gradient(90deg, #1E293B 0%, #334155 100%)' : 'linear-gradient(90deg, #FFF7ED 0%, #FFF9F6 100%)',
  textPrimary: isDark ? '#F1F5F9' : '#111827',
  textSecondary: isDark ? '#94A3B8' : '#6B7280',
  textTertiary: isDark ? '#64748B' : '#9CA3AF',
  border: isDark ? '#334155' : '#E5E7EB',
  inputBackground: isDark ? '#334155' : '#FFFFFF',
  hoverBackground: isDark ? '#334155' : '#F9FAFB',
  accent: '#FF7435', // Keep brand color consistent
  accentHover: '#E6651E',
  success: isDark ? '#059669' : '#10B981',
  successBackground: isDark ? '#064E3B' : '#D1FAE5',
  successBorder: isDark ? '#047857' : '#A7F3D0',
  error: isDark ? '#DC2626' : '#EF4444',
  errorBackground: isDark ? '#7F1D1D' : '#FEE2E2',
  errorBorder: isDark ? '#B91C1C' : '#FECACA',
})

export default function DomainCheckerPage() {
  const [isDark, setIsDark] = useState(false)
  
  // Detect theme changes from external navbar toggle
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme() // Initial check
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  
  const colors = getThemeColors(isDark)
  
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    keywords: "",
  })
  const [errors, setErrors] = useState<Partial<FormDataState>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [domainResults, setDomainResults] = useState<DomainAPIResult[]>([])
  const [rawApiResponse, setRawApiResponse] = useState<string>("")
  const [apiError, setApiError] = useState<string>("")

  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filterMode, setFilterMode] = useState<FilterMode>("all")
  const [searchFilter, setSearchFilter] = useState<string>("")

  const [favorites, setFavorites] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const { toast } = useToast()

  if (isLoading) {    
        return < ContentLoadingScreen />  
    }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataState> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.keywords.trim()) {
      newErrors.keywords = "Keywords/description is required"
    } else if (formData.keywords.trim().length < 10) {
      newErrors.keywords = "Keywords must be at least 10 characters long"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormDataState]) {
      setErrors((prev) => ({ ...prev, [name as keyof FormDataState]: undefined }))
    }
  }

  const filteredDomains = domainResults.filter((domain) => {
    const matchesFilter =
      filterMode === "all" ||
      (filterMode === "available" && domain.Availability === "Available") ||
      (filterMode === "unavailable" && domain.Availability === "Unavailable")
    const matchesSearch = searchFilter === "" || domain.Domain.toLowerCase().includes(searchFilter.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setDomainResults([])
    setRawApiResponse("")
    setApiError("")
    setSearchFilter("")

    try {
      const webhookUrl = "https://n8n.srv832341.hstgr.cloud/webhook/6f7b288e-1efe-4504-a6fd-660931327269"
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        business: formData.keywords,
      })
      const fullUrl = `${webhookUrl}?${params.toString()}`
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      try {
        const res = await fetch(fullUrl, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
        clearTimeout(timeoutId)
        const responseText = await res.text()
        setRawApiResponse(responseText)

        if (!res.ok) throw new Error(`API request failed with status ${res.status}: ${responseText.substring(0, 200)}`)
        if (!responseText || responseText.trim() === "") {
          setApiError("The API returned an empty response.")
          toast({ title: "Empty Response", description: "The API returned an empty response.", variant: "warning" })
          return
        }

        const sanitizedResponse = responseText.trim()
        try {
          const parsedJson = JSON.parse(sanitizedResponse)
          let sourceDomainsArray: any[] = []

          if (Array.isArray(parsedJson)) {
            sourceDomainsArray = parsedJson
          } else if (typeof parsedJson === "object" && parsedJson !== null) {
            const keys = Object.keys(parsedJson)
            if (keys.length === 1 && Array.isArray(parsedJson[keys[0]])) {
              sourceDomainsArray = parsedJson[keys[0]]
            } else if ("Domain" in parsedJson && "Availability" in parsedJson) {
              sourceDomainsArray = [parsedJson]
            } else {
              throw new Error("Parsed JSON is an object but not a single domain or a wrapper for a domain array.")
            }
          } else {
            throw new Error("Parsed JSON is not an array or a recognizable object structure.")
          }

          if (sourceDomainsArray.length === 0 && responseText.trim() !== "[]" && responseText.trim() !== "{}") {
            setApiError("API returned data, but no domain entries could be extracted.")
            toast({
              title: "Data Extraction Issue",
              description: "Could not extract domain entries from the response.",
              variant: "warning",
            })
            return
          }

          const validatedAndMappedResults: DomainAPIResult[] = sourceDomainsArray
            .map((item: any) => {
              const domainName = item?.Domain ?? item?.domain ?? item?.name
              const availabilityStatus = item?.Availability ?? item?.availability ?? item?.status
              if (item && typeof item === "object" && domainName && availabilityStatus) {
                return {
                  Domain: String(domainName),
                  Availability: String(availabilityStatus).toLowerCase() === "available" ? "Available" : "Unavailable",
                  registrarUrl:
                    String(availabilityStatus).toLowerCase() === "available"
                      ? `https://www.namecheap.com/domains/registration/results/?domain=${domainName}`
                      : undefined,
                }
              }
              console.warn("Invalid item structure:", item)
              return null
            })
            .filter((item): item is DomainAPIResult => item !== null)

          if (validatedAndMappedResults.length === 0 && sourceDomainsArray.length > 0) {
            setApiError("API returned domain entries, but none matched the required structure (Domain, Availability).")
            toast({
              title: "Structure Mismatch",
              description: "Domain entries from API did not have the expected structure.",
              variant: "warning",
            })
          } else if (validatedAndMappedResults.length === 0) {
            setApiError("No valid domain suggestions found in the API response.")
            toast({ title: "No Suggestions", description: "No valid domain suggestions were found.", variant: "info" })
          } else {
            const limitedResults = validatedAndMappedResults.slice(0, 50)
            setDomainResults(limitedResults)
            toast({
              title: "Search Complete",
              description: `Displaying ${limitedResults.length} of ${validatedAndMappedResults.length} found domain suggestions.`,
              variant: "success",
            })
          }
        } catch (parseError: any) {
          console.error("Primary JSON.parse failed:", parseError, "Raw response was:", responseText.substring(0, 500))
          try {
            const objectRegex = /\{\s*"Domain"\s*:\s*"[^"]+"\s*,\s*"Availability"\s*:\s*"[^"]+"\s*\}/g
            let potentialJsonString = responseText
            const arrayStartIndex = responseText.indexOf("[")
            const arrayEndIndex = responseText.lastIndexOf("]")
            if (arrayStartIndex !== -1 && arrayEndIndex !== -1 && arrayEndIndex > arrayStartIndex) {
              potentialJsonString = responseText.substring(arrayStartIndex, arrayEndIndex + 1)
            }
            const individualObjectMatches = potentialJsonString.match(objectRegex)

            if (individualObjectMatches && individualObjectMatches.length > 0) {
              const extractedDomains = individualObjectMatches.map((objStr) => JSON.parse(objStr))
              const limitedDomains = extractedDomains.slice(0, 50)
              const mappedResults = limitedDomains.map((item: any) => ({
                Domain: String(item.Domain),
                Availability: String(item.Availability).toLowerCase() === "available" ? "Available" : "Unavailable",
                registrarUrl:
                  String(item.Availability).toLowerCase() === "available"
                    ? `https://www.namecheap.com/domains/registration/results/?domain=${item.Domain}`
                    : undefined,
              }))
              setDomainResults(mappedResults)
              toast({
                title: "Search Complete (Fallback)",
                description: `Found ${mappedResults.length} domain suggestions using fallback parsing.`,
                variant: "success",
              })
              return
            } else {
              throw new Error("Regex fallback did not find parsable domain objects.")
            }
          } catch (regexFallbackError: any) {
            console.error("Regex fallback also failed:", regexFallbackError)
            setApiError(
              `Failed to parse API response. Primary error: ${parseError.message}. Fallback error: ${regexFallbackError.message}. Check raw response.`,
            )
            toast({
              title: "Parsing Error",
              description: "Could not parse the API response, even with fallback methods.",
              variant: "destructive",
            })
          }
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        if (fetchError.name === "AbortError") {
          setApiError("The request to the API timed out. Please try again.")
          toast({ title: "Request Timeout", description: "The request to the API timed out.", variant: "destructive" })
        } else {
          throw fetchError
        }
      }
    } catch (err: any) {
      setApiError(err.message || "Failed to submit form. Please try again.")
      toast({
        title: "API Error",
        description: err.message || "Failed to connect to the domain service.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }

    if (!searchHistory.includes(formData.keywords)) {
      setSearchHistory((prevHistory) => [formData.keywords, ...prevHistory].slice(0, 5))
    }
  }

  const handleDomainCardClick = (domain: DomainAPIResult) => {
    if (domain.Availability === "Available" && domain.registrarUrl) {
      window.open(domain.registrarUrl, "_blank")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast({ title: "Copied to Clipboard", description: `${text} copied!` }))
      .catch(() => toast({ title: "Copy Failed", description: "Could not copy text.", variant: "destructive" }))
  }

  const toggleFavorite = (domainName: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(domainName)) {
        toast({ description: `${domainName} removed from favorites.` })
        return prevFavorites.filter((fav) => fav !== domainName)
      }
      toast({ description: `${domainName} added to favorites.` })
      return [...prevFavorites, domainName]
    })
  }

  const renderDomainCard = (result: DomainAPIResult, index: number) => (
    <Card
      key={index}
      className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer border"
      style={{ 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border
      }}
      onClick={() => handleDomainCardClick(result)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant={result.Availability === "Available" ? "default" : "secondary"}
            className={`${
              result.Availability === "Available"
                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800"
            } flex items-center gap-1 text-xs font-medium`}
          >
            {result.Availability === "Available" ? <CheckCircle size={12} /> : <XCircle size={12} />}
            {result.Availability}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 transition-colors"
            style={{ 
              color: favorites.includes(result.Domain) ? colors.accent : colors.textTertiary 
            }}
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(result.Domain)
            }}
          >
            <Heart
              size={14}
              className={`transition-all ${
                favorites.includes(result.Domain) ? "fill-current" : ""
              }`}
            />
          </Button>
        </div>
        <h3 className="font-semibold text-lg mb-2 break-all leading-tight font-['Poppins']" style={{ color: colors.textPrimary }}>
          {result.Domain}
        </h3>
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs py-2 px-4 font-medium transition-colors"
            style={{ 
              borderColor: colors.border,
              color: colors.textSecondary,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverBackground
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            onClick={(e) => {
              e.stopPropagation()
              copyToClipboard(result.Domain)
            }}
          >
            <Copy size={12} className="mr-1" /> Copy
          </Button>
          {result.Availability === "Available" && (
            <Button
              size="sm"
              className="flex-1 text-white text-xs py-2 px-4 font-semibold rounded transition-colors"
              style={{ 
                backgroundColor: colors.accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.accentHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent
              }}
              onClick={(e) => {
                e.stopPropagation()
                handleDomainCardClick(result)
              }}
            >
              <ExternalLink size={12} className="mr-1" /> Buy
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderDomainRow = (result: DomainAPIResult, index: number) => (
    <div
      key={index}
      className="flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-300"
      style={{ 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.hoverBackground
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.cardBackground
      }}
      onClick={() => handleDomainCardClick(result)}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Badge
          variant={result.Availability === "Available" ? "default" : "secondary"}
          className={`${
            result.Availability === "Available"
              ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
              : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800"
          } flex items-center gap-1 text-xs font-medium shrink-0`}
        >
          {result.Availability === "Available" ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {result.Availability}
        </Badge>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg break-all font-['Poppins']" style={{ color: colors.textPrimary }}>{result.Domain}</h3>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 transition-colors"
          style={{ 
            color: favorites.includes(result.Domain) ? colors.accent : colors.textTertiary 
          }}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(result.Domain)
          }}
        >
          <Heart
            size={16}
            className={`transition-all ${
              favorites.includes(result.Domain) ? "fill-current" : ""
            }`}
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-medium transition-colors"
          style={{ 
            borderColor: colors.border,
            color: colors.textSecondary,
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverBackground
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          onClick={(e) => {
            e.stopPropagation()
            copyToClipboard(result.Domain)
          }}
        >
          <Copy size={14} className="mr-1" /> Copy
        </Button>
        {result.Availability === "Available" && (
          <Button
            size="sm"
            className="text-white font-semibold rounded px-4 transition-colors"
            style={{ 
              backgroundColor: colors.accent,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.accentHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.accent
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleDomainCardClick(result)
            }}
          >
            <ExternalLink size={14} className="mr-1" /> Buy
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full font-['Inter'] transition-colors duration-200" style={{ backgroundColor: colors.background }}>
      {/* Header Section with Gradient */}
      <div
        className="w-full p-4 md:p-8 flex flex-col items-center"
        style={{ background: colors.headerBackground }}
      >
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.accent }}>
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-['Poppins']" style={{ color: colors.textPrimary }}>Domain Name Genie</h1>
          <p className="text-lg md:text-xl" style={{ color: colors.textSecondary }}>Find your perfect domain with a touch of magic!</p>
        </header>

        <Card className="w-full max-w-2xl mb-8 md:mb-12 border shadow-lg transition-colors" style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center gap-2 font-['Poppins']" style={{ color: colors.textPrimary }}>
              <Search style={{ color: colors.accent }} />
              Uncover Your Domain
            </CardTitle>
            <CardDescription style={{ color: colors.textSecondary }}>Enter your details to generate domain ideas.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1.5 font-medium" style={{ color: colors.textPrimary }}>
                    <User size={16} style={{ color: colors.accent }} /> Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`transition-colors ${
                      errors.name ? "border-red-400 ring-red-400" : ""
                    }`}
                    style={{ 
                      backgroundColor: colors.inputBackground,
                      borderColor: errors.name ? '#F87171' : colors.border,
                      color: colors.textPrimary
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertTriangle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1.5 font-medium" style={{ color: colors.textPrimary }}>
                    <Mail size={16} style={{ color: colors.accent }} /> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`transition-colors ${
                      errors.email ? "border-red-400 ring-red-400" : ""
                    }`}
                    style={{ 
                      backgroundColor: colors.inputBackground,
                      borderColor: errors.email ? '#F87171' : colors.border,
                      color: colors.textPrimary
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertTriangle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords" className="font-medium" style={{ color: colors.textPrimary }}>
                  Keywords / Business Description
                </Label>
                <Textarea
                  id="keywords"
                  name="keywords"
                  placeholder="e.g., artisanal bakery, AI-powered travel, sustainable pet food..."
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className={`min-h-[100px] transition-colors ${
                    errors.keywords ? "border-red-400 ring-red-400" : ""
                  }`}
                  style={{ 
                    backgroundColor: colors.inputBackground,
                    borderColor: errors.keywords ? '#F87171' : colors.border,
                    color: colors.textPrimary
                  }}
                />
                {errors.keywords && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    {errors.keywords}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-lg py-4 px-4 text-white font-semibold rounded transition-all duration-300 ease-in-out transform hover:scale-105"
                style={{ 
                  backgroundColor: colors.accent,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = colors.accentHover
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = colors.accent
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Conjuring Domains...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Find My Domain
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-4 md:p-8 flex flex-col items-center">
        {apiError && (
          <Card className="w-full max-w-2xl mb-8 md:mb-12 border transition-colors" style={{ backgroundColor: colors.errorBackground, borderColor: colors.errorBorder }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2 font-['Poppins']" style={{ color: colors.error }}>
                <AlertTriangle /> API Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: colors.error }}>{apiError}</p>
            </CardContent>
          </Card>
        )}

        {rawApiResponse && domainResults.length === 0 && (
          <Card className="w-full max-w-2xl mb-8 md:mb-12 border transition-colors" style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold font-['Poppins']" style={{ color: colors.textPrimary }}>Raw API Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm whitespace-pre-wrap break-all max-h-60 overflow-y-auto p-4 rounded-md transition-colors" style={{ 
                color: colors.textSecondary,
                backgroundColor: colors.hoverBackground
              }}>
                {rawApiResponse}
              </pre>
            </CardContent>
          </Card>
        )}

        {domainResults.length > 0 && (
          <section className="w-full max-w-7xl mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-['Poppins']" style={{ color: colors.textPrimary }}>Domain Suggestions</h2>
                <p style={{ color: colors.textSecondary }}>
                  Showing {filteredDomains.length} of {domainResults.length} domains
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Input
                    placeholder="Search domains..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pr-10 transition-colors"
                    style={{ 
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.border,
                      color: colors.textPrimary
                    }}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.textSecondary }} />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterMode === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterMode("all")}
                    className={`font-semibold px-4 rounded transition-colors ${
                      filterMode === "all"
                        ? "text-white"
                        : ""
                    }`}
                    style={{ 
                      backgroundColor: filterMode === "all" ? colors.accent : 'transparent',
                      borderColor: colors.border,
                      color: filterMode === "all" ? 'white' : colors.textSecondary
                    }}
                    onMouseEnter={(e) => {
                      if (filterMode === "all") {
                        e.currentTarget.style.backgroundColor = colors.accentHover
                      } else {
                        e.currentTarget.style.backgroundColor = colors.hoverBackground
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filterMode === "all") {
                        e.currentTarget.style.backgroundColor = colors.accent
                      } else {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterMode === "available" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterMode("available")}
                    className={`font-semibold px-4 rounded transition-colors ${
                      filterMode === "available"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : ""
                    }`}
                    style={{ 
                      backgroundColor: filterMode === "available" ? '#059669' : 'transparent',
                      borderColor: colors.border,
                      color: filterMode === "available" ? 'white' : colors.textSecondary
                    }}
                    onMouseEnter={(e) => {
                      if (filterMode === "available") {
                        e.currentTarget.style.backgroundColor = '#047857'
                      } else {
                        e.currentTarget.style.backgroundColor = colors.hoverBackground
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filterMode === "available") {
                        e.currentTarget.style.backgroundColor = '#059669'
                      } else {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    Available
                  </Button>
                  <Button
                    variant={filterMode === "unavailable" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterMode("unavailable")}
                    className={`font-semibold px-4 rounded transition-colors ${
                      filterMode === "unavailable"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : ""
                    }`}
                    style={{ 
                      backgroundColor: filterMode === "unavailable" ? '#DC2626' : 'transparent',
                      borderColor: colors.border,
                      color: filterMode === "unavailable" ? 'white' : colors.textSecondary
                    }}
                    onMouseEnter={(e) => {
                      if (filterMode === "unavailable") {
                        e.currentTarget.style.backgroundColor = '#B91C1C'
                      } else {
                        e.currentTarget.style.backgroundColor = colors.hoverBackground
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filterMode === "unavailable") {
                        e.currentTarget.style.backgroundColor = '#DC2626'
                      } else {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    Unavailable
                  </Button>
                </div>
                <div className="flex gap-1 rounded-lg p-1 transition-colors" style={{ backgroundColor: colors.hoverBackground }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`transition-colors ${
                      viewMode === "grid" ? "shadow-sm" : ""
                    }`}
                    style={{ 
                      backgroundColor: viewMode === "grid" ? colors.cardBackground : 'transparent',
                      color: viewMode === "grid" ? colors.accent : colors.textSecondary
                    }}
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`transition-colors ${
                      viewMode === "list" ? "shadow-sm" : ""
                    }`}
                    style={{ 
                      backgroundColor: viewMode === "list" ? colors.cardBackground : 'transparent',
                      color: viewMode === "list" ? colors.accent : colors.textSecondary
                    }}
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredDomains.map((result, index) => renderDomainCard(result, index))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDomains.map((result, index) => renderDomainRow(result, index))}
                </div>
              )}
            </div>
            {filteredDomains.length === 0 && domainResults.length > 0 && (
              <div className="text-center py-8">
                <p className="text-lg" style={{ color: colors.textSecondary }}>No domains match your current filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterMode("all")
                    setSearchFilter("")
                  }}
                  className="mt-4 font-semibold px-4 rounded transition-colors"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.textSecondary,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.hoverBackground
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        )}

        {searchHistory.length > 0 && (
          <Card className="w-full max-w-2xl border transition-colors" style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2 font-['Poppins']" style={{ color: colors.textPrimary }}>
                <History style={{ color: colors.accent }} /> Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((searchTerm, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer px-3 py-1 text-sm font-medium transition-colors"
                    style={{ 
                      backgroundColor: colors.hoverBackground,
                      color: colors.textSecondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.border
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.hoverBackground
                    }}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, keywords: searchTerm }))
                      toast({ description: `Loaded search: "${searchTerm}"` })
                    }}
                  >
                    {searchTerm}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <footer className="text-center mt-8 md:mt-12 text-sm" style={{ color: colors.textSecondary }}>
          <p>&copy; {new Date().getFullYear()} Domain Name Genie. All rights reserved.</p>
          <p>Powered by Your Imagination & n8n!</p>
        </footer>
      </div>
    </div>
  )
}
