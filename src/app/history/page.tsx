"use client"

import { Clock, Download, ChevronRight, MessageSquare, ScanSearch } from "lucide-react"

export default function HistoryPage() {
  const history = [
    { id: 1, title: "Bug'doy kasalligi tahlili", date: "Bugun, 14:30", type: "Tashxis", icon: ScanSearch, color: "text-purple-500" },
    { id: 2, title: "Gektariga o'g'it hisoblash", date: "Kecha, 09:15", type: "Kalkulyator", icon: Clock, color: "text-teal-500" },
    { id: 3, title: "Sigir ozuqasi haqida", date: "08 Iyun, 16:45", type: "Chat", icon: MessageSquare, color: "text-blue-500" },
    { id: 4, title: "Pomidor barglari sarg'ayishi", date: "05 Iyun, 11:20", type: "Chat", icon: MessageSquare, color: "text-blue-500" },
    { id: 5, title: "Zararkunandalarga qarshi kurash", date: "01 Iyun, 08:30", type: "Tashxis", icon: ScanSearch, color: "text-purple-500" },
  ]

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">Mening Tarixim</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Barcha saqlangan ma'lumotlaringiz</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-primary text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <Download className="w-4 h-4" /> PDF
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="glass-card p-4 flex items-center gap-4 hover-lift cursor-pointer">
              <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">{item.type}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
