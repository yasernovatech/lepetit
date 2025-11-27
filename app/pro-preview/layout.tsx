import React from 'react'
import '../../pro/styles/globals.css'
import '../../pro/app/globals.css'
import { ThemeProvider } from '../../pro/components/theme-provider'

export const metadata = {
  title: 'Pro Preview',
}

export default function ProPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <div className="min-h-screen bg-background text-foreground">{children}</div>
    </ThemeProvider>
  )
}
