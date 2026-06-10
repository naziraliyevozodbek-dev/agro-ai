"use client"

import { useState } from "react"
import { Calculator, Sprout, Droplets, Wheat, Beaker } from "lucide-react"

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState("fertilizer")
  const [area, setArea] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const tabs = [
    { id: "fertilizer", name: "O'g'it", icon: Beaker },
    { id: "seed", name: "Urug'", icon: Sprout },
    { id: "irrigation", name: "Sug'orish", icon: Droplets },
    { id: "feed", name: "Ozuqa", icon: Wheat },
  ]

  const calculate = () => {
    if (!area) return
    const num = parseFloat(area)
    if (activeTab === "fertilizer") {
      setResult(`${num} gektar uchun taxminan ${num * 120} kg azotli o'g'it kerak bo'ladi.`)
    } else if (activeTab === "seed") {
      setResult(`${num} gektar maydonga o'rtacha ${num * 25} kg bug'doy urug'i ekiladi.`)
    } else if (activeTab === "irrigation") {
      setResult(`${num} gektar yer uchun ${num * 500} kub metr suv sarflanadi (tomchilatib sug'orishda).`)
    } else {
      setResult(`${num} bosh qoramol uchun kunlik ${num * 15} kg ozuqa (silos) tavsiya etiladi.`)
    }
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calculator className="w-6 h-6 text-primary" /> Agro Kalkulyator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          O'zingizga kerakli hisob-kitoblarni tez va oson bajaring.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setResult(null); setArea("") }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          )
        })}
      </div>

      {/* Form */}
      <div className="glass-card p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            {activeTab === "feed" ? "Hayvonlar soni (bosh)" : "Maydon hajmi (gektar)"}
          </label>
          <input 
            type="number" 
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Masalan: 10"
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        
        <button 
          onClick={calculate}
          className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          Hisoblash
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="glass-card p-5 bg-primary/5 border-primary/20 dark:bg-primary/10 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="font-semibold text-primary mb-2">Natija:</h3>
          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  )
}
