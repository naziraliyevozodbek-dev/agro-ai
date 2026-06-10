import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TelegramProvider } from "@/components/providers/TelegramProvider"
import { BottomNav } from "@/components/layout/BottomNav"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Agro AI",
  description: "Telegram for farmers and agricultural businesses in Uzbekistan",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen pb-20`}>
        <TelegramProvider>
          {children}
          <BottomNav />
        </TelegramProvider>
      </body>
    </html>
  )
}
