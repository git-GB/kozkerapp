import Link from "next/link"
import { env } from "@/lib/env"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="font-bold text-xl">Kozker AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered tools to accelerate your business growth and streamline your workflow.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/domain-name-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Domain Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/ai-business-plan-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Business Plan Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/blog-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog Generator
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`${env.MAIN_SITE_URL}/about`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={`${env.MAIN_SITE_URL}/contact`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={`${env.MAIN_SITE_URL}/privacy`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`${env.MAIN_SITE_URL}/help`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href={`${env.MAIN_SITE_URL}/status`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 Kozker AI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href={`${env.MAIN_SITE_URL}/terms`} className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href={`${env.MAIN_SITE_URL}/privacy`} className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
