import GhostContentAPI from "@tryghost/content-api"

// Create API instance with site credentials
let api: GhostContentAPI | null = null

try {
  if (process.env.GHOST_URL && process.env.GHOST_CONTENT_API_KEY) {
    api = new GhostContentAPI({
      url: process.env.GHOST_URL,
      key: process.env.GHOST_CONTENT_API_KEY,
      version: "v5.0",
    })
  } else {
    console.error("Missing environment variables for Ghost API initialization")
  }
} catch (error) {
  console.error("Failed to initialize Ghost API:", error)
  api = null
}

export interface GhostPost {
  id: string
  title: string
  slug: string
  html: string
  feature_image: string | null
  excerpt: string
  published_at: string
  updated_at: string
  created_at: string
  tags: GhostTag[]
  authors: GhostAuthor[]
  primary_author: GhostAuthor
  primary_tag: GhostTag | null
  url: string
  canonical_url: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  og_title: string | null
  og_description: string | null
  twitter_image: string | null
  twitter_title: string | null
  twitter_description: string | null
  reading_time: number
  featured: boolean
}

export interface GhostTag {
  id: string
  name: string
  slug: string
  description: string | null
  feature_image: string | null
  visibility: string
  meta_title: string | null
  meta_description: string | null
  url: string
  count?: {
    posts: number
  }
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  bio: string | null
  cover_image: string | null
  profile_image: string | null
  location: string | null
  website: string | null
  twitter: string | null
  facebook: string | null
  url: string
  count?: {
    posts: number
  }
}

export interface GhostSettings {
  title: string
  description: string
  logo: string | null
  cover_image: string | null
  icon: string | null
  accent_color: string | null
  locale: string
  timezone: string
  codeinjection_head: string | null
  codeinjection_foot: string | null
  navigation: Array<{
    label: string
    url: string
  }>
  secondary_navigation: Array<{
    label: string
    url: string
  }>
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  og_title: string | null
  og_description: string | null
  twitter_image: string | null
  twitter_title: string | null
  twitter_description: string | null
}

// Get all posts
export async function getPosts(limit?: number): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty posts array")
      return []
    }
    const posts = await api.posts.browse({
      limit: limit || "all",
      include: ["tags", "authors"],
      order: "published_at DESC",
    })
    return posts as GhostPost[]
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

// Get single post by slug
export async function getPost(slug: string): Promise<GhostPost | null> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning null for post")
      return null
    }
    const post = await api.posts.read({ slug }, { include: ["tags", "authors"] })
    return post as GhostPost
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

// Get all tags
export async function getTags(): Promise<GhostTag[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty tags array")
      return []
    }
    const tags = await api.tags.browse({
      limit: "all",
      include: ["count.posts"],
    })
    return tags as GhostTag[]
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

// Get single tag by slug
export async function getTag(slug: string): Promise<GhostTag | null> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning null for tag")
      return null
    }
    const tag = await api.tags.read({ slug }, { include: ["count.posts"] })
    return tag as GhostTag
  } catch (error) {
    console.error("Error fetching tag:", error)
    return null
  }
}

// Get posts by tag
export async function getPostsByTag(tagSlug: string, limit?: number): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty posts array")
      return []
    }
    const posts = await api.posts.browse({
      limit: limit || "all",
      filter: `tag:${tagSlug}`,
      include: ["tags", "authors"],
      order: "published_at DESC",
    })
    return posts as GhostPost[]
  } catch (error) {
    console.error("Error fetching posts by tag:", error)
    return []
  }
}

// Get featured posts
export async function getFeaturedPosts(limit = 3): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty featured posts array")
      return []
    }
    const posts = await api.posts.browse({
      limit,
      filter: "featured:true",
      include: ["tags", "authors"],
      order: "published_at DESC",
    })
    return posts as GhostPost[]
  } catch (error) {
    console.error("Error fetching featured posts:", error)
    return []
  }
}

// Get site settings
export async function getSettings(): Promise<GhostSettings | null> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning null for settings")
      return null
    }
    const settings = await api.settings.browse()
    return settings as GhostSettings
  } catch (error) {
    console.error("Error fetching settings:", error)
    return null
  }
}

// Search posts
export async function searchPosts(query: string, limit = 10): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty search results")
      return []
    }
    const posts = await api.posts.browse({
      limit,
      filter: `title:~'${query}',excerpt:~'${query}'`,
      include: ["tags", "authors"],
      order: "published_at DESC",
    })
    return posts as GhostPost[]
  } catch (error) {
    console.error("Error searching posts:", error)
    return []
  }
}

// Get recent posts
export async function getRecentPosts(limit = 5): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty recent posts array")
      return []
    }
    const posts = await api.posts.browse({
      limit,
      include: ["tags", "authors"],
      order: "published_at DESC",
    })
    return posts as GhostPost[]
  } catch (error) {
    console.error("Error fetching recent posts:", error)
    return []
  }
}

// Get related posts (posts with similar tags)
export async function getRelatedPosts(currentPost: GhostPost, limit = 3): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty related posts array")
      return []
    }
    if (!currentPost.tags || currentPost.tags.length === 0) {
      return getRecentPosts(limit)
    }

    const tagSlugs = currentPost.tags.map((tag) => tag.slug).join(",")
    const posts = await api.posts.browse({
      limit: limit + 1, // Get one extra to exclude current post
      filter: `tag:[${tagSlugs}]+id:-${currentPost.id}`,
      include: ["tags", "authors"],
      order: "published_at DESC",
    })

    return (posts as GhostPost[]).slice(0, limit)
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

// Get case studies (posts with 'case-study' tag)
export async function getCaseStudies(limit?: number): Promise<GhostPost[]> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning empty case studies array")
      return []
    }
    const posts = await api.posts.browse({
      limit: limit || "all",
      filter: "tag:case-study",
      include: ["tags", "authors"],
      order: "published_at DESC",
    })
    return posts as GhostPost[]
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return []
  }
}

// Get single case study by slug
export async function getCaseStudy(slug: string): Promise<GhostPost | null> {
  try {
    if (!api) {
      console.warn("Ghost API not available - returning null for case study")
      return null
    }
    const post = await api.posts.read(
      { slug },
      {
        include: ["tags", "authors"],
        filter: "tag:case-study",
      },
    )
    return post as GhostPost
  } catch (error) {
    console.error("Error fetching case study:", error)
    return null
  }
}

// Export aliases for missing exports
export const getAllPosts = getPosts
export const getAllTags = getTags

// Export default
export default api
