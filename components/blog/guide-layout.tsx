"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: number
}

interface GuideLayoutProps {
  post: any
  children: React.ReactNode
}

export function GuideLayout({ post, children }: GuideLayoutProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from the post content (only H1 and H2)
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll("h1, h2")
      const headingList: Heading[] = []

      headingElements.forEach((heading, index) => {
        const level = Number.parseInt(heading.tagName.charAt(1))
        if (level <= 2) {
          // Only include H1 and H2
          const id = heading.id || `heading-${index}`
          if (!heading.id) {
            heading.id = id
          }

          headingList.push({
            id,
            text: heading.textContent || "",
            level,
          })
        }
      })

      setHeadings(headingList)
    }

    // Wait for content to be rendered
    const timer = setTimeout(extractHeadings, 100)
    return () => clearTimeout(timer)
  }, [post])

  useEffect(() => {
    // Handle scroll to update active heading
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean)

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveId(element.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial active heading

    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <main className="flex-1 min-w-0 pr-8">{children}</main>

        {/* Table of Contents - Right Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8 py-8">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                ON THIS PAGE
              </h3>

              {headings.length > 0 ? (
                <nav>
                  <ul className="space-y-1">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`
                            block w-full text-left text-sm py-1 transition-colors duration-200
                            ${heading.level === 2 ? "ml-4 text-xs" : ""}
                            ${
                              activeId === heading.id
                                ? "text-gray-900 dark:text-gray-100 font-medium"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            }
                          `}
                        >
                          {heading.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No headings found</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
