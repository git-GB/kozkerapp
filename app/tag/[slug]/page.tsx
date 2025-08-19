import { getTags, getPosts } from "@/lib/ghost"
import { PostCard } from "@/components/post-card"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"

export async function generateStaticParams() {
  try {
    const tags = await getTags()
    return tags.map((tag) => ({
      slug: tag.slug,
    }))
  } catch (error) {
    console.error("Error generating static params for tags:", error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const tags = await getTags()
    const tag = tags.find((t) => t.slug === params.slug)

    if (!tag) {
      return {
        title: "Tag Not Found",
        description: "The tag you are looking for does not exist",
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com"
    const tagUrl = `${baseUrl}/tag/${tag.slug}`

    return {
      title: `${tag.name} - Articles and Insights`,
      description:
        tag.description || `Browse articles tagged with ${tag.name} - insights, tips, and guides from KozkerTech.`,
      keywords: [tag.name, "blog", "articles", "insights", "kozkertech"],
      alternates: {
        canonical: tagUrl,
      },
      openGraph: {
        title: `${tag.name} - Articles and Insights`,
        description:
          tag.description || `Browse articles tagged with ${tag.name} - insights, tips, and guides from KozkerTech.`,
        url: tagUrl,
        type: "website",
      },
    }
  } catch (error) {
    console.error("Error generating metadata for tag:", error)
    return {
      title: "Blog Tag",
      description: "Browse articles by tag",
    }
  }
}

// Add structured data at the beginning of the component
export default async function TagPage({ params }: { params: { slug: string } }) {
  try {
    const tags = await getTags()
    const tag = tags.find((t) => t.slug === params.slug)

    if (!tag) {
      notFound()
    }

    const posts = await getPosts()
    const taggedPosts = posts.filter((post) => post.tags?.some((t) => t.slug === params.slug))

    // Add structured data for the tag page
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com"
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${tag.name} - Articles and Insights`,
      description:
        tag.description || `Browse articles tagged with ${tag.name} - insights, tips, and guides from KozkerTech.`,
      url: `${baseUrl}/tag/${tag.slug}`,
      hasPart: taggedPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || "",
        datePublished: post.published_at,
        author: {
          "@type": "Person",
          name: post.primary_author.name,
        },
        url: `${baseUrl}/blog/${post.slug}`,
      })),
    }

    return (
      <div className="container py-8 md:py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Breadcrumbs className="mb-8" />
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">{tag.name}</h1>
            {tag.description && <p className="text-xl text-muted-foreground">{tag.description}</p>}
          </div>
        </div>

        {taggedPosts.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            {taggedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-8 md:mt-12 text-center py-12">
            <h2 className="text-xl font-medium">No posts found</h2>
            <p className="text-muted-foreground mt-2">There are no posts with this tag yet.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error rendering tag page:", error)
    return (
      <div className="container py-8 md:py-12">
        <Breadcrumbs className="mb-8" />
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Error loading tag</h2>
          <p className="text-muted-foreground mt-2">
            There was an error loading this tag. Please check your Ghost CMS configuration.
          </p>
        </div>
      </div>
    )
  }
}
