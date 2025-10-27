"use client"

import { WakaDailyBar } from "@/components/dashboard/waka-daily-bar"
import { WakaLanguagesDonut } from "@/components/dashboard/waka-languages-donut"

export function CodingActivity() {
  return (
    <section
      id="coding-activity"
      className="py-20 px-4 scroll-mt-20 bg-gradient-to-b from-[#2d1b3d] via-[#3d2645] to-[#2d1b3d]"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3F4] mb-4">30-Day Coding Summary</h2>
          <p className="text-[#F5F3F4]/70 text-lg">Live Statistics</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Activity */}
          <div className="lg:col-span-2">
            <WakaDailyBar />
          </div>

          {/* Language Breakdown */}
          <div className="lg:col-span-2">
            <WakaLanguagesDonut />
          </div>
        </div>
      </div>
    </section>
  )
}
