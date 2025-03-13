import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  )
} 