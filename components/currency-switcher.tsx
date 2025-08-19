"use client"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { useCurrency } from "@/contexts/currency-context"
import { useTheme } from "next-themes"

export function CurrencySwitcher() {
  const { currency, toggleCurrency } = useCurrency()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleCurrency}
      className={cn(
        "flex items-center gap-1 h-9 px-3 rounded-full",
        isDarkMode ? "border-gray-800 bg-gray-900 hover:bg-gray-800" : "border-primary/20 hover:bg-primary/5",
      )}
    >
      <span className="text-primary">{currency === "INR" ? "₹" : "$"}</span>
      <span className="text-xs font-medium">{currency}</span>
    </Button>
  )
}
