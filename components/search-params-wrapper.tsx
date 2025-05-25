"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParamsContentProps {
  onSignInOpen: (open: boolean) => void
}

function SearchParamsContent({ onSignInOpen }: SearchParamsContentProps) {
  const searchParams = useSearchParams()

  // Check if signin=true is in the URL
  if (searchParams.get("signin") === "true") {
    onSignInOpen(true)
  }

  return null
}

interface SearchParamsWrapperProps {
  onSignInOpen: (open: boolean) => void
}

export function SearchParamsWrapper({ onSignInOpen }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={null}>
      <SearchParamsContent onSignInOpen={onSignInOpen} />
    </Suspense>
  )
}
