"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface EmailLinkProps {
  email: string
  className?: string
  children?: React.ReactNode
}

export function EmailLink({ email, className, children }: EmailLinkProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render the mailto link on the client side
  // This prevents hydration mismatches with Cloudflare's email protection
  if (!isClient) {
    return <span className={className}>{children || email}</span>
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {children || email}
    </a>
  )
}
