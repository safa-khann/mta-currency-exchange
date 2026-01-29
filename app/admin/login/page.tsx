'use client'

import Login from "@/components/auth/Login"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      })

      if (result?.ok) {
        router.push("/admin")
      } else {
        // Handle specific NextAuth errors
        if (result?.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.")
        } else if (result?.error?.includes("callback")) {
          setError("Authentication failed. Please check your credentials.")
        } else {
          setError(result?.error || "Login failed. Please try again.")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Login 
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  )
}