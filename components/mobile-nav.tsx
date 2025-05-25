"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/context/AuthContext"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleSignInClick = () => {
    setIsOpen(false)
    // Use window.location to navigate with search params
    window.location.href = "/?signin=true"
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="text-gray-300">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-300">
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col items-center gap-8 p-8">
            <Link
              href="/grok"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              GROK
            </Link>
            <Link
              href="/grok-chat"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              CHAT
            </Link>
            <Link
              href="/api"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              API
            </Link>
            <Link
              href="/company"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              COMPANY
            </Link>
            <Link
              href="/colossus"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              COLOSSUS
            </Link>
            <Link
              href="/careers"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              CAREERS
            </Link>
            <Link
              href="/news"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              NEWS
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              PRICING
            </Link>
            {user ? (
              <Link href="/profile" className="text-gray-300 hover:text-white text-xl font-medium">
                PROFILE
              </Link>
            ) : (
              <Button
                variant="outline"
                className="rounded-full border-gray-700 text-white hover:bg-gray-800 mt-4"
                onClick={handleSignInClick}
              >
                SIGN IN
              </Button>
            )}
            {user && (
              <Button
                variant="outline"
                className="rounded-full border-gray-700 text-white hover:bg-gray-800 mt-4"
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
              >
                SIGN OUT
              </Button>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}
