"use client"

import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"
import Link from "next/link"

export function CreditDisplay() {
  const { credits, user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
        <Coins className="h-4 w-4 text-yellow-500 mr-1" />
        <span className="text-sm font-medium">{credits} Credits</span>
      </div>
      {credits <= 3 && (
        <Link href="/pricing">
          <Button variant="outline" size="sm" className="h-8 rounded-full border-gray-700 text-white hover:bg-gray-800">
            Buy Credits
          </Button>
        </Link>
      )}
    </div>
  )
}
