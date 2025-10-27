import { NextResponse } from "next/server"

// Simple in-memory cache
interface CacheEntry {
  data: any
  timestamp: number
}

let cache: CacheEntry | null = null
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

// Helper to get date range in America/Denver timezone
function getDateRange() {
  const now = new Date()
  const denver = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  const today = new Date(denver.format(now))
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 29)

  return {
    start: thirtyDaysAgo.toISOString().split("T")[0],
    end: today.toISOString().split("T")[0],
  }
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "WakaTime API key not configured" }, { status: 500 })
  }

  console.log("[v0] WakaTime API key present:", !!apiKey)
  console.log("[v0] API key starts with:", apiKey.substring(0, 5))

  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log("[v0] Returning cached data")
    return NextResponse.json(cache.data)
  }

  try {
    const { start, end } = getDateRange()

    const authString = Buffer.from(`${apiKey}:`).toString("base64")

    console.log("[v0] Fetching WakaTime data from", start, "to", end)

    const response = await fetch(`https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    })

    console.log("[v0] WakaTime API response status:", response.status)

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("[v0] WakaTime API error:", response.status, errorBody)
      throw new Error("WakaTime API request failed")
    }

    const data = await response.json()

    console.log("[v0] Successfully fetched WakaTime data, days:", data.data?.length)

    // Process and transform data
    const dates: string[] = []
    const minutes: number[] = []
    const languageMap = new Map<string, number>()
    const projectMap = new Map<string, number>()

    data.data.forEach((day: any) => {
      dates.push(day.range.date)
      const dayMinutes = Math.round(day.grand_total.total_seconds / 60)
      minutes.push(dayMinutes)

      // Aggregate languages
      day.languages?.forEach((lang: any) => {
        const current = languageMap.get(lang.name) || 0
        languageMap.set(lang.name, current + lang.total_seconds)
      })

      // Aggregate projects
      day.projects?.forEach((proj: any) => {
        const current = projectMap.get(proj.name) || 0
        projectMap.set(proj.name, current + proj.total_seconds)
      })
    })

    const totalLangSeconds = Array.from(languageMap.values()).reduce((a, b) => a + b, 0)
    const languages = Array.from(languageMap.entries())
      .map(([name, seconds]) => ({
        name,
        percent: totalLangSeconds > 0 ? Math.round((seconds / totalLangSeconds) * 100) : 0,
        hours: seconds / 3600, // Convert seconds to hours
      }))
      .sort((a, b) => b.percent - a.percent)

    // Get top 5 projects
    const projects = Array.from(projectMap.entries())
      .map(([name, seconds]) => ({
        name,
        minutes: Math.round(seconds / 60),
      }))
      .sort((a, b) => b.minutes - a.minutes)
      .slice(0, 5)

    // Calculate totals
    const totalMinutes = minutes.reduce((a, b) => a + b, 0)
    const bestDayIndex = minutes.indexOf(Math.max(...minutes))
    const topLanguage = languages[0] || { name: "N/A", percent: 0 }

    const result = {
      dates,
      minutes,
      languages,
      projects,
      totals: {
        totalMinutes,
        bestDay: {
          date: dates[bestDayIndex] || "N/A",
          minutes: minutes[bestDayIndex] || 0,
        },
        topLanguage,
      },
    }

    // Update cache
    cache = {
      data: result,
      timestamp: Date.now(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("WakaTime fetch error:", error)

    // Return cached data if available
    if (cache) {
      return NextResponse.json(cache.data)
    }

    return NextResponse.json({ error: "WakaTime fetch failed" }, { status: 500 })
  }
}
