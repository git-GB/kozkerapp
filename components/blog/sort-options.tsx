"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortOptionsProps {
  sortBy: string
  onSortChange: (sort: string) => void
}

export function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
        <SelectItem value="title">Title A-Z</SelectItem>
      </SelectContent>
    </Select>
  )
}
