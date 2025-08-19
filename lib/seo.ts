import type { Metadata } from "next"

export interface SEOData {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}

export function generateSEOMetadata(data: SEOData): Metadata {
  const {
    title = "Ghost Netlify Starter",
    description = "A modern Ghost CMS starter built with Next.js and Netlify",
    image = "/placeholder.svg?height=630&width=1200",
    url = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    tags = [],
  } = data

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: type as any,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    keywords: tags.join(", "),
  }

  return metadata
}

export function generateBlogPostMetadata(post: any): Metadata {
  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt || post.meta_description,
    image: post.feature_image || "/placeholder.svg?height=630&width=1200",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    author: post.primary_author?.name,
    tags: post.tags?.map((tag: any) => tag.name) || [],
  })
}
