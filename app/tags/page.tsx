import Link from "next/link"
import { getTags } from "@/lib/ghost"
import { Badge } from "@/components/ui/badge"
import { GhostPlaceholder } from "@/components/ghost-placeholder"

export const metadata = {
  title: "Blog Tags - Browse Topics by Category",
  description:
    "Browse all blog topics by category. Find articles on web development, customer support, WhatsApp automation, and Power BI solutions.",
  keywords: ["blog tags", "categories", "web development", "power bi", "whatsapp automation", "customer support"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tags`,
  },
  openGraph: {
    title: "Blog Tags - Browse Topics by Category",
    description:
      "Browse all blog topics by category. Find articles on web development, customer support, WhatsApp automation, and Power BI solutions.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tags`,
    type: "website",
  },
}

export default async function TagsPage() {
  try {
    // Check if Ghost API is configured
    if (!process.env.GHOST_URL || !process.env.GHOST_CONTENT_API_KEY) {
      return (
        <div className="container py-8 md:py-12">
          <GhostPlaceholder />
        </div>
      )
    }

    const tags = await getTags()

    // Add structured data for the tags page
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Blog Tags",
      description:
        "Browse all blog topics by category. Find articles on web development, customer support, WhatsApp automation, and Power BI solutions.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/tags`,
      hasPart: tags.map((tag) => ({
        "@type": "WebPage",
        name: tag.name,
        description: tag.description || `Posts tagged with ${tag.name}`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tag/${tag.slug}`,
      })),
    }

    return (
      <div className="container py-8 md:py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Tags</h1>
            <p className="text-xl text-muted-foreground">Browse all tags</p>
          </div>
        </div>

        {tags.length > 0 ? (
          <div className="mt-8 md:mt-12 flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <Badge className="text-base px-4 py-2 hover:bg-primary hover:text-primary-foreground">
                  {tag.name} ({tag.count?.posts})
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 md:mt-12 text-center py-12">
            <h2 className="text-xl font-medium">No tags found</h2>
            <p className="text-muted-foreground mt-2">There are no tags available yet.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error rendering tags page:", error)
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Error loading tags</h2>
          <p className="text-muted-foreground mt-2">
            There was an error loading tags. Please check your Ghost CMS configuration.
          </p>
        </div>
      </div>
    )
  }
}
