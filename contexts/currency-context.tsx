"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Currency = "USD" | "INR"

interface CurrencyContextType {
  currency: Currency
  toggleCurrency: () => void
  formatPrice: (amount: number) => string
  convertPrice: (amount: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Exchange rate (1 USD to INR)
const USD_TO_INR = 83.5

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("INR")

  // Try to load saved preference from localStorage on client
  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency")
    if (savedCurrency === "USD" || savedCurrency === "INR") {
      setCurrency(savedCurrency)
    }
  }, [])

  // Save preference when it changes
  useEffect(() => {
    localStorage.setItem("preferredCurrency", currency)
  }, [currency])

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "INR" : "USD"))
  }

  const convertPrice = (amount: number): number => {
    // Ensure amount is a valid number
    if (typeof amount !== "number" || isNaN(amount)) {
      return 0
    }

    if (currency === "INR") {
      return amount
    } else {
      // Convert INR to USD
      return Math.round((amount / USD_TO_INR) * 100) / 100
    }
  }

  const formatPrice = (amount: number): string => {
    const convertedAmount = convertPrice(amount)

    if (currency === "INR") {
      return `₹${convertedAmount.toLocaleString("en-IN")}`
    } else {
      return `$${convertedAmount.toLocaleString("en-US")}`
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
