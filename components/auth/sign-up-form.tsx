"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

interface SignUpFormProps {
  isOpen: boolean
  onClose: () => void
  onSignUp: (email: string) => void
}

export function SignUpForm({ isOpen, onClose, onSignUp }: SignUpFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { register, error, googleLogin } = useAuth()
  const googleButtonRef = useRef<HTMLDivElement | null>(null)
  const [googleLoaded, setGoogleLoaded] = useState(false)

  useEffect(() => {
    if (googleLoaded && isOpen && window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: "1033880884479-73lnpufpah4bbq3kpisa3f62vjeebk05.apps.googleusercontent.com",
        callback: handleGoogleCallback,
      })

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
        text: "signup_with",
      })
    }
  }, [googleLoaded, isOpen])

  const handleGoogleCallback = async (response: any) => {
    try {
      await googleLogin(response.credential)
      onSignUp(email)
      onClose()
    } catch (err) {
      console.error("Google login error:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    await register(name, email, password)
    onSignUp(email)
    onClose()
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => setGoogleLoaded(true)}
        strategy="lazyOnload"
      />

      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription className="text-gray-400">Create a new account</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>

            <Button type="submit" className="w-full">Sign Up</Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-900 px-2 text-gray-400">or continue with</span>
              </div>
            </div>

            <div ref={googleButtonRef} className="flex justify-center min-h-[42px]" />
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
