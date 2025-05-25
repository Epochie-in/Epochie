"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ForgotPasswordFormProps {
  isOpen: boolean
  onClose: () => void
  onBackToSignIn: () => void
}

export function ForgotPasswordForm({ isOpen, onClose, onBackToSignIn }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://epochie.duckdns.org:5000/api"}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send password reset email")
      }

      setIsSuccess(true)
      setMessage({
        type: "success",
        text: "Password reset instructions have been sent to your email address.",
      })
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Reset Password</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </DialogDescription>
        </DialogHeader>

        {message.text && (
          <Alert
            variant={message.type === "error" ? "destructive" : "default"}
            className={
              message.type === "error"
                ? "bg-red-900/50 border-red-800 text-white"
                : "bg-green-900/50 border-green-800 text-white"
            }
          >
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
            <Button
              type="submit"
              className="w-full rounded-full bg-white text-black hover:bg-gray-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Instructions"}
            </Button>
            <div className="text-center mt-4">
              <button type="button" onClick={onBackToSignIn} className="text-sm text-gray-400 hover:text-white">
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 pt-4">
            <p className="text-center text-gray-300">
              Check your email for instructions on how to reset your password.
            </p>
            <Button onClick={onBackToSignIn} className="w-full rounded-full bg-white text-black hover:bg-gray-200">
              Back to Sign In
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
