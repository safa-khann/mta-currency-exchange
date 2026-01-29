'use client'

import AuthChecker from "@/components/auth/AuthChecker"
import Header from "@/components/layout/Header"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthChecker>
        <main>
          {children}
        </main>
      </AuthChecker>
    </SessionProvider>
  )
}
