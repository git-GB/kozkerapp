"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import { useAuth } from "@/contexts/auth-context"
import { User, LogOut, BarChart3 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AuthTriggerButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AuthTriggerButton({ variant = "default", size = "default", className = "" }: AuthTriggerButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<"signin" | "signup">("signin")
  const { user, signOut, loading } = useAuth()

  const handleSignInClick = () => {
    setModalMode("signin")
    setShowModal(true)
  }

  const handleSignUpClick = () => {
    setModalMode("signup")
    setShowModal(true)
  }

  // If user is authenticated, show user menu
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt={user.email || ""} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // If loading, show loading state
  if (loading) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        Loading...
      </Button>
    )
  }

  // Show sign in/up buttons for unauthenticated users
  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size={size} onClick={handleSignInClick} className={className}>
          Sign In
        </Button>
        <Button variant={variant} size={size} onClick={handleSignUpClick} className={className}>
          Sign Up
        </Button>
      </div>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} defaultMode={modalMode} trigger="manual" />
    </>
  )
}
