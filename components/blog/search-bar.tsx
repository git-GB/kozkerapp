"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  initialQuery?: string
  onSearch?: (query: string) => void
}

export function SearchBar({ searchQuery = "", onSearchChange, initialQuery = "", onSearch }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery || initialQuery)

  const handleSearch = (query: string) => {
    setLocalQuery(query)
    if (onSearchChange) {
      onSearchChange(query)
    }
    if (onSearch) {
      onSearch(query)
    }
  }

  const clearSearch = () => {
    handleSearch("")
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search posts..."
        value={localQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-10"
      />
      {localQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
