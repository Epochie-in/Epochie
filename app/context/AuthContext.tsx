"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface UserPreferences {
  theme: "dark" | "light"
  notifications: boolean
}

interface User {
  _id: string
  name: string
  email: string
  role: string
  credits: number
  preferences: UserPreferences
  surveyCompleted: boolean
  token: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  credits: number
  theme: "dark" | "light"
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  googleLogin: (token: string) => Promise<void>
  logout: () => void
  clearError: () => void
  updateCredits: (newCredits: number) => void
  useCredit: () => Promise<boolean>
  updateTheme: (theme: "dark" | "light") => Promise<void>
  submitUserSurvey: (surveyData: any) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [credits, setCredits] = useState<number>(0)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setCredits(parsedUser.credits || 0)
      setTheme(parsedUser.preferences?.theme || "dark")

      // Apply theme
      document.documentElement.classList.toggle("dark", parsedUser.preferences?.theme === "dark")
      document.documentElement.classList.toggle("light", parsedUser.preferences?.theme === "light")
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to login")
      }

      localStorage.setItem("user", JSON.stringify(data))
      setUser(data)
      setCredits(data.credits || 0)
      setTheme(data.preferences?.theme || "dark")

      // Apply theme
      document.documentElement.classList.toggle("dark", data.preferences?.theme === "dark")
      document.documentElement.classList.toggle("light", data.preferences?.theme === "light")

      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to register")
      }

      localStorage.setItem("user", JSON.stringify(data))
      setUser(data)
      setCredits(data.credits || 0)
      setTheme(data.preferences?.theme || "dark")

      // Show survey for new users
      if (!data.surveyCompleted) {
        router.push("/survey")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async (token: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to authenticate with Google")
      }

      localStorage.setItem("user", JSON.stringify(data))
      setUser(data)
      setCredits(data.credits || 0)
      setTheme(data.preferences?.theme || "dark")

      // Apply theme
      document.documentElement.classList.toggle("dark", data.preferences?.theme === "dark")
      document.documentElement.classList.toggle("light", data.preferences?.theme === "light")

      // Show survey for new users
      if (!data.surveyCompleted) {
        router.push("/survey")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setCredits(0)
    router.push("/")
  }

  const clearError = () => {
    setError(null)
  }

  const updateCredits = (newCredits: number) => {
    setCredits(newCredits)
    if (user) {
      const updatedUser = { ...user, credits: newCredits }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const useCredit = async (): Promise<boolean> => {
    if (!user || credits <= 0) {
      setError("Insufficient credits. Please purchase more credits to continue.")
      return false
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/credits/use`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to use credit")
      }

      updateCredits(data.credits)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  const updateTheme = async (newTheme: "dark" | "light"): Promise<void> => {
    setTheme(newTheme)

    // Apply theme to document
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    document.documentElement.classList.toggle("light", newTheme === "light")

    if (user) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/preferences`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ theme: newTheme }),
          },
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to update theme preference")
        }

        const updatedUser = {
          ...user,
          preferences: {
            ...user.preferences,
            theme: newTheme,
          },
        }

        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      } catch (err) {
        console.error("Failed to update theme preference:", err)
      }
    }
  }

  const submitUserSurvey = async (surveyData: any): Promise<boolean> => {
    if (!user) {
      setError("You must be logged in to submit a survey")
      return false
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(surveyData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit survey")
      }

      // Update user with surveyCompleted = true
      const updatedUser = { ...user, surveyCompleted: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        credits,
        theme,
        login,
        register,
        googleLogin,
        logout,
        clearError,
        updateCredits,
        useCredit,
        updateTheme,
        submitUserSurvey,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
