import { Briefcase } from "lucide-react"

const experiences = [
  {
    title: "SaaS Product Support Specialist",
    company: "Podium",
    period: "Dec 2025 – Present",
    description: "Supporting customers by understanding their needs, translating them into technical solutions, and explaining technical resolutions in clear terms.",
  },
  {
    title: "DevOps Intern",
    company: "Third Wave Innovations",
    period: "Aug 2025 – Dec 2025",
    description: "Designed CI/CD pipelines, built Flask provider abstractions, and developed dashboard analytics.",
  },
  {
    title: "Student Software Engineer",
    company: "Ensign College",
    period: "Apr 2025 – Aug 2025",
    description: "Created an AI Autograder using Canvas + OpenAI, improving grading efficiency.",
  },
  {
    title: "Help Desk Technician",
    company: "Ensign College",
    period: "Apr 2024 – Apr 2025",
    description: "Provided QA support during Wi-Fi migration using ServiceNow.",
  },
  {
    title: "Independent Projects",
    company: "Ongoing",
    period: "Ongoing",
    description: "Side projects are how I sharpen my skills as a professional developer and explore a path toward building and shipping as an independent developer.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-[#2d1b3d] to-[#3d2645] pt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3F4] mb-12 text-center">Experience</h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B35]/20 hover:border-[#FF8BA7]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B35]/20"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#9d4edd] group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 transition-all shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-[#F5F3F4]">{exp.title}</h3>
                    <span className="text-sm text-[#FFC857] font-medium">{exp.period}</span>
                  </div>

                  <p className="text-[#FF8BA7] font-medium mb-2">{exp.company}</p>

                  <p className="text-[#F5F3F4]/80 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
