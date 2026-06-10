"use client"

import { useEffect, useState } from "react"
import { init, miniApp, themeParams, viewport } from "@telegram-apps/sdk"

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      // Initialize the Telegram Mini App SDK
      init()
      
      // Mount the required components
      if (miniApp.mount.isAvailable()) {
        miniApp.mount()
      }
      if (themeParams.mount.isAvailable()) {
        themeParams.mount()
        themeParams.bindCssVars()
        
        // Sync theme with Tailwind's dark mode
        const isDark = themeParams.isDark()
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
      if (viewport.mount.isAvailable()) {
        viewport.mount()
        viewport.expand() // Expand the app to full height
      }
      
      setIsReady(true)
    } catch (e) {
      console.warn("Telegram Mini App SDK failed to initialize. We are probably not in Telegram.", e)
      // We still want to show the app even if not in Telegram (for testing)
      setIsReady(true)
    }
  }, [])

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
