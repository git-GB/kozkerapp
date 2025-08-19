import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/ghost"
import { GhostContent } from "@/components/ghost-content"
import { GuideLayout } from "@/components/blog/guide-layout"
import { generateBlogPostMetadata } from "@/lib/seo"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock } from "lucide-react"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  return generateBlogPostMetadata(post)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // Check if post has the toc-guide tag (handles various formats)
  const hasGuideLayout = post.tags?.some(
    (tag: any) =>
      tag.slug === "toc-guide" ||
      tag.slug === "hash-toc-guide" ||
      tag.name === "#toc-guide" ||
      tag.name === "toc-guide",
  )

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateReadingTime = (html: string) => {
    const wordsPerMinute = 200
    const textContent = html.replace(/<[^>]*>/g, "")
    const wordCount = textContent.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  // If post has guide layout, use GuideLayout component
  if (hasGuideLayout) {
    return (
      <GuideLayout post={post}>
        <article className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Post Header */}
          <header className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags
                  .filter((tag: any) => !tag.slug.includes("toc-guide") && !tag.name.includes("#"))
                  .map((tag: any) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              {post.primary_author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.primary_author.name}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{calculateReadingTime(post.html)} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{post.excerpt}</p>
            )}

            {/* Featured Image */}
            {post.feature_image && (
              <div className="mb-8">
                <Image
                  src={post.feature_image || "/placeholder.svg"}
                  alt={post.feature_image_alt || post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
                {post.feature_image_caption && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                    {post.feature_image_caption}
                  </p>
                )}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="ghost-content">
            <GhostContent html={post.html} />
          </div>
        </article>
      </GuideLayout>
    )
  }

  // Regular post layout without guide features
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Post Header */}
        <header className="mb-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags
                .filter((tag: any) => !tag.name.includes("#"))
                .map((tag: any) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            {post.primary_author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.primary_author.name}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{calculateReadingTime(post.html)} min read</span>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{post.excerpt}</p>
          )}

          {/* Featured Image */}
          {post.feature_image && (
            <div className="mb-8">
              <Image
                src={post.feature_image || "/placeholder.svg"}
                alt={post.feature_image_alt || post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
              {post.feature_image_caption && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                  {post.feature_image_caption}
                </p>
              )}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="ghost-content">
          <GhostContent html={post.html} />
        </div>
      </article>
    </div>
  )
}
