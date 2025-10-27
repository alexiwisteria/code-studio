"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WakaData {
  dates: string[]
  minutes: number[]
}

export function WakaDailyBar() {
  const [data, setData] = useState<WakaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/waka/summaries")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch data")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20 h-96 animate-pulse">
        <div className="h-8 bg-[#FF6B35]/10 rounded w-48 mb-4"></div>
        <div className="h-full bg-[#FF6B35]/10 rounded"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20 h-96 flex flex-col items-center justify-center">
        <p className="text-[#F5F3F4] font-semibold mb-2">WakaTime Not Configured</p>
        <p className="text-[#F5F3F4]/70 text-center max-w-md">
          Add your WAKATIME_API_KEY to environment variables to see your coding activity.
        </p>
      </div>
    )
  }

  if (!data.dates || data.dates.length === 0) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20 h-96 flex items-center justify-center">
        <p className="text-[#F5F3F4]/70">No recent activity</p>
      </div>
    )
  }

  const chartData = {
    labels: data.dates.map((date) => {
      const d = new Date(date)
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }),
    datasets: [
      {
        label: "Minutes Coded",
        data: data.minutes,
        backgroundColor: "rgba(255, 107, 53, 0.8)",
        borderColor: "rgba(255, 107, 53, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Daily Coding Trends",
        color: "#F5F3F4",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const minutes = context.parsed.y
            const hours = Math.floor(minutes / 60)
            const mins = minutes % 60
            return `${hours}h ${mins}m`
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#F5F3F4",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255, 107, 53, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#F5F3F4",
          callback: (value: any) => {
            const hours = Math.floor(value / 60)
            return `${hours}h`
          },
        },
        grid: {
          color: "rgba(255, 107, 53, 0.1)",
        },
      },
    },
  }

  return (
    <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FF6B35]/20">
      <div className="h-96" role="img" aria-label="Daily coding activity bar chart">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
