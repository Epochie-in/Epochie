"use client"

import type React from "react"
import { useState } from "react"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { SignInForm } from "@/components/auth/sign-in-form"
import { UserDropdown } from "@/components/user-dropdown"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { CreditDisplay } from "@/components/credit-display"
import { SearchParamsWrapper } from "@/components/search-params-wrapper"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleSignIn = (email: string) => {
    // The actual sign-in is handled by the AuthContext
    // This is just for UI state management
    setIsSignInOpen(false)
  }

  return (
    <html lang="en" className="dark">
      <body className={jetbrainsMono.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SearchParamsWrapper onSignInOpen={setIsSignInOpen} />

          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
              <div className="flex items-center">
                <Link href="/" className="mr-10">
                  <Image
                    src="/placeholder.svg?height=30&width=30"
                    alt="x.ai logo"
                    width={30}
                    height={30}
                    className="invert"
                  />
                </Link>
                <div className="hidden md:flex space-x-8">
                  <Link href="/grok" className="text-gray-300 hover:text-white text-sm font-medium">
                    GROK
                  </Link>
                  <Link href="/grok-chat" className="text-gray-300 hover:text-white text-sm font-medium">
                    CHAT
                  </Link>
                  <Link href="/api" className="text-gray-300 hover:text-white text-sm font-medium">
                    API
                  </Link>
                  <Link href="/company" className="text-gray-300 hover:text-white text-sm font-medium">
                    COMPANY
                  </Link>
                  <Link href="/colossus" className="text-gray-300 hover:text-white text-sm font-medium">
                    COLOSSUS
                  </Link>
                  <Link href="/careers" className="text-gray-300 hover:text-white text-sm font-medium">
                    CAREERS
                  </Link>
                  <Link href="/news" className="text-gray-300 hover:text-white text-sm font-medium">
                    NEWS
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MobileNav />
                <Link href="/pricing" className="text-gray-300 hover:text-white text-sm font-medium hidden md:block">
                  PRICING
                </Link>
                {user ? (
                  <>
                    <CreditDisplay />
                    <UserDropdown email={user.email} onSignOut={logout} />
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-700 text-white hover:bg-gray-800 text-sm hidden md:flex"
                    onClick={() => setIsSignInOpen(true)}
                  >
                    SIGN IN
                  </Button>
                )}
              </div>
            </div>
          </nav>

          <main className="pt-16">{children}</main>

          <Footer />

          <SignInForm isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignIn={handleSignIn} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </AuthProvider>
  )
}
