"use client"

import { User, Settings, Crown, Bell, Globe, LogOut, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState<{ first_name: string; last_name?: string; username?: string; id?: number } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser((window as any).Telegram.WebApp.initDataUnsafe.user)
    }
  }, [])

  const fullName = user ? `${user.first_name} ${user.last_name || ''}`.trim() : "Fermer Uzb"
  const username = user?.username ? `@${user.username}` : "Telegram Foydalanuvchi"
  const initial = fullName.charAt(0).toUpperCase()

  return (
    <div className="p-4 space-y-6 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <h1 className="text-2xl font-bold">Profil</h1>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-5 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md z-10">
          {initial}
        </div>
        <div className="z-10">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{fullName}</h2>
          <p className="text-sm text-slate-500">{username}</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400 px-2 py-1 rounded-lg inline-flex shadow-sm">
            <Crown className="w-3.5 h-3.5" /> Premium
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-500" />
            </div>
            <span className="font-medium text-sm">Til</span>
          </div>
          <span className="text-sm text-slate-500 font-medium">O'zbek</span>
        </div>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
              <Bell className="w-4 h-4 text-orange-500" />
            </div>
            <span className="font-medium text-sm">Bildirishnomalar</span>
          </div>
          <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Settings className="w-4 h-4 text-slate-500" />
            </div>
            <span className="font-medium text-sm">Umumiy sozlamalar</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
        <Link href="/admin" className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-purple-500" />
          </div>
          <span className="font-bold text-sm text-purple-600 dark:text-purple-400">Admin Panel (Test)</span>
        </Link>
      </div>

      <button className="w-full py-4 bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 font-bold rounded-[1.5rem] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors shadow-sm flex items-center justify-center gap-2 mt-8">
        <LogOut className="w-5 h-5" /> Chiqish
      </button>
    </div>
  )
}
