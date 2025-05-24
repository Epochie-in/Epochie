"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from "lucide-react"

export default function ProfilePage() {
  const { user, loading, updateTheme, theme } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }

    if (user) {
      setName(user.name)
      setEmail(user.email)
      setNotifications(user.preferences?.notifications ?? true)
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    try {
      // Validate passwords match if provided
      if (password && password !== confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" })
        return
      }

      // Make API call to update profile
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          name,
          email,
          ...(password ? { password } : {}),
          preferences: {
            notifications,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile")
      }

      // Update local storage with new user data
      localStorage.setItem("user", JSON.stringify(data))

      setMessage({ type: "success", text: "Profile updated successfully" })
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An error occurred while updating your profile",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleThemeChange = async () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    await updateTheme(newTheme)
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-white text-black hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="appearance">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Theme</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className={`h-5 w-5 ${theme === "dark" ? "text-blue-400" : "text-gray-400"}`} />
                    <Switch checked={theme === "light"} onCheckedChange={handleThemeChange} />
                    <Sun className={`h-5 w-5 ${theme === "light" ? "text-yellow-400" : "text-gray-400"}`} />
                  </div>
                  <span className="text-gray-400">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Email Notifications</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300">Receive email notifications</p>
                    <p className="text-sm text-gray-500">Get notified about credits, payments, and updates</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    className="rounded-full bg-white text-black hover:bg-gray-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
