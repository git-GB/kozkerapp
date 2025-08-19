"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useDarkMode() {
  const { resolvedTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setIsDarkMode(resolvedTheme === "dark")
    }
  }, [resolvedTheme, mounted])

  return {
    isDarkMode,
    mounted,
  }
}
