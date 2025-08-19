"use client"

import { useEffect } from "react"
import { registerServiceWorker } from "./service-worker-registration"

export default function ClientLayout({ children }) {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return <>{children}</>
}
