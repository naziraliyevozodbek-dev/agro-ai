"use client"

import Link from "next/link"
import { Sprout, Syringe, ScanSearch, Calculator, BookOpen, Settings, Wind, Thermometer, Droplets, TrendingUp, Map, Plus, CloudRain, Cloud, Sun, CloudSnow } from "lucide-react"
import { useEffect, useState } from "react"

// Open-Meteo weather code to label + icon
function getWeatherInfo(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Ochiq havo", icon: "☀️" }
  if (code <= 3) return { label: "Qisman bulutli", icon: "⛅" }
  if (code <= 48) return { label: "Tumanli", icon: "🌫️" }
  if (code <= 67) return { label: "Yomg'irli", icon: "🌧️" }
  if (code <= 77) return { label: "Qorli", icon: "❄️" }
  if (code <= 82) return { label: "Yomg'irli", icon: "🌦️" }
  return { label: "Momaqaldiroq", icon: "⛈️" }
}

interface WeatherData {
  temp: number
  wind: number
  humidity: number
  label: string
  emoji: string
}

export default function Home() {
  const [user, setUser] = useState<{ first_name: string; last_name?: string; id?: number } | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [time, setTime] = useState("")
  const [greeting, setGreeting] = useState("Xayrli kun")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loadingWeather, setLoadingWeather] = useState(true)

  useEffect(() => {
    // Get Telegram user
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initDataUnsafe?.user) {
      const tgUser = (window as any).Telegram.WebApp.initDataUnsafe.user
      setUser(tgUser)

      // Fetch profile photo
      if (tgUser.id) {
        fetch(`/api/user-photo?user_id=${tgUser.id}`)
          .then(r => r.json())
          .then(d => { if (d.photo_url) setPhotoUrl(d.photo_url) })
          .catch(() => {})
      }
    }

    // Set time and greeting
    const now = new Date()
    const h = now.getHours()
    setGreeting(h < 6 ? "Xayrli tun" : h < 12 ? "Xayrli tong" : h < 18 ? "Xayrli kun" : "Xayrli kech")
    const updateTime = () => {
      const n = new Date()
      setTime(n.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }) + " | " +
        n.toLocaleDateString("uz-UZ", { day: "2-digit", month: "short" }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)

    // Get real weather via geolocation + Open-Meteo (free, no API key)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&wind_speed_unit=kmh`
            )
            const data = await res.json()
            const c = data.current
            const info = getWeatherInfo(c.weather_code)
            setWeather({
              temp: Math.round(c.temperature_2m),
              wind: Math.round(c.wind_speed_10m),
              humidity: Math.round(c.relative_humidity_2m),
              label: info.label,
              emoji: info.icon,
            })
          } catch { /* silent fail */ }
          finally { setLoadingWeather(false) }
        },
        () => setLoadingWeather(false), // denied
        { timeout: 8000 }
      )
    } else {
      setLoadingWeather(false)
    }

    return () => clearInterval(timer)
  }, [])

  const firstName = user ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` : "Fermer"
  const initial = firstName.charAt(0).toUpperCase()

  const quickActions = [
    { name: "AI Agronom", icon: Sprout, href: "/chat?type=agronom", bg: "bg-emerald-500" },
    { name: "AI Veterinar", icon: Syringe, href: "/chat?type=vet", bg: "bg-blue-500" },
    { name: "Kasallik", icon: ScanSearch, href: "/detect", bg: "bg-violet-500" },
    { name: "Kalkulyator", icon: Calculator, href: "/calculators", bg: "bg-teal-500" },
    { name: "Bilimlar", icon: BookOpen, href: "/knowledge", bg: "bg-amber-500" },
    { name: "Tarix", icon: Map, href: "/history", bg: "bg-slate-400" },
  ]

  return (
    <main className="pb-24 min-h-screen bg-[#f5f7f5]">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#52b788] min-h-[270px] px-5 pt-10 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-10 w-32 h-32 rounded-full bg-emerald-300 blur-2xl" />
        </div>

        {/* Top row */}
        <div className="relative flex items-center justify-between mb-5">
          <Link href="/profile" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </Link>
          <span className="text-white/70 text-xs font-medium">{time}</span>
          {/* Avatar */}
          <Link href="/profile">
            {photoUrl ? (
              <img src={photoUrl} alt="avatar" className="w-9 h-9 rounded-full object-cover border-2 border-white/40" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center font-bold text-white text-sm">
                {initial}
              </div>
            )}
          </Link>
        </div>

        {/* Greeting + weather */}
        <div className="relative">
          <p className="text-white/80 text-sm mb-0.5">{greeting}, {firstName} 👋</p>
          <div className="flex items-end justify-between">
            <div>
              {loadingWeather ? (
                <div className="text-white/60 text-4xl font-bold animate-pulse">--°C</div>
              ) : weather ? (
                <div className="text-white text-6xl font-bold tracking-tight leading-none">{weather.temp}°C</div>
              ) : (
                <div className="text-white text-4xl font-bold">--°C</div>
              )}
              <div className="text-white/70 text-sm mt-1 flex items-center gap-1">
                {weather ? <><span>{weather.emoji}</span><span>{weather.label}</span></> : <span>Joylashuv aniqlanmoqda...</span>}
              </div>
            </div>
          </div>

          {/* Weather pills */}
          <div className="flex gap-2 mt-4">
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium">
              <Wind className="w-3.5 h-3.5" />
              {weather ? `${weather.wind} km/s` : "--"}
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium">
              <Thermometer className="w-3.5 h-3.5" />
              {weather ? `${weather.temp > 0 ? '+' : ''}${weather.temp}°C` : "--"}
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium">
              <Droplets className="w-3.5 h-3.5" />
              {weather ? `${weather.humidity}%` : "--"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="px-4 -mt-6 space-y-4">

        {/* Water Efficiency */}
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-slate-700 text-sm">Suv Samaradorligi</span>
            <span className="text-xs font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-full">Yuqori · 75%</span>
          </div>
          <div className="flex gap-[3px] h-3 rounded-full overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`flex-1 rounded-sm ${i < 21 ? "bg-[#2d6a4f]" : "bg-slate-100"}`} />
            ))}
          </div>
        </div>

        {/* Soil + Crop */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-3xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold text-slate-500">Tuproq Sog'lig'i</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Normal</span>
            </div>
            <p className="text-slate-800 font-bold text-sm">pH: 6.5</p>
            <p className="text-slate-400 text-xs">Optimal</p>
            <div className="flex items-center gap-1 mt-3 text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">+42%</span>
              <span className="text-[10px] text-slate-400 ml-1">O'tgan hafta</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-500 mb-2">Hosil Ko'rsatkichi</span>
            <div className="relative w-20 h-11 overflow-hidden">
              <svg viewBox="0 0 100 55" className="w-full">
                <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
                <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#2d6a4f" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray="125" strokeDashoffset="19" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 text-center">
                <span className="text-lg font-bold text-slate-800">85</span>
                <span className="text-xs text-slate-400">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Banner */}
        <div className="bg-gradient-to-br from-[#52b788] to-[#2d6a4f] rounded-3xl p-4 shadow-sm flex items-center justify-between relative min-h-[90px] overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-[80px] flex items-center justify-center select-none">🌾</div>
          <div className="relative z-10">
            <p className="text-white/80 text-xs mb-1">Namlik: 72% · Holat: 85/100</p>
            <Link href="/detect" className="bg-white text-[#2d6a4f] text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm hover:scale-105 transition-transform active:scale-95 w-fit">
              <ScanSearch className="w-3.5 h-3.5" /> Kasallik Aniqlash
            </Link>
          </div>
          <div className="relative z-10 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pb-4">
          <h2 className="text-base font-bold text-slate-700 mb-3">Tezkor Amallar</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="bg-white rounded-2xl p-3.5 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  <div className={`w-11 h-11 ${action.bg} rounded-xl flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 text-center leading-tight">{action.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </main>
  )
}
