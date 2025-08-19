"use client"

import { PostCard } from "@/components/post-card"

interface BlogGridProps {
  posts: any[]
  emptyMessage?: string
}

export function BlogGrid({ posts = [], emptyMessage = "No posts found" }: BlogGridProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id || post.slug} post={post} />
      ))}
    </div>
  )
}
