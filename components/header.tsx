"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { AuthTriggerButton } from "./auth/auth-trigger-button"
import { useAuth } from "@/contexts/auth-context"
import { useAnalytics } from "@/contexts/analytics-context"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const { user } = useAuth()
  const { trackPageView } = useAnalytics()
  const isDarkMode = resolvedTheme === "dark"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (user) {
      trackPageView(pathname)
    }
  }, [pathname, user, trackPageView])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isSolutionsPage = pathname.startsWith("/solutions")
  const isResourcesPage =
    pathname.startsWith("/resources") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/webinars") ||
    pathname.startsWith("/case-studies") ||
    pathname.startsWith("/tools")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? isDarkMode
            ? "bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-800"
            : "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="KozkerTech Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative group",
              pathname === "/" && "text-primary font-semibold",
            )}
          >
            Home
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                pathname === "/" && "w-full",
              )}
            ></span>
          </Link>

          {/* Solutions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className={cn(
                  "p-0 h-auto text-sm font-medium flex items-center gap-1.5 hover:text-primary relative group",
                  isSolutionsPage && "text-primary font-semibold",
                )}
              >
                Solutions
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                    isSolutionsPage && "w-full",
                  )}
                ></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="w-64 p-2 rounded-xl border border-border/50 shadow-lg animate-in fade-in-80 zoom-in-95 dark:bg-gray-900 dark:border-gray-800"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/solutions/launchpad"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary flex flex-col items-start"
                >
                  <span className="font-semibold">LaunchPad</span>
                  <span className="text-xs text-muted-foreground">For Startups & Local SMBs</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/solutions/growthsuite"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary flex flex-col items-start"
                >
                  <span className="font-semibold">GrowthSuite</span>
                  <span className="text-xs text-muted-foreground">For Growing SMBs</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/solutions/intelligence"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary flex flex-col items-start"
                >
                  <span className="font-semibold">Intelligence</span>
                  <span className="text-xs text-muted-foreground">For Data-Driven Enterprises</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className={cn(
                  "p-0 h-auto text-sm font-medium flex items-center gap-1.5 hover:text-primary relative group",
                  isResourcesPage && "text-primary font-semibold",
                )}
              >
                Resources
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                    isResourcesPage && "w-full",
                  )}
                ></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="w-56 p-2 rounded-xl border border-border/50 shadow-lg animate-in fade-in-80 zoom-in-95 dark:bg-gray-900 dark:border-gray-800"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/blog"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://events.kozker.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  Webinars & Events
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/case-studies"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  Case Studies
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tools"
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  Free Tools
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/pricing"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative group",
              pathname === "/pricing" && "text-primary font-semibold",
            )}
          >
            Pricing
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                pathname === "/pricing" && "w-full",
              )}
            ></span>
          </Link>

          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative group",
              pathname === "/about" && "text-primary font-semibold",
            )}
          >
            About
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                pathname === "/about" && "w-full",
              )}
            ></span>
          </Link>

          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative group",
              pathname === "/contact" && "text-primary font-semibold",
            )}
          >
            Contact
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full",
                pathname === "/contact" && "w-full",
              )}
            ></span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <div className="hidden md:flex">
            <AuthTriggerButton />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full w-9 h-9" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background/98 backdrop-blur-md border-t">
          <div className="relative z-20 grid gap-6 rounded-xl p-4 bg-background">
            <Link
              href="/"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-medium">Home</span>
            </Link>

            <div className="space-y-3">
              <div className="px-3 py-2">
                <span className="text-base font-medium">Solutions</span>
              </div>
              <div className="pl-4 border-l-2 border-primary/20 space-y-2 ml-3">
                <Link
                  href="/solutions/launchpad"
                  className="flex flex-col space-y-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">LaunchPad</span>
                  <span className="text-xs text-muted-foreground">For Startups & Local SMBs</span>
                </Link>
                <Link
                  href="/solutions/growthsuite"
                  className="flex flex-col space-y-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">GrowthSuite</span>
                  <span className="text-xs text-muted-foreground">For Growing SMBs</span>
                </Link>
                <Link
                  href="/solutions/intelligence"
                  className="flex flex-col space-y-1 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">Intelligence</span>
                  <span className="text-xs text-muted-foreground">For Data-Driven Enterprises</span>
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="px-3 py-2">
                <span className="text-base font-medium">Resources</span>
              </div>
              <div className="pl-4 border-l-2 border-primary/20 space-y-2 ml-3">
                <Link
                  href="/blog"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">Blog</span>
                </Link>
                <a
                  href="https://events.kozker.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">Webinars & Events</span>
                </a>
                <Link
                  href="/case-studies"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">Case Studies</span>
                </Link>
                <Link
                  href="/tools"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm font-medium">Free Tools</span>
                </Link>
              </div>
            </div>

            <Link
              href="/pricing"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-medium">Pricing</span>
            </Link>

            <Link
              href="/about"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-medium">About</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-medium">Contact</span>
            </Link>

            <div className="mt-4 px-3">
              <AuthTriggerButton className="w-full" />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full w-9 h-9"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      )}
    </header>
  )
}
