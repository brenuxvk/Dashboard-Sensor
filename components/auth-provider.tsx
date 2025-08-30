"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  user: { email: string; companyName: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; companyName: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verificar se há sessão salva
    const savedAuth = localStorage.getItem("antipollution_auth")
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      setIsAuthenticated(true)
      setUser(authData.user)
    }
  }, [])

  useEffect(() => {
    // Redirecionar usuários não autenticados para login
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login")
    }
  }, [isAuthenticated, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular autenticação
    if (email && password) {
      const userData = {
        email,
        companyName: "EcoTech Industries",
      }

      setIsAuthenticated(true)
      setUser(userData)

      // Salvar sessão
      localStorage.setItem(
        "antipollution_auth",
        JSON.stringify({
          user: userData,
          timestamp: Date.now(),
        }),
      )

      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("antipollution_auth")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
