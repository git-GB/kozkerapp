import { getPosts, getTags } from "@/lib/ghost"
import { BlogContainer } from "./blog-container"

export const metadata = {
  title: "Blog - Digital Insights & Industry Expertise | KozkerTech",
  description:
    "Stay updated with the latest insights on digital transformation, business intelligence, automation, and technology trends from KozkerTech experts.",
  keywords: [
    "blog",
    "digital transformation",
    "power bi",
    "automation",
    "business intelligence",
    "technology insights",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog - Digital Insights & Industry Expertise | KozkerTech",
    description:
      "Stay updated with the latest insights on digital transformation, business intelligence, automation, and technology trends from KozkerTech experts.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: "/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "KozkerTech Blog",
      },
    ],
  },
}

export default async function BlogPage() {
  // Fetch posts and tags server-side with error handling
  let posts = []
  let tags = []

  try {
    ;[posts, tags] = await Promise.all([getPosts(), getTags()])
  } catch (error) {
    console.error("Error fetching blog data:", error)
    // Continue with empty arrays
  }

  // Add structured data for the blog page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "KozkerTech Blog",
    description:
      "Stay updated with the latest insights on digital transformation, business intelligence, automation, and technology trends from KozkerTech experts.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "KozkerTech",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kozker.com"}/logo.png`,
      },
    },
    blogPost:
      posts && posts.length > 0
        ? posts.slice(0, 10).map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || "",
            datePublished: post.published_at,
            dateModified: post.updated_at || post.published_at,
            author: {
              "@type": "Person",
              name: post.primary_author?.name || "KozkerTech",
            },
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
          }))
        : [],
  }

  return (
    <div className="container py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Digital Insights</h1>
          <p className="text-xl text-muted-foreground">
            Expert insights on digital transformation, business intelligence, and automation trends
          </p>
        </div>
      </div>

      {!process.env.GHOST_URL || !process.env.GHOST_CONTENT_API_KEY ? (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ghost CMS Configuration Missing</h2>
          <p className="text-muted-foreground mb-6">
            Please check your environment variables to ensure GHOST_URL and GHOST_CONTENT_API_KEY are properly set.
          </p>
        </div>
      ) : (
        <BlogContainer initialPosts={posts} initialTags={tags} />
      )}
    </div>
  )
}
