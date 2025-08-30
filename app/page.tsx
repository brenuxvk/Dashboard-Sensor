"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-sans font-bold text-foreground mb-2">AntiPollution</h1>
        <p className="text-muted-foreground">Redirecionando...</p>
      </div>
    </div>
  )
}
