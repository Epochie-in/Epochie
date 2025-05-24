"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(true)

  const token = params.token as string

  useEffect(() => {
    if (!token) {
      setIsValidToken(false)
      setMessage({ type: "error", text: "Invalid reset token" })
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password")
      }

      setIsSuccess(true)
      setMessage({
        type: "success",
        text: "Your password has been reset successfully. You can now sign in with your new password.",
      })

      // Redirect to sign in page after 3 seconds
      setTimeout(() => {
        router.push("/?signin=true")
      }, 3000)
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white mb-6">
            <AlertDescription>Invalid or expired password reset token.</AlertDescription>
          </Alert>
          <Button
            onClick={() => router.push("/")}
            className="w-full rounded-full bg-white text-black hover:bg-gray-200"
          >
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Reset Your Password</h1>

        {message.text && (
          <Alert
            variant={message.type === "error" ? "destructive" : "default"}
            className={
              message.type === "error"
                ? "bg-red-900/50 border-red-800 text-white mb-6"
                : "bg-green-900/50 border-green-800 text-white mb-6"
            }
          >
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-white text-black hover:bg-gray-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Your password has been reset successfully. You will be redirected to the sign in page shortly.
            </p>
            <Button
              onClick={() => router.push("/?signin=true")}
              className="rounded-full bg-white text-black hover:bg-gray-200"
            >
              Sign In Now
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
