"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-gray-400 mb-8">An unexpected error occurred. Please try again.</p>
          <Button onClick={reset} className="rounded-full bg-white text-black hover:bg-gray-200">
            Try again
          </Button>
        </div>
      </body>
    </html>
  )
}
