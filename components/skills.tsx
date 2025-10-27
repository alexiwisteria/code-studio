import { Code2, Wrench, Lightbulb, Users, Plug, Cpu } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Python", "JavaScript", "Java", "TypeScript", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Cpu,
    skills: ["Next.js", "React", "Prisma"],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    skills: ["Git", "GitHub Actions", "Vercel", "Jira"],
  },
  {
    title: "APIs & Integrations",
    icon: Plug,
    skills: ["Canvas API", "GitHub API", "ServiceNow", "TeamDynamix", "OAuth"],
  },
  {
    title: "Core Engineering Skills",
    icon: Lightbulb,
    skills: [
      "Code Analysis & Debugging",
      "API Integration & Testing",
      "Full-Stack Development",
      "Technical Documentation",
      "Data Structures",
    ],
  },
  {
    title: "AI & Professional Skills",
    icon: Users,
    skills: [
      "Prompt Engineering",
      "AI Integration",
      "AI-Collaborative Coding",
      "Effective Communicator",
      "Self-Motivated",
      "Curious",
      "Problem Solver",
      "Teachable",
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-[#2d1b3d] to-[#1a1a2e] pt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3F4] mb-12 text-center">Skills</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className="group bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B35]/20 hover:border-[#FF8BA7]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B35]/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#9d4edd] group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F5F3F4]">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B35]/10 to-[#9d4edd]/10 text-[#F5F3F4]/90 text-sm border border-[#FF6B35]/20 hover:border-[#FF8BA7]/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
