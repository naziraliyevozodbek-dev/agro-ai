"use client"

import Link from "next/link"
import { Sprout, Syringe, ScanSearch, Mic, Calculator, BookOpen, ChevronRight, Activity } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; last_name?: string } | null>(null)

  useEffect(() => {
    // Get real telegram user
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser((window as any).Telegram.WebApp.initDataUnsafe.user)
    }
  }, [])

  const quickActions = [
    { name: "AI Agronom", icon: Sprout, href: "/chat?type=agronom", color: "from-green-400 to-emerald-600" },
    { name: "Kasallik Aniqlash", icon: ScanSearch, href: "/detect", color: "from-purple-400 to-indigo-600" },
    { name: "AI Veterinar", icon: Syringe, href: "/chat?type=vet", color: "from-blue-400 to-cyan-600" },
    { name: "Agro Kalkulyator", icon: Calculator, href: "/calculators", color: "from-teal-400 to-emerald-500" },
    { name: "Ovozli Savol", icon: Mic, href: "/chat?voice=true", color: "from-orange-400 to-rose-500" },
    { name: "Bilimlar Bazasi", icon: BookOpen, href: "/knowledge", color: "from-amber-400 to-orange-500" },
  ]

  const firstName = user?.first_name || "Fermer"

  return (
    <main className="pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Header with Gradient Background */}
      <div className="bg-gradient-to-br from-primary via-green-600 to-emerald-800 rounded-b-[2.5rem] pt-8 pb-16 px-6 text-white shadow-lg relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-48 h-48 rounded-full bg-black/10 blur-2xl"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Xush kelibsiz 👋</p>
            <h1 className="text-2xl font-bold tracking-tight">{firstName}</h1>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner">
            <span className="text-xl font-bold text-white">{firstName.charAt(0)}</span>
          </div>
        </div>

        {/* Floating Quick Stats Card */}
        <div className="absolute -bottom-8 left-6 right-6">
          <div className="glass-panel bg-white/90 dark:bg-slate-800/90 p-4 rounded-2xl shadow-xl flex justify-between items-center border border-white/50 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 dark:bg-green-900/40 rounded-xl">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Haftalik faollik</p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">Zo'r holatda</p>
              </div>
            </div>
            <Link href="/history" className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Tarix
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 mt-16 space-y-8">
        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Boshqaruv Paneli</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link 
                  key={action.name} 
                  href={action.href}
                  className="bg-white dark:bg-slate-900 p-5 rounded-[1.5rem] flex flex-col justify-between h-32 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all hover:-translate-y-1 active:scale-95 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    {action.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="pb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">So'nggi Yangiliklar</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-4 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full"></div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Qishloq xo'jaligida AI inqilobi</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Yangi sun'iy intellekt xususiyatlari bilan hosildorlikni 30% ga oshirish sirlari...</p>
            <Link href="/knowledge" className="text-sm font-bold text-primary flex items-center">
              O'qishni davom etish <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
