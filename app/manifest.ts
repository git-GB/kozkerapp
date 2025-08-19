import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KozkerTech - Web Development & Power BI Solutions",
    short_name: "KozkerTech",
    description:
      "High-Conversion Websites, 24/7 Support, WhatsApp Automation, and Power BI Solutions for businesses in Kochi and beyond.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF6E30",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple-touch-icon",
      },
      {
        src: "/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    orientation: "portrait",
    categories: ["business", "web development", "technology"],
    screenshots: [
      {
        src: "/screenshot1.jpg",
        sizes: "1280x720",
        type: "image/jpeg",
        label: "KozkerTech Homepage",
      },
      {
        src: "/screenshot2.jpg",
        sizes: "1280x720",
        type: "image/jpeg",
        label: "KozkerTech Solutions Page",
      },
    ],
    shortcuts: [
      {
        name: "Blog",
        url: "/blog",
        description: "Read our latest articles",
      },
      {
        name: "Solutions",
        url: "/solutions",
        description: "Explore our solutions",
      },
      {
        name: "Contact",
        url: "/contact",
        description: "Get in touch with us",
      },
    ],
    related_applications: [
      {
        platform: "web",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com",
      },
    ],
  }
}
