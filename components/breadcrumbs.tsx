"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  homeLabel?: string
  className?: string
  separator?: React.ReactNode
  capitalizeLinks?: boolean
}

export function Breadcrumbs({
  homeLabel = "Home",
  className,
  separator = <ChevronRight className="h-4 w-4" />,
  capitalizeLinks = true,
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // Skip rendering breadcrumbs on homepage
  if (pathname === "/") return null

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean)

  // Build breadcrumb items with accumulated paths
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`
    const label = segment.replace(/-/g, " ")

    return {
      href: path,
      label: capitalizeLinks ? label.charAt(0).toUpperCase() + label.slice(1) : label,
    }
  })

  // Add home as the first item
  breadcrumbItems.unshift({ href: "/", label: homeLabel })

  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com"}${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">{separator}</span>}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-600" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-primary hover:underline">
                  {index === 0 ? <Home className="h-4 w-4" /> : item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
