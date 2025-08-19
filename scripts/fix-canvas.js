// This script checks if we're in a Netlify build environment
// If so, it skips the canvas installation which is causing issues
console.log("Running postinstall script...")

const isNetlify = process.env.NETLIFY === "true"

if (isNetlify) {
  console.log("Detected Netlify environment - skipping canvas installation")
  // We're in Netlify, so we'll skip canvas installation
  process.exit(0)
} else {
  console.log("Not in Netlify environment - proceeding with normal installation")
  // In local development, you can install canvas if needed
  // This won't run in Netlify
}
