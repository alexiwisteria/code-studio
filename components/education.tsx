import { GraduationCap } from "lucide-react"

export function Education() {
  return (
    <section id="education" className="py-24 bg-gradient-to-b from-[#3d2645] to-[#2d1b3d] pt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3F4] mb-12 text-center">Education</h2>

        <div className="max-w-3xl mx-auto">
          <div className="group bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#FF6B35]/20 hover:border-[#FF8BA7]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B35]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#9d4edd] group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 transition-all shrink-0">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>

              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-[#F5F3F4]">B.S., Software Engineering</h3>
                  <span className="text-sm text-[#FFC857] font-medium">Expected 2026</span>
                </div>

                <p className="text-[#FF8BA7] font-medium mb-3">Ensign College</p>

                <p className="text-[#F5F3F4]/80 leading-relaxed">
                  Focus: Data Structures, Object-Oriented Programming, Full-Stack Development, Agile Project Management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
