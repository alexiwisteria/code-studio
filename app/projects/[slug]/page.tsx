import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

// Project data - in a real app, this would come from a database or CMS
const projectData: Record<
  string,
  {
    title: string
    description: string
    longDescription: string
    tech: string[]
    videoUrl?: string
    isYoutube?: boolean
    features: string[]
    github?: string
    demo?: string
  }
> = {
  gitgrade: {
    title: "GitGrade",
    description: "AI-powered autograding system for programming assignments",
    longDescription:
      "GitGrade is a comprehensive full-stack web application that seamlessly integrates GitHub Classroom with Canvas LMS. It enables automated assignment linking and autograding for educational institutions, featuring a multi-tenant architecture with role-based access control supporting administrators, teachers, and students.",
    tech: ["Next.js", "TypeScript", "Prisma", "GitHub OAuth", "OpenAI", "Canvas API"],
    videoUrl: "https://www.youtube.com/embed/OnrQSQqqRaw?si=1vnHOT2wBo7QVqix",
    isYoutube: true,
    features: [
      "Automated grading system that processes GitHub repository submissions",
      "Real-time feedback and scoring with automatic Canvas gradebook updates",
      "Multi-tenant architecture with role-based access control",
      "Secure authentication via GitHub OAuth and Canvas API integration",
      "Test suite execution and automated feedback generation",
    ],
  },
  "ai-voice-tutor": {
    title: "AI Tutoring Whiteboard",
    description: "A smart whiteboard that listens, sees, and teaches. Students can draw naturally, talk to the tutor with their voice or text, and get real-time, pedagogically sound guidance.",
    longDescription:
      "AI Tutoring Whiteboard is a multimodal learning platform that merges visual work and conversation into a single flow. Unlike other tutoring tools that separate whiteboard interactions from chat, this project allows the AI to 'see' the board, listen to the student, and respond with voice, text, and visual aids simultaneously. Built with React, TypeScript, and cutting-edge AI services, it features interactive canvas drawing, voice input via Web Speech API, vision analysis of student work via Google Gemini 2.0 Flash, natural voice responses through ElevenLabs, and customizable tutoring 'pushiness' levels (1-5) to fit individual learning preferences.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Google Gemini 2.0 Flash", "ElevenLabs TTS", "Runware", "Bolt Database", "Web Speech API", "Canvas API"],
    videoUrl: "https://www.youtube.com/embed/1vqkAX20MLM?si=qN421dCkQmndEIeF",
    isYoutube: true,
    features: [
      "Interactive whiteboard with pencil, eraser, color & line width controls",
      "Voice input via Web Speech API for hands-free question asking",
      "AI vision analysis of current canvas snapshot using Gemini 2.0 Flash",
      "Customizable tutoring pushiness levels (1-5) for different learning styles",
      "Natural voice responses using ElevenLabs text-to-speech",
      "Optional background image upload for problem photos",
      "Visual aids generation with Runware integration",
      "Multi-tenant user authentication with Bolt Database RLS policies",
    ],
    github: "https://github.com/alexiwisteria/AIVoiceTutor",
    demo: "https://ai-whiteboard-voice-r4vc.bolt.host/",
  },
  cleariq: {
    title: "ClearIQ",
    description: "An AI-powered dashboarding application that transforms complex data into actionable insights.",
    longDescription:
      "ClearIQ is an advanced AI-powered dashboarding application designed to help businesses and individuals make sense of their data through intelligent visualization and analysis. By leveraging cutting-edge AI capabilities, ClearIQ automatically identifies patterns, generates insights, and presents data in an intuitive, actionable format.",
    tech: ["AI", "Dashboarding", "Data Visualization"],
    features: [
      "Intelligent data analysis and pattern recognition",
      "Automated insight generation from complex datasets",
      "Intuitive and user-friendly dashboard interface",
      "Customizable visualizations and reports",
      "Real-time data processing and updates",
    ],
  },
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projectData[slug]

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#2d1b3d] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#F5F3F4] mb-4">Project Not Found</h1>
          <Link href="/#projects">
            <Button className="bg-gradient-to-r from-[#FF6B35] to-[#FFC857] hover:opacity-90 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#2d1b3d] to-[#1a1a2e]">
      <div className="container mx-auto px-4 py-24">
        {/* Back Button */}
        <Link href="/#projects" className="inline-block mb-8">
          <Button variant="outline" className="border-[#FF6B35]/40 text-[#F5F3F4] hover:bg-[#FF6B35]/10 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#F5F3F4] mb-4">{project.title}</h1>
          <p className="text-xl text-[#F5F3F4]/80 leading-relaxed max-w-3xl">{project.description}</p>
        </div>

        {/* Demo Video */}
        {project.videoUrl && project.isYoutube ? (
          <div className="mb-12 rounded-2xl overflow-hidden border border-[#FF6B35]/20 bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm">
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={project.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ) : project.videoUrl ? (
          <div className="mb-12 rounded-2xl overflow-hidden border border-[#FF6B35]/20 bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm">
            <video controls className="w-full aspect-video" poster="/video-placeholder.png">
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : null}

        {!project.videoUrl && project.github && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-[#FF6B35]/20 bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm p-12 text-center">
            <Github className="w-16 h-16 text-[#FF6B35] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#F5F3F4] mb-4">Source Code & Demo</h3>
            <p className="text-[#F5F3F4]/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              {project.demo 
                ? "This project is available on GitHub with a live demo. Explore the repository, view the documentation, or try the live application."
                : "This project is available on GitHub. Check out the repository to explore the code, documentation, and contribute to the project."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-[#FF6B35] to-[#FFC857] hover:opacity-90 text-white border-0"
                size="lg"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
              {project.demo && (
                <Button
                  variant="outline"
                  className="border-[#FF6B35]/40 text-[#F5F3F4] hover:bg-[#FF6B35]/10 bg-transparent"
                  size="lg"
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Project Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#FF6B35]/20">
              <h2 className="text-2xl font-bold text-[#F5F3F4] mb-4">About This Project</h2>
              <p className="text-[#F5F3F4]/80 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#FF6B35]/20">
              <h2 className="text-2xl font-bold text-[#F5F3F4] mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#FF6B35] mt-1">•</span>
                    <span className="text-[#F5F3F4]/80 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B35]/20">
              <h3 className="text-xl font-bold text-[#F5F3F4] mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B35]/10 to-[#9d4edd]/10 text-[#F5F3F4]/90 text-sm border border-[#FF6B35]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.github || project.demo) && (
              <div className="bg-gradient-to-br from-[#2d1b3d]/50 to-[#1a1a2e]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B35]/20">
                <h3 className="text-xl font-bold text-[#F5F3F4] mb-4">Links</h3>
                <div className="space-y-3">
                  {project.github && (
                    <Button
                      className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFC857] hover:opacity-90 text-white border-0"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      variant="outline"
                      className="w-full border-[#FF6B35]/40 text-[#F5F3F4] hover:bg-[#FF6B35]/10 bg-transparent"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all projects
export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }))
}
