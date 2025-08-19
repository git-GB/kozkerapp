import type { MetadataRoute } from "next"
import { getAllPosts, getAllTags } from "@/lib/ghost"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/services",
    "/solutions",
    "/pricing",
    "/tools",
    "/blog",
    "/case-studies",
    "/privacy",
    "/terms",
    "/solutions/launchpad",
    "/solutions/growthsuite",
    "/solutions/intelligence",
    "/services/ai-powered-web-design",
    "/services/whatsapp-automation",
    "/services/24x7-ai-powered-customer-support",
    "/services/support-suite",
    "/services/bi-analytics",
    "/services/cloud-data-integration",
    "/tools/domain-name-generator",
    "/tools/social-media-suggester",
    "/tools/meeting-summary-extractor",
    "/tools/blog-generator",
    "/tools/email-subject-line",
    "/tools/proposal-draft-generator",
    "/tools/tagline-value-prop-creator",
    "/tools/landing-pageherocopygenerator",
    "/tools/seo-keyword-content-gapanalyzer",
    "/tools/data-cleanse",
    "/tools/power-bi-measure",
    "/tools/ai-business-plan-generator",
  ]

  const staticSitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  // Add mock case study pages
  const mockCaseStudies = [
    "restaurant-chain-300-percent-increase",
    "ecommerce-conversion-rate-boost",
    "manufacturing-roi-increase",
  ]

  const caseStudySitemap = mockCaseStudies.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  try {
    // Dynamic blog posts
    const posts = await getAllPosts()
    const postSitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    // Dynamic tags
    const tags = await getAllTags()
    const tagSitemap = tags.map((tag) => ({
      url: `${baseUrl}/tag/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }))

    return [...staticSitemap, ...caseStudySitemap, ...postSitemap, ...tagSitemap]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return [...staticSitemap, ...caseStudySitemap]
  }
}
