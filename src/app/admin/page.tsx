"use client"

import { Users, MessageSquare, AlertCircle, TrendingUp, Settings, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const stats = [
    { name: "Foydalanuvchilar", value: "1,240", icon: Users, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Chatlar", value: "8,432", icon: MessageSquare, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { name: "Kasallik aniqlangan", value: "450", icon: AlertCircle, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { name: "Premium Obunalar", value: "128", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
  ]

  return (
    <div className="p-4 space-y-6 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-slate-500">Agro AI Boshqaruvi</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs text-slate-500 font-medium">{stat.name}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">So'nggi Foydalanuvchilar</h2>
          <button className="text-sm text-primary font-medium">Barchasi</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((user) => (
            <div key={user} className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Fermer {user}</p>
                  <p className="text-xs text-slate-500">Bugun qo'shildi</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-[10px] rounded-md font-bold uppercase">
                Aktiv
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 font-medium">
        <Settings className="w-5 h-5" /> Tizim Sozlamalari
      </button>
    </div>
  )
}
