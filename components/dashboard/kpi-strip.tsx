"use client"

import { useEffect, useState } from "react"
import { Clock, TrendingUp, Code } from "lucide-react"

interface WakaData {
  totals: {
    totalMinutes: number
    bestDay: { date: string; minutes: number }
    topLanguage: { name: string; percent: number }
  }
  error?: boolean
}

export function KpiStrip() {
  const [data, setData] = useState<WakaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/waka/summaries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => {
        if (data.error) {
          setError(true)
          setLoading(false)
          return
        }
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20 animate-pulse"
          >
            <div className="h-12 bg-[#FF6B35]/10 rounded mb-2"></div>
            <div className="h-8 bg-[#FF6B35]/10 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20 text-center">
        <p className="text-[#F5F3F4] font-semibold mb-2">WakaTime Not Configured</p>
        <p className="text-[#F5F3F4]/70">
          Add your WAKATIME_API_KEY to environment variables to see your coding stats.
        </p>
      </div>
    )
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Time */}
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20 hover:border-[#FF6B35]/40 transition-all">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-6 h-6 text-[#FF6B35]" />
          <h3 className="text-[#F5F3F4]/70 text-sm font-medium">Total Time</h3>
        </div>
        <p className="text-3xl font-bold text-[#F5F3F4]">{formatTime(data.totals.totalMinutes)}</p>
      </div>

      {/* Best Day */}
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FFC857]/20 hover:border-[#FFC857]/40 transition-all">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-[#FFC857]" />
          <h3 className="text-[#F5F3F4]/70 text-sm font-medium">Best Day</h3>
        </div>
        <p className="text-3xl font-bold text-[#F5F3F4]">{formatTime(data.totals.bestDay.minutes)}</p>
        <p className="text-[#F5F3F4]/50 text-sm mt-1">{data.totals.bestDay.date}</p>
      </div>

      {/* Top Language */}
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#9d4edd]/20 hover:border-[#9d4edd]/40 transition-all">
        <div className="flex items-center gap-3 mb-2">
          <Code className="w-6 h-6 text-[#9d4edd]" />
          <h3 className="text-[#F5F3F4]/70 text-sm font-medium">Top Language</h3>
        </div>
        <p className="text-3xl font-bold text-[#F5F3F4]">{data.totals.topLanguage.name}</p>
        <p className="text-[#F5F3F4]/50 text-sm mt-1">{data.totals.topLanguage.percent}% of time</p>
      </div>
    </div>
  )
}
