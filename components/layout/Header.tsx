"use client"

import Link from "next/link"
import { AuthTriggerButton } from "@/components/auth/auth-trigger-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { env } from "@/lib/env"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="KozkerTech Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl">Kozker AI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
              Tools
            </Link>
            <Link
              href={`${env.MAIN_SITE_URL}/solutions`}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Solutions
            </Link>
            <Link href="/pricing" className="text-foreground/60 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <AuthTriggerButton />
        </div>
      </div>
    </header>
  )
}

export { Header }
