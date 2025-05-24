"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SignUpForm } from "./sign-up-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { useAuth } from "@/app/context/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Script from "next/script"

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

interface SignInFormProps {
  isOpen: boolean
  onClose: () => void
  onSignIn: (email: string) => void
}

export function SignInForm({ isOpen, onClose, onSignIn }: SignInFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSignUp, setShowSignUp] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { login, error, loading, clearError, googleLogin } = useAuth()
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const [googleInitialized, setGoogleInitialized] = useState(false)

  useEffect(() => {
    if (googleLoaded && isOpen && !showSignUp && !showForgotPassword && window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: "1033880884479-73lnpufpah4bbq3kpisa3f62vjeebk05.apps.googleusercontent.com",
          callback: handleGoogleCallback,
        })
        setGoogleInitialized(true)
      } catch (err) {
        console.error("Google initialization error:", err)
      }
    }
  }, [googleLoaded, isOpen, showSignUp, showForgotPassword])

  useEffect(() => {
    if (googleInitialized && isOpen) {
      const renderButton = () => {
        const googleButtonDiv = document.getElementById("googleButton")
        if (googleButtonDiv && window.google) {
          try {
            window.google.accounts.id.renderButton(googleButtonDiv, {
              theme: "outline",
              size: "large",
              width: "100%",
            })
          } catch (err) {
            console.error("Google button render error:", err)
          }
        } else {
          setTimeout(renderButton, 100)
        }
      }
      renderButton()
    }
  }, [googleInitialized, isOpen])

  const handleGoogleCallback = async (response: any) => {
    try {
      await googleLogin(response.credential)
      onSignIn(email)
      onClose()
    } catch (err) {
      console.error("Google login error:", err)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    if (!error) {
      onSignIn(email)
      onClose()
    }
  }

  const handleSignUpClick = () => {
    clearError()
    setShowSignUp(true)
  }

  const handleSignUpClose = () => {
    setShowSignUp(false)
  }

  const handleForgotPasswordClick = () => {
    clearError()
    setShowForgotPassword(true)
  }

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false)
  }

  const handleBackToSignIn = () => {
    setShowForgotPassword(false)
  }

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        onLoad={() => setGoogleLoaded(true)}
        onError={() => console.error("Failed to load Google script")}
        strategy="lazyOnload"
      />

      <Dialog
        open={isOpen && !showSignUp && !showForgotPassword}
        onOpenChange={(open) => {
          if (!open) {
            clearError()
            onClose()
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Sign In</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your credentials to access your account
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignIn} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
              />
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-white text-black hover:bg-gray-200"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-900 px-2 text-gray-400">or continue with</span>
              </div>
            </div>
            <div id="googleButton" className="flex justify-center min-h-[42px]"></div>
            <div className="text-center mt-4">
              <button type="button" onClick={handleSignUpClick} className="text-sm text-gray-400 hover:text-white">
                Don&apos;t have an account? Create New
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {showSignUp && (
        <SignUpForm
          isOpen={showSignUp}
          onClose={handleSignUpClose}
          onSignUp={(email) => {
            onSignIn(email)
            setShowSignUp(false)
          }}
        />
      )}

      {showForgotPassword && (
        <ForgotPasswordForm
          isOpen={showForgotPassword}
          onClose={handleForgotPasswordClose}
          onBackToSignIn={handleBackToSignIn}
        />
      )}
    </>
  )
}