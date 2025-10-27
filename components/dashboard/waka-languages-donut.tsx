"use client"

import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Language {
  name: string
  percent: number
  hours?: number // Made hours optional to handle missing data
}

interface WakaData {
  languages: Language[]
  error?: string
}

const PRIMARY_LANGUAGES = ["TypeScript", "JavaScript", "Python", "Go", "C", "C#", "Java", "Assembly"]

export function WakaLanguagesDonut() {
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
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#9d4edd]/20 h-96 animate-pulse">
        <div className="h-8 bg-[#9d4edd]/10 rounded w-48 mb-4"></div>
        <div className="h-full bg-[#9d4edd]/10 rounded"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#9d4edd]/20 h-96 flex flex-col items-center justify-center">
        <p className="text-[#F5F3F4] font-semibold mb-2">WakaTime Not Configured</p>
        <p className="text-[#F5F3F4]/70 text-center">Add your API key to see language stats.</p>
      </div>
    )
  }

  if (!data.languages || data.languages.length === 0) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#9d4edd]/20 h-96 flex items-center justify-center">
        <p className="text-[#F5F3F4]/70">No data</p>
      </div>
    )
  }

  const primaryLanguages: Language[] = []
  const otherLanguages: Language[] = []

  data.languages.forEach((lang) => {
    if (PRIMARY_LANGUAGES.includes(lang.name)) {
      primaryLanguages.push(lang)
    } else {
      otherLanguages.push(lang)
    }
  })

  const otherTotal = otherLanguages.reduce((sum, lang) => sum + lang.percent, 0)
  const otherHoursTotal = otherLanguages.reduce((sum, lang) => sum + (lang.hours || 0), 0)

  const chartLanguages = [...primaryLanguages]
  if (otherLanguages.length > 0) {
    chartLanguages.push({
      name: "Other",
      percent: otherTotal,
      hours: otherHoursTotal,
    })
  }

  const colors = [
    "rgba(255, 107, 53, 0.8)", // Orange
    "rgba(255, 200, 87, 0.8)", // Amber
    "rgba(157, 78, 221, 0.8)", // Purple
    "rgba(255, 139, 167, 0.8)", // Rose
    "rgba(100, 200, 255, 0.8)", // Blue
    "rgba(150, 255, 150, 0.8)", // Green
    "rgba(255, 150, 100, 0.8)", // Coral
    "rgba(200, 150, 255, 0.8)", // Lavender
    "rgba(150, 150, 150, 0.8)", // Gray for "Other"
  ]

  const chartData = {
    labels: chartLanguages.map((lang) => lang.name),
    datasets: [
      {
        data: chartLanguages.map((lang) => lang.percent),
        backgroundColor: colors.slice(0, chartLanguages.length),
        borderColor: colors.slice(0, chartLanguages.length).map((c) => c.replace("0.8", "1")),
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#F5F3F4",
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Code by Language",
        color: "#F5F3F4",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"doughnut">) => {
            const label = context.label || ""
            const value = context.parsed || 0

            if (label === "Other" && otherLanguages.length > 0) {
              const lines = [`Other: ${value.toFixed(1)}%`]
              lines.push("") // Empty line for spacing
              otherLanguages.forEach((lang) => {
                const hours = lang.hours || 0
                lines.push(`  ${lang.name}: ${lang.percent.toFixed(1)}% (${hours.toFixed(1)}h)`)
              })
              return lines
            }

            const hours = chartLanguages.find((l) => l.name === label)?.hours || 0
            return `${label}: ${value.toFixed(1)}% (${hours.toFixed(1)}h)`
          },
        },
      },
    },
  }

  return (
    <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#9d4edd]/20">
      <div className="h-96" role="img" aria-label="Language breakdown doughnut chart">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}
