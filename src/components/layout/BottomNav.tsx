"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, ScanLine, History, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Asosiy", href: "/", icon: Home },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
    { name: "Kasallik", href: "/detect", icon: ScanLine },
    { name: "Tarix", href: "/history", icon: History },
    { name: "Profil", href: "/profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 hover-lift",
                isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-colors duration-300",
                  isActive ? "bg-primary/10" : "transparent"
                )}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
