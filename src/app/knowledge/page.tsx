"use client"

import { useState } from "react"
import { Search, Book, Sprout, Wheat, Bug, Droplets, Sun, Beaker } from "lucide-react"

export default function KnowledgePage() {
  const [search, setSearch] = useState("")

  const categories = [
    { name: "O'simliklar", icon: Sprout, count: 45, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    { name: "Chorvachilik", icon: Wheat, count: 32, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
    { name: "Zararkunandalar", icon: Bug, count: 28, color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
    { name: "Sug'orish", icon: Droplets, count: 15, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { name: "Issiqxona", icon: Sun, count: 19, color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { name: "O'g'itlar", icon: Beaker, count: 24, color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400" },
  ]

  const articles = [
    { title: "Kuzgi bug'doyni parvarishlash sirlari", category: "O'simliklar" },
    { kolits: "Buzoqchalarni to'g'ri oziqlantirish", category: "Chorvachilik" },
    { title: "Issiqxonada haroratni mo'tadil ushlash", category: "Issiqxona" },
    { title: "Kolorado qo'ng'iziga qarshi kurashish usullari", category: "Zararkunandalar" }
  ].filter(a => (a.title || a.kolits)?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Book className="w-6 h-6 text-primary" /> Bilimlar Bazasi
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Fermerlar uchun foydali maqolalar va qo'llanmalar.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Qidirish..." 
          className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm border-transparent focus:border-primary/50 focus:ring-0 outline-none transition-colors"
        />
      </div>

      {/* Categories */}
      {!search && (
        <div>
          <h2 className="font-semibold mb-3">Kategoriyalar</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <div key={i} className="glass-card p-4 flex flex-col items-center gap-2 hover-lift cursor-pointer text-center">
                  <div className={`p-3 rounded-full ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{cat.name}</h3>
                    <p className="text-[10px] text-slate-500">{cat.count} maqola</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Articles */}
      <div>
        <h2 className="font-semibold mb-3">{search ? "Qidiruv natijalari" : "Ommabop maqolalar"}</h2>
        <div className="space-y-3">
          {articles.length > 0 ? articles.map((article, i) => (
            <div key={i} className="glass-card p-4 hover-lift cursor-pointer flex justify-between items-center">
              <div>
                <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{article.title || article.kolits}</p>
                <p className="text-xs text-primary mt-1">{article.category}</p>
              </div>
            </div>
          )) : (
            <p className="text-sm text-slate-500 text-center py-4">Hech narsa topilmadi</p>
          )}
        </div>
      </div>
    </div>
  )
}
