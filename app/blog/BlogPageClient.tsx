"use client"

import { useState, useEffect } from "react"
import { getPosts, getTags } from "@/lib/ghost"
import { SearchBar } from "@/components/blog/search-bar"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogGrid } from "@/components/blog/blog-grid"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { useBlogFilter } from "@/hooks/use-blog-filter"
import { useSearchParams } from "next/navigation"

export default function BlogPageClient() {
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const searchParams = useSearchParams()

  // Fetch posts and tags
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [postsData, tagsData] = await Promise.all([getPosts(), getTags()])
      setPosts(postsData)
      setTags(tagsData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const {
    posts: filteredPosts,
    searchQuery,
    selectedCategories,
    sortOption,
    handleSearch,
    handleCategorySelect,
    handleSortSelect,
  } = useBlogFilter(posts)

  // Sort options
  const sortOptions = [
    { label: "Newest first", value: "newest" },
    { label: "Oldest first", value: "oldest" },
    { label: "A-Z", value: "a-z" },
    { label: "Z-A", value: "z-a" },
  ]

  // Add structured data for the blog page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "KozkerTech Blog",
    description:
      "Read the latest articles on web development, customer support, WhatsApp automation, and Power BI solutions from KozkerTech.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "KozkerTech",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com"}/logo.png`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || "",
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      author: {
        "@type": "Person",
        name: post.primary_author.name,
      },
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    })),
  }

  return (
    <div className="container py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">Read all our latest blog posts</p>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="mt-8 space-y-6">
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedCategories.length > 0 && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{filteredPosts.length}</span> results
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setIsMobileFilterOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar
            categories={tags}
            selectedCategories={selectedCategories}
            onSelectCategory={handleCategorySelect}
            sortOptions={sortOptions}
            selectedSortOption={sortOption}
            onSelectSortOption={handleSortSelect}
            isMobileFilterOpen={isMobileFilterOpen}
            onCloseMobileFilter={() => setIsMobileFilterOpen(false)}
          />
        </div>

        {/* Main content */}
        <div className="mt-6 lg:col-span-3 lg:mt-0">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : (
            <BlogGrid
              posts={filteredPosts}
              emptyMessage={
                searchQuery
                  ? `No posts found for "${searchQuery}"`
                  : selectedCategories.length > 0
                    ? "No posts found for the selected categories"
                    : "No posts found"
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
