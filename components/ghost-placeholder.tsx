import { Button } from "@/components/ui/button"
import Link from "next/link"

export function GhostPlaceholder() {
  return (
    <div className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Ghost CMS Not Configured</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        It looks like your Ghost CMS integration is not properly configured. Please make sure you have set the GHOST_URL
        and GHOST_CONTENT_API_KEY environment variables in your Netlify dashboard.
      </p>
      <div className="space-y-4 max-w-md mx-auto bg-muted p-6 rounded-lg">
        <h3 className="font-semibold">Required Environment Variables:</h3>
        <ul className="text-left space-y-2">
          <li>
            <strong>GHOST_URL</strong>: Your Ghost CMS URL (e.g., https://yourblog.ghost.io)
          </li>
          <li>
            <strong>GHOST_CONTENT_API_KEY</strong>: Your Ghost Content API key
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
