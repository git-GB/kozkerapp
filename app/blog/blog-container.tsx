"use client"

import { useState } from "react"
import { SearchBar } from "@/components/blog/search-bar"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogGrid } from "@/components/blog/blog-grid"
import { useBlogFilter } from "@/hooks/use-blog-filter"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

interface BlogContainerProps {
  initialPosts: any[]
  initialTags: any[]
}

export function BlogContainer({ initialPosts = [], initialTags = [] }: BlogContainerProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
  } = useBlogFilter(initialPosts, initialTags)

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filters & Search
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="space-y-6">
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <BlogSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-80 space-y-6">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <BlogSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <BlogGrid posts={filteredPosts} />
        </div>
      </div>
    </div>
  )
}

// Named export for compatibility
export { BlogContainer as default }
