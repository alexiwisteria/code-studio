import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Github } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    slug: "gitgrade",
    title: "GitGrade",
    description:
      "An AI-powered autograding system that integrates with Canvas LMS and GitHub to automate code assessment and feedback for programming assignments.",
    tech: ["Next.js", "TypeScript", "Prisma", "GitHub OAuth", "OpenAI"],
    hasVideo: true,
  },
  {
    slug: "ai-voice-tutor",
    title: "AI Tutoring Whiteboard",
    description:
      "A smart whiteboard that listens, sees, and teaches with voice input, vision analysis, and AI-powered tutoring guidance.",
    tech: ["React", "TypeScript", "Vite", "Google Gemini", "ElevenLabs TTS"],
    github: "https://github.com/alexiwisteria/AIVoiceTutor",
    demo: "https://ai-whiteboard-voice-r4vc.bolt.host/",
    hasVideo: true,
  },
  {
    slug: "cleariq",
    title: "ClearIQ",
    description:
      "An AI-powered dashboarding application that transforms data into actionable insights.",
    tech: ["AI", "Dashboarding", "Data Visualization"],
    comingSoon: true,
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-[#1a1a2e] to-[#2d1b3d] pt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3F4] mb-12 text-center">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B35]/20 hover:border-[#FF8BA7]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B35]/20 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-[#F5F3F4] mb-3">{project.title}</h3>

              <p className="text-[#F5F3F4]/80 mb-4 flex-grow leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md bg-gradient-to-r from-[#FF6B35]/10 to-[#9d4edd]/10 text-[#F5F3F4]/90 text-xs border border-[#FF6B35]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {!project.comingSoon && (
                <div className="flex gap-3 flex-wrap">
                  <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#FF6B35] to-[#FFC857] hover:opacity-90 text-white border-0 flex-1"
                      asChild
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <Play className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>

                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#FF6B35]/40 text-[#F5F3F4] hover:bg-[#FF6B35]/10 bg-transparent flex-1"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}

                  {project.demo && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#FF6B35]/40 text-[#F5F3F4] hover:bg-[#FF6B35]/10 bg-transparent flex-1"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {project.comingSoon && (
                <div className="text-center">
                  <span className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-[#9d4edd]/20 to-[#FF6B35]/20 text-[#F5F3F4] text-sm font-medium border border-[#9d4edd]/40">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
