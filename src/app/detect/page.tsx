"use client"

import { useState } from "react"
import { Upload, Camera, Leaf, Activity, AlertTriangle, ShieldCheck } from "lucide-react"

export default function DetectPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleUpload = () => {
    setIsAnalyzing(true)
    // Mock analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setResult({
        diagnosis: "Pomidor fitoftorozi (Kechki chirish)",
        confidence: 94,
        causes: ["Haddan tashqari namlik", "Haroratning keskin o'zgarishi", "Zamburug' sporalari"],
        treatment: ["Kasallangan barglarni darhol olib tashlash", "Fungitsidlar (masalan, Ridomil Gold yoki Bravo) bilan ishlov berish"],
        prevention: ["Issiqxonani shamollatish", "Tomchilatib sug'orish tizimiga o'tish"]
      })
    }, 2000)
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Kasallikni Aniqlash</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          O'simlik yoki hayvon rasmini yuklang, sun'iy intellekt tashxis qo'yadi.
        </p>
      </div>

      {/* Upload Area */}
      {!result && !isAnalyzing && (
        <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[300px] border-dashed border-2 border-slate-300 dark:border-slate-600">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Rasmni yuklang</h3>
          <p className="text-sm text-slate-500 text-center mb-6 max-w-[250px]">
            Galereyadan tanlang yoki kameradan rasmga oling
          </p>
          <div className="flex justify-center gap-3 w-full">
            <button className="flex-1 max-w-[140px] flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" onClick={handleUpload}>
              <Upload className="w-4 h-4" /> Fayl
            </button>
            <button className="flex-1 max-w-[140px] flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md" onClick={handleUpload}>
              <Camera className="w-4 h-4" /> Kamera
            </button>
          </div>
        </div>
      )}

      {/* Analyzing State */}
      {isAnalyzing && (
        <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          <h3 className="font-semibold text-lg animate-pulse">Tahlil qilinmoqda...</h3>
          <p className="text-sm text-slate-500 mt-2">Iltimos kuting, sun'iy intellekt rasmni o'rganmoqda</p>
        </div>
      )}

      {/* Results */}
      {result && !isAnalyzing && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Diagnosis */}
          <div className="glass-card bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/20 p-5 border-green-200 dark:border-green-800/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">Tashxis Natijasi</span>
              <div className="flex items-center gap-1 bg-white/60 dark:bg-slate-800/60 px-2 py-1 rounded-md">
                <Activity className="w-3 h-3 text-green-600" />
                <span className="text-xs font-bold text-green-600 dark:text-green-400">{result.confidence}% Aniq</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{result.diagnosis}</h2>
          </div>

          {/* Causes */}
          <div className="glass-card p-4">
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-orange-600 dark:text-orange-400">
              <AlertTriangle className="w-5 h-5" /> Kelib chiqish sabablari
            </h3>
            <ul className="space-y-2">
              {result.causes.map((cause: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-400 mt-0.5">•</span> {cause}
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment */}
          <div className="glass-card p-4">
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" /> Davolash tavsiyalari
            </h3>
            <ul className="space-y-2">
              {result.treatment.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex flex-shrink-0 items-center justify-center text-[10px] font-bold mt-0.5">{i+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            className="w-full py-3 bg-slate-100 dark:bg-slate-800 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mt-4"
            onClick={() => setResult(null)}
          >
            Yangi rasm yuklash
          </button>
        </div>
      )}
    </div>
  )
}
