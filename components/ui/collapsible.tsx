"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleProps {
  children: React.ReactNode
  className?: string
}

interface CollapsibleContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextType | undefined>(undefined)

const Collapsible = React.forwardRef<
  HTMLDivElement,
  CollapsibleProps & { open?: boolean; onOpenChange?: (open: boolean) => void }
>(({ className, children, open: controlledOpen, onOpenChange, ...props }, ref) => {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
})
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)
    if (!context) {
      throw new Error("CollapsibleTrigger must be used within a Collapsible")
    }

    const { open, setOpen } = context

    return (
      <button ref={ref} className={cn("", className)} onClick={() => setOpen(!open)} {...props}>
        {children}
      </button>
    )
  },
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)
    if (!context) {
      throw new Error("CollapsibleContent must be used within a Collapsible")
    }

    const { open } = context

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          open ? "animate-in slide-in-from-top-1" : "animate-out slide-out-to-top-1 hidden",
          className,
        )}
        {...props}
      >
        {open && children}
      </div>
    )
  },
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
