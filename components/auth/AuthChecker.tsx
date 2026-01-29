// @/components/auth/AuthChecker.tsx
'use client'

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, ReactNode } from "react"

interface AuthCheckerProps {
  children: ReactNode
  loginPath?: string
  adminPath?: string
  loadingComponent?: ReactNode
}

export default function AuthChecker({ 
  children,
  loginPath = "/admin/login",
  adminPath = "/admin",
  loadingComponent = <div>Loading...</div>
}: AuthCheckerProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return
    
    // Redirect to login if not authenticated and not on login page
    if (!session && pathname !== loginPath) {
      router.push(loginPath)
    }
    
    // Redirect from login page if already authenticated
    if (session && pathname === loginPath) {
      router.push(adminPath)
    }
  }, [session, status, router, pathname, loginPath, adminPath])

  if (status === "loading") {
    return ( <div className="fixed inset-0 flex items-center justify-center bg-yellow-500 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-5 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-lg font-medium text-white">Loading</p>
          <p className="mt-2 text-sm text-white">Checking authentication status</p>
        </div>
      </div>)
  }

  // Allow access to login page without session
  if (!session && pathname !== loginPath) {
    return (
       <div className="fixed inset-0 flex items-center justify-center bg-yellow-500 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-5 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-lg font-medium text-white">Redirecting to Login</p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}