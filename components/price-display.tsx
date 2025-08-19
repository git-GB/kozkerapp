"use client"

import { useCurrency } from "@/contexts/currency-context"

interface PriceDisplayProps {
  amount: number // Amount in INR
  period?: string // Optional period text (e.g., "/month", "/year")
  className?: string
}

export function PriceDisplay({ amount, period, className = "" }: PriceDisplayProps) {
  const { formatPrice } = useCurrency()

  // Ensure amount is a valid number
  const validAmount = typeof amount === "number" && !isNaN(amount) ? amount : 0

  return (
    <div className={className}>
      <span className="text-3xl font-bold">{formatPrice(validAmount)}</span>
      {period && <span className="text-gray-500">{period}</span>}
    </div>
  )
}
