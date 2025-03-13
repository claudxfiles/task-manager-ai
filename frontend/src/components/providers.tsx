"use client"

import { ThemeProvider } from "./theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./auth/auth-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
} 