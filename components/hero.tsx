import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#2d1b3d] to-[#3d2645] pt-20">
      {/* Glowing horizon line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent blur-sm" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-[#F5F3F4] text-balance">
            Building scalable, reliable, automation-driven systems.
          </h1>

          <p className="text-xl md:text-2xl text-[#F5F3F4]/80 text-balance">Writes code. Eats snacks. Avoids drama.</p>

          <div className="max-w-2xl mx-auto pt-4">
            <p className="text-base md:text-lg text-[#F5F3F4]/70 leading-relaxed text-pretty">
              Software engineer focused on backend, DevOps, and full-stack systems. I build reliable, scalable solutions
              from first principles—secure CI/CD pipelines, backend abstractions, and automation that improves
              workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FF6B35] to-[#FFC857] hover:opacity-90 text-white border-0 shadow-lg shadow-[#FF6B35]/30 transition-all hover:shadow-xl hover:shadow-[#FF6B35]/40"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-gradient-to-r from-[#9d4edd] to-[#FF8BA7] hover:opacity-90 text-white border-0 shadow-lg shadow-[#9d4edd]/30 transition-all hover:shadow-xl hover:shadow-[#9d4edd]/40"
              asChild
            >
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>

          <div className="pt-12 animate-bounce">
            <a href="#about" className="inline-block text-[#FF6B35]">
              <ArrowDown className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3d2645] via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
