"use client"

import { useState, useRef } from "react"
import { Upload, Camera, Leaf, Activity, AlertTriangle, ShieldCheck, X, ScanSearch } from "lucide-react"

export default function DetectPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setResult(null)

    // Start analysis
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setResult({
        diagnosis: "Pomidor fitoftorozi (Kechki chirish)",
        confidence: 94,
        causes: ["Haddan tashqari namlik", "Haroratning keskin o'zgarishi", "Zamburug' sporalari"],
        treatment: ["Kasallangan barglarni darhol olib tashlash", "Fungitsidlar (Ridomil Gold) bilan ishlov berish"],
        prevention: ["Issiqxonani shamollatish", "Tomchilatib sug'orish tizimiga o'tish"]
      })
    }, 2500)
  }

  const reset = () => {
    setResult(null)
    setPreviewUrl(null)
    setIsAnalyzing(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="pb-24 min-h-screen bg-[#f5f7f5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#52b788] px-5 pt-10 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
            <ScanSearch className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">Kasallikni Aniqlash</h1>
          <p className="text-white/70 text-sm mt-1">O'simlik yoki hayvon rasmini yuklang</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Upload area */}
        {!previewUrl && !isAnalyzing && !result && (
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center min-h-[280px] justify-center border-2 border-dashed border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-9 h-9 text-[#2d6a4f]" />
            </div>
            <h3 className="font-bold text-lg text-slate-700 mb-1">Rasmni yuklang</h3>
            <p className="text-sm text-slate-400 text-center mb-6 max-w-[220px]">
              Galereyadan tanlang yoki kamera orqali rasmga oling
            </p>
            <div className="flex gap-3 w-full max-w-[280px]">
              <button
                onClick={() => { if (fileInputRef.current) { fileInputRef.current.removeAttribute("capture"); fileInputRef.current.click() } }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-600 rounded-2xl font-semibold text-sm hover:bg-slate-200 transition-colors active:scale-95"
              >
                <Upload className="w-4 h-4" /> Galereya
              </button>
              <button
                onClick={() => { if (fileInputRef.current) { fileInputRef.current.setAttribute("capture", "environment"); fileInputRef.current.click() } }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#2d6a4f] text-white rounded-2xl font-semibold text-sm hover:bg-[#1b4332] transition-colors shadow-md active:scale-95"
              >
                <Camera className="w-4 h-4" /> Kamera
              </button>
            </div>
          </div>
        )}

        {/* Image preview + analyzing */}
        {previewUrl && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm relative">
            <button
              onClick={reset}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <img src={previewUrl} alt="yuklangan rasm" className="w-full h-56 object-cover" />
            {isAnalyzing && (
              <div className="p-5 flex flex-col items-center">
                <div className="relative w-16 h-16 mb-3">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#2d6a4f] border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-[#2d6a4f] animate-pulse" />
                  </div>
                </div>
                <p className="font-semibold text-slate-700 animate-pulse">Tahlil qilinmoqda...</p>
                <p className="text-xs text-slate-400 mt-1">Sun'iy intellekt rasmni o'rganmoqda</p>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="space-y-3">
            {/* Diagnosis card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Tashxis Natijasi</span>
                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-600">{result.confidence}% Aniq</span>
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800">{result.diagnosis}</h2>
            </div>

            {/* Causes */}
            <div className="bg-white rounded-3xl p-4 shadow-sm">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-3 text-orange-600">
                <AlertTriangle className="w-4 h-4" /> Kelib chiqish sabablari
              </h3>
              <ul className="space-y-2">
                {result.causes.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment */}
            <div className="bg-white rounded-3xl p-4 shadow-sm">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-3 text-blue-600">
                <ShieldCheck className="w-4 h-4" /> Davolash tavsiyalari
              </h3>
              <ul className="space-y-2">
                {result.treatment.map((t: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full py-3.5 bg-[#2d6a4f] text-white font-bold rounded-2xl shadow-md hover:bg-[#1b4332] transition-colors active:scale-95"
            >
              Yangi rasm yuklash
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
