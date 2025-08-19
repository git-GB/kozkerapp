import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Author {
  name: string
  profile_image?: string
}

interface Tag {
  name: string
  slug: string
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  feature_image?: string
  published_at: string
  reading_time?: number
  primary_author?: Author
  tags?: Tag[]
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900">
      <CardHeader className="p-0">
        {post.feature_image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.feature_image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag.slug}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200 text-xs"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}

          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200 text-gray-900 dark:text-white">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>

          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              {post.primary_author?.profile_image && (
                <Image
                  src={post.primary_author.profile_image || "/placeholder.svg"}
                  alt={post.primary_author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
                  {post.primary_author?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400">{formatDate(post.published_at)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {post.reading_time && <span>{post.reading_time} min read</span>}
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
