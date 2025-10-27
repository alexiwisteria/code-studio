"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Project {
  name: string
  minutes: number
}

interface WakaData {
  projects: Project[]
  error?: string
}

export function WakaTopProjects() {
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
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FFC857]/20 h-96 animate-pulse">
        <div className="h-8 bg-[#FFC857]/10 rounded w-48 mb-4"></div>
        <div className="h-full bg-[#FFC857]/10 rounded"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FFC857]/20 h-96 flex flex-col items-center justify-center">
        <p className="text-[#F5F3F4] font-semibold mb-2">WakaTime Not Configured</p>
        <p className="text-[#F5F3F4]/70 text-center">Add your API key to see project stats.</p>
      </div>
    )
  }

  if (!data.projects || data.projects.length === 0) {
    return (
      <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FFC857]/20 h-96 flex items-center justify-center">
        <p className="text-[#F5F3F4]/70">No projects tracked</p>
      </div>
    )
  }

  const chartData = {
    labels: data.projects.map((proj) => proj.name),
    datasets: [
      {
        label: "Minutes",
        data: data.projects.map((proj) => proj.minutes),
        backgroundColor: "rgba(255, 200, 87, 0.8)",
        borderColor: "rgba(255, 200, 87, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Top 5 Projects",
        color: "#F5F3F4",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const minutes = context.parsed.x
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
          callback: (value: any) => {
            const hours = Math.floor(value / 60)
            return `${hours}h`
          },
        },
        grid: {
          color: "rgba(255, 200, 87, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#F5F3F4",
        },
        grid: {
          color: "rgba(255, 200, 87, 0.1)",
        },
      },
    },
  }

  return (
    <div className="bg-[#2d1b3d]/50 backdrop-blur-sm rounded-lg p-6 border border-[#FFC857]/20">
      <div className="h-96" role="img" aria-label="Top 5 projects horizontal bar chart">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
